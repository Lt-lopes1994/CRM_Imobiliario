export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthLoginResponse {
  accessToken: string;
  user: AuthUser;
}

const ACCESS_TOKEN_KEY = "accessToken";
const AUTH_USER_KEY = "authUser";
const AUTH_EVENT_NAME = "crm-auth-changed";

function dispatchAuthChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(AUTH_EVENT_NAME));
}

export function saveAuthSession(data: AuthLoginResponse) {
  if (typeof window === "undefined") return;

  localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));
  dispatchAuthChanged();
}

export function clearAuthSession() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  dispatchAuthChanged();
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  const rawUser = localStorage.getItem(AUTH_USER_KEY);
  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser) as AuthUser;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!getAccessToken();
}

export function onAuthChanged(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  window.addEventListener(AUTH_EVENT_NAME, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(AUTH_EVENT_NAME, callback);
    window.removeEventListener("storage", callback);
  };
}
