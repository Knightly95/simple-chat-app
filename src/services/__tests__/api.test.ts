import { describe, it, expect, beforeEach, vi } from 'vitest';
import { api } from '../api';

global.fetch = vi.fn();

describe('api', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('get', () => {
    it('makes GET request with correct URL and headers', async () => {
      const mockResponse = { data: 'test' };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await api.get('/test');

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/test',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Authorization: 'Bearer super-secret-doodle-token',
          }),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('appends query params to URL', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({}),
      } as Response);

      await api.get('/test', {
        params: { limit: 10, after: 'cursor123' },
      });

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/test?limit=10&after=cursor123',
        expect.any(Object)
      );
    });

    it('skips undefined params', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({}),
      } as Response);

      await api.get('/test', {
        params: { limit: 10, after: undefined },
      });

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/test?limit=10',
        expect.any(Object)
      );
    });

    it('throws error when response is not ok with error message', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        status: 404,
        json: async () => ({ error: 'Not found' }),
      } as Response);

      await expect(api.get('/test')).rejects.toThrow('Not found');
    });

    it('throws error when response is not ok without error message', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({}),
      } as Response);

      await expect(api.get('/test')).rejects.toThrow('HTTP 500');
    });

    it('throws error when response json parsing fails', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      } as Response);

      await expect(api.get('/test')).rejects.toThrow('Unknown error');
    });
  });

  describe('post', () => {
    it('makes POST request with data', async () => {
      const mockResponse = { id: '1', message: 'Created' };
      const postData = { message: 'Test', author: 'User' };

      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await api.post('/test', postData);

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/test',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Authorization: 'Bearer super-secret-doodle-token',
          }),
          body: JSON.stringify(postData),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('makes POST request without data', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({}),
      } as Response);

      await api.post('/test');

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/test',
        expect.objectContaining({
          method: 'POST',
          body: undefined,
        })
      );
    });

    it('appends query params to POST URL', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({}),
      } as Response);

      await api.post('/test', { data: 'test' }, { params: { version: 2 } });

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/test?version=2',
        expect.any(Object)
      );
    });

    it('throws error on POST failure', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ error: 'Bad request' }),
      } as Response);

      await expect(api.post('/test', {})).rejects.toThrow('Bad request');
    });
  });
});
