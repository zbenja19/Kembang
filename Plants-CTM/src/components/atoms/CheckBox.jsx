import {Form} from 'react-bootstrap';
import '../../styles/atoms/CheckBox.css';

export default function CheckBox({label, checked, onChange}) {
  return (
    <Form.Check
      type="checkbox"
      id={'cat-${label}'}
      label={label}
      checked={checked}
      onChange={onChange}
      className="mb-2"
    />
  );
}