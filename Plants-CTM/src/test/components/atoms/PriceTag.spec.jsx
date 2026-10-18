import React from 'react';
import { render, screen } from '@testing-library/react';
import PriceTag from '../../../components/atoms/PriceTag';

describe('PriceTag (átomo)', () => {
  it('muestra el precio con el signo $', () => {
    render(<PriceTag price={1000} />);
    expect(screen.getByText('$1000')).toBeTruthy();
  });

  it('muestra el precio original tachado y el precio en rojo cuando hay oferta', () => {
    render(<PriceTag price={1500} OriginalPrice={2000} />);
    expect(screen.getByText('$2000')).toHaveClass('text-muted');
    expect(screen.getByText('$1500')).toHaveClass('text-danger');
  });

  it('no muestra precio original cuando no hay oferta', () => {
    const { container } = render(<PriceTag price={1000} />);
    expect(container.querySelector('.text-muted')).toBeNull();
  });
});