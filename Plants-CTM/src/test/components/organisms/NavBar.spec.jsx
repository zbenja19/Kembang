import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../../../components/organisms/Navbar';
import { AuthProvider } from '../../../context/AuthContext';

describe('Navbar (organismo)', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  const renderNavbar = (cantidad = 0) =>
    render(
      <AuthProvider>
        <MemoryRouter>
          <NavBar cantidad={cantidad} />
        </MemoryRouter>
      </AuthProvider>
    );

  it('sin sesión muestra "Iniciar sesión" y no muestra "Administrar"', () => {
    renderNavbar();
    expect(screen.getByText('Iniciar sesión')).toBeTruthy();
    expect(screen.queryByText('Administrar')).toBeNull();
  });

  it('muestra la cantidad de productos del carrito', () => {
    renderNavbar(3);
    expect(screen.getByText('Carrito (3)')).toBeTruthy();
  });

  it('con un admin logueado muestra su nombre y "Administrar"', () => {
    localStorage.setItem('user', JSON.stringify({ name: 'Admin Test', role: 'admin' }));
    renderNavbar();
    expect(screen.getByText('Admin Test')).toBeTruthy();
    expect(screen.getByText('Administrar')).toBeTruthy();
    expect(screen.getByText('Cerrar sesión')).toBeTruthy();
  });
});