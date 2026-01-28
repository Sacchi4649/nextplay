import Link from "next/link";
import {
  GameControllerIcon,
  RocketLaunchIcon,
  SparkleStarIcon,
  ShieldLockIcon,
  CommunityIcon,
  GlobeNetworkIcon,
  DiscoveryIcon,
  TrophyIcon,
  JourneyIcon,
} from "@/components/GamingIcons";

const features = [
  {
    icon: GameControllerIcon,
    title: "Extensive Game Library",
    description: "Access over 400+ free-to-play games across all platforms including PC, browser, and mobile.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: RocketLaunchIcon,
    title: "Real-time Updates",
    description: "Stay updated with the latest game releases, updates, and gaming news from the community.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: SparkleStarIcon,
    title: "Save Favorites",
    description: "Create your personal collection by saving your favorite games for quick access anytime.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: ShieldLockIcon,
    title: "Secure Authentication",
    description: "Your account is protected with industry-standard security powered by Clerk authentication.",
    gradient: "from-emerald-500 to-cyan-500",
  },
  {
    icon: CommunityIcon,
    title: "Community Driven",
    description: "Share gaming news and discover new titles recommended by fellow gamers.",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: GlobeNetworkIcon,
    title: "Cross-Platform",
    description: "Find games for any platform - whether you're on PC, browser, or looking for casual gaming.",
    gradient: "from-blue-500 to-violet-500",
  },
];

const techStack = [
  { name: "Next.js 16", description: "React Framework", color: "from-gray-400 to-gray-600" },
  { name: "Tailwind CSS 4", description: "Styling", color: "from-cyan-400 to-blue-500" },
  { name: "Clerk Auth", description: "Authentication", color: "from-purple-400 to-violet-500" },
  { name: "Supabase", description: "PostgreSQL Database", color: "from-emerald-400 to-green-500" },
  { name: "FreeToGame API", description: "Game Data", color: "from-orange-400 to-red-500" },
  { name: "GNews API", description: "Gaming News", color: "from-blue-400 to-indigo-500" },
  { name: "TypeScript", description: "Type Safety", color: "from-blue-400 to-blue-600" },
];

const stats = [
  { value: "400+", label: "Free Games", icon: GameControllerIcon },
  { value: "40+", label: "Categories", icon: TrophyIcon },
  { value: "24/7", label: "Available", icon: GlobeNetworkIcon },
  { value: "100%", label: "Free Forever", icon: SparkleStarIcon },
];

export default function AboutPage() {
  return (
    <div className="page-transition min-h-screen">
      {/* Hero Section with animated background */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full mb-8 backdrop-blur-sm">
            <TrophyIcon className="w-5 h-5" />
            <span className="text-purple-300 font-medium">About NextPlay</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Your Ultimate
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Free Gaming
            </span>
            <br />
            Destination
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            NextPlay is your gateway to discovering the best free-to-play games. 
            We aggregate hundreds of F2P titles, making it easy for you to find your next gaming adventure.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="group p-5 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
                >
                  <Icon className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-8">
                Our{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Mission
                </span>
              </h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  At NextPlay, we believe that great gaming experiences should be accessible to everyone. 
                  Our mission is to connect gamers with the best free-to-play games available, 
                  regardless of their platform or preferences.
                </p>
                <p>
                  We understand that finding quality F2P games can be overwhelming with thousands of 
                  options available. That is why we have created a curated platform that helps you 
                  discover, explore, and save your favorite games all in one place.
                </p>
                <p>
                  Whether you are into intense shooters, immersive MMORPGs, strategic card games, 
                  or casual browser games, NextPlay has something for everyone.
                </p>
              </div>
            </div>
            
            {/* Custom illustration area */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 p-8 flex items-center justify-center relative">
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-8 left-8 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 blur-xl" />
                  <div className="absolute bottom-12 right-12 w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 blur-xl" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 blur-2xl" />
                </div>
                
                {/* Central icon - Discovery compass represents finding games */}
                <div className="relative">
                  <DiscoveryIcon className="w-48 h-48 animate-float" />
                  
                  {/* Orbiting elements */}
                  <div className="absolute -top-4 -right-4 animate-bounce">
                    <SparkleStarIcon className="w-12 h-12" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 animate-bounce delay-500">
                    <GameControllerIcon className="w-10 h-10" />
                  </div>
                  <div className="absolute top-1/2 -right-8 animate-pulse">
                    <JourneyIcon className="w-10 h-10" />
                  </div>
                </div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full blur-3xl opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-pink-500 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                NextPlay
              </span>
              ?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              We have built NextPlay with gamers in mind, focusing on features that enhance your gaming discovery experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group relative p-8 bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Gradient border on hover */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <div className="relative">
                    {/* Icon container */}
                    <div className="mb-6 inline-block">
                      <div className="relative">
                        <Icon className="w-14 h-14 group-hover:scale-110 transition-transform duration-300" />
                        {/* Glow behind icon */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-full mb-6 backdrop-blur-sm">
              <RocketLaunchIcon className="w-5 h-5" />
              <span className="text-blue-300 font-medium">Technology Stack</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Built with Modern Tech</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              NextPlay is built using cutting-edge technologies for optimal performance.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="group relative p-5 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 overflow-hidden"
              >
                {/* Animated gradient line at top */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tech.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                
                <p className="text-white font-semibold mb-1">{tech.name}</p>
                <p className="text-gray-500 text-sm">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Attribution */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <GlobeNetworkIcon className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-6">Data Source</h2>
          <p className="text-gray-400 mb-8 text-lg">
            All game data is provided by the{" "}
            <a
              href="https://www.freetogame.com/api-doc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 underline decoration-purple-400/50 hover:decoration-purple-300 underline-offset-4 transition-colors"
            >
              FreeToGame API
            </a>
            , a comprehensive database of free-to-play games.
          </p>
          <div className="inline-flex items-center gap-4 p-6 bg-gray-800/50 rounded-2xl border border-gray-700/50">
            <GameControllerIcon className="w-10 h-10" />
            <div className="text-left">
              <p className="text-white font-semibold">FreeToGame.com</p>
              <p className="text-gray-500 text-sm">The Free-To-Play Games Database</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 md:p-16 rounded-3xl overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-pink-900/60 to-purple-900/80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent" />
            
            {/* Border glow */}
            <div className="absolute inset-0 rounded-3xl border border-purple-500/30" />
            
            {/* Content */}
            <div className="relative text-center">
              <TrophyIcon className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Explore?
              </h2>
              <p className="text-gray-300 mb-10 max-w-xl mx-auto text-lg">
                Start discovering amazing free-to-play games today. 
                Create an account to save your favorites and join our gaming community.
              </p>
              <Link
                href="/games"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-gray-900 font-bold rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-white/20"
              >
                <GameControllerIcon className="w-6 h-6" />
                Browse Games
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
