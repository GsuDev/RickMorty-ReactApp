import { useState, useEffect, useRef } from "react";
import { type Character, type StatusFilter } from "../types";
import { fetchCharacters } from "../services/rickMortyApi";

export const useCharacters = () => {
  // Estado principal
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtros y busqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  // Paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Refs para evitar re-renders innecesarios
  const requestCount = useRef(0);

  // Funcion para cargar personajes de la API
  const loadCharacters = async (page: number, append = false) => {
    try {
      // Si es append mostramos loading en el boton, si no en toda la pagina
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);

      requestCount.current += 1;

      const data = await fetchCharacters({
        page,
        name: searchTerm,
        status: statusFilter,
      });

      // Agregamos al array existente o reemplazamos
      if (append) {
        setCharacters((prev) => [...prev, ...data.results]);
      } else {
        setCharacters(data.results);
      }

      // Verificamos si hay mas paginas
      setHasMore(data.info.next !== null);
    } catch (err) {
      const mensaje = err instanceof Error ? err.message : "Error desconocido";
      setError(mensaje);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Efecto para recargar cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
    loadCharacters(1, false);
  }, [searchTerm, statusFilter]);

  // Funcion para cargar la siguiente pagina
  const loadMore = () => {
    if (loadingMore || !hasMore) return;

    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    loadCharacters(nextPage, true);
  };

  return {
    characters,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    loadMore,
    hasMore,
    loadingMore,
  };
};
