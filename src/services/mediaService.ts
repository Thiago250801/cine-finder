import axios from "axios";
import { Media } from "../types/types";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "098df0c545fdf121a70f1905a09e0d1e",
    language: "pt-BR",
  },
});

// Lista de Filmes Populares
export const getPopularMovie = async () => {
  const response = await api.get("/movie/popular");
  return response.data.results;
};

// Pega as informações de um filme específico
export const getDetailsMedia = async (
  id: number,
  type: "movie" | "tv" = "movie"
) => {
  const response = await api.get(`${type}/${id}`);
  return response.data;
};

export const getDetailsMediaTv = async (id: number) => {
  const response = await api.get(`/tv/${id}`);
  return response.data;
};

export const getTopRatedMovie = async () => {
  const response = await api.get("/movie/top_rated");
  return response.data.results;
};

export const getUpcomingMovie = async () => {
  const response = await api.get("/movie/upcoming");
  return response.data.results;
};

export const getEmCartaz = async () => {
  const response = await api.get("/movie/now_playing");
  return response.data.results;
};

export const getPopularTv = async () => {
  const response = await api.get("/tv/popular");
  return response.data.results;
};

export const getTopRatedTv = async () => {
  const response = await api.get("tv/top_rated");
  return response.data.results;
};

export const getAiringTodayTv = async () => {
  const response = await api.get("/tv/airing_today");
  return response.data.results;
};

export const getOnTheAirTv = async () => {
  const response = await api.get("/tv/on_the_air");
  return response.data.results;
};

export const getMovieGenres = async () => {
  const response = await api.get("/genre/movie/list");
  return response.data.genres; // array de objetos { id, name }
};

export const getTvGenres = async () => {
  const response = await api.get("/genre/tv/list");
  return response.data.genres;
};

export const getTrendingMovie = async () => {
  const response = await api.get("/trending/movie/day");
  return response.data.results;
};

export const getMovieVideos = async (movieId: number) => {
  const response = await api.get(`/movie/${movieId}/videos`);
  return response.data.results;
};

export const searchMovies = async (query: string): Promise<Media[]> => {
  const response = await api.get("/search/movie", {
    params: { query },
  });

  return response.data.results
    .sort((a: Media, b: Media) => (b.vote_average || 0) - (a.vote_average || 0));
};
