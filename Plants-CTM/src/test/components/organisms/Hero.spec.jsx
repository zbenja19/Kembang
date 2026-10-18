import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '../../../components/organisms/Hero';

describe('Hero (organismo)', () => {
  it('muestra el título principal', () => {
    render(<Hero />);
    expect(screen.getByText('Descubre Lo Nuevo En Plantas.')).toBeTruthy();
  });

  it('el título es un h1', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveClass('hero__title');
  });

  it('usa la imagen de fondo HeroFondo.webp', () => {
    const { container } = render(<Hero />);
    const section = container.querySelector('section.hero');
    expect(section.style.backgroundImage).toContain('HeroFondo.webp');
  });
});