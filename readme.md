---
# 📸 ScreenshareAPI

> Uma API eficiente para compartilhamento temporário de screenshots. Upload rápido, link único e autodestruição em 24 horas.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v18-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

## 📖 Sobre o Projeto

A **ScreenshareAPI** resolve o problema de acumular prints e imagens desnecessárias em conversas. A ideia é simples: você faz o upload, recebe um link curto e seguro, e a imagem desaparece automaticamente após 24 horas.

Este projeto foi desenvolvido com foco em performance e boas práticas de Backend, utilizando **Redis** para gerenciamento de acesso rápido e expiração (TTL) e **Supabase** para armazenamento robusto de objetos.

### 🧠 Fluxo da Aplicação

O fluxo foi desenhado para garantir que o link expire sem depender de queries pesadas no banco de dados.
Você pode visualizar o desenho da arquitetura e o fluxo de dados completo através do **Excalidraw** no link abaixo (ou abrindo o arquivo `.excalidraw` na raiz do projeto):

🔗 **[Visualizar Fluxo de Arquitetura (Excalidraw Web)](https://excalidraw.com/#json=-hOvisGIBFBogsHzLvpV-,I1I98oRq0V7g9g7ahH59EA)** _(Carregue o arquivo `fluxo_api_screenshot_share.excalidraw` neste site para ver o diagrama ou clique no link)_

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando uma stack moderna focada em escalabilidade e tipagem estática:

- **Runtime:** Node.js
- **Linguagem:** TypeScript
- **Framework:** Express
- **Validação:** Zod
- **Cache/Sessão:** Redis (Gerenciamento de chaves temporárias)
- **Storage:** Supabase (Bucket S3 compatible)
- **Uploads:** Multer
- **Agendamento:** Node-cron (Limpeza de arquivos expirados)

---

## 🚀 O que eu aprendi

Este projeto foi fundamental para solidificar conceitos de **Arquitetura de Software** e **Engenharia de Backend**:

1.  **Estratégias de Caching:** Aprendi a utilizar o Redis como um banco de dados de chave-valor com tempo de vida (TTL) para gerenciar regras de negócio (expiração de 24h).
2.  **Cron Jobs:** Implementação de rotinas de limpeza (Garbage Collection) para garantir que arquivos deletados logicamente (no Redis) sejam removidos fisicamente do Storage para economizar custos.
3.  **Manipulação de Arquivos:** Uso de Buffers para upload de imagens.

---

## 📂 Estrutura de Pastas

```bash
├── env.example                  # Variáveis de ambiente modelo
├── fluxo_api_screenshot_share.excalidraw # Diagrama da arquitetura
├── src
│   ├── configs                  # Configurações externas (Redis, Supabase, Multer)
│   ├── jobs                     # Cron Jobs (ex: limpeza de bucket)
│   ├── middlewares              # Tratamento de erros e validações
│   ├── routes                   # Definição dos endpoints
│   ├── services                 # Regras de negócio
│   ├── utils                    # Classes auxiliares (AppError)
│   └── server.ts                # Entry point
```

---

## 🔌 Documentação da API

Abaixo estão as rotas disponíveis na aplicação.

### 1\. Upload de Imagem

Envia uma screenshot para o servidor e retorna um link de compartilhamento temporário.

- **URL:** `/uploads` (Sugestão de prefixo)
- **Método:** `POST`
- **Body (Multipart/form-data):**
  - `file`: (Arquivo de imagem: .png, .jpg, .jpeg, .gif)

**Exemplo de Resposta (201 Created):**

```json
{
  "publicId": "a1b2c3d4-unique-hash",
  "shareUrl": "http://localhost:3000/uploads/a1b2c3d4-unique-hash",
  "expiresIn": "24 hours"
}
```

### 2\. Acessar Imagem

Acessa a imagem através do hash único. Se o link tiver expirado (passado 24h), a imagem não será encontrada.

- **URL:** `/uploads/:hash`
- **Método:** `GET`
- **Params:**
  - `hash`: O identificador único retornado no upload.

**Comportamento:**

- **Sucesso:** Redireciona (302) para a URL pública da imagem no Supabase.
- **Erro (404):** Retorna erro caso o link tenha expirado ou não exista.

---

## ⚡ Como Rodar Localmente

1.  Clone o repositório.
2.  Instale as dependências: `npm install`
3.  Configure o arquivo `.env` baseando-se no `.env.example`.
4.  Inicie o servidor: `npm run dev`

---

Feito com 💜 por Eduardo
