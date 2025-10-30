import { useEffect, useState } from "react";
import { Card } from "../../components/home/Card";
import { Media } from "../../types/types";
import {
  getAiringTodayTv,
  getOnTheAirTv,
  getPopularTv,
  getTopRatedTv,
  searchTv,
  getTvGenres,
} from "../../services/mediaService";
import { FilterButton } from "../../components/FilterButton";
import { SearchInput } from "../../components/SearchInput";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "../../../@/components/ui/pagination"

const filters = [
  { label: "No Ar Hoje", value: "airing_today" },
  { label: "Populares", value: "popular" },
  { label: "Bem Avaliadas", value: "top_rated" },
  { label: "Em Exibição", value: "on_the_air" },
];

const fetchFilteredSeries = async (filter: string, page: number = 1) => {
  switch (filter) {
    case "airing_today":
      return getAiringTodayTv(page);
    case "popular":
      return getPopularTv(page);
    case "top_rated":
      return getTopRatedTv(page);
    case "on_the_air":
      return getOnTheAirTv(page);
    default:
      return { results: [], total_pages: 0, total_results: 0 };
  }
};

export default function Series() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("airing_today");
  const [series, setSeries] = useState<Media[]>([]);
  const [seriesGenres, setSeriesGenres] = useState<{ id: number; name: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // 🔍 Buscar séries
  useEffect(() => {
    const fetchSeries = async () => {
      setIsLoading(true);
      try {
        let data;
        if (search.trim()) {
          data = await searchTv(search, currentPage);
        } else {
          data = await fetchFilteredSeries(activeFilter, currentPage);
        }
        setSeries(data.results);
        setTotalPages(data.total_pages);
        setTotalResults(data.total_results);
      } catch (error) {
        console.error("Erro ao buscar séries:", error);
        setSeries([]);
        setTotalPages(1);
        setTotalResults(0);
      } finally {
        setIsLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchSeries, 600);
    return () => clearTimeout(delayDebounce);
  }, [search, activeFilter, currentPage]);

  // 👇 Resetar página quando mudar filtro ou busca
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [seriesGenresData] = await Promise.all([
          getTvGenres(),
        ]);
        setSeriesGenres(seriesGenresData);
      } catch (error) {
        console.error("Ocorreu um erro na requisição: ", error);
      }
    };
    fetchData();
  }, []);

  const getGenreNames = (ids: number[]) => {
    const names = ids
      .map((id) => seriesGenres.find((g) => g.id === id)?.name)
      .filter(Boolean);
    return names.join(", ") || "Gênero desconhecido";
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Séries</h1>

      {/* Busca */}
      <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />

      {/* Contador de resultados */}
      {!isLoading && series.length > 0 && (
        <p className="text-gray-400 mb-4">
          {totalResults.toLocaleString()} {totalResults === 1 ? 'série encontrada' : 'séries encontradas'}
        </p>
      )}

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 mb-8">
        {filters.map((filter) => (
          <FilterButton
            key={filter.value}
            label={filter.label}
            isActive={activeFilter === filter.value}
            onClick={() => {
              setActiveFilter(filter.value);
              setSearch(""); 
            }}
          />
        ))}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
        </div>
      )}

      {/* Resultado */}
      {!isLoading && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
            {series.length > 0 ? (
              series.map((serie, i) => (
                <Card
                  key={serie.id}
                  title={serie.name || serie.title}
                  genre={getGenreNames(serie.genre_ids)}
                  rating={serie.vote_average?.toFixed(1)}
                  posterPath={serie.poster_path}
                  custom={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: (i) => ({
                      opacity: 1,
                      y: 0,
                      transition: { delay: i * 0.08, duration: 0.5, ease: "easeInOut" },
                    }),
                  }}
                />
              ))
            ) : (
              <p className="text-gray-400 col-span-full text-center py-8">
                {search ? "Nenhuma série encontrada para sua busca." : "Nenhuma série encontrada."}
              </p>
            )}
          </div>

          {/* Paginação */}
          {series.length > 0 && totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    size="default"
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={
                      currentPage === 1 
                        ? "pointer-events-none opacity-50" 
                        : "cursor-pointer hover:bg-secondary hover:text-black"
                    }
                  />
                </PaginationItem>

                {/* Primeira página */}
                {currentPage > 3 && (
                  <>
                    <PaginationItem>
                      <PaginationLink
                        size="default"
                        onClick={() => handlePageChange(1)}
                        className="cursor-pointer hover:bg-secondary hover:text-black"
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    {currentPage > 4 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                  </>
                )}

                {/* Páginas do meio */}
                {generatePageNumbers().map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      size="default"
                      isActive={currentPage === page}
                      onClick={() => handlePageChange(page)}
                      className="cursor-pointer hover:bg-secondary hover:text-black"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {/* Última página */}
                {currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationLink
                        size="default"
                        onClick={() => handlePageChange(totalPages)}
                        className="cursor-pointer hover:bg-secondary hover:text-black"
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                <PaginationItem>
                  <PaginationNext 
                    size="default"
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={
                      currentPage === totalPages 
                        ? "pointer-events-none opacity-50" 
                        : "cursor-pointer hover:bg-secondary hover:text-black"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}