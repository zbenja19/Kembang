import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProductCard from '../../../components/organisms/ProductCard';

describe('ProductCard (organismo)', () => {
  const product = {
    id: 1,
    name: 'Ficus Test',
    description: 'Planta de prueba',
    price: 10000,
    image: 'test.jpg',
  };
  const renderCard = (onAgregar = () => {}) =>
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<ProductCard product={product} onAgregar={onAgregar} />} />
          <Route path="/products/:id" element={<p>Página de detalle</p>} />
        </Routes>
      </MemoryRouter>
    );

  it('muestra nombre, descripción y precio del producto', () => {
    renderCard();
    expect(screen.getByText('Ficus Test')).toBeTruthy();
    expect(screen.getByText('Planta de prueba')).toBeTruthy();
    expect(screen.getByText('$10000')).toBeTruthy();
  });

  it('"Ver detalle" navega a /products/1', () => {
    renderCard();
    fireEvent.click(screen.getByText('Ver detalle'));
    expect(screen.getByText('Página de detalle')).toBeTruthy();
  });

  it('"Agregar al carrito" llama a onAgregar con el producto', () => {
    const onAgregar = jasmine.createSpy('onAgregar');
    renderCard(onAgregar);
    fireEvent.click(screen.getByText('Agregar al carrito'));
    expect(onAgregar).toHaveBeenCalledWith(product);
  });
});