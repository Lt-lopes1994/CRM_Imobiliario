"use client";

import { Filter } from "lucide-react";
import { useState } from "react";

interface PropertyFiltersProps {
  filters: {
    type: string;
    minPrice: string;
    maxPrice: string;
    bedrooms: string;
    bathrooms: string;
    city: string;
  };
  onFiltersChange: (filters: {
    type: string;
    minPrice: string;
    maxPrice: string;
    bedrooms: string;
    bathrooms: string;
    city: string;
  }) => void;
}

export function PropertyFilters({
  filters,
  onFiltersChange,
}: PropertyFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      type: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      bathrooms: "",
      city: "",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <Filter size={20} />
          <span>{showFilters ? "Ocultar" : "Mostrar"} Filtros</span>
        </button>
      </div>

      <div className={`space-y-4 ${showFilters ? "block" : "hidden md:block"}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* Tipo de Imóvel */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo
            </label>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              <option value="HOUSE">Casa</option>
              <option value="APARTMENT">Apartamento</option>
              <option value="COMMERCIAL">Comercial</option>
              <option value="LAND">Terreno</option>
              <option value="STUDIO">Estúdio</option>
            </select>
          </div>

          {/* Preço Mínimo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preço Mín.
            </label>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              placeholder="R$ 0"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Preço Máximo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preço Máx.
            </label>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              placeholder="R$ 0"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Quartos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quartos
            </label>
            <select
              value={filters.bedrooms}
              onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Qualquer</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>

          {/* Banheiros */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Banheiros
            </label>
            <select
              value={filters.bathrooms}
              onChange={(e) => handleFilterChange("bathrooms", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Qualquer</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>

          {/* Cidade */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cidade
            </label>
            <input
              type="text"
              value={filters.city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
              placeholder="Digite a cidade"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Botão para limpar filtros */}
        <div className="flex justify-end">
          <button
            onClick={clearFilters}
            className="text-sm text-gray-600 hover:text-gray-800 underline"
          >
            Limpar Filtros
          </button>
        </div>
      </div>
    </div>
  );
}
