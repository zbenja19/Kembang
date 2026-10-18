import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../../components/molecules/SearchBar';

describe('SearchBar (molécula)', () => {
  it('muestra el campo con el placeholder "Buscar productos..."', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText('Buscar productos...')).toBeTruthy();
  });

  it('muestra el ícono de lupa', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByText('🔍')).toBeTruthy();
  });

  it('envía lo escrito a onChange', () => {
    const onChange = jasmine.createSpy('onChange');
    render(<SearchBar value="" onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText('Buscar productos...'), { target: { value: 'ficus' } });
    expect(onChange).toHaveBeenCalledWith('ficus');
  });
});