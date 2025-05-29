import { useEffect, useState } from "react";
import { Card } from "../../components/home/Card";
import { Media } from "../../types/types";
import {
  getEmCartaz,
  getMovieGenres,
  getPopularMovie,
  getTopRatedMovie,
  getUpcomingMovie,
  searchMovies,
} from "../../services/mediaService";
import { FilterButton } from "../../components/FilterButton";
import { SearchInput } from "../../components/SearchInput";

const filters = [
  { label: "Em Cartaz", value: "now_playing" },
  { label: "Populares", value: "popular" },
  { label: "Bem Avaliados", value: "top_rated" },
  { label: "Em Breve", value: "upcoming" },
];

const fetchFilteredMovies = async (filter: string): Promise<Media[]> => {
    switch (filter) {
      case "now_playing":
        return getEmCartaz();
      case "popular":
        return getPopularMovie();
      case "top_rated":
        return getTopRatedMovie();
      case "upcoming":
        return getUpcomingMovie();
      default:
        return [];
    }
  };

export default function Movies() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("now_playing");
  const [movies, setMovies] = useState<Media[]>([]);
  const [movieGenres, setMovieGenres] = useState<
    { id: number; name: string }[]
  >([]);

  // 🔍 Buscar filmes com debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim()) {
        searchMovies(search).then(setMovies);
      } else {
        fetchFilteredMovies(activeFilter).then(setMovies);
      }
    }, 600);

    return () => clearTimeout(delayDebounce);
  }, [search, activeFilter]);

  // 👇 Busca por filtro ao trocar botão
  useEffect(() => {
    if (!search) {
      fetchFilteredMovies(activeFilter).then(setMovies);
    }
  }, [activeFilter, search]);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const [ movieGenresData] =
            await Promise.all([

              getMovieGenres(),

            ]);
  
   
          setMovieGenres(movieGenresData);

        } catch (error) {
          console.error("Ocorreu um erro na requisição: ", error);
        }
      };

      fetchData();
  }, []);

  const getGenreNames = (ids: number[], source: "movie" | "tv") => {
    const genres = source === "movie" ? movieGenres : movieGenres;
    const names = ids
      .map((id) => genres.find((g) => g.id === id)?.name)
      .filter(Boolean);
    return names.join(", ") || "Gênero desconhecido";
  };


  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Filmes</h1>

      {/* Busca */}
      <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />

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
        //   <button
        //     key={filter.value}
        //     onClick={() => {
        //       setActiveFilter(filter.value);
        //       setSearch(""); // limpa busca ao trocar filtro
        //     }}
        //     className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        //       activeFilter === filter.value
        //         ? "bg-secondary text-black"
        //         : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        //     }`}
        //   >
        //     {filter.label}
        //   </button>
        ))}
      </div>

      {/* Resultado */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.length > 0 ? (
          movies.map((movie, i) => (
            <Card
              key={movie.id}
              title={movie.title}
              genre={getGenreNames(movie.genre_ids, "movie")}
              rating={movie.vote_average?.toFixed(1)}
              posterPath={movie.poster_path}
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
          <p className="text-gray-400 col-span-full">Nenhum filme encontrado.</p>
        )}
      </div>
    </div>
  );
}
