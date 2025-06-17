"use client";

import { useCart } from "@/lib/cart-context";
import { X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ResponsiveImage } from "./ui/responsive-image";

export default function CartSidebar() {
  const { state, dispatch } = useCart();

  if (!state.isOpen) return null;

  const subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold">CART ({totalItems})</h2>
          <button
            onClick={() => dispatch({ type: "CLOSE_CART" })}
            className="hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {state.items.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Your cart is empty</p>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Remove all</span>
                <button
                  onClick={() => dispatch({ type: "CLEAR_CART" })}
                  className="text-sm text-gray-600 hover:text-black underline"
                >
                  Remove all
                </button>
              </div>

              {state.items.map(item => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="w-16 h-16 relative rounded overflow-hidden">
                    <ResponsiveImage
                      sources={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                    <p className="text-gray-600 text-sm">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-100 rounded">
                    <button
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: { id: item.id, quantity: item.quantity - 1 }
                        })
                      }
                      className="p-2 hover:bg-gray-200 rounded"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-2 text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: { id: item.id, quantity: item.quantity + 1 }
                        })
                      }
                      className="p-2 hover:bg-gray-200 rounded"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-600">TOTAL</span>
                  <span className="text-lg font-semibold">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => dispatch({ type: "CLOSE_CART" })}
                >
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    CHECKOUT
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
