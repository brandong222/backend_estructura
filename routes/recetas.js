const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataPath = path.join(__dirname, '../data/recetas.json');

// Obtener todas las recetas
router.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  res.json(data);
});

// Obtener una receta por ID
router.get('/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const receta = data.find(r => r.id === parseInt(req.params.id));
  if (!receta) return res.status(404).json({ message: 'Receta no encontrada' });
  res.json(receta);
});

//Crear una nueva receta
router.post('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const nueva = {
    id: data.length ? data[data.length - 1].id + 1 : 1,
    titulo: req.body.titulo,
    ingredientes: req.body.ingredientes,
    pasos: req.body.pasos
  };
  data.push(nueva);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.status(201).json(nueva);
});

// Actualizar una receta existente
router.put('/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const index = data.findIndex(r => r.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Receta no encontrada' });

  data[index] = { ...data[index], ...req.body };
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.json(data[index]);
});

// Eliminar una receta
router.delete('/:id', (req, res) => {
  let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const receta = data.find(r => r.id === parseInt(req.params.id));
  if (!receta) return res.status(404).json({ message: 'Receta no encontrada' });

  data = data.filter(r => r.id !== parseInt(req.params.id));
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.json({ message: 'Receta eliminada correctamente' });
});

module.exports = router;


