import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { propertyId, message } = await request.json();

    if (!propertyId || !message) {
      return NextResponse.json(
        { error: "PropertyId e message são obrigatórios" },
        { status: 400 }
      );
    }

    // Verificar se o imóvel existe
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Imóvel não encontrado" },
        { status: 404 }
      );
    }

    const newMessage = await prisma.message.create({
      data: {
        message,
        name: session.user.name || "Usuário",
        email: session.user.email || "",
        propertyId,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        property: {
          select: {
            title: true,
          },
        },
      },
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar mensagem:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
