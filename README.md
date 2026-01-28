# 📦 Sistema de Gerenciamento de Switches

Sistema web para controle de estoque de switches de rede, com **autenticação de usuários**, **cadastro**, **edição**, **exclusão** e **listagem de equipamentos**.

Projeto desenvolvido como **Projeto de Integração / DevOps**, utilizando **React (Vite)** no frontend, **Flask** no backend e **MySQL/MariaDB** como banco de dados.

---

## 🛠️ Tecnologias Utilizadas

### Frontend

* React
* Vite
* React Router DOM
* Lucide Icons
* Fetch API

### Backend

* Python 3.10+
* Flask
* Flask-CORS
* Werkzeug (hash de senhas)
* mysql-connector-python

### Banco de Dados

* MySQL ou MariaDB

---

## 📁 Estrutura do Projeto

```text
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
│   │   │   ├── Login/
│   │   │   └── SwitchTable/
│   │   ├── pages/
│   │   │   ├── Inventory.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── global.css
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

* Git
* Node.js **18 ou superior**
* Python **3.10 ou superior**
* MySQL ou MariaDB

> 💡 O projeto foi testado e funciona tanto em **Windows** quanto em **Linux**.

---

## 🗄️ Configuração do Banco de Dados

### 1️⃣ Criar o banco de dados

```sql
CREATE DATABASE estoque_switches;
```

### 2️⃣ Criar as tabelas

```sql
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
    serial VARCHAR(100) NOT NULL UNIQUE,
    status VARCHAR(50),
    localizacao VARCHAR(100) DEFAULT 'estoque',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
### 5️⃣ Criação do usuário do projeto (obrigatório)
```
CREATE USER 'estoque_user'@'localhost' IDENTIFIED BY 'estoque123';

```
6️⃣ Concessão de permissões
```
GRANT ALL PRIVILEGES ON estoque_switches.* TO 'estoque_user'@'localhost';
FLUSH PRIVILEGES;

```
✔️ Esse usuário será utilizado exclusivamente pelo backend da aplicação.
``

### 7️⃣ Ajustar credenciais do banco

Edite o arquivo:

```text
backend/app.py
```

```python
DB_CONFIG = {
    "host": "localhost",
    "user": "estoque_user",
    "password": "estoque123",
    "database": "estoque_switches"
}
```

---

## 🚀 Como Executar o Projeto

### 🔹 Backend (Flask)

cd backend

# criar ambiente virtual
python -m venv venv

# ativar ambiente virtual
# Linux / macOS
source venv/bin/activate

# Windows
venv\Scripts\activate

⚠️ Certifique-se de que o VS Code está usando o interpretador do venv.

# atualizar pip
python -m pip install --upgrade pip

# instalar dependências REAIS da API
pip install flask flask-cors mysql-connector-python

# rodar a API
python app.py


📍 A API estará disponível em:

```
http://localhost:5000
```

---

### 🔹 Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

📍 A aplicação estará disponível em:

```
http://localhost:5173
```

---

## 🔐 Funcionalidades Implementadas

### Autenticação

* Cadastro de usuários
* Login com validação
* Senhas armazenadas com hash
* Controle de sessão via localStorage

### Gestão de Switches

* Listagem de switches
* Cadastro de novos switches
* Edição de switches existentes
* Exclusão de switches
* Status visual (Ativo / Inativo / Em Manutenção)

---

## 🔄 Integração Frontend + Backend

A comunicação é feita via **API REST**, utilizando **fetch**, com os seguintes endpoints principais:

* `POST /register` – Cadastro de usuário
* `POST /login` – Login de usuário
* `GET /switches` – Listagem de switches
* `POST /switches` – Cadastro de switch
* `PUT /switches/:id` – Edição de switch
* `DELETE /switches/:id` – Exclusão de switch

---

## 📌 Observações Importantes

* Projeto preparado para execução local em qualquer sistema operacional
* Estrutura clara para avaliação técnica
* Ideal para demonstração de **Frontend + Backend + Banco de Dados**
* Pode ser facilmente adaptado para **Docker** ou **CI/CD**

---

## 👤 Autor

**Isaque Ramos**

Projeto desenvolvido para fins educacionais e avaliação técnica.
