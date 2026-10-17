import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useProducts } from '../context/ProductsContext';
import SearchBar from '../components/molecules/SearchBar';
import CategoryFilter from '../components/molecules/CategoryFilter';
import PriceFilter from '../components/molecules/PriceFilter';
import ProductGrid from '../components/organisms/ProductGrid.jsx';

function Products({ onAgregar }) {
  const { products } = useProducts();

  // Aplica el descuento: el precio final queda en "price" y el original en "precioOriginal"
  const productosConPrecio = products.map((p) =>
    p.descuento > 0
      ? {
          ...p,
          precioOriginal: p.price,
          price: Math.round(p.price * (1 - p.descuento / 100)),
        }
      : p
  );

  const precios = productosConPrecio.map((p) => p.price);
  const minPrice = Math.floor(Math.min(...precios));
  const maxPrice = Math.ceil(Math.max(...precios));

  const [precioMax, setPrecioMax] = useState(maxPrice);
  const [busqueda, setBusqueda] = useState('');
  const [seleccionadas, setSeleccionadas] = useState([]);

  const categorias = [...new Set(productosConPrecio.map((product) => product.categoria))];

  const toggleCategoria = (cat) => {
    setSeleccionadas((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filtrados = productosConPrecio.filter((product) => {
    const coincideNombre = product.name.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria =
      seleccionadas.length === 0 || seleccionadas.includes(product.categoria);
    const coincidePrecio = product.price <= precioMax;
    return coincideNombre && coincideCategoria && coincidePrecio;
  });

  return (
    <Container className="my-5">
      <h1>Productos</h1>
      <SearchBar value={busqueda} onChange={setBusqueda} />
      <Row>
        <Col md={3}>
          <div className="filters-card">
            <PriceFilter
              min={minPrice}
              max={maxPrice}
              value={precioMax}
              onChange={setPrecioMax}
            />
            <hr className="my-4" />
            <CategoryFilter
              categorias={categorias}
              seleccionadas={seleccionadas}
              onToggle={toggleCategoria}
            />
          </div>
        </Col>
        <Col md={9}>
          <ProductGrid products={filtrados} onAgregar={onAgregar} />
        </Col>
      </Row>
    </Container>
  );
}

export default Products;
