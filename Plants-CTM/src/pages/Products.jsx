import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import products from '../data/products';
import ProductCard from '../components/organisms/ProductCard';
import SearchBar from '../components/molecules/SearchBar';
import CategoryFilter from '../components/molecules/CategoryFilter';
import PriceFilter from '../components/molecules/PriceFilter';

<<<<<<< HEAD
function Products() {
  const precios = products.map((p) => p.price);
=======
function Products({ onAgregar }) {
  const { products } = useProducts();

  
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
>>>>>>> e447328 (registrar y product detail)
  const minPrice = Math.floor(Math.min(...precios));
  const maxPrice = Math.ceil(Math.max(...precios));
  

  const [preciMax, setPrecioMax] = useState(maxPrice);

  const [busqueda, setBusqueda] = useState('');
  const [seleccionadas, setSeleccionadas] = useState([]);

<<<<<<< HEAD
  const categorias =[ ...new Set(products.map((product) => product.categoria))];
=======
  const categorias = [...new Set(productosConPrecio.map((product) => product.categoria))];
>>>>>>> e447328 (registrar y product detail)

  const toggleCategoria = (cat) => {
    setSeleccionadas((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

<<<<<<< HEAD

  const filtrados = products.filter((product) =>{
    const coincideNombre=product.name
=======
  const filtrados = productosConPrecio.filter((product) => {
    const coincideNombre = product.name
>>>>>>> e447328 (registrar y product detail)
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideCategoria =
      seleccionadas.length === 0 || seleccionadas.includes(product.categoria);
    const coincidePrecio = product.price <= preciMax;  
    return coincideNombre && coincideCategoria && coincidePrecio;

  }
     
   );

 return (
   <Container className="my-5">
     <h1>Productos</h1>
     <SearchBar value={busqueda} onChange={setBusqueda}/>
     <Row>
        <Col md={3}>
          <PriceFilter
            min={minPrice}
            max={maxPrice}
            value={preciMax}
            onChange={setPrecioMax}
          />
          <CategoryFilter
            categorias={categorias}
            seleccionadas={seleccionadas}
            onToggle={toggleCategoria}
          />
        </Col>
        <Col md={9}>
          <Row>
            {filtrados.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))} 
          </Row>
        </Col>
      </Row>
   </Container>
 );
}


export default Products;

