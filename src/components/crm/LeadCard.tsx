"use client";

import {
  Lead,
  LEAD_STAGE_LABELS,
  LEAD_STAGE_COLORS,
} from "@/types/crm";

interface LeadCardProps {
  lead: Lead;
  onCardClick?: (lead: Lead) => void;
}

export default function LeadCard({ lead, onCardClick }: LeadCardProps) {
  const formatCurrency = (value?: number) => {
    if (!value) return "Não informado";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div
      onClick={() => onCardClick?.(lead)}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 text-sm">{lead.name}</h3>
        {lead.score && (
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
            Score: {lead.score}
          </span>
        )}
      </div>

      {/* Contact Info */}
      <div className="space-y-1 mb-3">
        <p className="text-xs text-gray-600">📱 {lead.phone}</p>
        <p className="text-xs text-gray-600">✉️ {lead.email}</p>
      </div>

      {/* Interest & Budget */}
      <div className="space-y-1 mb-3">
        <p className="text-xs text-gray-700">
          <span className="font-medium">Interesse:</span> {lead.interestType}
        </p>
        {lead.budgetMin && lead.budgetMax && (
          <p className="text-xs text-gray-700">
            <span className="font-medium">Orçamento:</span>
            <br />
            {formatCurrency(lead.budgetMin)} - {formatCurrency(lead.budgetMax)}
          </p>
        )}
        {lead.cityPreference && (
          <p className="text-xs text-gray-700">
            <span className="font-medium">Cidade:</span> {lead.cityPreference}
          </p>
        )}
      </div>

      {/* Notes */}
      {lead.notes && (
        <p className="text-xs text-gray-600 italic mb-3 line-clamp-2">
          &quot;{lead.notes}&quot;
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <span className="text-xs text-gray-500">
          {formatDate(lead.createdAt)}
        </span>
        <span
          className={`text-xs px-2 py-1 rounded-full ${LEAD_STAGE_COLORS[lead.stage]}`}
        >
          {LEAD_STAGE_LABELS[lead.stage]}
        </span>
      </div>
    </div>
  );
}
