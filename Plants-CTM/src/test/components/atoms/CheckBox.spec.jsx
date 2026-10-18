import { render, screen, fireEvent } from '@testing-library/react';
import CheckBox from '../../../components/atoms/CheckBox';

describe('CheckBox (átomo)', () => {
  it('muestra el texto del label', () => {
    render(<CheckBox label="Plantas" checked={false} onChange={() => {}} />);
    expect(screen.getByText('Plantas')).toBeTruthy();
  });

  it('aparece marcado cuando checked es true', () => {
    render(<CheckBox label="Plantas" checked={true} onChange={() => {}} />);
    expect(screen.getByRole('checkbox').checked).toBe(true);
  });

  it('llama a onChange al hacer click', () => {
    const onChange = jasmine.createSpy('onChange');
    render(<CheckBox label="Plantas" checked={false} onChange={onChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalled();
  });
});
