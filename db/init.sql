CREATE DATABASE IF NOT EXISTS mygamesdb;
USE mygamesdb;

CREATE TABLE IF NOT EXISTS jogos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100),
  descricao TEXT,
  ano INT,
  plataforma VARCHAR(50),
  foto_url VARCHAR(500)
);

-- Adicionar coluna foto_url se não existir
ALTER TABLE jogos ADD COLUMN IF NOT EXISTS foto_url VARCHAR(500);