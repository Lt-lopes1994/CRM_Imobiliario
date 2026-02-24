"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, CheckCircle, TrendingUp } from 'lucide-react';
import {
  Lead,
  TriageDto,
  PropertyType,
  PROPERTY_TYPE_LABELS,
  LEAD_STAGE_LABELS,
  LEAD_SOURCE_LABELS,
  ContactChannel,
} from '@/types/crm';
import { useLeads, useClients } from '@/hooks/useCRM';

const triageSchema = z.object({
  interestType: z.nativeEnum(PropertyType),
  budget: z.number().min(0, 'Orçamento deve ser positivo'),
  cityPreference: z.string().optional(),
  financingApproved: z.boolean().optional(),
  urgency: z.number().min(1).max(5).optional(),
  summary: z.string().optional(),
});

type TriageFormData = z.infer<typeof triageSchema>;

interface LeadDetailsModalProps {
  lead: Lead;
  onClose: () => void;
  onUpdate?: () => void;
}

export default function LeadDetailsModal({ lead, onClose, onUpdate }: LeadDetailsModalProps) {
  const { triageLead, loading: triageLoading } = useLeads();
  const { createClientFromLead, loading: clientLoading } = useClients();
  const [activeTab, setActiveTab] = useState<'info' | 'triage'>('info');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TriageFormData>({
    resolver: zodResolver(triageSchema),
    defaultValues: {
      interestType: lead.interestType,
      budget: lead.budgetMax || lead.budgetMin || 0,
      cityPreference: lead.cityPreference,
      urgency: 3,
    },
  });

  const formatCurrency = (value?: number) => {
    if (!value) return 'Não informado';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('pt-BR');
  };

  const onSubmitTriage = async (data: TriageFormData) => {
    try {
      await triageLead(lead.id, data as TriageDto);
      alert('Triagem realizada com sucesso!');
      onUpdate?.();
      onClose();
    } catch {
      alert('Erro ao realizar triagem. Tente novamente.');
    }
  };

  const handleConvertToClient = async () => {
    if (!confirm('Converter este lead em cliente?')) return;

    try {
      await createClientFromLead(lead.id, {
        preferredChannel: ContactChannel.WHATSAPP,
        tags: ['novo-cliente'],
      });
      alert('Lead convertido em cliente com sucesso!');
      onUpdate?.();
      onClose();
    } catch {
      alert('Erro ao converter em cliente. Tente novamente.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{lead.name}</h2>
            <span className={`inline-block mt-2 text-xs px-3 py-1 rounded-full bg-${lead.stage === 'WON' ? 'green' : lead.stage === 'LOST' ? 'red' : 'blue'}-100 text-${lead.stage === 'WON' ? 'green' : lead.stage === 'LOST' ? 'red' : 'blue'}-800`}>
              {LEAD_STAGE_LABELS[lead.stage]}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex-1 px-6 py-3 font-medium ${
              activeTab === 'info'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Informações
          </button>
          <button
            onClick={() => setActiveTab('triage')}
            className={`flex-1 px-6 py-3 font-medium ${
              activeTab === 'triage'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Triagem
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'info' && (
            <div className="space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Contato</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Telefone</label>
                    <p className="text-gray-900 font-medium">{lead.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <p className="text-gray-900 font-medium">{lead.email}</p>
                  </div>
                </div>
              </div>

              {/* Lead Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Informações do Lead</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Origem</label>
                    <p className="text-gray-900 font-medium">{LEAD_SOURCE_LABELS[lead.source]}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Tipo de Imóvel</label>
                    <p className="text-gray-900 font-medium">{PROPERTY_TYPE_LABELS[lead.interestType]}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Orçamento Mínimo</label>
                    <p className="text-gray-900 font-medium">{formatCurrency(lead.budgetMin)}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Orçamento Máximo</label>
                    <p className="text-gray-900 font-medium">{formatCurrency(lead.budgetMax)}</p>
                  </div>
                  {lead.cityPreference && (
                    <div>
                      <label className="text-sm text-gray-600">Cidade de Preferência</label>
                      <p className="text-gray-900 font-medium">{lead.cityPreference}</p>
                    </div>
                  )}
                  {lead.score && (
                    <div>
                      <label className="text-sm text-gray-600">Score</label>
                      <p className="text-blue-600 font-bold text-lg">{lead.score}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes */}
              {lead.notes && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Observações</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{lead.notes}</p>
                </div>
              )}

              {/* Timeline */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Timeline</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📅 Criado em: {formatDate(lead.createdAt)}</p>
                  <p>🔄 Atualizado em: {formatDate(lead.updatedAt)}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleConvertToClient}
                  disabled={clientLoading || lead.stage === 'WON'}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle size={16} />
                  Converter em Cliente
                </button>
              </div>
            </div>
          )}

          {activeTab === 'triage' && (
            <form onSubmit={handleSubmit(onSubmitTriage)} className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <TrendingUp className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Sistema de Triagem</h4>
                    <p className="text-sm text-blue-800">
                      Realize a qualificação do lead. O sistema calculará um score automático e pode avançar o estágio automaticamente.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Imóvel <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('interestType')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  >
                    {Object.entries(PROPERTY_TYPE_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Orçamento (R$) <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('budget', { valueAsNumber: true })}
                    type="number"
                    step="1000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                  {errors.budget && (
                    <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cidade de Preferência
                  </label>
                  <input
                    {...register('cityPreference')}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Urgência (1-5)
                  </label>
                  <input
                    {...register('urgency', { valueAsNumber: true })}
                    type="number"
                    min="1"
                    max="5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <input
                      {...register('financingApproved')}
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    Financiamento pré-aprovado
                  </label>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Resumo da Triagem
                  </label>
                  <textarea
                    {...register('summary')}
                    rows={4}
                    placeholder="Ex: Cliente muito interessado, quer comprar em até 3 meses..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={triageLoading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {triageLoading ? 'Processando...' : 'Realizar Triagem'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
