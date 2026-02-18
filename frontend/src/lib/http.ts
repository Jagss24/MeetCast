import api from '@/api/api';
import { createSearchParams } from 'react-router-dom';

export type TSearchParams = Record<string, string | number | boolean>;
/* ---------------- POST ---------------- */

export const post = async <TResponse, TRequest = unknown>({
  url,
  data,
  responseType = 'json',
}: {
  url: string;
  data?: TRequest;
  responseType?: 'json' | 'blob';
}): Promise<TResponse> => {
  const response = await api.post<TResponse>(url, data, {
    responseType,
  });

  return response.data;
};

/* ---------------- PATCH ---------------- */

export const patch = async <TResponse, TRequest = unknown>({
  url,
  data,
}: {
  url: string;
  data?: TRequest;
}): Promise<TResponse> => {
  const response = await api.patch<TResponse>(url, data);
  return response.data;
};

/* ---------------- PUT ---------------- */

export const put = async <TResponse, TRequest = unknown>({
  url,
  data,
}: {
  url: string;
  data?: TRequest;
}): Promise<TResponse> => {
  const response = await api.put<TResponse>(url, data);
  return response.data;
};

/* ---------------- DELETE ---------------- */

export const remove = async <TResponse, TRequest = unknown>({
  url,
  data,
}: {
  url: string;
  data?: TRequest;
}): Promise<TResponse> => {
  const response = await api.delete<TResponse>(url, { data });
  return response.data;
};

/* ---------------- GET ---------------- */

export const get = async <TResponse>({
  url,
  searchParams,
  signal,
}: {
  url: string;
  searchParams?: TSearchParams;
  signal?: AbortSignal;
}): Promise<TResponse> => {
  const query = searchParams
    ? `?${createSearchParams(
        Object.entries(searchParams).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: String(value),
          }),
          {} as Record<string, string>
        )
      ).toString()}`
    : '';
  const config = signal ? { signal } : {};
  const response = await api.get<TResponse>(`${url}${query}`, config);

  return response.data;
};
