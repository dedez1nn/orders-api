# Orders API

API para gerenciamento de pedidos com autenticação JWT, desenvolvida em Node.js com Express e PostgreSQL (Knex).

## Pré-requisitos

- Node.js
- PostgreSQL
- Arquivo `.env` configurado com as credenciais do banco de dados

## Instalação

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Configure o arquivo `.env` com as seguintes variáveis:
   ```
   PORT=3000 (PADRÃO)
   PG_HOST=host
   PG_USER=user
   PG_PASSWORD=senha
   PG_DATABASE=nome_banco_de_dados
   PG_PORT=5432 (PADRÃO)
   JWT_SECRET=segredo_jwt
   ```

3. Execute as migrações para criar as tabelas:
   ```bash
   npm run migrate
   ```
   
   Para resetar o banco (apagar tudo e recriar):
   ```bash
   npm run migrate:reset
   ```

## Execução

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O servidor rodará em `http://localhost:3000`.

## Autenticação

A API utiliza autenticação JWT (JSON Web Token). Para acessar as rotas de pedidos, é necessário:

1. Criar um usuário
2. Fazer login para obter o token
3. Incluir o token no header `Authorization` das requisições

## Documentação da API

### Autenticação

#### 1. Criar Usuário (Registro)

Cria um novo usuário no sistema.

- **URL**: `/users`
- **Método**: `POST`
- **Autenticação**: Não requerida
- **Body** (JSON):

```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

- **Resposta de Sucesso** (201):

```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@gmail.com",
  "created_at": "2023-07-19T12:24:11.529Z",
  "updated_at": "2023-07-19T12:24:11.529Z"
}
```

#### 2. Login

Autentica um usuário e retorna um token JWT.

- **URL**: `/users/login`
- **Método**: `POST`
- **Autenticação**: Não requerida
- **Body** (JSON):

```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

- **Resposta de Sucesso** (200):

```json
{
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@gmail.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Pedidos

Todas as rotas de pedidos requerem autenticação. Inclua o token no header:

```
Authorization: Bearer SEU_TOKEN_AQUI
```

#### 3. Criar Pedido

Cria um novo pedido com itens.

- **URL**: `/order`
- **Método**: `POST`
- **Autenticação**: Requerida
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer SEU_TOKEN`
- **Body** (JSON):

```json
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```

- **Exemplo cURL**:

```bash
curl --location 'http://localhost:3000/order' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer SEU_TOKEN' \
--data '{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}'
```

- **Resposta de Sucesso** (201):

```json
{
  "orderId": "v10089015vdb-01",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z"
}
```

#### 4. Listar Pedidos

Retorna todos os pedidos cadastrados.

- **URL**: `/order/list`
- **Método**: `GET`
- **Autenticação**: Requerida
- **Headers**:
  - `Authorization: Bearer SEU_TOKEN`

- **Exemplo cURL**:

```bash
curl --location 'http://localhost:3000/order/list' \
--header 'Authorization: Bearer SEU_TOKEN'
```

- **Resposta de Sucesso** (200):

```json
[
  {
    "orderId": "v10089015vdb-01",
    "value": 10000,
    "creationDate": "2023-07-19T12:24:11.529Z"
  }
]
```

#### 5. Obter Pedido por ID

Retorna os dados de um pedido específico com seus itens.

- **URL**: `/order/:id`
- **Método**: `GET`
- **Autenticação**: Requerida
- **Parâmetros de URL**:
  - `id`: ID do pedido (orderId)
- **Headers**:
  - `Authorization: Bearer SEU_TOKEN`

- **Exemplo**: `/order/v10089015vdb-01`

- **Exemplo cURL**:

```bash
curl --location 'http://localhost:3000/order/v10089015vdb-01' \
--header 'Authorization: Bearer SEU_TOKEN'
```

- **Resposta de Sucesso** (200):

```json
{
  "orderId": "v10089015vdb-01",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "id": 1,
      "orderId": "v10089015vdb-01",
      "productId": 2434,
      "quantity": 1,
      "price": 1000
    }
  ]
}
```

#### 6. Atualizar Pedido

Atualiza os dados de um pedido.

- **URL**: `/order/:id`
- **Método**: `PUT`
- **Autenticação**: Requerida
- **Parâmetros de URL**:
  - `id`: ID do pedido (orderId)
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer SEU_TOKEN`
- **Body**: Campos a serem atualizados (JSON)

```json
{
  "value": 15000
}
```

- **Exemplo cURL**:

```bash
curl --location --request PUT 'http://localhost:3000/order/v10089015vdb-01' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer SEU_TOKEN' \
--data '{
  "value": 15000
}'
```

#### 7. Deletar Pedido

Remove um pedido do banco de dados.

- **URL**: `/order/:id`
- **Método**: `DELETE`
- **Autenticação**: Requerida
- **Parâmetros de URL**:
  - `id`: ID do pedido (orderId)
- **Headers**:
  - `Authorization: Bearer SEU_TOKEN`

- **Exemplo cURL**:

```bash
curl --location --request DELETE 'http://localhost:3000/order/v10089015vdb-01' \
--header 'Authorization: Bearer SEU_TOKEN'
```

- **Resposta de Sucesso** (204): Sem conteúdo

## Erros Comuns

### 401 Unauthorized

- **No token provided**: Token não foi enviado no header Authorization
- **Token error**: Formato do token inválido (deve ser "Bearer TOKEN")
- **Token malformatted**: Token não está no formato correto
- **Token invalid**: Token expirado ou inválido

### Solução

Certifique-se de:
1. Fazer login para obter um token válido
2. Incluir o header: `Authorization: Bearer SEU_TOKEN`
3. Usar o token completo retornado no login

## Estrutura do Banco de Dados

### Tabela: users
- `id` (serial, primary key)
- `name` (varchar)
- `email` (varchar, unique)
- `password` (varchar, hash bcrypt)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Tabela: orders
- `orderId` (varchar, primary key)
- `value` (integer)
- `creationDate` (timestamp)

### Tabela: items
- `id` (serial, primary key)
- `orderId` (varchar, foreign key -> orders.orderId)
- `productId` (integer)
- `quantity` (integer)
- `price` (integer)
