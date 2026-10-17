import { Routes, Route } from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useState } from 'react';
import NavBar from './components/organisms/Navbar';
import Footer from './components/organisms/Footer.jsx';
import CartModal from './components/organisms/CartModal.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products';
import Sales from './pages/Sales';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import ShoppingCart from './pages/ShoppingCart.jsx';
import Checkout from './pages/Checkout.jsx';
import Admin from './pages/Admin.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import './styles/global.css';

function App() {
  const [productoAgregado, setProductoAgregado] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [aviso, setAviso] = useState(null);

  const agregarAlCarrito = (product, cantidad = 1) => {
    const stock = Number(product.stock ?? 0);
    const existe = carrito.find((item) => item.id === product.id);
    const enCarrito = existe ? existe.cantidad : 0;
    const disponible = stock - enCarrito;

    if (disponible <= 0) {
      setAviso(`No queda stock disponible de ${product.name} (máximo ${stock}).`);
      return;
    }

    const aAgregar = Math.min(cantidad, disponible);
    if (aAgregar < cantidad) {
      setAviso(`Solo quedaban ${disponible} unidades disponibles; se agregaron ${aAgregar}.`);
    }

    setCarrito((prev) => {
      const yaEsta = prev.find((item) => item.id === product.id);
      if (yaEsta) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + aAgregar }
            : item
        );
      }
      return [...prev, { ...product, cantidad: aAgregar }];
    });
    setProductoAgregado(product);
  };

  const cambiarCantidad = (id, cambio) => {
    const item = carrito.find((i) => i.id === id);
    if (item && cambio > 0 && item.cantidad + cambio > Number(item.stock ?? 0)) {
      setAviso(`Stock máximo de ${item.name}: ${item.stock} unidades.`);
      return;
    }

    setCarrito((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, cantidad: i.cantidad + cambio } : i))
        .filter((i) => i.cantidad > 0)
    );
  };

  const quitarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };
  
  const vaciarCarrito = () => setCarrito([]);

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
          <Route
            path='/admin'
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
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
                    <Route
            path='/checkout'
            element={<Checkout carrito={carrito} onVaciar={vaciarCarrito} />}
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

      <ToastContainer position="top-end" containerPosition="fixed" className="p-3" style={{ zIndex: 1060 }}>
        <Toast show={aviso !== null} onClose={() => setAviso(null)} delay={3000} autohide bg="warning">
          <Toast.Header>
            <strong className="me-auto">🌿 Kembang</strong>
          </Toast.Header>
          <Toast.Body>{aviso}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default App;
