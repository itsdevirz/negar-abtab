// API configuration for static frontend (public_html) connecting to backend at 141.11.32.127

export const BACKEND_SERVER_IP = '141.11.32.127';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && !window.location.hostname.includes('run.app')
    ? `http://${BACKEND_SERVER_IP}:3000`
    : '');

/**
 * Returns full API URL for client-side fetches.
 * Supports static frontend on public_html making cross-origin API calls to backend at 141.11.32.127
 */
export function getApiUrl(endpointPath: string): string {
  const cleanPath = endpointPath.startsWith('/') ? endpointPath : `/${endpointPath}`;
  if (!API_BASE_URL) {
    return cleanPath;
  }
  return `${API_BASE_URL}${cleanPath}`;
}

export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
};
