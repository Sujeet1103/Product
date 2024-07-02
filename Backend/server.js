const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
});

const Customer = mongoose.model('Customer', customerSchema);

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  category: String,
});

const Product = mongoose.model('Product', productSchema);

// Routes

app.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.find().exec();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers' });
  }
});

app.post('/customers', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Error creating customer' });
  }
});

app.get('/customers/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findById(id).exec();
    if (!customer) {
      res.status(404).json({ message: 'Customer not found' });
    } else {
      res.json(customer);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customer' });
  }
});

app.put('/customers/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findByIdAndUpdate(id, req.body, { new: true });
    if (!customer) {
      res.status(404).json({ message: 'Customer not found' });
    } else {
      res.json(customer);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating customer' });
  }
});

app.delete('/customers/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Customer.findByIdAndRemove(id);
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting customer' });
  }
});

// Products

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find().exec();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

app.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).exec();
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndRemove(id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));