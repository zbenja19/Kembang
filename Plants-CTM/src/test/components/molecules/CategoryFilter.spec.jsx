import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CategoryFilter from '../../../components/molecules/CategoryFilter';

describe('CategoryFilter (molécula)', () => {
  const categorias = ['Plantas', 'Maceteros'];

  it('muestra un checkbox por cada categoría', () => {
    render(<CategoryFilter categorias={categorias} seleccionadas={[]} onToggle={() => {}} />);
    expect(screen.getAllByRole('checkbox').length).toBe(2);
    expect(screen.getByText('Filtros')).toBeTruthy();
  });

  it('marca solo las categorías seleccionadas', () => {
    render(<CategoryFilter categorias={categorias} seleccionadas={['Maceteros']} onToggle={() => {}} />);
    const checks = screen.getAllByRole('checkbox');
    expect(checks[0].checked).toBe(false); // Plantas
    expect(checks[1].checked).toBe(true);  // Maceteros
  });

  it('llama a onToggle con el nombre de la categoría', () => {
    const onToggle = jasmine.createSpy('onToggle');
    render(<CategoryFilter categorias={categorias} seleccionadas={[]} onToggle={onToggle} />);
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    expect(onToggle).toHaveBeenCalledWith('Plantas');
  });
});