"use client";

import { useEffect, useState } from "react";
import {
  Building,
  Users,
  MessageSquare,
  TrendingUp,
  DollarSign,
} from "lucide-react";

interface DashboardStats {
  totalProperties: number;
  totalUsers: number;
  totalMessages: number;
  totalRevenue: number;
  propertiesThisMonth: number;
  usersThisMonth: number;
  messagesThisMonth: number;
  revenueThisMonth: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 0,
    totalUsers: 0,
    totalMessages: 0,
    totalRevenue: 0,
    propertiesThisMonth: 0,
    usersThisMonth: 0,
    messagesThisMonth: 0,
    revenueThisMonth: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/admin/dashboard");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Erro ao carregar dados do dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const statCards = [
    {
      title: "Total de Imóveis",
      value: stats.totalProperties,
      change: stats.propertiesThisMonth,
      icon: Building,
      color: "bg-blue-500",
    },
    {
      title: "Usuários Cadastrados",
      value: stats.totalUsers,
      change: stats.usersThisMonth,
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: "Mensagens Recebidas",
      value: stats.totalMessages,
      change: stats.messagesThisMonth,
      icon: MessageSquare,
      color: "bg-yellow-500",
    },
    {
      title: "Receita Total",
      value: formatCurrency(stats.totalRevenue),
      change: `+${formatCurrency(stats.revenueThisMonth)}`,
      icon: DollarSign,
      color: "bg-purple-500",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-900 font-medium">
          Atualizado em {new Date().toLocaleDateString("pt-BR")}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-900 font-semibold mb-1">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {typeof card.value === "string"
                      ? card.value
                      : card.value.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    +{card.change} este mês
                  </p>
                </div>
                <div className={`p-3 rounded-full ${card.color}`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Imóveis Recentes
          </h3>
          <div className="space-y-3">
            {/* Placeholder for recent properties */}
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-bold text-gray-900">Casa no Centro</p>
                <p className="text-sm text-gray-900">São Paulo, SP</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-600">R$ 450.000</p>
                <p className="text-sm text-gray-900 font-medium">Há 2 dias</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-bold text-gray-900">Apartamento Moderno</p>
                <p className="text-sm text-gray-900">Rio de Janeiro, RJ</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-600">R$ 320.000</p>
                <p className="text-sm text-gray-900 font-medium">Há 3 dias</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Mensagens Recentes
          </h3>
          <div className="space-y-3">
            {/* Placeholder for recent messages */}
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-bold text-gray-900">João Silva</p>
                <p className="text-sm text-gray-900">
                  Interesse em casa no centro
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-900 font-medium">Há 1 hora</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-bold text-gray-900">Maria Santos</p>
                <p className="text-sm text-gray-900">
                  Pergunta sobre apartamento
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-900 font-medium">Há 2 horas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <Building size={20} className="text-blue-700 mr-2" />
            <span className="text-blue-700 font-bold">Adicionar Imóvel</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <Users size={20} className="text-green-700 mr-2" />
            <span className="text-green-700 font-bold">Gerenciar Usuários</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <TrendingUp size={20} className="text-purple-700 mr-2" />
            <span className="text-purple-700 font-bold">Ver Relatórios</span>
          </button>
        </div>
      </div>
    </div>
  );
}
