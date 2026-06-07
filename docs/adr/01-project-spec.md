# Project Specification

Output-Format: MD

**Data de criação**: 07/06/2026
**Última atualização**: 07/06/2026
**Changelog v1.0**:

- Versão inicial

## Objetivo

Objetivo de Negócio: disponibilizar um canal simples de chat para interação com o backend banking-llm.

O frontend deve permitir ao usuário enviar perguntas e receber respostas do endpoint conversacional do backend, com foco em rapidez de entrega e sem camada de autenticação na primeira versão.

## Technical Context

Tech Stack: Vue 3 + Vite + TailwindCSS + Pinia + Vue Router + Axios.
Arquitetura: SPA orientada a componentes, com separação por camadas (views, components, stores, api, composables).
Testes: estratégia inicial recomendada com Vitest + Vue Test Utils (a definir na implementação).
Testes E2E: configurar o playwright para automação dos testes integrados
Infraestrutura: build estático com Vite e entrega via Nginx (Docker multi-stage), integração HTTP com backend banking-llm.
Guia de Estilo: ESLint + Prettier (a formalizar no bootstrap do projeto).
CI/CD: não definido nesta fase.

| Aspecto              | Valor                                                                |
| -------------------- | -------------------------------------------------------------------- |
| Language/Version     | JavaScript (ES2022+)                                                 |
| Primary Dependencies | vue, vue-router, pinia, axios, tailwindcss, vite                     |
| Storage              | N/A no frontend (estado em memória)                                  |
| Cache                | Estado local via Pinia (sem cache distribuído nesta fase)            |
| Broker               | N/A                                                                  |
| Testing              | Vitest + Vue Test Utils + Playwright (E2E para testes integrados)    |
| Linting              | ESLint + Prettier (planejado)                                        |
| Target Platform      | Web SPA + container Docker (Nginx)                                   |
| Project Type         | Frontend SPA para Chat                                               |
| Design Patterns      | Service Layer, Store Pattern, Component-Based UI, Router Guard (op.) |
| Observability        | Logging de erros no cliente + monitoramento web (a definir)          |
| CI/CD                | A definir                                                            |

## Estrutura do Projeto

Estrutura alvo baseada no frontend de referência, simplificada para o escopo atual:

- src/main.js: bootstrap da aplicação (Vue + Pinia + Router)
- src/router/: rotas da SPA (sem fluxo de login inicialmente)
- src/views/ChatView.vue: tela principal de conversação
- src/components/chat/: componentes de UI de mensagens, input e histórico
- src/stores/chat.js: estado da conversa e ações de envio/recebimento
- src/api/http.js: cliente Axios com baseURL e headers padrão
- src/composables/: utilitários reutilizáveis (ex: gerenciamento de thread)
- src/utils/: helpers de formatação e suporte

## Padrões de Projeto e Design Adotados

| Padrão             | Onde é aplicado                     | Exemplo no código de referência               |
| ------------------ | ----------------------------------- | --------------------------------------------- |
| Service Layer      | Comunicação HTTP com backend        | src/api/axios.js                              |
| Store Pattern      | Estado global e ações de chat       | src/stores/chat.js                            |
| Component-Based UI | Composição da interface             | src/views/ChatView.vue + src/components/chat/ |
| Router             | Navegação SPA                       | src/router/index.js                           |
| Factory (simples)  | Criação de cliente HTTP configurado | axios.create(...) em src/api/axios.js         |
| Adapter            | Adaptação payload/resposta da API   | Mapeamentos em actions do store de chat       |

**Regras de aderência:**

- Novos módulos devem seguir a separação em api, store, view e components.
- Desvios dos padrões estabelecidos devem ser justificados e documentados como ADR.
- Refatorações necessárias para manter consistência devem ser sinalizadas ao @spec e @plan.

## Convenções

- Escopo inicial sem login/autenticação/autorização.
- O frontend deve integrar com o endpoint POST /chat do backend banking-llm.
- Toda nova conversa deve ter um identificador único de thread (UUID).
- O identificador deve ser enviado no header X-Thread-ID em todas as chamadas da conversa.
- O frontend deve capturar o header X-Thread-ID da resposta e manter sincronizado com a sessão ativa de chat.
- Ao iniciar um novo chat, gerar novo thread_id e isolar o contexto da conversa anterior.
- Em caso de erro HTTP, exibir mensagem amigável e registrar erro técnico no console/log client.

## Constituição (Princípios Inegociáveis)

- Arquitetura: manter domínio de UI desacoplado da infraestrutura HTTP através de camada de api/stores.
- Segurança: não embutir segredos no frontend; usar apenas variáveis públicas de ambiente do build.
- Qualidade: regras de negócio críticas do fluxo de chat devem ter testes automatizados.
- Estilo: padronizar formatação e linting antes de evoluções de features.
