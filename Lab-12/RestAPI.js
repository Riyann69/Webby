const express = require('express');
const app = express();
app.use(express.json());

// In-memory data store
let products = [
  { id: 1, name: 'Laptop',  price: 75000 },
  { id: 2, name: 'Phone',   price: 25000 },
  { id: 3, name: 'Tablet',  price: 35000 }
];

// GET all products
app.get('/products', (req, res) => {
  res.json(products);
});

// GET single product
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST create product
app.post('/products', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price
  };
  products.push(newProduct);
  res.status(201).json({ message: 'Product created', product: newProduct });
});

// PUT update product
app.put('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  product.name  = req.body.name  || product.name;
  product.price = req.body.price || product.price;
  res.json({ message: 'Product updated', product });
});

// DELETE product
app.delete('/products/:id', (req, res) => {
  products = products.filter(p => p.id !== parseInt(req.params.id));
  res.json({ message: 'Product deleted' });
});

app.listen(4000, () => console.log('REST API running at http://localhost:4000'));

// Test in browser - http://localhost:4000/products