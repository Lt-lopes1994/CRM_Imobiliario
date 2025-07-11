import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parâmetros de filtro
    const type = searchParams.get("type");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const bedrooms = searchParams.get("bedrooms");
    const bathrooms = searchParams.get("bathrooms");
    const city = searchParams.get("city");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Construir filtros
    const where: any = {
      status: "AVAILABLE",
    };

    if (type) {
      where.propertyType = type;
    }

    if (city) {
      where.city = {
        contains: city,
        mode: "insensitive",
      };
    }

    if (bedrooms) {
      where.bedrooms = {
        gte: parseInt(bedrooms),
      };
    }

    if (bathrooms) {
      where.bathrooms = {
        gte: parseInt(bathrooms),
      };
    }

    // Filtros de preço
    if (minPrice || maxPrice) {
      where.OR = [];

      if (minPrice || maxPrice) {
        const priceFilter: any = {};
        if (minPrice) priceFilter.gte = parseFloat(minPrice);
        if (maxPrice) priceFilter.lte = parseFloat(maxPrice);

        where.OR.push({ salePrice: priceFilter });
        where.OR.push({ rentPrice: priceFilter });
      }
    }

    // Buscar imóveis
    const properties = await prisma.property.findMany({
      where,
      include: {
        images: true,
        category: true,
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Contar total
    const total = await prisma.property.count({ where });

    return NextResponse.json({
      properties,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Erro ao buscar imóveis:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
