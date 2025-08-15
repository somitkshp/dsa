const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const itrRoutes = require('./routes/itr');
app.use('/api/auth', authRoutes);
app.use('/api/itr', itrRoutes);

app.get('/', (req, res) => {
  res.send('Hello World from TaxGenius Backend!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
