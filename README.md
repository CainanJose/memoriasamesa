# 📘 Memórias à Mesa - Frontend

Este é o frontend do projeto **Memórias à Mesa**, uma aplicação Angular que permite aos usuários cadastrar, visualizar e favoritar receitas com valor afetivo. O sistema organiza as receitas por emoções como "Conforto" e "Nostalgia", conectando memórias a sabores.

---

## 🧩 Tecnologias Utilizadas

* [Angular 19]
* TypeScript
* HTML / CSS / SCSS
* Bootstrap 5
* Angular Forms (Template-driven)
* LocalStorage
* JWT (via Header Bearer Token)
* FastAPI (backend - integração)

---

## 🚀 Funcionalidades

### Visitante

* Visualiza lista de receitas
* Filtra receitas por emoção

### Usuário logado

* Login e cadastro de conta
* Cadastro de receita com:

  * Nome
  * Descrição
  * Tempo de preparo
  * Ingredientes e etapas dinâmicas
  * Emoções associadas (via combobox)
  * Upload de imagem (JPG, PNG, WebP)
* Visualiza receitas favoritas
* Favorita e desfavorita diretamente da lista
* Acesso via menu hamburguer lateral

---

## 🧠 Estrutura de Pastas

```bash
src/
 ├── app/
 │   ├── services/              # Serviços de API e token
 │   ├── interfaces/            # Interfaces de dados
 │   ├── navbar/                # Menu superior com autenticação
 │   ├── lista-receitas/        # Tela principal de listagem
 │   ├── cadastro-receita/      # Tela de cadastro dinâmico de receitas
 │   └── favoritos/             # Visualização de receitas favoritedas
```

---

## 🛠 Como rodar

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar servidor Angular

```bash
ng serve
```

> Certifique-se de que o backend em FastAPI está rodando.

---

## 📋 Observações

* As emoções são fixas para evitar duplicidade (ex: "alegria" e "Alegria")
* A imagem da receita é convertida para Base64 e salva como string
* Toda alteração de favoritos é refletida visualmente (coração cinza ou vermelho)

---

## 👤 Autor (Frontend)

Desenvolvido por **Cainã José**
Estudante de Engenharia da Computação
[LinkedIn](https://www.linkedin.com/in/cain%C3%A3-jose/)

---
