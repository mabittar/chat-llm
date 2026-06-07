# Banking Frontend - Chat POC

Frontend SPA para canal de chat com o backend `banking-llm`.

## Escopo da POC

- Fluxo de chat sem login/autenticacao.
- Tema exclusivamente escuro.
- Integracao com `POST /chat`.
- Persistencia de contexto por cabecalho `X-Thread-ID` em chat ativo.

## Stack

- Vue 3 + Vite
- Pinia (estado de chat)
- Vue Router
- Axios
- TailwindCSS + CSS custom
- Vitest + Vue Test Utils
- Playwright (E2E)

## Setup

```bash
npm install
cp .env.example .env
```

Variavel de ambiente principal para o backend:

- VITE_BANKING_LLM_URL: URL base da API banking-llm (ex: http://localhost:8000)
- VITE_REQUEST_TIMEOUT_MS: timeout HTTP do chat em ms (ex: 30000 ou 120000 para ambientes mais lentos)

## Scripts

```bash
npm run dev         # ambiente local
npm run build       # build de producao
npm run preview     # preview do build
npm run lint        # lint
npm run test:unit   # testes unitarios
npm run test:e2e    # testes E2E
npm run test        # suite completa (unit + E2E)
```

## Contrato de Thread

1. Ao iniciar novo chat, o frontend gera um UUID local.
2. Cada envio chama `POST /chat` com `X-Thread-ID` no request header.
3. Se a resposta trouxer `X-Thread-ID`, o valor retornado substitui o valor local do chat ativo.
4. A proxima iteracao do mesmo chat reutiliza o `thread_id` persistido.

## Estrutura Principal

- `src/api`: cliente HTTP e servico de chat
- `src/stores`: estado conversacional
- `src/components/chat`: UI do chat
- `src/views`: telas
- `tests/e2e`: cenarios Playwright

## Fora de Escopo

- Login/autenticacao/autorizacao
- Painel administrativo
- Multiplos canais alem do chat web
