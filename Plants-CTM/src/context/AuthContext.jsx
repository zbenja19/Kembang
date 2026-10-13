import {createContext, useContext, useState} from 'react';

const AuthContext = createContext(null);

const USERS = [
    {email: 'lucianocontreras@gmail.com', password: 'admin123', role:'admin', name:'AdministradorLucianoContreras'},
    {email: 'benjamintrujillo@gmail.com', password: 'admin321', role:'admin', name:'AdministradorBenjaminTrujillo'},
    {email: 'benjaminmadrid@gmail.com', password: 'admin456', role:'admin', name:'AdministradorBenjaminMadrid'}
];

export function AuthProvider({children}) {
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('user'));
        }catch{
            return null;
        }
    });

const login = (email, password) => {
    const found = USERS.find((u) => u.email === email && u.password === password );
    if (!found) return false;
    const {password: _omit, ...safeUser} = found;
    setUser(safeUser);
    localStorage.setItem('user', JSON.stringify(safeUser));
    return true;
};

const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };


return (
    <AuthContext.Provider value={{user, login, logout, isAdmin: user?.role === 'admin'}}>
    {children}
    </AuthContext.Provider>
    );

}

   export const useAuth = () => useContext(AuthContext);