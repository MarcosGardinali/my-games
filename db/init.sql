CREATE DATABASE IF NOT EXISTS mygamesdb;
USE mygamesdb;

CREATE TABLE IF NOT EXISTS jogos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100),
  descricao TEXT,
  ano INT,
  plataforma VARCHAR(50),
  foto_url VARCHAR(500),
  status ENUM('possuo', 'desejo') DEFAULT 'possuo'
);

-- Adicionar colunas se não existirem
ALTER TABLE jogos ADD COLUMN IF NOT EXISTS foto_url VARCHAR(500);
ALTER TABLE jogos ADD COLUMN IF NOT EXISTS status ENUM('possuo', 'desejo') DEFAULT 'possuo';