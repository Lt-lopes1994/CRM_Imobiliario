"use client";

import { useState, useEffect } from 'react';
import { Lead, LeadStage, KanbanBoard } from '@/types/crm';
import { useLeads } from '@/hooks/useCRM';
import KanbanColumn from './KanbanColumn';
import { RefreshCw } from 'lucide-react';

interface KanbanBoardComponentProps {
  onCardClick?: (lead: Lead) => void;
}

export default function KanbanBoardComponent({ onCardClick }: KanbanBoardComponentProps) {
  const { getKanbanBoard, updateLeadStage, loading, error } = useLeads();
  const [board, setBoard] = useState<KanbanBoard | null>(null);
  const [updating, setUpdating] = useState(false);

  const loadBoard = async () => {
    try {
      const data = await getKanbanBoard();
      setBoard(data);
    } catch (err) {
      console.error('Erro ao carregar kanban:', err);
    }
  };

  useEffect(() => {
    loadBoard();
  }, []);

  const handleDrop = async (leadId: string, newStage: LeadStage) => {
    if (!board) return;

    setUpdating(true);
    try {
      await updateLeadStage(leadId, { stage: newStage });
      await loadBoard(); // Recarregar board
    } catch (err) {
      console.error('Erro ao atualizar estágio:', err);
      alert('Erro ao mover card. Tente novamente.');
    } finally {
      setUpdating(false);
    }
  };

  const stages: LeadStage[] = [
    LeadStage.NEW,
    LeadStage.CONTACTED,
    LeadStage.QUALIFIED,
    LeadStage.PROPOSAL,
    LeadStage.WON,
    LeadStage.LOST,
  ];

  if (loading && !board) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-800">Carregando kanban...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">❌ {error}</p>
        <button
          onClick={loadBoard}
          className="mt-2 text-red-600 hover:text-red-800 underline text-sm"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Pipeline de Vendas</h2>
        <button
          onClick={loadBoard}
          disabled={loading || updating}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw size={16} className={updating || loading ? 'animate-spin' : ''} />
          Atualizar
        </button>
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {stages.map((stage) => (
            <KanbanColumn
              key={stage}
              stage={stage}
              leads={board?.[stage] || []}
              onCardClick={onCardClick}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </div>

      {/* Status Bar */}
      {(updating || loading) && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <RefreshCw size={16} className="animate-spin" />
            <span>Atualizando...</span>
          </div>
        </div>
      )}
    </div>
  );
}
