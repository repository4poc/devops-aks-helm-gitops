const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Simple health endpoint for Kubernetes
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
  });
});

app.get('/ready', (req, res) => {
  // Connect to database
  res.status(200).json({
    status: 'UP',
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Application running on port ${PORT}`);
});
