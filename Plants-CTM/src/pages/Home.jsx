import { Container } from 'react-bootstrap';
import Hero from '../components/organisms/Hero.jsx';

function Home() {
  return (
    <>
      <Hero />
      <section className='py-5'>
      <Container className="my-5">
        <h1>¿Quienes Somos?</h1>
        <h4>Kembang es Tienda de plantas de exterior e interior,<br/>traemos todo el equipamiento para tus plantas en maceteros y cuidado vegetal,
        <br/>Queremos que tu hogar se vea mas verde con nuestras plantas que dan vida.
        </h4>
      </Container>
      </section>
    </>
  );
}

export default Home;
