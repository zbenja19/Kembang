import { Form} from 'react-bootstrap';
import '../../styles/molecules/PriceFilter.css'

export default function PriceFilter({ min , max, value, onChange }) {
return ( 
    <div className="mb-4">
        <h6 className="fw-bold mb-3">precio</h6>
        <Form.Range
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
        />
        <div className="d-flex justify-content-between">
            <span>${min.toFixed(0)}</span>
            <span>Hasta ${value}</span>
        </div>
    </div>
);
}