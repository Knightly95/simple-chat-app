import { API_CONFIG } from '@/constants/api';

const headers = {
  'Content-Type': API_CONFIG.HEADERS.CONTENT_TYPE,
  Authorization: `${API_CONFIG.HEADERS.BEARER} ${API_CONFIG.TOKEN}`,
};

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | undefined>;
}

function buildUrl(
  endpoint: string,
  params?: Record<string, string | number | undefined>
) {
  const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  return url.toString();
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }
  return response.json();
}

export const api = {
  get: (endpoint: string, options?: FetchOptions) =>
    fetch(buildUrl(endpoint, options?.params), {
      ...options,
      method: 'GET',
      headers,
    }).then(handleResponse),

  post: (endpoint: string, data?: unknown, options?: FetchOptions) =>
    fetch(buildUrl(endpoint, options?.params), {
      ...options,
      method: 'POST',
      headers,
      body: data ? JSON.stringify(data) : undefined,
    }).then(handleResponse),
};
