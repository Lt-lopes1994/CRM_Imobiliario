/**
 * Configuração central da API
 *
 * Usa exclusivamente o backend externo (NestJS)
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ?? "";

/**
 * Constrói a URL completa da API
 *
 * @param endpoint - Caminho do endpoint (ex: "/properties", "/admin/dashboard")
 * @returns URL completa para fazer requisição
 *
 * @example
 * getApiUrl("/properties") // => "https://crm-imobiliario-back.onrender.com/v1/properties"
 */
export function getApiUrl(endpoint: string): string {
  if (!API_BASE_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_URL não está configurada. Defina a URL do backend Nest.js no arquivo .env.",
    );
  }

  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint.slice(1)
    : endpoint;

  return `${API_BASE_URL}/${normalizedEndpoint}`;
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
  options?: RequestInit,
): Promise<Response> {
  const url = getApiUrl(endpoint);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
    baseUrl: API_BASE_URL || "Não configurada",
    isExternal: isUsingExternalBackend(),
    mode: "NestJS Backend",
  };
}
