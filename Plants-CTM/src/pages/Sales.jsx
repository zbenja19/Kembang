import { Container } from 'react-bootstrap';
import { useProducts } from '../context/ProductsContext';
import ProductGrid from '../components/organisms/ProductGrid';

export default function Sales({ onAgregar }) {
  const { products } = useProducts();
  const ofertas = products
    .filter((p) => p.descuento > 0)
    .map((p) => ({
      ...p,
      precioOriginal: p.price,
      price: Math.round(p.price * (1 - p.descuento / 100)),
    }));

  return (
    <Container className="my-5">
      <h1>Ofertas</h1>
      {ofertas.length === 0 && <p>No hay ofertas por ahora</p>}
      <ProductGrid products={ofertas} lg={4} onAgregar={onAgregar} />
    </Container>
  );
}