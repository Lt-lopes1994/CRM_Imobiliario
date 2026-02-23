"use client";

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import KanbanBoardComponent from '@/components/crm/KanbanBoard';
import CreateLeadModal from '@/components/crm/CreateLeadModal';
import LeadDetailsModal from '@/components/crm/LeadDetailsModal';
import { Lead } from '@/types/crm';

export default function LeadsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLeadCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleLeadUpdated = () => {
    setSelectedLead(null);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Leads</h1>
          <p className="text-gray-600 mt-1">
            Pipeline de vendas com sistema Kanban
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-md"
        >
          <Plus size={20} />
          Novo Lead
        </button>
      </div>

      {/* Kanban Board */}
      <KanbanBoardComponent
        key={refreshKey}
        onCardClick={setSelectedLead}
      />

      {/* Modals */}
      <CreateLeadModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleLeadCreated}
      />

      {selectedLead && (
        <LeadDetailsModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={handleLeadUpdated}
        />
      )}
    </div>
  );
}
