import { motion, Variants } from "framer-motion";
import { Film, Star, Tv2, TrendingUp, Quote } from "lucide-react";

import { Card } from "../../components/home/Card";
import { useEffect, useState } from "react";
import { Media } from "../../types/types";
import {
  getEmCartaz,
  getMovieGenres,
  getPopularTv,
  getTvGenres,
  getTrendingMovie,
  getMovieVideos,
} from "../../services/mediaService";

export default function Home() {
  const [popularTV, setPopularTV] = useState<Media[]>([]);
  const [recentMovies, setRecentMovies] = useState<Media[]>([]);
  const [movieGenres, setMovieGenres] = useState<
    { id: number; name: string }[]
  >([]);
  const [tvGenres, setTvGenres] = useState<{ id: number; name: string }[]>([]);
  const [trailerMovie, setTrailerMovie] = useState<Media | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dataPopularTV, dataRecentMovies, movieGenresData, tvGenresData] =
          await Promise.all([
            getPopularTv(),
            getEmCartaz(),
            getMovieGenres(),
            getTvGenres(),
          ]);

        setPopularTV(dataPopularTV);
        setRecentMovies(dataRecentMovies);
        setMovieGenres(movieGenresData);
        setTvGenres(tvGenresData);
      } catch (error) {
        console.error("Ocorreu um erro na requisição: ", error);
      }
    };

    const fetchTrailerDoDia = async () => {
      try {
        const trending = await getTrendingMovie();
        const topMovie = trending[0];

        const videos = await getMovieVideos(topMovie.id);
        const trailer = videos.find(
          (vid: { type: string; site: string; key?: string }) =>
            vid.type === "Trailer" && vid.site === "YouTube"
        );

        setTrailerMovie(topMovie);
        setTrailerKey(trailer?.key || null);
      } catch (err) {
        console.error("Erro ao carregar trailer do dia:", err);
      }
    };

    fetchData();
    fetchTrailerDoDia();
  }, []);

  const getGenreNames = (ids: number[], source: "movie" | "tv") => {
    const genres = source === "movie" ? movieGenres : tvGenres;
    const names = ids
      .map((id) => genres.find((g) => g.id === id)?.name)
      .filter(Boolean);
    return names.join(", ") || "Gênero desconhecido";
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 1,
        ease: "easeOut",
      },
    }),
  };

  const formatRating = (value: number) => {
    return value.toFixed(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.section
        className="text-center mb-20"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <h1 className="text-5xl font-bold text-primary mb-6 flex justify-center items-center">
          Cine<span className="italic text-secondary">Finder</span>
        </h1>
        <p className="text-gray-300 text-xl max-w-3xl mx-auto">
          Seu guia definitivo para descobrir o melhor do cinema e da televisão.
          Mantenha-se atualizado com os últimos lançamentos e avaliações.
        </p>
      </motion.section>

      {/* Recent Releases */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-secondary mb-8 flex items-center gap-2">
          <Film className="w-6 h-6" />
          Últimos Lançamentos nos Cinemas
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {recentMovies.slice(0, 6).map((item, i) => (
            <Card
              key={item.id}
              title={item.title}
              genre={getGenreNames(item.genre_ids, "movie")}
              rating={item.vote_average ? item.vote_average.toFixed(1) : "N/A"}
              custom={i}
              variants={fadeUp}
              posterPath={item.poster_path}
            />
          ))}
        </div>
      </section>

      {/* Popular TV Shows */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-secondary mb-8 flex items-center gap-2">
          <Tv2 className="w-6 h-6" />
          Séries em Destaque
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {popularTV.slice(0, 6).map((item, i) => (
            <Card
              key={item.id}
              title={item.name}
              genre={getGenreNames(item.genre_ids, "movie")}
              rating={item.vote_average ? item.vote_average.toFixed(1) : "N/A"}
              custom={i}
              posterPath={item.poster_path}
              variants={fadeUp}
            />
          ))}
        </div>
      </section>

      {/* Trailer do Dia */}
      {trailerMovie && trailerKey && (
        <motion.section
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <h2 className="text-3xl font-bold text-secondary mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Trailer do Dia
          </h2>
          <div className="bg-gray-800/40 rounded-xl overflow-hidden shadow-lg">
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title={trailerMovie.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4 text-white">
              <h3 className="text-2xl font-semibold flex text-secondary items-center gap-2">
                <Film className="w-6 h-6 text-secondary" />
                {trailerMovie.title}
              </h3>
              <p className="text-gray-400 mt-2">{trailerMovie.overview}</p>
              <p className="text-secondary text-sm mt-2 flex items-center gap-1">
                <Star className="text-yellow-400" size={16}/>
                {`${
                  trailerMovie?.vote_average
                    ? formatRating(trailerMovie.vote_average)
                    : "N/A"
                }/10 `}
              </p>
            </div>
          </div>
        </motion.section>
      )}

      {/* Mensagem */}
      <section className="relative mb-20">
        <div className="bg-gray-900/70 backdrop-blur-sm p-12 rounded-lg text-center">
          <blockquote className="text-2xl italic text-secondary/80 max-w-2xl mx-auto">
            <Quote className="w-6 h-6 text-primary" />
            "A vida é como uma câmera. Foque no que é importante, capture os
            bons momentos, desenvolva com os negativos, e, se as coisas não
            derem certo, tire outra foto."
          </blockquote>
          <p className="text-secondary/40 mt-4">– Mensagem para cinéfilos 🍿</p>
        </div>
      </section>
    </div>
  );
}
