import { Github, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Next
                </span>
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Play
                </span>
                <span className="text-pink-500">_</span>
              </span>
            </Link>
            <p className="text-gray-400 max-w-md">
              Discover the best free-to-play games! Browse, explore, and save your favorite games from a massive collection of F2P titles.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://github.com/Sacchi4649/nextplay"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
          
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/games" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Browse Games
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Latest News
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-gray-400 hover:text-purple-400 transition-colors">
                  My Favorites
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-purple-400 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/games?category=mmorpg" className="text-gray-400 hover:text-purple-400 transition-colors">
                  MMORPG
                </Link>
              </li>
              <li>
                <Link href="/games?category=shooter" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Shooter
                </Link>
              </li>
              <li>
                <Link href="/games?category=moba" className="text-gray-400 hover:text-purple-400 transition-colors">
                  MOBA
                </Link>
              </li>
              <li>
                <Link href="/games?category=battle-royale" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Battle Royale
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} NextPlay. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Game data provided by{" "}
              <a
                href="https://www.freetogame.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300"
              >
                FreeToGame
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
