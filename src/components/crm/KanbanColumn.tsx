"use client";

import { DragEvent } from 'react';
import { Lead, LeadStage, LEAD_STAGE_LABELS } from '@/types/crm';
import LeadCard from './LeadCard';

interface KanbanColumnProps {
  stage: LeadStage;
  leads: Lead[];
  onCardClick?: (lead: Lead) => void;
  onDrop?: (leadId: string, newStage: LeadStage) => void;
}

const STAGE_COLORS: Record<LeadStage, string> = {
  NEW: 'border-gray-300 bg-gray-50',
  CONTACTED: 'border-blue-300 bg-blue-50',
  QUALIFIED: 'border-yellow-300 bg-yellow-50',
  PROPOSAL: 'border-purple-300 bg-purple-50',
  WON: 'border-green-300 bg-green-50',
  LOST: 'border-red-300 bg-red-50',
};

export default function KanbanColumn({ stage, leads, onCardClick, onDrop }: KanbanColumnProps) {
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('leadId');
    if (leadId && onDrop) {
      onDrop(leadId, stage);
    }
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, leadId: string) => {
    e.dataTransfer.setData('leadId', leadId);
  };

  return (
    <div className="flex-shrink-0 w-80">
      {/* Column Header */}
      <div className={`rounded-t-lg border-2 ${STAGE_COLORS[stage]} p-3`}>
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900">
            {LEAD_STAGE_LABELS[stage]}
          </h3>
          <span className="bg-white text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
            {leads.length}
          </span>
        </div>
      </div>

      {/* Cards Container */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="bg-gray-100 rounded-b-lg border-2 border-t-0 border-gray-200 p-3 min-h-[500px] max-h-[calc(100vh-300px)] overflow-y-auto space-y-3"
      >
        {leads.length === 0 ? (
          <div className="text-center text-gray-500 text-sm py-8">
            Nenhum lead neste estágio
          </div>
        ) : (
          leads.map((lead) => (
            <div
              key={lead.id}
              draggable
              onDragStart={(e) => handleDragStart(e, lead.id)}
              className="cursor-move"
            >
              <LeadCard lead={lead} onCardClick={onCardClick} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
