import { type ApiResponse, type StatusFilter } from '../types';

const BASE_URL = 'https://rickandmortyapi.com/api';

interface FetchCharactersParams {
  page?: number;
  name?: string;
  status?: StatusFilter;
}

export const fetchCharacters = async ({
  page = 1,
  name = '',
  status = 'all',
}: FetchCharactersParams): Promise<ApiResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
  });

  if (name) {
    params.append('name', name);
  }

  if (status !== 'all') {
    params.append('status', status);
  }

  const response = await fetch(`${BASE_URL}/character?${params}`);

  if (!response.ok) {
    if (response.status === 404) {
      return {
        info: {
          count: 0,
          pages: 0,
          next: null,
          prev: null,
        },
        results: [],
      };
    }
    throw new Error(`Error fetching characters: ${response.statusText}`);
  }

  return response.json();
};