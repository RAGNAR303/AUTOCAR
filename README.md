# AutoCar 🚘

Uma aplicação web simulada de loja de carros, com sistema de login, cadastro de carros e gerenciamento de informações de usuário, construída para estudo e prática com React, Context API e integração com Firebase.

## 🔎 Sobre o Projeto

O **AutoCar** é uma interface de concessionária virtual que permite criar e gerenciar um catálogo de carros, além de autenticar usuários por meio de login. Ele foi idealizado como um projeto de estudo para treinar habilidades essenciais de desenvolvimento frontend com React e TypeScript, incluindo o uso de **Context API** para gerenciamento global de estado e **FireStore (Firebase)** para persistência de dados em nuvem. 

Este projeto resolve o problema de aprendizagem de mecanismos fundamentais de aplicações reais, como controle de sessão, rotas protegidas, cadastro dinâmico de itens (carros) e armazenamento persistente, oferecendo uma base robusta para evoluir a uma aplicação mais completa no futuro.

---

## 🚀 Funcionalidades Principais

- 🔐 **Login de usuário** – Controle de acesso básico a página.
- 🔐 **Cadastro de usuário** – Criação de acesso básico a página.    
- 🚗 **Cadastro de carros** – Inserir novos carros na loja virtual.  
- 📊 **Listagem de veículos** – Visualizar carros cadastrados.  
- 🔄 **Gerenciamento de estado global** – Compartilhamento de informações de usuário e sessão com Context API.  
- ☁️ **Banco de dados em nuvem** – Persistência de dados utilizando Firebase (Firestore).

---

## 🧰 Tecnologias Utilizadas

### 🔹 **React**
Biblioteca JavaScript para construção de interfaces de usuário com componentes reutilizáveis.

### 🔹 **TypeScript**
Superconjunto de JavaScript com tipagem estática, utilizada para maior segurança e manutenção do código. A grande maioria do projeto é escrita em TypeScript.

### 🔹 **Vite**
Ferramenta moderna de build e ambiente de desenvolvimento rápido, utilizada para configurar e rodar o frontend do projeto.

### 🔹 **Firebase (Firestore)**
Banco de dados NoSQL em nuvem utilizado para armazenar informações dos carros e usuários, provendo persistência e escalabilidade.

### 🔹 **Context API (React)**
Mecanismo de gerenciamento global de estado do React que facilita compartilhar dados entre componentes sem passar props manualmente.

### 🔹 **ESLint**
Ferramenta de linting para manter o padrão de código e identificar problemas durante o desenvolvimento.

### 🔹 **HTML & CSS**
Linguagens básicas de marcação e estilização usadas para estruturar e embelezar a interface web.

---

## 📁 Estrutura do Projeto

```bash
/
├── public/ # Arquivos públicos (HTML principal, ícones)
├── src/ # Código-fonte da aplicação React
│ ├── components/ # Componentes reutilizáveis da UI
│ ├── pages/ # Páginas da aplicação
│ ├── context/ # Providers e Context API
│ ├── services/ # Integração com Firebase
│ └── styles/ # Estilos globais / modulares
├── .env.example # Exemplo de variáveis de ambiente
├── index.html # Documento HTML principal
├── package.json # Dependências e scripts
├── tsconfig.json / .json.app # Configurações do TypeScript
├── vite.config.ts # Configuração do Vite
└── README.md # Documentação do projeto

````
## 🚀 Como Executar Localmente

1. **Clone o repositório**
   ```bash
   git clone https://github.com/RAGNAR303/AUTOCAR.git


2. **Acesse a pasta do projeto**

   ```bash
   cd AUTOCAR

3. **Instale as dependências**

   ```bash
   npm install

4. **Configure as variáveis de ambiente**

 - Crie um arquivo .env baseado em .env.example

 - Adicione suas chaves do Firebase (Firestore)

5. **Execute o servidor de desenvolvimento**

   ```bash
   npm run dev
6. **Abra no navegador**
👉 Acesse http://localhost:5173 (ou a porta exibida no console).


👤 Autor

Desenvolvido por RAGNAR303 / Thiago como um projeto de estudo para praticar desenvolvimento frontend moderno com React, TypeScript, gerenciamento de estado e integração com backend (Firebase). 
GitHub, usando com referência uma series de videos do curso de desenvolvimento fullstack pro  do professor Matheus Fragra - Sujeito Programador.
