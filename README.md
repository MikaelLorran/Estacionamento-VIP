# 🚗 Estacionamento VIP

Sistema de gerenciamento de estacionamento VIP, permitindo que usuários reservem vagas via website, com integração ao hardware ESP32 para liberação automática da cancela.

---

## 📌 Funcionalidades

- Autenticação de usuários (login)
- Reserva de vagas via sistema web
- Liberação da cancela através de ESP32
- Painel administrativo (em breve)

---

## 🧱 Tecnologias Utilizadas

**Backend:**

- PHP (com padrão MVC)
- MySQL (banco de dados)
- PDO (conexão segura)

**Frontend:**

- React (interface do usuário)

**Outros:**

- ESP32 (controle físico da cancela)
- Git e GitHub para versionamento

---

## 🛠️ Instalação e Execução

### 📁 1. Clone o repositório

git clone https://github.com/MikaelLorran/Estacionamento-VIP.git
cd estacionamento-vip

### ⚙️ 2. Configure o ambiente

- Crie um arquivo .env dentro da pasta config/ com os seguintes dados:

  DB_HOST=localhost
  DB_NAME=estacionamento_vip
  DB_USER=root
  DB_PASS=

### 🧰 3. Configure o banco de dados

- Importe o arquivo SQL com a estrutura das tabelas (ou use o script fornecido).

### ▶️ 4. Inicie o servidor local

- Utilize o XAMPP ou outro servidor PHP apontando para a pasta /public.

📂 Estrutura de Pastas
estacionamento-vip/
├── app/
│ ├── controllers/
│ ├── core/
│ └── models/
├── config/
│ └── .env
├── public/
│ └── index.php
├── .gitignore
└── README.md

🚧 Em desenvolvimento

- Validação de reservas em tempo real
- Tela administrativa para controle de vagas
- Histórico de reservas por usuário

👨‍💻 Autores

- Mikael Lorran de Carvalho
- Matheus de Barros
- Giovanne
- Felipe
- João Eduardo

📝 Licença
Este projeto está sob a licença MIT.
