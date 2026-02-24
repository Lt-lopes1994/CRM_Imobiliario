// Types para o sistema de CRM com gestão de leads

// ==================== ENUMS ====================

export enum LeadSource {
  WEBSITE = 'WEBSITE',
  WHATSAPP = 'WHATSAPP',
  INSTAGRAM = 'INSTAGRAM',
  REFERRAL = 'REFERRAL',
  MANUAL = 'MANUAL',
}

export enum LeadStage {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  QUALIFIED = 'QUALIFIED',
  PROPOSAL = 'PROPOSAL',
  WON = 'WON',
  LOST = 'LOST',
}

export enum PropertyType {
  HOUSE = 'HOUSE',
  APARTMENT = 'APARTMENT',
  COMMERCIAL = 'COMMERCIAL',
  LAND = 'LAND',
  STUDIO = 'STUDIO',
}

export enum ContactChannel {
  WHATSAPP = 'whatsapp',
  EMAIL = 'email',
  SMS = 'sms',
  PHONE = 'phone',
}

// ==================== AUTH ====================

export interface AuthRegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface AuthLoginDto {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

// ==================== LEADS ====================

export interface CreateLeadDto {
  name: string;
  phone: string;
  email: string;
  source: LeadSource;
  interestType: PropertyType;
  budgetMin?: number;
  budgetMax?: number;
  cityPreference?: string;
  notes?: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: LeadSource;
  stage: LeadStage;
  interestType: PropertyType;
  budgetMin?: number;
  budgetMax?: number;
  cityPreference?: string;
  notes?: string;
  score?: number;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateLeadStageDto {
  stage: LeadStage;
}

export interface TriageDto {
  interestType: PropertyType;
  budget: number;
  cityPreference?: string;
  financingApproved?: boolean;
  urgency?: number; // 1-5
  summary?: string;
}

export interface KanbanColumn {
  stage: LeadStage;
  leads: Lead[];
  count: number;
}

export interface KanbanBoard {
  NEW: Lead[];
  CONTACTED: Lead[];
  QUALIFIED: Lead[];
  PROPOSAL: Lead[];
  WON: Lead[];
  LOST: Lead[];
}

// ==================== CLIENTS ====================

export interface CreateClientFromLeadDto {
  preferredChannel?: ContactChannel;
  tags?: string[];
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  city?: string;
  preferredChannel?: ContactChannel;
  tags?: string[];
  leadId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SendMessageDto {
  channel: ContactChannel;
  content: string;
}

export interface OutboundMessage {
  id: string;
  clientId: string;
  channel: ContactChannel;
  content: string;
  sentAt: string;
}

// ==================== METRICS ====================

export interface MetricsOverview {
  totalLeads: number;
  wonLeads: number;
  conversionRate: number;
  qualifiedSessions: number;
  leadsByStage: {
    [key in LeadStage]: number;
  };
}

// ==================== HELPERS ====================

export const LEAD_SOURCE_LABELS: Record<LeadSource, string> = {
  [LeadSource.WEBSITE]: 'Website',
  [LeadSource.WHATSAPP]: 'WhatsApp',
  [LeadSource.INSTAGRAM]: 'Instagram',
  [LeadSource.REFERRAL]: 'Indicação',
  [LeadSource.MANUAL]: 'Manual',
};

export const LEAD_STAGE_LABELS: Record<LeadStage, string> = {
  [LeadStage.NEW]: 'Novo',
  [LeadStage.CONTACTED]: 'Contactado',
  [LeadStage.QUALIFIED]: 'Qualificado',
  [LeadStage.PROPOSAL]: 'Proposta',
  [LeadStage.WON]: 'Ganho',
  [LeadStage.LOST]: 'Perdido',
};

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  [PropertyType.HOUSE]: 'Casa',
  [PropertyType.APARTMENT]: 'Apartamento',
  [PropertyType.COMMERCIAL]: 'Comercial',
  [PropertyType.LAND]: 'Terreno',
  [PropertyType.STUDIO]: 'Estúdio',
};

export const LEAD_STAGE_COLORS: Record<LeadStage, string> = {
  [LeadStage.NEW]: 'bg-gray-100 text-gray-800 border-gray-300',
  [LeadStage.CONTACTED]: 'bg-blue-100 text-blue-800 border-blue-300',
  [LeadStage.QUALIFIED]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  [LeadStage.PROPOSAL]: 'bg-purple-100 text-purple-800 border-purple-300',
  [LeadStage.WON]: 'bg-green-100 text-green-800 border-green-300',
  [LeadStage.LOST]: 'bg-red-100 text-red-800 border-red-300',
};
