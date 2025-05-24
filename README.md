# 🚗 Estacionamento VIP - Find Stop

Sistema de gerenciamento de estacionamento VIP, permitindo que usuários reservem vagas via website, com integração ao hardware ESP32 para liberação automática da cancela.

---

## 📌 Funcionalidades

- Login e cadastro de usuários
- Painel com listagem de vagas disponíveis
- Reserva de vaga com horário e data
- Confirmação e cancelamento de reservas
- Encerramento de reserva com geração automática de fatura
- Listagem de faturas com status e pagamento individual ou em lote
- Integração com ESP32 para controle de LEDs, cancela e sinalização

---

## 🧱 Tecnologias Utilizadas

**Backend:**

- PHP
- MySQL
- PDO
- CURL

**Frontend:**

- React.js
- Bootstrap
- Axios
- React Toastify

---

## 📁 Estrutura do Projeto

Estacionamento/
├── backend/
│ ├── app/
│ │ ├── controllers/
│ │ └── models/
│ ├── core/
│ └── public/api/
├── frontend/
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ └── App.jsx
└── bd/
└── banco.sql

## 🛠️ Instalação e Execução

### 📁 1. Backend (PHP + MySQL)

- Requisitos:

  - PHP 8.x
  - XAMPP ou Apache + MySQL

- Passos:

# Clone o repositório

git clone https://github.com/MikaelLorran/Estacionamento-VIP.git

# Acesse o diretório do backend

cd estacionamento-vip

# Importe o arquivo `banco.sql` no MySQL

# Inicie o Apache e o MySQL no XAMPP

### ⚙️ 2. Frontend (React)

# Acesse o diretório do frontend

cd Estacionamento/frontend

# Instale as dependências

npm install

# Rode o projeto

npm run dev

### 📦 3. Banco de Dados

# Importe o arquivo SQL com a estrutura das tabelas.

# Crie um arquivo .env dentro da pasta config/ com os seguintes dados:

DB_HOST=localhost
DB_NAME=estacionamento_vip
DB_USER=root
DB_PASS=

👨‍💻 Autores

- Mikael Lorran de Carvalho
- Matheus de Barros
- Giovanne
- Felipe
- João Eduardo

📝 Licença
Este projeto está sob a licença MIT.
