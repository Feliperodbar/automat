# Sistema de Automação de Testes

Um sistema completo de automação de testes para aplicações web com interface visual intuitiva. Permite criar, executar e monitorar testes automatizados em sites de terceiros sem necessidade de código.

## 🚀 Funcionalidades

- **Interface Visual Intuitiva**: Crie scripts de teste através de comandos tipo Cypress
- **Execução em Tempo Real**: Execute testes via Playwright no backend com monitoramento em tempo real
- **Console de Logs**: Visualize logs detalhados com filtros por nível (info, success, error)
- **Fila de Testes**: Organize comandos com drag-and-drop
- **Exportação de Logs**: Baixe resultados de testes em formato de texto

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Test Runner**: Playwright
- **State Management**: Zustand
- **Build Tool**: Vite

## 📋 Pré-requisitos

- Node.js (v18 ou superior)
- npm ou pnpm

## 🔧 Instalação

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

Ou use o arquivo batch:
```bash
install.bat
```

## 🏃‍♂️ Executando o Projeto

Execute o comando:

```bash
npm run dev
```

Ou use o arquivo batch:
```bash
dev.bat
```

Isso iniciará:
- Frontend React em `http://localhost:5173`
- Backend Express em `http://localhost:3000`

## 📝 Comandos Disponíveis

### Navegação
- **visit**: Abrir uma página web
- **wait**: Aguardar por tempo específico

### Interação
- **click**: Clicar em elemento
- **type**: Digitar texto em campo
- **check/uncheck**: Marcar/desmarcar checkbox
- **select**: Selecionar opção
- **submit**: Submeter formulário
- **login**: Realizar login completo

### Asserção
- **contains**: Verificar se contém texto
- **assert**: Verificar elemento

## 📊 Estrutura do Projeto

```
├── src/                    # Frontend React
│   ├── components/         # Componentes React
│   ├── store/             # Zustand store
│   └── App.tsx            # Componente principal
├── api/                    # Backend Express
│   ├── routes/            # Rotas da API
│   ├── services/          # Serviços de negócio
│   └── server.ts          # Servidor Express
├── package.json           # Dependências do projeto
└── README.md             # Este arquivo
```

## 🔍 Exemplo de Uso

1. **Criar um teste de login**:
   - Clique em "Login" no painel de comandos
   - Preencha os seletores e credenciais
   - Adicione o comando à fila

2. **Adicionar navegação**:
   - Clique em "Visitar URL"
   - Digite a URL do site
   - Adicione à fila

3. **Executar o teste**:
   - Digite um nome para o teste
   - Clique em "Executar Teste"
   - Monitore os logs em tempo real

## 🎨 Interface

- **Paleta de Comandos**: Grid de botões coloridos organizados por categorias
- **Fila de Testes**: Lista vertical com drag-and-drop
- **Console de Logs**: Área com fundo escuro e texto colorido por nível
- **Controles de Execução**: Botões principais para executar e gerenciar testes

## 🚀 Deploy

O sistema está pronto para deploy em serviços como Vercel, Netlify ou servidores próprios.

## 📄 Licença

Este projeto está licenciado sob a licença MIT.