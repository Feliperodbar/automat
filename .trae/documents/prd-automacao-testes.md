## 1. Product Overview
Sistema completo de automação de testes para aplicações web com interface visual intuitiva. Permite criar, executar e monitorar testes automatizados em sites de terceiros sem necessidade de código.

Resolve o problema de testes manuais repetitivos, permitindo que desenvolvedores e QA criem scripts de teste visualmente através de comandos tipo Cypress, executando-os em navegador real via Playwright no backend.

## 2. Core Features

### 2.1 User Roles
| Role | Registration Method | Core Permissions |
|------|---------------------|------------------|
| Tester | No registration required | Create, execute and monitor test automation scripts |

### 2.2 Feature Module
O sistema de automação de testes consiste nas seguintes páginas principais:
1. **Home page**: interface principal com paleta de comandos, fila de testes, console de logs e controles de execução.

### 2.3 Page Details
| Page Name | Module Name | Feature description |
|-----------|-------------|---------------------|
| Home page | Command Palette | Display buttons for test commands (visit, get, click, type, contains, check, uncheck, select, wait, submit, assert, login). Open input modals for commands requiring parameters. |
| Home page | Test Queue | Show ordered list of test steps with edit and remove options. Allow drag-and-drop reordering. Display step parameters and command types. |
| Home page | Input Modal | Collect user inputs for command parameters (URLs, selectors, text values, login credentials). Support prompt markers like <prompt:field> for dynamic values. |
| Home page | Log Console | Real-time streaming of test execution logs with timestamp, command, parameters, status (running/success/fail), and detailed messages. Include filters for info/success/error levels. |
| Home page | Execution Controls | Execute test button to send JSON to backend. Clear selection button to reset test queue. Export log button to download execution results. |

## 3. Core Process
Usuário cria scripts de teste visuais através de comandos tipo Cypress, executa no backend via Playwright e monitora resultados em tempo real.

```mermaid
graph TD
  A[Home Page] --> B[Select Commands via Buttons]
  B --> C{Command Needs Input?}
  C -->|Yes| D[Open Input Modal]
  C -->|No| E[Add to Test Queue]
  D --> E
  E --> F{More Commands?}
  F -->|Yes| B
  F -->|No| G[Click Execute Test]
  G --> H[Send JSON to Backend]
  H --> I[Backend Executes via Playwright]
  I --> J[Stream Logs to Frontend]
  J --> K{Test Finished?}
  K -->|Success| L[Show "Teste finalizado e aprovado"]
  K -->|Error| M[Show "Teste finalizado com erro"]
  L --> N[Export Log Option]
  M --> N
```

## 4. User Interface Design

### 4.1 Design Style
- **Cores**: Primária - blue-600 (#2563eb), Secundária - gray-100 (#f3f4f6), Fundo - white, Texto - gray-900 (#111827)
- **Botões**: Estilo rounded-md com hover states e ícones quando apropriado
- **Fontes**: Inter ou system-ui, tamanhos base: text-sm (14px), text-base (16px), text-lg (18px)
- **Layout**: Card-based com grid responsivo, sidebar para comandos, área central para fila de testes
- **Ícones**: Heroicons para consistência visual

### 4.2 Page Design Overview
| Page Name | Module Name | UI Elements |
|-----------|-------------|-------------|
| Home page | Command Palette | Grid de botões coloridos organizados por categorias (Navegação, Interação, Asserção). Cada botão mostra nome do comando e ícone. Botões de ação têm hover:bg-blue-700. |
| Home page | Test Queue | Lista vertical com cards brancos, borda gray-200, sombra suave. Cada step mostra número, comando, parâmetros resumidos. Botões de editar (ícone lápis) e remover (ícone lixeira) no canto direito. |
| Home page | Input Modal | Overlay escuro, modal branco centralizado com bordas arredondadas. Campos de input com labels claros, placeholder text-gray-400. Botões de confirmar (blue-600) e cancelar (gray-300). |
| Home page | Log Console | Área de scroll com fundo gray-900, texto colorido por nível (info: blue, success: green, error: red). Timestamp em gray-400. Altura fixa com overflow-y-auto. Filtros como botões toggle acima do console. |
| Home page | Execution Controls | Barra superior com botões principais: "Executar Teste" (green-600), "Limpar Seleção" (red-500), "Exportar Log" (gray-600). Layout horizontal com espaçamento consistente. |

### 4.3 Responsiveness
Desktop-first design com breakpoints para tablet e mobile. Em telas menores, comandos empilham verticalmente e console ocupa largura total.