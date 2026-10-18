import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from '../../../components/atoms/Image';

describe('Image (átomo)', () => {
  it('renderiza una imagen con su texto alternativo', () => {
    render(<Image src="ficus.jpg" alt="Ficus" />);
    expect(screen.getByRole('img', { name: 'Ficus' })).toBeTruthy();
  });

  it('usa la ruta que recibe en src', () => {
    render(<Image src="ficus.jpg" alt="Ficus" />);
    expect(screen.getByRole('img').getAttribute('src')).toBe('ficus.jpg');
  });

  it('aplica la clase CSS que recibe', () => {
    render(<Image src="ficus.jpg" alt="Ficus" className="productcard__image" />);
    expect(screen.getByRole('img')).toHaveClass('productcard__image');
  });
});