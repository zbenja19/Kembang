import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../components/atoms/Button';

describe('Button (átomo)', () => {
  it('renderiza el texto que recibe como children', () => {
    render(<Button>Comprar</Button>);
    expect(screen.getByText('Comprar')).toBeTruthy();
  });

  it('aplica la clase de Bootstrap según el variant', () => {
    render(<Button variant="success">Comprar</Button>);
    expect(screen.getByText('Comprar')).toHaveClass('btn-success');
  });

  it('ejecuta onClick al hacer click', () => {
    const onClick = jasmine.createSpy('onClick');
    render(<Button onClick={onClick}>Comprar</Button>);
    fireEvent.click(screen.getByText('Comprar'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});