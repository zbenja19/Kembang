import { createContext, useContext, useState, useEffect } from 'react';
import initialProducts from '../data/products';

const ProductsContext = createContext(null);

export function ProductsProvider({children}){
    const [products, setProducts] = useState(() => {
        try{
            const saved = localStorage.getItem('products');
            return saved ?  JSON.parse(saved) : initialProducts;
        }catch{
            return initialProducts;
        }
    });


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