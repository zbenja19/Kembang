import React from 'react';
import { render, screen } from '@testing-library/react';
import Text from '../../../components/atoms/Text';

describe('Text (átomo)', () => {
  it('por defecto renderiza un párrafo <p>', () => {
    const { container } = render(<Text>Hola</Text>);
    expect(container.querySelector('p').textContent).toBe('Hola');
  });

  it('renderiza la etiqueta indicada en variant', () => {
    render(<Text variant="h2">Título</Text>);
    expect(screen.getByRole('heading', { level: 2, name: 'Título' })).toBeTruthy();
  });

  it('aplica la clase CSS que recibe', () => {
    render(<Text className="cardbody__title">Hola</Text>);
    expect(screen.getByText('Hola')).toHaveClass('cardbody__title');
  });
});