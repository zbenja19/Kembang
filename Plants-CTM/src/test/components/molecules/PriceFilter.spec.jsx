import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PriceFilter from '../../../components/molecules/PriceFilter';

describe('PriceFilter (molécula)', () => {
  it('muestra el precio mínimo y el valor actual', () => {
    render(<PriceFilter min={100} max={500} value={300} onChange={() => {}} />);
    expect(screen.getByText('$100')).toBeTruthy();
    expect(screen.getByText('Hasta $300')).toBeTruthy();
  });

  it('la barra (range) tiene el valor recibido', () => {
    render(<PriceFilter min={100} max={500} value={300} onChange={() => {}} />);
    expect(screen.getByRole('slider').value).toBe('300');
  });

  it('envía el nuevo valor como número a onChange', () => {
    const onChange = jasmine.createSpy('onChange');
    render(<PriceFilter min={100} max={500} value={300} onChange={onChange} />);
    fireEvent.change(screen.getByRole('slider'), { target: { value: '200' } });
    expect(onChange).toHaveBeenCalledWith(200);
  });
});