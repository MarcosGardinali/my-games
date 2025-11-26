# 🎮 My Games - Gerenciador de Jogos

Projeto desenvolvido para o **Projeto Final da Matéria de Programação para Dispositivos Móveis**.

Uma aplicação completa para gerenciar sua coleção de jogos, com interface moderna e responsiva.

## 📋 Sobre o Projeto

O **My Games** é um sistema de gerenciamento de jogos que permite aos usuários cadastrar, visualizar, editar e excluir jogos de sua coleção pessoal. O projeto utiliza uma arquitetura moderna com containerização Docker.

## 🏗️ Arquitetura do Sistema

### 🎨 Frontend - Ionic + Angular
- **Runtime:** Node.js 20 Alpine
- **Framework:** Ionic 7 + Angular 17
- **Linguagem:** TypeScript
- **Estilo:** SCSS com tema customizado verde
- **Componentes:** Standalone Components
- **Responsividade:** Grid CSS adaptativa
- **Fontes:** Orbitron (títulos) + Rajdhani (textos)

**Estrutura:**
```
app/my-games/src/
├── app/
│   ├── jogos/           # Página principal
│   ├── services/        # Serviços HTTP
│   └── tabs/           # Navegação
├── environments/        # Configurações
└── global.scss         # Estilos globais
```

### ⚙️ Backend - Node.js + Express
- **Runtime:** Node.js 18 Alpine
- **Framework:** Express.js
- **Database:** MySQL2 driver
- **CORS:** Habilitado para comunicação
- **API:** RESTful com CRUD completo

**Estrutura:**
```
api/src/
├── server.js    # Servidor principal
├── routes.js    # Rotas da API
└── db.js        # Conexão MySQL
```

**Endpoints:**
- `GET /jogos` - Listar jogos
- `GET /jogos/:id` - Buscar jogo por ID
- `POST /jogos` - Criar jogo
- `PUT /jogos/:id` - Atualizar jogo
- `DELETE /jogos/:id` - Excluir jogo

### 🗄️ Banco de Dados - MySQL
- **SGBD:** MySQL 8.0
- **Persistência:** Volume Docker
- **Inicialização:** Script SQL automático

**Tabela `jogos`:**
```sql
CREATE TABLE jogos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100),
  descricao TEXT,
  ano INT,
  plataforma VARCHAR(50),
  foto_url VARCHAR(500)
);
```

### 🐳 Docker - Containerização
- **Orquestração:** Docker Compose
- **Containers:** 3 serviços independentes
- **Rede:** Comunicação interna automática
- **Volumes:** Persistência de dados

**Serviços:**
- `db` - MySQL (porta 3306)
- `api` - Node.js (porta 3000)
- `app` - Ionic (porta 8100)

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Docker
- Docker Compose

### Passos para Execução

1. **Clone ou baixe o projeto**
```bash
cd my-games
```

2. **Execute o Docker Compose**
```bash
docker-compose up --build
```

3. **Aguarde a inicialização** (pode levar alguns minutos na primeira vez)

4. **Acesse as aplicações:**
   - **App:** http://localhost:8100
   - **API:** http://localhost:3000/jogos
   - **Banco:** localhost:3306

### Comandos Úteis

**Parar os containers:**
```bash
docker-compose down
```

**Ver logs:**
```bash
docker-compose logs app    # Logs do frontend
docker-compose logs api    # Logs do backend
docker-compose logs db     # Logs do banco
```

**Reconstruir containers:**
```bash
docker-compose up --build
```

## 🎯 Funcionalidades

### ✨ Interface do Usuário
- **Design Moderno:** Tema verde com efeitos glassmorphism
- **Responsivo:** Adaptável para mobile, tablet e desktop
- **Animações:** Efeitos suaves de hover e transições
- **Validação:** Formulários com validação em tempo real

### 🎮 Gerenciamento de Jogos
- **Cadastro:** Nome, descrição, ano, plataforma e foto
- **Visualização:** Grid de cards com informações
- **Edição:** Modificar dados existentes
- **Exclusão:** Remover jogos com confirmação
- **Fotos:** Suporte a URLs de imagens com validação

### 🔧 Recursos Técnicos
- **Validação de Imagem:** Verifica URLs antes de salvar
- **Fallback:** Ícone de controle quando não há foto
- **Toast Notifications:** Feedback visual das ações
- **Modais:** Interface intuitiva para formulários

## 🛠️ Tecnologias Utilizadas

### Frontend
- Node.js 20 Alpine
- Ionic 7
- Angular 17
- TypeScript
- SCSS
- RxJS

### Backend
- Node.js 18 Alpine
- Express.js
- MySQL2
- CORS

### DevOps
- Docker
- Docker Compose
- MySQL 8.0

### Design
- Google Fonts (Orbitron, Rajdhani)
- CSS Grid
- Flexbox
- Animações CSS

## 📱 Compatibilidade

- **Navegadores:** Chrome, Firefox, Safari, Edge
- **Dispositivos:** Desktop, Tablet, Mobile
- **Sistemas:** Windows, macOS, Linux

## 👨‍💻 Desenvolvimento

Projeto desenvolvido como trabalho final da disciplina de **Programação para Dispositivos Móveis**, demonstrando conhecimentos em:

- Desenvolvimento mobile com Ionic
- Arquitetura de APIs RESTful
- Containerização com Docker
- Integração frontend/backend
- Design responsivo e UX/UI

---

**Desenvolvido com ❤️ para a disciplina de Programação para Dispositivos Móveis**