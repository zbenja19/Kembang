import React from 'react';
import { render, screen } from '@testing-library/react';
import CardBody from '../../../components/molecules/CardBody';

describe('CardBody (molécula)', () => {
  it('muestra el título y la descripción', () => {
    render(<CardBody title="Ficus" description="Planta de interior" price={5000} />);
    expect(screen.getByRole('heading', { level: 5, name: 'Ficus' })).toBeTruthy();
    expect(screen.getByText('Planta de interior')).toBeTruthy();
  });

  it('muestra el precio usando PriceTag', () => {
    render(<CardBody title="Ficus" description="Planta" price={5000} />);
    expect(screen.getByText('$5000')).toBeTruthy();
  });

  it('renderiza los children (por ejemplo, botones)', () => {
    render(
      <CardBody title="Ficus" description="Planta" price={5000}>
        <button>Agregar</button>
      </CardBody>
    );
    expect(screen.getByText('Agregar')).toBeTruthy();
  });
});