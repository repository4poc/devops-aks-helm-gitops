const express = require('express');

const app = express();

const PORT = 3001;

// Middleware
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    message: 'Node.js backend is healthy',
  });
});

// Welcome API
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to Node.js Backend API',
    version: '1.0.0',
  });
});

// Users API
app.get('/api/users', (req, res) => {
  res.json({
    users: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      },
      {
        id: 2,
        name: 'Jane Doe',
        email: 'jane@example.com',
      },
      {
        id: 3,
        name: 'Alice Smith',
        email: 'alice@example.com',
      },
    ],
  });
});

// Products API
app.get('/api/products', (req, res) => {
  res.json({
    products: [
      {
        id: 1,
        name: 'Laptop',
        price: 1200,
      },
      {
        id: 2,
        name: 'Mobile Phone',
        price: 800,
      },
      {
        id: 3,
        name: 'Headphones',
        price: 150,
      },
    ],
  });
});

// POST example
app.post('/api/message', (req, res) => {
  res.status(201).json({
    message: 'Message received successfully',
    data: req.body,
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
