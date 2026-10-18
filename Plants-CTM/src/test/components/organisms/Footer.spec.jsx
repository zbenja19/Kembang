import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../../components/organisms/Footer';

describe('Footer (organismo)', () => {
  it('muestra el nombre de la tienda', () => {
    render(<Footer />);
    expect(screen.getByText('Kembang')).toBeTruthy();
  });

  it('el link de Instagram abre en una pestaña nueva', () => {
    render(<Footer />);
    const link = screen.getByText('Instagram');
    expect(link.getAttribute('href')).toContain('instagram.com');
    expect(link.getAttribute('target')).toBe('_blank');
  });

  it('muestra el texto de derechos reservados', () => {
    render(<Footer />);
    expect(screen.getByText(/Todos los derechos reservados/)).toBeTruthy();
  });
});