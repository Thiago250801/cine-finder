import axios from "axios";
import { Media } from "../types/types";

const { VITE_API_KEY } = import.meta.env;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: VITE_API_KEY,
    language: "pt-BR",
  },
});

export type PagedResponse = {
  results: Media[];
  total_pages: number;
  total_results: number;
};

// Para a HomePage
export const getPopularTvHome = async (): Promise<Media[]> => {
  const response = await api.get("/tv/popular");
  return response.data.results;
};

export const getEmCartazHome = async (): Promise<Media[]> => {
  const response = await api.get("/movie/now_playing");
  return response.data.results;
};

export const getTrendingMovieHome = async (): Promise<Media[]> => {
  const response = await api.get("/trending/movie/day");
  return response.data.results;
};

// 🎬 Filmes — listagens com paginação
export const getPopularMovie = async (page = 1): Promise<PagedResponse> => {
  const response = await api.get("/movie/popular", { params: { page } });
  return {
    results: response.data.results,
    total_pages: response.data.total_pages,
    total_results: response.data.total_results,
  };
};

export const getTopRatedMovie = async (page = 1): Promise<PagedResponse> => {
  const response = await api.get("/movie/top_rated", { params: { page } });
  return {
    results: response.data.results,
    total_pages: response.data.total_pages,
    total_results: response.data.total_results,
  };
};

export const getUpcomingMovie = async (page = 1): Promise<PagedResponse> => {
  const response = await api.get("/movie/upcoming", { params: { page } });
  return {
    results: response.data.results,
    total_pages: response.data.total_pages,
    total_results: response.data.total_results,
  };
};

export const getEmCartaz = async (page = 1): Promise<PagedResponse> => {
  const response = await api.get("/movie/now_playing", { params: { page } });
  return {
    results: response.data.results,
    total_pages: response.data.total_pages,
    total_results: response.data.total_results,
  };
};

// 🎥 Séries de TV — listagens com paginação
export const getPopularTv = async (page = 1): Promise<PagedResponse> => {
  const response = await api.get("/tv/popular", { params: { page } });
  return {
    results: response.data.results,
    total_pages: response.data.total_pages,
    total_results: response.data.total_results,
  };
};

export const getTopRatedTv = async (page = 1): Promise<PagedResponse> => {
  const response = await api.get("/tv/top_rated", { params: { page } });
  return {
    results: response.data.results,
    total_pages: response.data.total_pages,
    total_results: response.data.total_results,
  };
};

export const getAiringTodayTv = async (page = 1): Promise<PagedResponse> => {
  const response = await api.get("/tv/airing_today", { params: { page } });
  return {
    results: response.data.results,
    total_pages: response.data.total_pages,
    total_results: response.data.total_results,
  };
};

export const getOnTheAirTv = async (page = 1): Promise<PagedResponse> => {
  const response = await api.get("/tv/on_the_air", { params: { page } });
  return {
    results: response.data.results,
    total_pages: response.data.total_pages,
    total_results: response.data.total_results,
  };
};

// 🔍 Busca de filmes e séries
export const searchMovies = async (
  query: string,
  page = 1
): Promise<PagedResponse> => {
  const response = await api.get("/search/movie", {
    params: { query, page },
  });
  const { results, total_pages, total_results } = response.data;
  return {
    results: results.sort(
      (a: Media, b: Media) => (b.vote_average || 0) - (a.vote_average || 0)
    ),
    total_pages,
    total_results,
  };
};

export const searchTv = async (
  query: string,
  page = 1
): Promise<PagedResponse> => {
  const response = await api.get("/search/tv", {
    params: { query, page },
  });
  const { results, total_pages, total_results } = response.data;
  return {
    results: results.sort(
      (a: Media, b: Media) => (b.vote_average || 0) - (a.vote_average || 0)
    ),
    total_pages,
    total_results,
  };
};

// 📺 Detalhes de filmes e séries
export const getDetailsMedia = async (
  id: number,
  type: "movie" | "tv" = "movie"
) => {
  const response = await api.get(`/${type}/${id}`);
  return response.data;
};

export const getDetailsMediaTv = async (id: number) => {
  const response = await api.get(`/tv/${id}`);
  return response.data;
};

// 🎞️ Outros
export const getTrendingMovie = async (page = 1): Promise<PagedResponse> => {
  const response = await api.get("/trending/movie/day", { params: { page } });
  return {
    results: response.data.results,
    total_pages: response.data.total_pages,
    total_results: response.data.total_results,
  };
};

export const getMovieVideos = async (movieId: number) => {
  const response = await api.get(`/movie/${movieId}/videos`);
  return response.data.results;
};

// 🎭 Gêneros
export const getMovieGenres = async () => {
  const response = await api.get("/genre/movie/list");
  return response.data.genres;
};

export const getTvGenres = async () => {
  const response = await api.get("/genre/tv/list");
  return response.data.genres;
};
