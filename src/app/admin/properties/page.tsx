"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Bed,
  Bath,
  Square,
} from "lucide-react";

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
  propertyType: string;
  status: string;
  category: {
    name: string;
  };
  createdAt: string;
}

export default function PropertiesPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch("/api/admin/properties");
      if (response.ok) {
        const data = await response.json();
        setProperties(data);
      }
    } catch (error) {
      console.error("Erro ao buscar imóveis:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este imóvel?")) {
      try {
        const response = await fetch(`/api/admin/properties/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setProperties(properties.filter((p) => p.id !== id));
        }
      } catch (error) {
        console.error("Erro ao excluir imóvel:", error);
      }
    }
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "" || property.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-100 text-green-800";
      case "SOLD":
        return "bg-red-100 text-red-800";
      case "RENTED":
        return "bg-blue-100 text-blue-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-900";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "Disponível";
      case "SOLD":
        return "Vendido";
      case "RENTED":
        return "Alugado";
      case "PENDING":
        return "Pendente";
      default:
        return status;
    }
  };

  const formatPrice = (price: number | null) => {
    if (!price) return "Não informado";
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-800">Carregando imóveis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Home className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gerenciar Imóveis
              </h1>
              <p className="text-gray-800">
                {properties.length} imóveis cadastrados
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push("/admin/properties/new")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus size={20} />
            Novo Imóvel
          </button>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Buscar por título, cidade ou endereço..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="w-full sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-600"
              >
                <option value="">Todos os status</option>
                <option value="AVAILABLE">Disponível</option>
                <option value="SOLD">Vendido</option>
                <option value="RENTED">Alugado</option>
                <option value="PENDING">Pendente</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {filteredProperties.length === 0 ? (
        <div className="text-center py-12">
          <Home className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum imóvel encontrado
          </h3>
          <p className="text-gray-800 mb-6">
            {searchTerm || statusFilter
              ? "Nenhum imóvel corresponde aos filtros aplicados."
              : "Comece cadastrando seu primeiro imóvel."}
          </p>
          <button
            onClick={() => router.push("/admin/properties/new")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mx-auto"
          >
            <Plus size={20} />
            Cadastrar Imóvel
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {property.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        property.status
                      )}`}
                    >
                      {getStatusText(property.status)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-800 mb-2">
                    <MapPin size={16} />
                    <span>
                      {property.address}, {property.city} - {property.state}
                    </span>
                  </div>

                  <p className="text-gray-800 mb-4 line-clamp-2">
                    {property.description}
                  </p>

                  <div className="flex items-center gap-6 text-sm text-gray-800">
                    <div className="flex items-center gap-1">
                      <Bed size={16} />
                      <span>{property.bedrooms} quartos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath size={16} />
                      <span>{property.bathrooms} banheiros</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square size={16} />
                      <span>{property.area} m²</span>
                    </div>
                  </div>
                </div>

                <div className="text-right ml-6">
                  <div className="text-lg font-bold text-gray-900 mb-1">
                    {property.salePrice
                      ? formatPrice(property.salePrice)
                      : "Venda não informada"}
                  </div>
                  {property.rentPrice && (
                    <div className="text-sm text-gray-800">
                      Aluguel: {formatPrice(property.rentPrice)}
                    </div>
                  )}
                  <div className="text-xs text-gray-700 mt-2">
                    Categoria: {property.category.name}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-gray-700">
                  Criado em{" "}
                  {new Date(property.createdAt).toLocaleDateString("pt-BR")}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => router.push(`/properties/${property.id}`)}
                    className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-md"
                  >
                    <Eye size={16} />
                    Visualizar
                  </button>
                  <button
                    onClick={() =>
                      router.push(`/admin/properties/${property.id}/edit`)
                    }
                    className="flex items-center gap-1 px-3 py-1 text-green-600 hover:bg-green-50 rounded-md"
                  >
                    <Edit size={16} />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(property.id)}
                    className="flex items-center gap-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 size={16} />
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
