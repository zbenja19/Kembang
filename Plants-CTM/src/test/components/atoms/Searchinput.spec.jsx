import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from '../../../components/atoms/SearchInput';

describe('SearchInput (átomo)', () => {
  it('muestra el placeholder', () => {
    render(<SearchInput value="" onChange={() => {}} placeholder="Buscar..." />);
    expect(screen.getByPlaceholderText('Buscar...')).toBeTruthy();
  });

  it('muestra el valor que recibe', () => {
    render(<SearchInput value="ficus" onChange={() => {}} placeholder="Buscar..." />);
    expect(screen.getByPlaceholderText('Buscar...').value).toBe('ficus');
  });

  it('envía el texto escrito a onChange', () => {
    const onChange = jasmine.createSpy('onChange');
    render(<SearchInput value="" onChange={onChange} placeholder="Buscar..." />);
    fireEvent.change(screen.getByPlaceholderText('Buscar...'), { target: { value: 'cactus' } });
    expect(onChange).toHaveBeenCalledWith('cactus');
  });
});