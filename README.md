# CRM Imobiliária

Sistema de gerenciamento de imóveis desenvolvido com Next.js, PostgreSQL e Prisma, otimizado para hospedagem na Vercel.

## 🚀 Funcionalidades

### Para Usuários

- **Visualização de imóveis** com filtros avançados
- **Sistema de mensagens** para demonstrar interesse
- **Busca por localização** e características
- **Interface responsiva** e moderna

### Para Administradores

- **Dashboard completo** com estatísticas em tempo real
- **Gerenciamento de imóveis** (CRUD completo)
- **Controle de usuários** e permissões
- **Sistema de mensagens** dos interessados
- **Relatórios e analytics**

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes
- **Banco de Dados**: PostgreSQL + Prisma ORM
- **Autenticação**: NextAuth.js
- **Upload de Imagens**: UploadThing
- **Hospedagem**: Vercel (otimizado para custos)

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd imobiliaria
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/crm_imobiliaria"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"
```

4. Execute as migrações do banco:

```bash
npx prisma migrate dev
```

5. Gere o cliente Prisma:

```bash
npx prisma generate
```

6. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## 🗃️ Estrutura do Banco de Dados

- **User**: Usuários do sistema (admin/usuários finais)
- **Property**: Imóveis com informações completas
- **PropertyImage**: Imagens dos imóveis
- **Message**: Mensagens de interesse dos usuários
- **Category**: Categorias de imóveis

## 🎯 Como Usar

### Acesso de Usuário

1. Acesse `http://localhost:3000`
2. Navegue pelos imóveis disponíveis
3. Use os filtros para encontrar o imóvel ideal
4. Envie mensagens de interesse

### Acesso Administrativo

1. Faça login como administrador
2. Acesse o painel em `/admin`
3. Gerencie imóveis, usuários e mensagens
4. Acompanhe relatórios e estatísticas

## 🚢 Deploy na Vercel

1. Faça push do código para o GitHub
2. Conecte o repositório na Vercel
3. Configure as variáveis de ambiente
4. Configure o banco PostgreSQL (recomendado: Neon ou Supabase)
5. Deploy automático!

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── api/          # API Routes
│   ├── admin/        # Painel administrativo
│   ├── login/        # Página de login
│   └── register/     # Página de cadastro
├── components/       # Componentes reutilizáveis
├── lib/             # Utilitários e configurações
└── types/           # Tipos TypeScript
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido com ❤️ para otimizar o gerenciamento de imóveis

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
