# Orders API

API simples para gerenciamento de pedidos, desenvolvida em Node.js com Express e PostgreSQL (Knex).

## Pré-requisitos

- Node.js
- PostgreSQL
- Configuração do arquivo `.env` com as credenciais do banco de dados.

## Instalação

1.  Instale as dependências:
    ```bash
    npm install
    ```

2.  Configure o banco de dados no arquivo `.env`.

3.  Execute as migrações para criar as tabelas:
    ```bash
    npm run migrate
    ```
    *Para resetar o banco (apagar tudo e recriar):* `npm run migrate:reset`

## Execução

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O servidor rodará em `http://localhost:3000`.

## Documentação da API

### 1. Criar Pedido

Cria um novo pedido com itens.

-   **URL**: `/order`
-   **Método**: `POST`
-   **Body** (JSON):

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

-   **Exemplo cURL**:

```bash
curl --location 'http://localhost:3000/order' \
--header 'Content-Type: application/json' \
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

### 2. Listar Pedidos

Retorna todos os pedidos cadastrados.

-   **URL**: `/order/list`
-   **Método**: `GET`

### 3. Obter Pedido por ID

Retorna os dados de um pedido específico.

-   **URL**: `/order/:id`
-   **Método**: `GET`
-   **Exemplo**: `/order/v10089015vdb-01`

### 4. Atualizar Pedido

Atualiza os dados de um pedido.

-   **URL**: `/order/:id`
-   **Método**: `PUT`
-   **Body**: Campos a serem atualizados (JSON).

### 5. Deletar Pedido

Remove um pedido do banco de dados.

-   **URL**: `/order/:id`
-   **Método**: `DELETE`
