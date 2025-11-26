const express = require('express');
const db = require('./db');
const router = express.Router();

// GET /jogos - Listar todos os jogos
router.get('/jogos', (req, res) => {
  db.query('SELECT * FROM jogos', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET /jogos/:id - Buscar jogo por ID
router.get('/jogos/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM jogos WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Jogo não encontrado' });
    res.json(results[0]);
  });
});

// POST /jogos - Criar novo jogo
router.post('/jogos', (req, res) => {
  const { nome, descricao, ano, plataforma, foto_url } = req.body;
  db.query('INSERT INTO jogos (nome, descricao, ano, plataforma, foto_url) VALUES (?, ?, ?, ?, ?)', 
    [nome, descricao, ano, plataforma, foto_url], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: results.insertId, nome, descricao, ano, plataforma, foto_url });
  });
});

// PUT /jogos/:id - Atualizar jogo
router.put('/jogos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, descricao, ano, plataforma, foto_url } = req.body;
  db.query('UPDATE jogos SET nome = ?, descricao = ?, ano = ?, plataforma = ?, foto_url = ? WHERE id = ?',
    [nome, descricao, ano, plataforma, foto_url, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: 'Jogo não encontrado' });
    res.json({ id, nome, descricao, ano, plataforma, foto_url });
  });
});

// DELETE /jogos/:id - Deletar jogo
router.delete('/jogos/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM jogos WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: 'Jogo não encontrado' });
    res.json({ message: 'Jogo deletado com sucesso' });
  });
});

module.exports = router;