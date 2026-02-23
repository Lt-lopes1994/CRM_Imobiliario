/**
 * Hooks customizados para integração com API do CRM
 */

import { useState, useCallback } from 'react';
import { getApiUrl } from '@/lib/api';
import {
  Lead,
  CreateLeadDto,
  UpdateLeadStageDto,
  TriageDto,
  KanbanBoard,
  Client,
  CreateClientFromLeadDto,
  SendMessageDto,
  MetricsOverview,
  LeadStage,
} from '@/types/crm';

// ==================== HELPER PARA REQUISIÇÕES ====================

async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = localStorage.getItem('accessToken');
  
  const response = await fetch(getApiUrl(endpoint), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erro na requisição' }));
    throw new Error(error.message || `Erro: ${response.status}`);
  }

  return response.json();
}

// ==================== LEADS ====================

export function useLeads() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createLead = useCallback(async (data: CreateLeadDto): Promise<Lead> => {
    setLoading(true);
    setError(null);
    try {
      const lead = await apiRequest<Lead>('leads', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return lead;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao criar lead';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getLeads = useCallback(async (stage?: LeadStage): Promise<Lead[]> => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = stage ? `leads?stage=${stage}` : 'leads';
      const leads = await apiRequest<Lead[]>(endpoint);
      return leads;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao buscar leads';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getKanbanBoard = useCallback(async (): Promise<KanbanBoard> => {
    setLoading(true);
    setError(null);
    try {
      const board = await apiRequest<KanbanBoard>('leads/kanban');
      return board;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao buscar kanban';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLeadStage = useCallback(
    async (leadId: string, data: UpdateLeadStageDto): Promise<Lead> => {
      setLoading(true);
      setError(null);
      try {
        const lead = await apiRequest<Lead>(`leads/${leadId}/stage`, {
          method: 'PATCH',
          body: JSON.stringify(data),
        });
        return lead;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao atualizar estágio';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const triageLead = useCallback(
    async (leadId: string, data: TriageDto): Promise<Lead> => {
      setLoading(true);
      setError(null);
      try {
        const lead = await apiRequest<Lead>(`leads/${leadId}/triage`, {
          method: 'POST',
          body: JSON.stringify(data),
        });
        return lead;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao fazer triagem';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    error,
    createLead,
    getLeads,
    getKanbanBoard,
    updateLeadStage,
    triageLead,
  };
}

// ==================== CLIENTS ====================

export function useClients() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createClientFromLead = useCallback(
    async (leadId: string, data: CreateClientFromLeadDto): Promise<Client> => {
      setLoading(true);
      setError(null);
      try {
        const client = await apiRequest<Client>(`clients/from-lead/${leadId}`, {
          method: 'POST',
          body: JSON.stringify(data),
        });
        return client;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao converter em cliente';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getClients = useCallback(async (): Promise<Client[]> => {
    setLoading(true);
    setError(null);
    try {
      const clients = await apiRequest<Client[]>('clients');
      return clients;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao buscar clientes';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const sendMessage = useCallback(
    async (clientId: string, data: SendMessageDto): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        await apiRequest(`clients/${clientId}/messages`, {
          method: 'POST',
          body: JSON.stringify(data),
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao enviar mensagem';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    error,
    createClientFromLead,
    getClients,
    sendMessage,
  };
}

// ==================== METRICS ====================

export function useMetrics() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMetricsOverview = useCallback(async (): Promise<MetricsOverview> => {
    setLoading(true);
    setError(null);
    try {
      const metrics = await apiRequest<MetricsOverview>('admin/metrics/overview');
      return metrics;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao buscar métricas';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getMetricsOverview,
  };
}
