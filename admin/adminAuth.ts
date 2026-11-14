const STORAGE_KEY = "pavani_portfolio_admin_token";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
}

export function setAdminToken(token: string, remember: boolean = true): void {
  if (typeof window === "undefined") return;
  if (remember) {
    localStorage.setItem(STORAGE_KEY, token);
  } else {
    sessionStorage.setItem(STORAGE_KEY, token);
  }
}

export function clearAdminToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(STORAGE_KEY);
}

export function isAdminLoggedIn(): boolean {
  return Boolean(getAdminToken());
}

export function getApiUrl(): string {
  const envUrl = import.meta.env["VITE_API_URL"];
  if (envUrl && typeof envUrl === "string" && envUrl.trim().length > 0) {
    return envUrl.replace(/\/+$/, "");
  }
  return "http://localhost:5000";
}
