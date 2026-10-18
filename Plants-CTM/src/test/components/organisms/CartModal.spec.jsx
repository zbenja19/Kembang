import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CartModal from '../../../components/organisms/CartModal';

describe('CartModal (organismo)', () => {
  const product = { id: 1, name: 'Ficus', price: 5000, image: 'ficus.jpg' };
  const carrito = [{ ...product, cantidad: 2 }];


  const renderModal = (props) =>
    render(
      <MemoryRouter>
        <CartModal
          product={product}
          carrito={carrito}
          onCambiarCantidad={() => {}}
          onClose={() => {}}
          {...props}
        />
      </MemoryRouter>
    );

  it('muestra el título, el producto agregado y su cantidad', () => {
    renderModal();
    expect(screen.getByText('Producto agregado a tu carrito')).toBeTruthy();
    expect(screen.getByText('Ficus')).toBeTruthy();
    expect(screen.getByText('2')).toBeTruthy();
  });

  it('el botón + llama a onCambiarCantidad con (id, 1)', () => {
    const onCambiarCantidad = jasmine.createSpy('onCambiarCantidad');
    renderModal({ onCambiarCantidad });
    fireEvent.click(screen.getByText('+'));
    expect(onCambiarCantidad).toHaveBeenCalledWith(1, 1);
  });

  it('no se muestra cuando product es null', () => {
    renderModal({ product: null });
    expect(screen.queryByText('Producto agregado a tu carrito')).toBeNull();
  });
});