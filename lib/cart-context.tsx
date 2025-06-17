"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode, useEffect } from "react"
import type { CartItem } from "./types"

// Key for localStorage
const CART_STORAGE_KEY = 'audiophile_cart';

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "CLOSE_CART" }
  | { type: "LOAD_CART"; payload: CartState }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

// Load cart from localStorage
const loadCart = (): CartState => {
  if (typeof window === 'undefined') {
    return { items: [], isOpen: false };
  }
  
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (!savedCart) return { items: [], isOpen: false };
    
    const parsedCart = JSON.parse(savedCart);
    
    // Ensure items have the correct image structure
    const normalizedItems = parsedCart.items?.map((item: any) => ({
      ...item,
      // If image is a string (old format), convert it to the new format
      image: typeof item.image === 'string' 
        ? { 
            mobile: item.image, 
            tablet: item.image, 
            desktop: item.image 
          }
        : item.image
    })) || [];
    
    // Always return with isOpen: false to ensure cart starts closed
    return {
      items: normalizedItems,
      isOpen: false
    };
  } catch (error) {
    console.error('Failed to load cart from localStorage', error);
    return { items: [], isOpen: false };
  }
};

// Save cart to localStorage
const saveCart = (state: CartState) => {
  if (typeof window === 'undefined') return;
  
  try {
    // Save both items and isOpen state to localStorage
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({
      items: state.items,
      isOpen: state.isOpen
    }));
  } catch (error) {
    console.error('Failed to save cart to localStorage', error);
  }
};

function cartReducer(state: CartState, action: CartAction): CartState {
  let newState: CartState;
  
  switch (action.type) {
    case "LOAD_CART":
      return action.payload;
      
    case "ADD_ITEM":
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        newState = {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id 
              ? { ...item, quantity: item.quantity + action.payload.quantity } 
              : item
          ),
        };
      } else {
        newState = {
          ...state,
          items: [...state.items, action.payload],
        };
      }
      saveCart(newState);
      return newState;
      
    case "REMOVE_ITEM":
      newState = {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
      saveCart(newState);
      return newState;
      
    case "UPDATE_QUANTITY":
      if (action.payload.quantity <= 0) {
        newState = {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
        };
      } else {
        newState = {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id 
              ? { ...item, quantity: action.payload.quantity } 
              : item
          ),
        };
      }
      saveCart(newState);
      return newState;
      
    case "CLEAR_CART":
      newState = {
        ...state,
        items: [],
      };
      saveCart(newState);
      return newState;
      
    case "TOGGLE_CART":
      newState = {
        ...state,
        isOpen: !state.isOpen,
      };
      saveCart(newState);
      return newState;
      
    case "CLOSE_CART":
      newState = {
        ...state,
        isOpen: false,
      };
      saveCart(newState);
      return newState;
      
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = loadCart();
    dispatch({ type: "LOAD_CART", payload: savedCart });
  }, []);

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
