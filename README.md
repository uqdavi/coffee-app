# ☕ Coffee App

Front-end de uma loja de cafés construído com **JavaScript puro**, sem frameworks. Todo o conteúdo da página é gerado dinamicamente pelo JavaScript através do objeto `document`, a partir de dados de uma API.

Projeto desenvolvido para a disciplina de **Programação Visual e Autoria Web** (UFRN), ministrada pelo professor Taniro Rodrigues.

🔗 **Site:** `https://coffee-app-aw.netlify.app/`
🔗 **API:** `https://coffee-app-3cu0.onrender.com/coffee/`

---

## 📸 Demonstração

> `![Página inicial](screenshots/home.png)`

---

## ✨ Funcionalidades

**Página inicial**
- Lista de cafés obtida da API com `fetch`
- Cada card mostra título, descrição, ingredientes, preço e imagem
- Botão para adicionar o café ao carrinho

**Header**
- Ícone de carrinho clicável com contador de itens
- O contador se atualiza na hora, sem recarregar a página

**Carrinho**
- Lista de itens com nome, preço, quantidade e subtotal
- Botões para aumentar e diminuir a quantidade
- Total acumulado
- Dados guardados no `localStorage`, então persistem ao recarregar ou fechar a página

**Finalização de compra**
- Resumo dos itens
- Formulário com endereço e forma de pagamento (cartão de crédito, boleto ou PIX)
- Validação dos campos
- Mensagem de confirmação e limpeza do carrinho

**Geral**
- Interface responsiva com Bootstrap
- Navegação entre páginas sem recarregar (roteamento por hash)

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| JavaScript (ES Modules) | Manipulação do DOM, lógica e roteamento |
| [Bootstrap 5.3.3](https://getbootstrap.com/) | Estilização e responsividade |
| [Bootstrap Icons 1.11.3](https://icons.getbootstrap.com/) | Ícone do carrinho |
| [json-server 0.17.4](https://github.com/typicode/json-server) | API local de cafés |
| Web Storage (`localStorage`) | Persistência do carrinho |
| [Render](https://render.com/) | Hospedagem da API |
| [Netlify](https://www.netlify.com/) | Hospedagem do front-end |

---

## 🚀 Como rodar localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado

### Passo a passo

**1. Clone o repositório**

```bash
git clone https://github.com/uqdavi/coffee-app.git
cd coffee-app
```

**2. Instale as dependências**

```bash
npm install
```

**3. Ajuste a URL da API**

Em `src/api/coffeeApi.js`, use o endereço local:

```js
const API_URL = 'http://localhost:3001/coffee';
```

**4. Inicie a API** (em um terminal)

```bash
npm run api
```

A API fica disponível em:
- Todos os cafés: `http://localhost:3001/coffee`
- Um café específico: `http://localhost:3001/coffee/1`

**5. Inicie o site** (em outro terminal)

Como o projeto usa módulos ES (`type="module"`), ele precisa ser servido por um servidor, e não aberto com duplo clique no arquivo:

```bash
npx serve .
```

Depois, abra o endereço mostrado no terminal (geralmente `http://localhost:3000`). Também funciona com a extensão **Live Server** do VS Code.

---

## 🔌 API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/coffee` | Lista todos os cafés |
| GET | `/coffee/:id` | Retorna um café pelo id |

**Exemplo de objeto:**

```json
{
  "id": 2,
  "title": "Latte",
  "description": "Uma mistura cremosa de espresso e leite vaporizado...",
  "ingredients": ["Espresso", "Leite vaporizado"],
  "price": 4.5,
  "image": "https://..."
}
```

---

## 🧠 Como funciona

- **Renderização:** o `index.html` tem só a `div#root`. Cada elemento é criado com `document.createElement`, configurado e anexado com `appendChild`.
- **Roteamento:** o `router.js` lê `location.hash` e chama a função da página correspondente. O evento `hashchange` troca o conteúdo sem recarregar a página.
- **Carrinho:** guardado no `localStorage` como um array de objetos `{ id, title, price, quantity }`. Como o `localStorage` só guarda texto, usamos `JSON.stringify` para salvar e `JSON.parse` para ler.
- **Contador do header:** o `cartStorage.js` dispara o evento `cart-updated` sempre que o carrinho muda, e o header escuta esse evento para atualizar o número.

---

## 👥 Autores

- **Davi Silva** — [@uqdavi](https://github.com/uqdavi)
- **Ander** — [@andermrn](https://github.com/andermrn)

---

## 📄 Contexto acadêmico

Trabalho da Unidade 2 da disciplina **Programação Visual e Autoria Web**, Universidade Federal do Rio Grande do Norte (UFRN). O objetivo é entender, na prática, o que frameworks como React e Angular fazem por baixo dos panos: renderização a partir de dados, componentes, roteamento e gerenciamento de estado.