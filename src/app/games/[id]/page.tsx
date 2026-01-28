import { getGameById, getAllGames } from "@/lib/freetogame";
import { Monitor, Globe, Calendar, Building, Code, ExternalLink, Cpu, HardDrive, MonitorPlay } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";

interface GameDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const games = await getAllGames();
  return games.slice(0, 50).map((game) => ({
    id: game.id.toString(),
  }));
}

export default async function GameDetailPage({ params }: GameDetailPageProps) {
  const { id } = await params;
  let game;

  try {
    game = await getGameById(parseInt(id));
  } catch {
    notFound();
  }

  if (!game) {
    notFound();
  }

  const PlatformIcon = game.platform.toLowerCase().includes("windows") ? Monitor : Globe;
  const releaseDate = new Date(game.release_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="page-transition min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        {/* Background Image */}
        <div className="absolute inset-0 h-[50vh]">
          <Image
            src={game.thumbnail}
            alt={game.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/80 to-gray-900" />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          {/* Back Button */}
          <BackButton className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm font-medium">
                  {game.genre}
                </span>
                <span className="flex items-center gap-1 px-3 py-1 bg-gray-800/80 text-gray-300 rounded-full text-sm">
                  <PlatformIcon className="w-3 h-3" />
                  {game.platform}
                </span>
                {game.status && (
                  <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm font-medium">
                    {game.status}
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {game.title}
              </h1>

              <p className="text-xl text-gray-300 mb-6">
                {game.short_description}
              </p>

              <a
                href={game.game_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25"
              >
                Play Now
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>

            {/* Game Info Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Game Info</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-400">Release Date</p>
                    <p className="text-white">{releaseDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-400">Publisher</p>
                    <p className="text-white">{game.publisher}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Code className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-400">Developer</p>
                    <p className="text-white">{game.developer}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description & Screenshots */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Description */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">About This Game</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                {game.description}
              </p>
            </div>

            {/* Screenshots */}
            {game.screenshots && game.screenshots.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-white mb-6">Screenshots</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {game.screenshots.map((screenshot) => (
                    <div
                      key={screenshot.id}
                      className="relative aspect-video rounded-xl overflow-hidden border border-gray-700/50"
                    >
                      <Image
                        src={screenshot.image}
                        alt={`${game.title} screenshot`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* System Requirements */}
          {game.minimum_system_requirements && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">System Requirements</h2>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold text-purple-400 mb-4">Minimum</h3>
                <div className="space-y-4">
                  {game.minimum_system_requirements.os && (
                    <div className="flex items-start gap-3">
                      <MonitorPlay className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-400">OS</p>
                        <p className="text-white text-sm">{game.minimum_system_requirements.os}</p>
                      </div>
                    </div>
                  )}
                  {game.minimum_system_requirements.processor && (
                    <div className="flex items-start gap-3">
                      <Cpu className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-400">Processor</p>
                        <p className="text-white text-sm">{game.minimum_system_requirements.processor}</p>
                      </div>
                    </div>
                  )}
                  {game.minimum_system_requirements.memory && (
                    <div className="flex items-start gap-3">
                      <HardDrive className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-400">Memory</p>
                        <p className="text-white text-sm">{game.minimum_system_requirements.memory}</p>
                      </div>
                    </div>
                  )}
                  {game.minimum_system_requirements.graphics && (
                    <div className="flex items-start gap-3">
                      <Monitor className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-400">Graphics</p>
                        <p className="text-white text-sm">{game.minimum_system_requirements.graphics}</p>
                      </div>
                    </div>
                  )}
                  {game.minimum_system_requirements.storage && (
                    <div className="flex items-start gap-3">
                      <HardDrive className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-400">Storage</p>
                        <p className="text-white text-sm">{game.minimum_system_requirements.storage}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
