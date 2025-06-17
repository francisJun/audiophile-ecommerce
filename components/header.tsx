"use client"

import Link from "next/link"
import { ShoppingCart, Menu } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"

export default function Header() {
  const { state, dispatch } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4 border-b border-gray-800">
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-6 w-6" />
          </button>

          <Link href="/" className="text-2xl font-bold">
            audiophile
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-orange-500 transition-colors">
              HOME
            </Link>
            <Link href="/headphones" className="hover:text-orange-500 transition-colors">
              HEADPHONES
            </Link>
            <Link href="/speakers" className="hover:text-orange-500 transition-colors">
              SPEAKERS
            </Link>
            <Link href="/earphones" className="hover:text-orange-500 transition-colors">
              EARPHONES
            </Link>
          </nav>

          <button
            onClick={() => dispatch({ type: "TOGGLE_CART" })}
            className="relative hover:text-orange-500 transition-colors"
          >
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-4">
            <Link href="/" className="block hover:text-orange-500 transition-colors">
              HOME
            </Link>
            <Link href="/headphones" className="block hover:text-orange-500 transition-colors">
              HEADPHONES
            </Link>
            <Link href="/speakers" className="block hover:text-orange-500 transition-colors">
              SPEAKERS
            </Link>
            <Link href="/earphones" className="block hover:text-orange-500 transition-colors">
              EARPHONES
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
