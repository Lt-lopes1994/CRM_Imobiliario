"use client";

import { useState, useEffect } from "react";
import { PropertyCard } from "./property-card";
import { PropertyFilters } from "./property-filters";
import { getApiUrl } from "@/lib/api";

interface Property {
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
}

export function PropertyGrid() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    state: "",
    city: "",
  });

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            queryParams.append(key, value);
          }
        });

        const endpoint = queryParams.toString()
          ? `properties?${queryParams.toString()}`
          : "properties";
        const response = await fetch(getApiUrl(endpoint));
        const data = await response.json();
        setProperties(data.properties || []);
      } catch (error) {
        console.error("Erro ao carregar imóveis:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, [filters]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Imóveis em Destaque
        </h2>
        <p className="text-gray-800 max-w-2xl mx-auto">
          Explore nossa seleção de imóveis cuidadosamente escolhidos para você
        </p>
      </div>

      <PropertyFilters filters={filters} onFiltersChange={setFilters} />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-700 text-lg">
            Nenhum imóvel encontrado com os filtros aplicados.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
