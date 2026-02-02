require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const routes = require('./src/routes');
const swaggerDocs = require('./swagger');

// cors
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options(/.*/, cors());

// Middleware
app.use(express.json());

// Connect to MongoDB using env
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => {
  console.error('Failed to connect to MongoDB:', err.message);
  process.exit(1);
});

// Routes
app.use('/', routes);

const PORT = process.env.PORT || 3000;

swaggerDocs(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
