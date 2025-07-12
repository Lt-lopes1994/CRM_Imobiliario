"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Home,
  MapPin,
  Bed,
  Bath,
  Square,
  DollarSign,
  Calendar,
  ArrowLeft,
  MessageCircle,
  Phone,
  Mail,
  Share2,
} from "lucide-react";

interface Property {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  lotSize: number | null;
  salePrice: number | null;
  rentPrice: number | null;
  propertyType: string;
  status: string;
  category: {
    name: string;
    description: string;
  };
  owner: {
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/properties/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setProperty(data);
        } else {
          router.push("/404");
        }
      } catch (error) {
        console.error("Erro ao buscar imóvel:", error);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProperty();
    }
  }, [params.id, router]);

  const handleSendMessage = async () => {
    if (!session) {
      router.push("/login");
      return;
    }

    if (!message.trim()) {
      alert("Por favor, digite uma mensagem.");
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: property?.id,
          message: message.trim(),
        }),
      });

      if (response.ok) {
        setMessage("");
        setShowContactForm(false);
        alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      } else {
        alert("Erro ao enviar mensagem. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      alert("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  const formatPrice = (price: number | null) => {
    if (!price) return "Consulte";
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const getPropertyTypeText = (type: string) => {
    switch (type) {
      case "HOUSE":
        return "Casa";
      case "APARTMENT":
        return "Apartamento";
      case "COMMERCIAL":
        return "Comercial";
      case "LAND":
        return "Terreno";
      default:
        return "Outro";
    }
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-800">Carregando imóvel...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Home className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Imóvel não encontrado
          </h3>
          <p className="text-gray-800 mb-6">
            O imóvel que você está procurando não foi encontrado.
          </p>
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mx-auto"
          >
            <ArrowLeft size={16} />
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-800 hover:text-gray-900"
            >
              <ArrowLeft size={20} />
              Voltar
            </button>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:text-gray-900">
                <Share2 size={16} />
                Compartilhar
              </button>

              {property.status === "AVAILABLE" && (
                <button
                  onClick={() => setShowContactForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <MessageCircle size={16} />
                  Tenho Interesse
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Título e Status */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-800">
                    <MapPin size={16} />
                    <span>
                      {property.address}, {property.city} - {property.state}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    property.status
                  )}`}
                >
                  {getStatusText(property.status)}
                </span>
              </div>

              <div className="flex items-center gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <Home size={20} />
                  <span>{getPropertyTypeText(property.propertyType)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  <span>
                    Publicado em{" "}
                    {new Date(property.createdAt).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
            </div>

            {/* Características */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Características</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bed className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {property.bedrooms}
                  </div>
                  <div className="text-sm text-gray-800">Quartos</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bath className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {property.bathrooms}
                  </div>
                  <div className="text-sm text-gray-800">Banheiros</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Square className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {property.area}
                  </div>
                  <div className="text-sm text-gray-800">m² Área</div>
                </div>
                {property.lotSize && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Square className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {property.lotSize}
                    </div>
                    <div className="text-sm text-gray-800">m² Terreno</div>
                  </div>
                )}
              </div>
            </div>

            {/* Descrição */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Descrição</h2>
              <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                {property.description}
              </p>
            </div>

            {/* Localização */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Localização</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-gray-400" />
                  <span>{property.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Cidade:</span>
                  <span>
                    {property.city} - {property.state}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">CEP:</span>
                  <span>{property.zipCode}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preços */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <DollarSign size={20} />
                Valores
              </h2>

              <div className="space-y-4">
                {property.salePrice && (
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-green-600 font-medium">
                      Venda
                    </div>
                    <div className="text-2xl font-bold text-green-800">
                      {formatPrice(property.salePrice)}
                    </div>
                  </div>
                )}

                {property.rentPrice && (
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-600 font-medium">
                      Aluguel
                    </div>
                    <div className="text-2xl font-bold text-blue-800">
                      {formatPrice(property.rentPrice)}
                    </div>
                    <div className="text-sm text-blue-600">por mês</div>
                  </div>
                )}
              </div>
            </div>

            {/* Categoria */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Categoria</h2>
              <div className="text-center">
                <div className="text-lg font-medium text-gray-900">
                  {property.category.name}
                </div>
                {property.category.description && (
                  <div className="text-sm text-gray-800 mt-2">
                    {property.category.description}
                  </div>
                )}
              </div>
            </div>

            {/* Contato */}
            {property.status === "AVAILABLE" && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">Entre em Contato</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-800">
                      Telefone disponível após contato
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-800">
                      Email disponível após contato
                    </span>
                  </div>

                  <button
                    onClick={() => setShowContactForm(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <MessageCircle size={16} />
                    Demonstrar Interesse
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Contato */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Demonstrar Interesse</h3>
            <p className="text-gray-800 mb-4">
              Envie uma mensagem para o proprietário do imóvel &quot;
              {property.title}&quot;.
            </p>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowContactForm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-900 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSendMessage}
                disabled={sending}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {sending ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
