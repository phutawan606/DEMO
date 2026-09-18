const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const equipmentRoutes = require('./routes/equipments.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/equipments', equipmentRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});