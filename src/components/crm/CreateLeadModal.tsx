"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, UserPlus } from "lucide-react";
import {
  CreateLeadDto,
  LeadSource,
  PropertyType,
  LEAD_SOURCE_LABELS,
  PROPERTY_TYPE_LABELS,
} from "@/types/crm";
import { useLeads } from "@/hooks/useCRM";

const createLeadSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  phone: z.string().min(10, "Telefone inválido"),
  email: z.string().email("Email inválido"),
  source: z.nativeEnum(LeadSource),
  interestType: z.nativeEnum(PropertyType),
  budgetMin: z.number().min(0).optional(),
  budgetMax: z.number().min(0).optional(),
  cityPreference: z.string().optional(),
  notes: z.string().optional(),
});

type CreateLeadFormData = z.infer<typeof createLeadSchema>;

interface CreateLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CreateLeadModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateLeadModalProps) {
  const { createLead, loading } = useLeads();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateLeadFormData>({
    resolver: zodResolver(createLeadSchema),
  });

  const onSubmit = async (data: CreateLeadFormData) => {
    try {
      await createLead(data as CreateLeadDto);
      reset();
      onClose();
      onSuccess?.();
    } catch (err) {
      console.error("Erro ao criar lead:", err);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <UserPlus className="text-blue-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">Novo Lead</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Informações Básicas */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Informações Básicas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name")}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="João Silva"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("phone")}
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="11999999999"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="joao@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Origem <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("source")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  {Object.entries(LEAD_SOURCE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Imóvel <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("interestType")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  {Object.entries(PROPERTY_TYPE_LABELS).map(
                    ([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ),
                  )}
                </select>
              </div>
            </div>
          </div>

          {/* Detalhes do Interesse */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Detalhes do Interesse
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Orçamento Mínimo (R$)
                </label>
                <input
                  {...register("budgetMin", { valueAsNumber: true })}
                  type="number"
                  step="1000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="300000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Orçamento Máximo (R$)
                </label>
                <input
                  {...register("budgetMax", { valueAsNumber: true })}
                  type="number"
                  step="1000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="500000"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cidade de Preferência
                </label>
                <input
                  {...register("cityPreference")}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="São Paulo"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Observações
                </label>
                <textarea
                  {...register("notes")}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="Informações adicionais sobre o lead..."
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Criando..." : "Criar Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
