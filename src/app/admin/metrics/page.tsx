"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useMetrics } from "@/hooks/useCRM";
import { MetricsOverview, LEAD_STAGE_LABELS } from "@/types/crm";

export default function MetricsPage() {
  const { getMetricsOverview, loading, error } = useMetrics();
  const [metrics, setMetrics] = useState<MetricsOverview | null>(null);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const data = await getMetricsOverview();
      setMetrics(data);
    } catch (err) {
      console.error("Erro ao carregar métricas:", err);
    }
  };

  if (loading && !metrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-800">Carregando métricas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">❌ {error}</p>
      </div>
    );
  }

  if (!metrics) return null;

  const kpiCards = [
    {
      title: "Total de Leads",
      value: metrics.totalLeads,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Leads Ganhos",
      value: metrics.wonLeads,
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Taxa de Conversão",
      value: `${metrics.conversionRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: "bg-purple-500",
    },
    {
      title: "Sessões de Triagem",
      value: metrics.qualifiedSessions,
      icon: BarChart3,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Métricas do CRM</h1>
        <p className="text-gray-600 mt-1">
          Acompanhe o desempenho da sua equipe de vendas
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {card.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${card.color}`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Leads por Estágio */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Leads por Estágio
        </h2>

        <div className="space-y-4">
          {Object.entries(metrics.leadsByStage).map(([stage, count]) => {
            const percentage =
              metrics.totalLeads > 0 ? (count / metrics.totalLeads) * 100 : 0;

            return (
              <div key={stage}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {LEAD_STAGE_LABELS[stage as keyof typeof LEAD_STAGE_LABELS]}
                  </span>
                  <span className="text-sm text-gray-600">
                    {count} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Insights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-green-900 mb-2">
            ✅ Pontos Positivos
          </h3>
          <ul className="space-y-2 text-sm text-green-800">
            {metrics.conversionRate >= 20 && (
              <li>• Excelente taxa de conversão acima de 20%</li>
            )}
            {metrics.wonLeads > 0 && (
              <li>• {metrics.wonLeads} leads convertidos em clientes</li>
            )}
            {metrics.qualifiedSessions > 0 && (
              <li>
                • {metrics.qualifiedSessions} sessões de triagem realizadas
              </li>
            )}
            {metrics.totalLeads > 50 && (
              <li>• Boa geração de leads com {metrics.totalLeads} registros</li>
            )}
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-900 mb-2">
            ⚠️ Oportunidades de Melhoria
          </h3>
          <ul className="space-y-2 text-sm text-yellow-800">
            {metrics.conversionRate < 10 && (
              <li>• Taxa de conversão baixa - foque em qualificação</li>
            )}
            {metrics.leadsByStage.NEW > metrics.totalLeads * 0.4 && (
              <li>• Muitos leads novos sem contato - acelere o follow-up</li>
            )}
            {metrics.leadsByStage.QUALIFIED > metrics.leadsByStage.PROPOSAL && (
              <li>• Leads qualificados aguardando proposta</li>
            )}
            {metrics.qualifiedSessions === 0 && (
              <li>• Nenhuma triagem realizada - comece a qualificar leads</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
