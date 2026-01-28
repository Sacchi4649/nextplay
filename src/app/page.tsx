import { getAllGames } from "@/lib/freetogame";
import GameCard from "@/components/GameCard";
import { Sword, Flame, Crown, Rocket, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  const games = await getAllGames();
  const featuredGames = games.slice(0, 6);
  const popularGames = games.slice(6, 12);

  const stats = [
    { icon: Sword, label: "Free Games", value: `${games.length}+` },
    { icon: Flame, label: "Active Players", value: "1M+" },
    { icon: Crown, label: "Game Categories", value: "40+" },
    { icon: Rocket, label: "New Games/Month", value: "10+" },
  ];

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center hero-pattern grid-pattern overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full mb-8">
              <Rocket className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">
                Discover {games.length}+ Free Games
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">Your Gateway to</span>
              <br />
              <span className="gradient-text glow-text">Free Gaming</span>
            </h1>

            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Explore the best free-to-play games across all platforms. 
              From epic MMORPGs to intense shooters - find your next adventure today.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/games"
                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 btn-glow"
              >
                Browse Games
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 text-white font-semibold border border-gray-700 hover:border-purple-500/50 hover:bg-purple-500/10 rounded-xl transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 card-lift"
                >
                  <Icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Featured Games</h2>
              <p className="text-gray-400">Handpicked titles for you to explore</p>
            </div>
            <Link
              href="/games"
              className="hidden sm:flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/games"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              View All Games
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Games Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Popular Right Now</h2>
              <p className="text-gray-400">What gamers are playing</p>
            </div>
            <Link
              href="/games?sort-by=popularity"
              className="hidden sm:flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              See More
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500/20 glow">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Playing?
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Sign up now to save your favorite games, get personalized recommendations, 
              and stay updated with the latest gaming news.
            </p>
            <Link
              href="/games"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              Explore Games
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
