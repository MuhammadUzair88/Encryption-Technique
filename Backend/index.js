const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // ⬅️ Import CORS middleware
const userRoutes = require('./UserRoute.js');

const app = express();

// Enable CORS with default config (allows all origins)
app.use(cors());

// OR: Enable CORS with specific origin (recommended in production)
// app.use(cors({ origin: 'http://localhost:3000' }));

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://MuhammadUzair:muhammad@cluster0.ynhxjam.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Basic route to check server status
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Use the user routes for handling user-related requests
app.use('/api', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
