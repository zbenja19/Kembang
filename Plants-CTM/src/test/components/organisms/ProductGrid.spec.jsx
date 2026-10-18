import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductGrid from '../../../components/organisms/ProductGrid';

describe('ProductGrid (organismo)', () => {
  const products = [
    { id: 1, name: 'Ficus', description: 'a', price: 1000, image: 'a.jpg' },
    { id: 2, name: 'Cactus', description: 'b', price: 2000, image: 'b.jpg' },
  ];
  const renderGrid = (props) =>
    render(
      <MemoryRouter>
        <ProductGrid products={products} onAgregar={() => {}} {...props} />
      </MemoryRouter>
    );

  it('muestra una tarjeta por cada producto', () => {
    renderGrid();
    expect(screen.getAllByText('Ver detalle').length).toBe(2);
  });

  it('usa el ancho de columna indicado en lg', () => {
    const { container } = renderGrid({ lg: 3 });
    expect(container.querySelectorAll('.col-lg-3').length).toBe(2);
  });

  it('no muestra tarjetas si la lista está vacía', () => {
    renderGrid({ products: [] });
    expect(screen.queryAllByText('Ver detalle').length).toBe(0);
  });
});