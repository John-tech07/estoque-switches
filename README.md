📦 Sistema de Gerenciamento de Switches

Sistema web para controle de estoque de switches de rede, com autenticação de usuários, cadastro, edição, exclusão e listagem de equipamentos.

Projeto desenvolvido como Projeto de Integração / DevOps, utilizando React (Vite) no frontend, Flask no backend e MySQL/MariaDB como banco de dados.

🛠️ Tecnologias Utilizadas
Frontend

React

Vite

React Router DOM

Lucide Icons

Fetch API

Backend

Python 3

Flask

Flask-CORS

Werkzeug (hash de senhas)

Banco de Dados

MySQL ou MariaDB

📁 Estrutura do Projeto
estoque-switches/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddSwitch/
│   │   │   ├── login/
│   │   │   └── SwitchTable/
│   │   │
│   │   ├── pages/
│   │   │   ├── Inventory.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── global.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md

⚙️ Pré-requisitos

Antes de iniciar o projeto, certifique-se de ter instalado:

Git

Node.js (versão 18 ou superior)

Python 3.10+

MySQL ou MariaDB

🗄️ Configuração do Banco de Dados

Crie o banco de dados:

CREATE DATABASE estoque_switches;


Crie as tabelas:

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE switches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  modelo VARCHAR(100) NOT NULL,
  marca VARCHAR(100) NOT NULL,
  numero_portas INT NOT NULL,
  serial VARCHAR(100) NOT NULL,
  status VARCHAR(50),
  localizacao VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


Ajuste as credenciais do banco no arquivo:

backend/app.py

DB_CONFIG = {
    "host": "localhost",
    "user": "estoque_user",
    "password": "estoque123",
    "database": "estoque_switches"
}

🚀 Como Executar o Projeto
🔹 Backend (Flask)
cd backend
python -m venv venv
source venv/bin/activate  # Linux
venv\Scripts\activate     # Windows

pip install -r requirements.txt
python app.py


A API ficará disponível em:

http://localhost:5000

🔹 Frontend (React + Vite)
cd frontend
npm install
npm run dev


A aplicação ficará disponível em:

http://localhost:5173

🔐 Funcionalidades Implementadas
Autenticação

Cadastro de usuários

Login com validação

Senhas armazenadas com hash

Controle de sessão via localStorage

Gestão de Switches

Listagem de switches

Cadastro de novos switches

Edição de switches existentes

Exclusão de switches

Status visual (Ativo / Inativo / Em Manutenção)

🔄 Integração Frontend + Backend

A comunicação é feita via API REST, utilizando fetch, com os seguintes endpoints principais:

POST /register – Cadastro de usuário

POST /login – Login de usuário

GET /switches – Listagem de switches

POST /switches – Cadastro de switch

PUT /switches/:id – Edição de switch

DELETE /switches/:id – Exclusão de switch

📌 Observações Importantes

O projeto foi estruturado para rodar localmente em qualquer máquina

O README contém todos os passos necessários para validação técnica

Ideal para demonstração de integração Frontend + Backend + Banco de Dados
