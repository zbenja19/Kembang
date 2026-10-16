import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Administradores fijos
const ADMINS = [
  { email: 'lucianocontreras@gmail.com', password: 'admin123', role: 'admin', name: 'AdministradorLucianoContreras' },
  { email: 'benjamintrujillo@gmail.com', password: 'admin321', role: 'admin', name: 'AdministradorBenjaminTrujillo' },
];

// Clientes registrados (se guardan en el navegador)
const cargarRegistrados = () => {
  try {
    return JSON.parse(localStorage.getItem('registeredUsers')) || [];
  } catch {
    return [];
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });

  const iniciarSesion = (found) => {
    const { password: _omit, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem('user', JSON.stringify(safeUser));
  };

  const login = (email, password) => {
    const emailNorm = email.trim().toLowerCase();
    const found = [...ADMINS, ...cargarRegistrados()].find(
      (u) => u.email.toLowerCase() === emailNorm && u.password === password
    );
    if (!found) return false;
    iniciarSesion(found);
    return true;
  };

  // Devuelve { ok, error }
  const register = ({ name, email, password }) => {
    const emailNorm = email.trim().toLowerCase();
    const registrados = cargarRegistrados();

    const existe = [...ADMINS, ...registrados].some(
      (u) => u.email.toLowerCase() === emailNorm
    );
    if (existe) return { ok: false, error: 'Ya existe una cuenta con ese correo.' };

    const nuevo = { id: Date.now(), name: name.trim(), email: emailNorm, password, role: 'cliente' };
    localStorage.setItem('registeredUsers', JSON.stringify([...registrados, nuevo]));
    iniciarSesion(nuevo);
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);