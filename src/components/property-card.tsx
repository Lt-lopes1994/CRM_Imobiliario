"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Bed, Bath, Square, Mail } from "lucide-react";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    description: string;
    address: string;
    city: string;
    state: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    salePrice: number | null;
    rentPrice: number | null;
    status: string;
    propertyType: string;
    images: Array<{
      id: string;
      url: string;
      isMain: boolean;
    }>;
  };
}

export function PropertyCard({ property }: PropertyCardProps) {
  const mainImage =
    property.images.find((img) => img.isMain) || property.images[0];
  const price = property.salePrice || property.rentPrice;
  const priceLabel = property.salePrice ? "Venda" : "Aluguel";

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const getPropertyTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      HOUSE: "Casa",
      APARTMENT: "Apartamento",
      COMMERCIAL: "Comercial",
      LAND: "Terreno",
      STUDIO: "Estúdio",
    };
    return types[type] || type;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        {mainImage ? (
          <Image
            src={mainImage.url}
            alt={property.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Sem imagem</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-medium">
            {getPropertyTypeLabel(property.propertyType)}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-green-600 text-white px-2 py-1 rounded-md text-sm font-medium">
            {priceLabel}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-900">
          {property.title}
        </h3>

        <div className="flex items-center text-gray-800 mb-2">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">
            {property.address}, {property.city}
          </span>
        </div>

        <p className="text-gray-800 text-sm mb-3 line-clamp-2">
          {property.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4 text-sm text-gray-800">
            <div className="flex items-center">
              <Bed size={16} className="mr-1" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath size={16} className="mr-1" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Square size={16} className="mr-1" />
              <span>{property.area}m²</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">
            {price ? formatPrice(price) : "Consultar"}
          </div>
          <div className="flex space-x-2">
            <Link
              href={`/imoveis/${property.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
            >
              Ver Detalhes
            </Link>
            <Link
              href={`/contato?imovel=${property.id}`}
              className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              <Mail size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
