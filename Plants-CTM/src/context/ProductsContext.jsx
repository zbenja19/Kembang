import { createContext, useContext, useState, useEffect } from 'react';
import initialProducts from '../data/products';

const ProductsContext = createContext(null);

const cargarProductos = () => {
  try {
    const saved = localStorage.getItem('products');
    if (!saved) return initialProducts;

    const guardados = JSON.parse(saved);
    return guardados.map((p) => {
      const base = initialProducts.find((i) => i.id === p.id);
      return base ? { ...base, ...p } : p;
    });
  } catch {
    return initialProducts;
  }
};

export function ProductsProvider({ children }) {

  const [products, setProducts] = useState(cargarProductos);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product) =>
    setProducts((prev) => [...prev, { ...product, id: Date.now() }]);

  const updateProduct = (id, data) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));

  const deleteProduct = (id) =>
    setProducts((prev) => prev.filter((p) => p.id !== id));

  const resetProducts = () => setProducts(initialProducts);

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, resetProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);