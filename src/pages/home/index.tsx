

export default function Home() {
  const recentReleases = [
    { title: "Duna: Parte 2", rating: "8.5", genre: "Ficção Científica" },
    { title: "Pobres Criaturas", rating: "8.3", genre: "Drama/Fantasia" },
    { title: "Argylle", rating: "7.9", genre: "Ação/Espionagem" },
  ];

  const popularShows = [
    { title: "True Detective S4", rating: "8.7", genre: "Crime/Drama" },
    { title: "The Bear S2", rating: "8.9", genre: "Drama/Comédia" },
    { title: "House of the Dragon", rating: "8.5", genre: "Fantasia" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold text-primary mb-6">Cine<span className="italic text-secondary">Finder</span></h1>
        <p className="text-gray-300 text-xl max-w-3xl mx-auto">
          Seu guia definitivo para descobrir o melhor do cinema e da televisão.
          Mantenha-se atualizado com os últimos lançamentos e avaliações.
        </p>
      </section>

      {/* Recent Releases */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-secondary mb-8">
          Últimos Lançamentos nos Cinemas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentReleases.map((movie) => (
            <div
              key={movie.title}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {movie.title}
              </h3>
              <div className="flex justify-between text-gray-300 mb-4">
                <span>{movie.genre}</span>
                <span className="flex items-center">⭐ {movie.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular TV Shows */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-secondary mb-8">
          Séries em Destaque
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularShows.map((show) => (
            <div
              key={show.title}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {show.title}
              </h3>
              <div className="flex justify-between text-gray-300 mb-4">
                <span>{show.genre}</span>
                <span className="flex items-center">⭐ {show.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-gray-800/30 rounded-lg p-8 text-center">
          <span className="text-4xl font-bold text-white block mb-2">
            1000+
          </span>
          <span className="text-gray-300">Filmes Catalogados</span>
        </div>
        <div className="bg-gray-800/30 rounded-lg p-8 text-center">
          <span className="text-4xl font-bold text-white block mb-2">500+</span>
          <span className="text-gray-300">Séries Disponíveis</span>
        </div>
        <div className="bg-gray-800/30 rounded-lg p-8 text-center">
          <span className="text-4xl font-bold text-white block mb-2">10k+</span>
          <span className="text-gray-300">Avaliações de Usuários</span>
        </div>
      </section>
    </div>
  );
}
