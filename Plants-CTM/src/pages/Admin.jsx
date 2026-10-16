import { useState } from 'react';
import { Container, Table, Form, Button, Row, Col, Image } from 'react-bootstrap';
import { useProducts } from '../context/ProductsContext';

const EMPTY = {
  name: '',
  price: '',
  stock: '',
  descuento: 0,
  categoria: '',
  image: '',
  description: '',
};

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct, resetProducts } = useProducts();
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock) || 0,
      descuento: Number(form.descuento) || 0,
    };
    if (editingId) {
      updateProduct(editingId, data);
    } else {
      addProduct(data);
    }
    setForm(EMPTY);
    setEditingId(null);
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setForm({ ...EMPTY, ...product });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY);
  };

  const handleDelete = (product) => {
    if (window.confirm(`¿Eliminar "${product.name}"?`)) {
      deleteProduct(product.id);
      if (editingId === product.id) cancelEdit();
    }
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4">Panel de administración</h1>

      <h5>{editingId ? 'Editar producto' : 'Nuevo producto'}</h5>
      <Form onSubmit={handleSubmit} className="mb-5">
        <Row className="g-3">
          <Col md={4}>
            <Form.Control
              name="name"
              placeholder="Nombre"
              value={form.name}
              onChange={handleChange}
              required
            />
          </Col>
          <Col md={2}>
            <Form.Control
              name="price"
              type="number"
              min="0"
              placeholder="Precio"
              value={form.price}
              onChange={handleChange}
              required
            />
          </Col>
          <Col md={3}>
            <Form.Control
              name="stock"
              type="number"
              min="0"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              required
            />
          </Col>
          <Col md={3}>
            <Form.Control
              name="descuento"
              type="number"
              min="0"
              max="100"
              placeholder="Descuento %"
              value={form.descuento}
              onChange={handleChange}
            />
          </Col>
          <Col md={4}>
            <Form.Select
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              required
            >
              <option value="">Categoría</option>
              <option value="Plantas">Plantas</option>
              <option value="Maceteros">Maceteros</option>
              <option value="Cuidado vegetal">Cuidado vegetal</option>
            </Form.Select>
          </Col>
          <Col md={8}>
            <Form.Control
              name="image"
              placeholder="URL de la imagen"
              value={form.image}
              onChange={handleChange}
              required
            />
          </Col>
          <Col xs={12}>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Descripción"
              value={form.description}
              onChange={handleChange}
              required
            />
          </Col>
          <Col xs={12}>
            <Button type="submit" className="me-2">
              {editingId ? 'Guardar cambios' : 'Agregar producto'}
            </Button>
            {editingId && (
              <Button variant="outline-secondary" onClick={cancelEdit}>
                Cancelar
              </Button>
            )}
          </Col>
        </Row>
      </Form>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Productos ({products.length})</h5>
        <Button
          size="sm"
          variant="outline-secondary"
          onClick={() =>
            window.confirm('¿Volver a los productos originales?') && resetProducts()
          }
        >
          Restaurar originales
        </Button>
      </div>

      <Table striped hover responsive className="align-middle">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Desc.</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>
                <Image src={p.image} alt="" width={48} height={48} style={{ objectFit: 'cover' }} rounded />
              </td>
              <td>{p.name}</td>
              <td>{p.categoria}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td>{p.descuento}%</td>
              <td className="text-end">
                <Button size="sm" variant="outline-primary" className="me-2" onClick={() => startEdit(p)}>
                  Editar
                </Button>
                <Button size="sm" variant="outline-danger" onClick={() => handleDelete(p)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}