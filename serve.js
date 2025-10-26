const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const recetasRoutes = require('./routes/recetas'); // Importa las rutas

const app = express();
app.use(cors());
app.use(bodyParser.json());

// rutas api
app.use('/api/recetas', recetasRoutes);

// Rutas web
app.get('/', (req, res) => {
  res.send('API web ');
});

// Puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


