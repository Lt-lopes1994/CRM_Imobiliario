"use client";

import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Calendar, User, MessageSquare, ExternalLink } from 'lucide-react';
import { useClients } from '@/hooks/useCRM';
import { Client, ContactChannel } from '@/types/crm';

export default function ClientsPage() {
  const { getClients, sendMessage, loading, error } = useClients();
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [messageText, setMessageText] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch (err) {
      console.error('Erro ao carregar clientes:', err);
    }
  };

  const handleSendMessage = async () => {
    if (!selectedClient || !messageText.trim()) return;

    setSendingMessage(true);
    try {
      await sendMessage(selectedClient.id, { 
        channel: selectedClient.preferredChannel || ContactChannel.EMAIL,
        content: messageText 
      });
      setMessageText('');
      alert('Mensagem enviada com sucesso!');
      setSelectedClient(null);
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
      alert('Erro ao enviar mensagem');
    } finally {
      setSendingMessage(false);
    }
  };

  if (loading && clients.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-800">Carregando clientes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600 mt-1">
            {clients.length} {clients.length === 1 ? 'cliente' : 'clientes'} convertidos
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">❌ {error}</p>
        </div>
      )}

      {/* Clientes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            {/* Cliente Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Cliente desde {new Date(client.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                Ativo
              </div>
            </div>

            {/* Informações de Contato */}
            <div className="space-y-3 mb-4">
              {client.email && (
                <div className="flex items-center text-sm text-gray-700">
                  <Mail size={16} className="mr-2 text-gray-400" />
                  <a href={`mailto:${client.email}`} className="hover:underline">
                    {client.email}
                  </a>
                </div>
              )}

              {client.phone && (
                <div className="flex items-center text-sm text-gray-700">
                  <Phone size={16} className="mr-2 text-gray-400" />
                  <a href={`tel:${client.phone}`} className="hover:underline">
                    {client.phone}
                  </a>
                </div>
              )}

              {client.city && (
                <div className="flex items-center text-sm text-gray-700">
                  <MapPin size={16} className="mr-2 text-gray-400" />
                  <span>{client.city}</span>
                </div>
              )}
            </div>

            {/* Lead Original */}
            {client.leadId && (
              <div className="bg-gray-50 rounded p-3 mb-4">
                <p className="text-xs text-gray-600 mb-1">Convertido do Lead:</p>
                <p className="text-sm font-medium text-gray-900">ID: {client.leadId}</p>
              </div>
            )}

            {/* Ações */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedClient(client)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
              >
                <MessageSquare size={16} />
                Enviar Mensagem
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {clients.length === 0 && !loading && (
        <div className="text-center py-12">
          <User size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Nenhum cliente encontrado
          </h3>
          <p className="text-gray-600">
            Converta seus leads qualificados em clientes
          </p>
        </div>
      )}

      {/* Modal de Envio de Mensagem */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Enviar Mensagem
            </h2>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Para:</p>
              <p className="font-medium text-gray-900">{selectedClient.name}</p>
              <p className="text-sm text-gray-600">{selectedClient.email}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mensagem
              </label>
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                placeholder="Digite sua mensagem..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedClient(null);
                  setMessageText('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-800"
                disabled={sendingMessage}
              >
                Cancelar
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!messageText.trim() || sendingMessage}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sendingMessage ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
