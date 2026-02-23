/**
 * Configuração central da API
 * 
 * Se NEXT_PUBLIC_API_URL estiver definido, usa o backend externo (NestJS)
 * Caso contrário, usa as Next.js API Routes locais (/api/...)
 */

// URL base da API - pode ser backend externo ou API Routes local
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Constrói a URL completa da API
 * 
 * @param endpoint - Caminho do endpoint (ex: "/properties", "/admin/dashboard")
 * @returns URL completa para fazer requisição
 * 
 * @example
 * // Com backend externo (NEXT_PUBLIC_API_URL definido)
 * getApiUrl("/properties") // => "https://crm-imobiliario-back.onrender.com/v1/properties"
 * 
 * // Com API Routes local (NEXT_PUBLIC_API_URL vazio)
 * getApiUrl("/properties") // => "/api/properties"
 */
export function getApiUrl(endpoint: string): string {
  // Remove barra inicial se existir
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  if (API_BASE_URL) {
    // Usa backend externo
    return `${API_BASE_URL}/${normalizedEndpoint}`;
  }
  
  // Usa Next.js API Routes local
  return `/api/${normalizedEndpoint}`;
}

/**
 * Helper para fazer requisições à API com configuração padrão
 * 
 * @param endpoint - Caminho do endpoint
 * @param options - Opções do fetch
 * @returns Promise com Response
 */
export async function apiRequest(
  endpoint: string,
  options?: RequestInit
): Promise<Response> {
  const url = getApiUrl(endpoint);
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  };
  
  return fetch(url, {
    ...defaultOptions,
    ...options,
  });
}

/**
 * Verifica se está usando backend externo
 */
export function isUsingExternalBackend(): boolean {
  return !!API_BASE_URL;
}

/**
 * Retorna informações sobre a configuração da API
 */
export function getApiInfo() {
  return {
    baseUrl: API_BASE_URL || 'API Routes local',
    isExternal: isUsingExternalBackend(),
    mode: isUsingExternalBackend() ? 'NestJS Backend' : 'Next.js API Routes',
  };
}
