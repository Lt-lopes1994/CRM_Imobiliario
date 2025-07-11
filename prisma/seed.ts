import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando seed do banco de dados...");

  // Criar usuário admin
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@crm.com" },
    update: {},
    create: {
      email: "admin@crm.com",
      name: "Administrador",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Criar usuário normal
  const userPassword = await bcrypt.hash("user123", 12);
  const user = await prisma.user.upsert({
    where: { email: "user@crm.com" },
    update: {},
    create: {
      email: "user@crm.com",
      name: "Usuário Teste",
      password: userPassword,
      role: "USER",
    },
  });

  // Criar categorias
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Residencial",
        description: "Imóveis residenciais",
      },
    }),
    prisma.category.create({
      data: {
        name: "Comercial",
        description: "Imóveis comerciais",
      },
    }),
  ]);

  // Criar imóveis de exemplo
  const properties = await Promise.all([
    prisma.property.create({
      data: {
        title: "Casa Moderna no Centro",
        description:
          "Linda casa com 3 quartos, 2 banheiros e garagem para 2 carros. Localizada em área nobre da cidade.",
        address: "Rua das Flores, 123",
        city: "São Paulo",
        state: "SP",
        zipCode: "01234-567",
        bedrooms: 3,
        bathrooms: 2,
        area: 150.5,
        lotSize: 300.0,
        purchasePrice: 400000.0,
        salePrice: 450000.0,
        propertyType: "HOUSE",
        status: "AVAILABLE",
        categoryId: categories[0].id,
        ownerId: admin.id,
      },
    }),
    prisma.property.create({
      data: {
        title: "Apartamento Luxuoso",
        description:
          "Apartamento de alto padrão com 2 quartos, 1 banheiro e vista para o mar.",
        address: "Avenida Beira Mar, 456",
        city: "Rio de Janeiro",
        state: "RJ",
        zipCode: "20000-000",
        bedrooms: 2,
        bathrooms: 1,
        area: 85.0,
        purchasePrice: 300000.0,
        salePrice: 350000.0,
        propertyType: "APARTMENT",
        status: "AVAILABLE",
        categoryId: categories[0].id,
        ownerId: admin.id,
      },
    }),
    prisma.property.create({
      data: {
        title: "Loja Comercial",
        description:
          "Loja comercial em ponto estratégico com grande movimento.",
        address: "Rua do Comércio, 789",
        city: "Belo Horizonte",
        state: "MG",
        zipCode: "30000-000",
        bedrooms: 0,
        bathrooms: 1,
        area: 50.0,
        purchasePrice: 200000.0,
        rentPrice: 2500.0,
        propertyType: "COMMERCIAL",
        status: "AVAILABLE",
        categoryId: categories[1].id,
        ownerId: admin.id,
      },
    }),
  ]);

  // Criar mensagens de exemplo
  await Promise.all([
    prisma.message.create({
      data: {
        name: "João Silva",
        email: "joao@email.com",
        phone: "(11) 99999-9999",
        message:
          "Tenho interesse na casa moderna no centro. Gostaria de agendar uma visita.",
        propertyId: properties[0].id,
        userId: user.id,
        status: "PENDING",
      },
    }),
    prisma.message.create({
      data: {
        name: "Maria Santos",
        email: "maria@email.com",
        phone: "(21) 88888-8888",
        message:
          "O apartamento ainda está disponível? Qual o valor do condomínio?",
        propertyId: properties[1].id,
        status: "PENDING",
      },
    }),
  ]);

  console.log("Seed concluído com sucesso!");
  console.log("Usuários criados:");
  console.log("Admin: admin@crm.com / admin123");
  console.log("User: user@crm.com / user123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
