import {useState} from 'react'
import {Container, Form, Button, Alert, FormLabel} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(email, password)){
            navigate('/');
        }else{
            setError('Correo o contraseñas incorrectos!')
        }

    };

return (
        <Container className='my-5' style={{maxWidth: 420}}>
            <h1 className='mb-4'>Iniciar Sesion</h1>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3'controlId='email'>
                    <Form.Label>Correo</Form.Label>
                    <Form.Control
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='password'>
                    <Form.Control
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    requiered
                    />
                </Form.Group>
                <Button type="submit" className="w-100">Entrar</Button>
            </Form>
        </Container>
    );
}

