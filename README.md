# 🧪 Lacrei Saúde — Quality Assurance

Repositório de Quality Assurance desenvolvido para o desafio técnico da **Lacrei Saúde**, contemplando testes funcionais, acessibilidade, desempenho, responsividade e automação dos principais fluxos da plataforma.

## 🎯 Objetivo

Garantir a qualidade dos fluxos críticos da aplicação por meio de testes manuais e automatizados, identificando riscos, validando regras de negócio e monitorando o comportamento da plataforma sob diferentes condições de uso.

### Fluxos Cobertos

- Cadastro da pessoa usuária
  - Cadastro
  - Pós-cadastro
  - Buscar profissional
- Busca e contato com profissional de saúde
- Recuperação de senha

### Ambiente de Testes

**Staging:** https://paciente-staging.lacreisaude.com.br

### Documentação Completa

📚 [Notion](https://teste-tecnico-lacreisaude-qa-lucas-fidelis.notion.site/372d4bf059f5809c8b22db5192e8221b?v=372d4bf059f5805caaa1000cd0e84865)

---

## 🚀 Stack e Ferramentas

| Categoria     | Ferramenta                                           |
| ------------- | ---------------------------------------------------- |
| Linguagem     | TypeScript                                           |
| Automação E2E | Cypress 15                                           |
| BDD           | Cucumber (`@badeball/cypress-cucumber-preprocessor`) |
| Bundler       | esbuild (`@bahmutov/cypress-esbuild-preprocessor`)   |
| Relatórios    | Mochawesome                                          |
| Performance   | Puppeteer + tsx                                      |
| CI/CD         | GitHub Actions                                       |
| Linting       | ESLint                                               |
| Formatação    | Prettier                                             |
| Node.js       | 22                                                   |

---

## ⚙️ Configuração do Ambiente

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
BASE_URL=<url do ambiente de staging>
API_URL=<url da API>
LOGIN_EMAIL=<e-mail de login para testes de carga>
LOGIN_PASSWORD=<senha de login para testes de carga>
```

> As variáveis `BASE_URL` e `API_URL` também são configuradas como GitHub Secrets no pipeline de CI/CD.

### Instalação

```bash
npm install
```

---

## 📜 Scripts Disponíveis

### Testes E2E (Cypress + Cucumber)

| Script                  | Descrição                                  |
| ----------------------- | ------------------------------------------ |
| `npm run cy:run`        | Executa todos os testes                    |
| `npm run cy:critical`   | Executa apenas cenários `@critical`        |
| `npm run cy:validation` | Executa apenas cenários `@validation`      |
| `npm run cy:regression` | Executa apenas cenários `@regression`      |
| `npm run cy:all`        | Executa critical → regression → validation |

### Relatórios

```bash
npm run generate-reports
```

Gera o relatório HTML em:

```text
cypress/reports/html/
```

a partir dos arquivos JSON em:

```text
cypress/reports/json/
```

### Testes de Performance

| Script                  | Descrição                                            |
| ----------------------- | ---------------------------------------------------- |
| `npm run load:cadastro` | Simula 15 usuários no fluxo de cadastro              |
| `npm run load:busca`    | Simula 15 usuários no fluxo de busca de profissional |
| `npm run load:all`      | Executa todos os cenários de carga                   |

---

## 📁 Estrutura do Projeto

```text
cypress/
├── e2e/
│   ├── features/
│   │   └── *.feature
│   │
│   ├── pages/
│   │   ├── base.page.ts
│   │   └── cadastre.page.ts
│   │
│   └── steps/
│       └── *.steps.ts
│
├── support/
│   ├── api-client/
│   │   ├── base-api.client.ts
│   │   └── cadastre-api.client.ts
│   │
│   ├── constants/
│   │   ├── selectors/
│   │   ├── messages/
│   │   ├── tags.ts
│   │   └── urls.ts
│   │
│   └── types/
│
performance/
├── cadastro.load.ts
├── buscar-profissional.load.ts
├── config.ts
├── run-with-concurrency.ts
└── result-test.interface.ts
│
.github/
└── workflows/
    └── ci.yml
```

---

## 🏷️ Tags dos Cenários

As execuções podem ser filtradas por tags:

| Tag           | Objetivo                                 |
| ------------- | ---------------------------------------- |
| `@critical`   | Fluxo principal (caminho feliz)          |
| `@validation` | Validações de campos e regras de negócio |
| `@regression` | Cobertura de regressão                   |

### Estratégia de Execução

- **Critical:** executados a cada deploy
- **Validation:** regras de negócio e validações
- **Regression:** validação ampla do sistema

---

## 🔄 CI/CD — GitHub Actions

O pipeline é executado automaticamente em:

- Push para `main`
- Push para `develop`
- Pull Requests
- Execução manual (`workflow_dispatch`)

### Etapas

1. Checkout do repositório
2. Setup do Node.js 22
3. Instalação das dependências (`npm ci`)
4. Execução dos testes E2E em Chrome Headless
5. Geração do relatório HTML Mochawesome
6. Upload do relatório como artefato
7. Upload de screenshots em caso de falha
8. Publicação de resumo da execução no GitHub Step Summary

### Artefatos

| Artefato                           | Retenção |
| ---------------------------------- | -------- |
| `cypress-report-{run_number}`      | 30 dias  |
| `cypress-screenshots-{run_number}` | 7 dias   |

---

## ⚡ Resultados dos Testes de Performance

> Os testes de performance utilizam Puppeteer com navegação real. Os tempos medidos incluem carregamento da página, renderização e interação da interface.

Configuração utilizada:

- 15 usuários simultâneos
- Concorrência máxima: 5 usuários
- Timeout: 30 segundos

## Fluxo de Cadastro

### Resultado

- 14 de 15 usuários concluíram com sucesso
- Tempos de resposta variaram entre **7.058ms e 18.349ms**
- Tempo médio de resposta: **10.068ms (≈ 10,1s)**
- 1 execução falhou durante o fluxo

### Falhas Identificadas

- 1 falha por timeout (`Waiting failed: 30000ms exceeded`)
- O usuário 13 não concluiu o fluxo dentro do tempo limite configurado de 30 segundos.

### Conclusão

O fluxo de cadastro apresentou taxa de sucesso de **93,3% (14 de 15 usuários)** sob execução concorrente. As execuções bem-sucedidas concluíram o fluxo em média em **10,1 segundos**. Apesar de uma falha isolada por timeout, os resultados indicam boa estabilidade do fluxo de cadastro no ambiente de staging para a carga aplicada.

### Fluxo de Busca de Profissional

#### Resultado

- 9 de 15 usuários concluíram com sucesso
- Tempos de resposta variaram entre **525ms e 1.593ms**
- Tempo médio de resposta: **1.004ms (≈ 1,0s)**
- 6 execuções falharam durante o carregamento da página

#### Falhas Identificadas

Das 6 falhas registradas:

- 5 ocorreram por timeout na espera do seletor `#campo-de-busca`
- 1 ocorreu por timeout na espera do seletor `[data-qa-id="main-section-div"]`

#### Conclusão

O fluxo de busca apresentou taxa de sucesso de 60% (9 de 15 usuários) sob execução concorrente. As execuções bem-sucedidas tiveram tempo médio de resposta de 1,0s, porém foram observadas falhas por timeout no carregamento de elementos da interface, indicando instabilidade do ambiente de staging sob carga.

---

## ♿ Testes de Acessibilidade

Ferramenta utilizada:

- Lighthouse (Chrome DevTools)
  Critério de aceite:

- Pontuação mínima: 90

### Resultados

| Página                         | Score | Status       |
| ------------------------------ | ----- | ------------ |
| Cadastro                       | 90    | ✅ Aprovado  |
| Buscar Profissional            | 96    | ✅ Aprovado  |
| Detalhes do Profissional       | 91    | ✅ Aprovado  |
| Contatar Profissional          | 87    | ❌ Reprovado |
| Redefinir Senha                | 96    | ✅ Aprovado  |
| Confirmar Redefinição de Senha | 96    | ✅ Aprovado  |

### Problemas Identificados

#### WCAG 4.1.2

Inputs do código SMS sem associação de `label`.

#### WCAG 1.3.1

Breadcrumb contendo:

```html
<ul role="list">
  <span>...</span>
</ul>
```

Estrutura semântica inválida.

#### WCAG 4.1.2

Links do header utilizando `aria-label` sem role apropriado.

### Validações Manuais Realizadas

- Navegação por teclado
- Teste com leitor de tela (NVDA)
- Contraste de cores
- Legibilidade dos componentes

---

## 📱 Responsividade

Validação realizada nos principais breakpoints da aplicação.

| Breakpoint | Largura  | Status      |
| ---------- | -------- | ----------- |
| Mobile     | 375px    | ✅ Validado |
| Mobile     | 600px    | ✅ Validado |
| Desktop    | > 1024px | ✅ Validado |

Os resultados detalhados e evidências encontram-se documentados no Notion.

---

## 🐞 Registro de Bugs

Todos os defeitos identificados foram documentados e rastreados durante a execução dos testes.

### Links

- 📋 [Registro de Bugs no Notion](https://teste-tecnico-lacreisaude-qa-lucas-fidelis.notion.site/372d4bf059f580928693c7fe31eba6c2?v=372d4bf059f580f59b9d000c7d8b157a)
- 🐛 [Issues do GitHub](https://github.com/LucasMCFidelis/teste-tecnico-lacrei-saude-qa/issues)

---

## 🔒 Checklist de Segurança

- [ ✅ ] Nenhuma credencial real commitada no repositório
- [ ✅ ] Variáveis sensíveis gerenciadas via `.env`
- [ ✅ ] `.env` listado no `.gitignore`
- [ ✅ ] Dados de teste gerados dinamicamente via Faker
- [ ✅ ] Testes independentes entre execuções

---

## 🔁 Processo de Rollback dos Testes

Os testes automatizados não realizam alterações permanentes no ambiente.

Todas as contas criadas durante a execução utilizam dados aleatórios gerados pelo Faker e são executadas exclusivamente em ambiente de staging.

### Em Caso de Falha

1. O pipeline interrompe a execução
2. Screenshots são gerados automaticamente
3. O relatório Mochawesome continua sendo produzido (`if: always()`)
4. Nenhuma ação de rollback é necessária

---

## 👨‍💻 Autor

Desenvolvido por **Lucas Fidelis** como parte do desafio técnico de Quality Assurance da Lacrei Saúde.
