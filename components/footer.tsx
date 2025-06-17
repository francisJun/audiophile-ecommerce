import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand and Description */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="text-2xl font-bold block">
              audiophile
            </Link>
            <p className="text-gray-300 max-w-md">
              Audiophile is an all in one stop to fulfill your audio needs.
              We're a small team of music lovers and sound specialists who are
              devoted to helping you get the most out of personal audio. Come
              and visit our demo facility - we're open 7 days a week.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-1 lg:col-start-3">
            <h3 className="text-white font-bold mb-6 text-sm tracking-wider">
              NAVIGATION
            </h3>
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="hover:text-orange-500 transition-colors text-sm"
              >
                HOME
              </Link>
              <Link
                href="/headphones"
                className="hover:text-orange-500 transition-colors text-sm"
              >
                HEADPHONES
              </Link>
              <Link
                href="/speakers"
                className="hover:text-orange-500 transition-colors text-sm"
              >
                SPEAKERS
              </Link>
              <Link
                href="/earphones"
                className="hover:text-orange-500 transition-colors text-sm"
              >
                EARPHONES
              </Link>
            </nav>
          </div>

          {/* Social Links */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-white font-bold mb-6 text-sm tracking-wider">
              SOCIAL
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-orange-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:text-orange-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:text-orange-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-16 pt-8">
          <p className="text-gray-400 text-sm text-center md:text-left">
            Copyright {new Date().getFullYear()}. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
