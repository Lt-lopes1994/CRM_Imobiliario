import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Estatísticas totais
    const [
      totalProperties,
      totalUsers,
      totalMessages,
      propertiesThisMonth,
      usersThisMonth,
      messagesThisMonth,
      salesThisMonth,
      recentProperties,
      recentMessages,
    ] = await Promise.all([
      prisma.property.count(),
      prisma.user.count(),
      prisma.message.count(),
      prisma.property.count({
        where: {
          createdAt: {
            gte: startOfMonth,
          },
        },
      }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: startOfMonth,
          },
        },
      }),
      prisma.message.count({
        where: {
          createdAt: {
            gte: startOfMonth,
          },
        },
      }),
      prisma.property.findMany({
        where: {
          status: "SOLD",
          updatedAt: {
            gte: startOfMonth,
          },
        },
        select: {
          salePrice: true,
        },
      }),
      prisma.property.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          city: true,
          state: true,
          salePrice: true,
          createdAt: true,
        },
      }),
      prisma.message.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          message: true,
          createdAt: true,
        },
      }),
    ]);

    // Calcular receita total e deste mês
    const totalRevenue = await prisma.property.aggregate({
      where: {
        status: "SOLD",
        salePrice: {
          not: null,
        },
      },
      _sum: {
        salePrice: true,
      },
    });

    const revenueThisMonth = salesThisMonth.reduce(
      (sum: number, property: { salePrice: number | null }) => {
        return sum + (property.salePrice || 0);
      },
      0,
    );

    return NextResponse.json({
      totalProperties,
      totalUsers,
      totalMessages,
      totalRevenue: totalRevenue._sum.salePrice || 0,
      propertiesThisMonth,
      usersThisMonth,
      messagesThisMonth,
      revenueThisMonth,
      recentProperties,
      recentMessages,
    });
  } catch (error) {
    console.error("Erro ao buscar dados do dashboard:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
