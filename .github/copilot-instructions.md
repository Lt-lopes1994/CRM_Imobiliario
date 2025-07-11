# Copilot Instructions for CRM Imobiliária

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Projeto Overview

Este é um CRM para imobiliária construído com Next.js, TypeScript, Tailwind CSS e PostgreSQL.

## Arquitetura

- **Frontend**: Next.js 15 com App Router
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL com Prisma ORM
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Hosting**: Vercel

## Funcionalidades Principais

1. **Painel Administrativo**

   - Dashboard para controle total de imóveis
   - CRUD de imóveis com valores de compra/venda
   - Sistema de usuários e permissões

2. **Interface do Usuário**

   - Visualização de imóveis disponíveis
   - Sistema de mensagens para interesse em imóveis
   - Filtros e busca avançada

3. **Gerenciamento de Imóveis**
   - Cadastro completo de imóveis
   - Upload de imagens
   - Controle de status (disponível, vendido, alugado)
   - Valores de compra e venda

## Padrões de Código

- Use TypeScript para type safety
- Utilize Tailwind CSS para estilização
- Implemente Server Components quando possível
- Use Prisma para operações de banco de dados
- Mantenha componentes reutilizáveis em `/src/components`
- APIs em `/src/app/api`

## Estrutura de Dados

- **User**: Administradores e usuários finais
- **Property**: Imóveis com informações completas
- **Message**: Mensagens de interesse dos usuários
- **Category**: Categorias de imóveis
- **Image**: Imagens dos imóveis
