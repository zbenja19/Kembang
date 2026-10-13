import { Routes, Route } from 'react-router-dom';
import NavBar from './components/organisms/Navbar';
import Home from './pages/Home.jsx';
import Products from './pages/Products';
import Sales from './pages/Sales';
import './styles/global.css';
import Footer from "./components/organisms/Footer.jsx"
import { useState } from "react"
import ShoppingCart from "./pages/ShoppingCart.jsx"
import Login from './pages/Login.jsx'
import CartModal from './components/organisms/CartModal.jsx';
import ProductDetail from './pages/ProductDetail.jsx';

function App() {
  const [productoAgregado, setProductoAgregado] = useState(null);
  const [carrito, setCarrito] = useState([]);

 const agregarAlCarrito = (product, cantidad = 1) => {
  setCarrito((prev) => {
    const existe = prev.find((item) => item.id === product.id);
    if (existe) {
      return prev.map((item) =>
        item.id === product.id
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      );
    }
    return [...prev, { ...product, cantidad }];
  });
  setProductoAgregado(product);
};

  const cambiarCantidad = (id, cambio) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad + cambio } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const quitarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <div className='d-flex flex-column min-vh-100'>
      <NavBar cantidad={totalItems} />
      <main className='flex-grow-1'>
       <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/products' element={<Products onAgregar={agregarAlCarrito} />} />
  <Route path='/products/:id' element={<ProductDetail onAgregar={agregarAlCarrito} />} />
  <Route path='/sales' element={<Sales onAgregar={agregarAlCarrito} />} />
  <Route path='/login' element={<Login />} />
  <Route
    path='/cart'
    element={
      <ShoppingCart
        carrito={carrito}
        onCambiarCantidad={cambiarCantidad}
        onQuitar={quitarDelCarrito}
      />
    }
  />
</Routes>
      </main>
      <Footer />
      <CartModal
        product={productoAgregado}
        carrito={carrito}
        onCambiarCantidad={cambiarCantidad}
        onClose={() => setProductoAgregado(null)}
      />
    </div>
  );
}

export default App;