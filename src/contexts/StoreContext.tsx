
import React, { createContext, useContext, useEffect, useReducer } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
  tags: string[];
  brand: string;
  discount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface StoreState {
  products: Product[];
  cart: CartItem[];
  favorites: string[];
  searchTerm: string;
  selectedCategory: string;
  priceRange: [number, number];
  sortBy: 'name' | 'price' | 'rating';
  sortOrder: 'asc' | 'desc';
  viewMode: 'grid' | 'list';
  isLoading: boolean;
}

type StoreAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_PRICE_RANGE'; payload: [number, number] }
  | { type: 'SET_SORT'; payload: { sortBy: StoreState['sortBy']; sortOrder: StoreState['sortOrder'] } }
  | { type: 'SET_VIEW_MODE'; payload: 'grid' | 'list' }
  | { type: 'SET_LOADING'; payload: boolean };

const indianProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Basmati Rice (5kg)',
    price: 899,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&h=500&fit=crop',
    category: 'Food & Grocery',
    description: 'Authentic Indian Basmati rice with aromatic long grains. Perfect for biryanis and pulao.',
    rating: 4.8,
    reviews: 2456,
    inStock: true,
    featured: true,
    tags: ['organic', 'premium', 'basmati'],
    brand: 'Celebal Foods',
    discount: 25
  },
  {
    id: '2',
    name: 'Handwoven Silk Saree',
    price: 12999,
    originalPrice: 18999,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=500&fit=crop',
    category: 'Fashion',
    description: 'Exquisite handwoven silk saree with traditional Indian motifs and zari work.',
    rating: 4.9,
    reviews: 892,
    inStock: true,
    featured: true,
    tags: ['silk', 'traditional', 'handwoven'],
    brand: 'Heritage Weaves',
    discount: 32
  },
  {
    id: '3',
    name: 'Ayurvedic Face Cream',
    price: 649,
    originalPrice: 899,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop',
    category: 'Beauty & Health',
    description: 'Natural ayurvedic face cream with turmeric, neem, and sandalwood extracts.',
    rating: 4.6,
    reviews: 1234,
    inStock: true,
    featured: false,
    tags: ['ayurvedic', 'natural', 'skincare'],
    brand: 'Vedic Care',
    discount: 28
  },
  {
    id: '4',
    name: 'Bluetooth Earbuds Pro',
    price: 3999,
    originalPrice: 6999,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'Electronics',
    description: 'Premium wireless earbuds with noise cancellation and 24-hour battery life.',
    rating: 4.4,
    reviews: 5678,
    inStock: true,
    featured: true,
    tags: ['wireless', 'noise-cancellation', 'premium'],
    brand: 'TechCelebal',
    discount: 43
  },
  {
    id: '5',
    name: 'Brass Diya Set (12 pieces)',
    price: 1299,
    originalPrice: 1799,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop',
    category: 'Home & Decor',
    description: 'Traditional brass diya set of 12 pieces, perfect for festivals and religious ceremonies.',
    rating: 4.7,
    reviews: 834,
    inStock: true,
    featured: false,
    tags: ['brass', 'traditional', 'festival'],
    brand: 'Divine Crafts',
    discount: 28
  },
  {
    id: '6',
    name: 'Premium Yoga Mat',
    price: 2499,
    originalPrice: 3499,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop',
    category: 'Sports & Fitness',
    description: 'Eco-friendly yoga mat with excellent grip and cushioning. Made from natural rubber.',
    rating: 4.5,
    reviews: 1567,
    inStock: true,
    featured: false,
    tags: ['yoga', 'eco-friendly', 'premium'],
    brand: 'Zen Fitness',
    discount: 29
  },
  {
    id: '7',
    name: 'Kashmiri Saffron (5g)',
    price: 4999,
    originalPrice: 6499,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&h=500&fit=crop',
    category: 'Food & Grocery',
    description: 'Pure Kashmiri saffron threads, grade A quality. 5 grams of premium saffron.',
    rating: 4.9,
    reviews: 445,
    inStock: true,
    featured: true,
    tags: ['saffron', 'kashmiri', 'premium'],
    brand: 'Kashmir Gold',
    discount: 23
  },
  {
    id: '8',
    name: 'Cotton Kurta Set',
    price: 1899,
    originalPrice: 2799,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop',
    category: 'Fashion',
    description: 'Comfortable cotton kurta with matching pants. Perfect for casual and festive wear.',
    rating: 4.3,
    reviews: 1289,
    inStock: true,
    featured: false,
    tags: ['cotton', 'kurta', 'comfortable'],
    brand: 'Traditional Wear',
    discount: 32
  },
  {
    id: '9',
    name: 'Smartphone 128GB',
    price: 15999,
    originalPrice: 19999,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
    category: 'Electronics',
    description: 'Latest smartphone with 128GB storage, 48MP camera, and fast charging.',
    rating: 4.2,
    reviews: 3456,
    inStock: true,
    featured: true,
    tags: ['smartphone', 'camera', 'fast-charging'],
    brand: 'TechCelebal',
    discount: 20
  },
  {
    id: '10',
    name: 'Indian Spice Set',
    price: 799,
    originalPrice: 1099,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&h=500&fit=crop',
    category: 'Food & Grocery',
    description: 'Complete set of authentic Indian spices for traditional cooking.',
    rating: 4.6,
    reviews: 987,
    inStock: true,
    featured: false,
    tags: ['spices', 'authentic', 'traditional'],
    brand: 'Spice Master',
    discount: 27
  }
];

const initialState: StoreState = {
  products: indianProducts,
  cart: [],
  favorites: [],
  searchTerm: '',
  selectedCategory: 'All',
  priceRange: [0, 20000],
  sortBy: 'name',
  sortOrder: 'asc',
  viewMode: 'grid',
  isLoading: false,
};

function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter(item => item.id !== action.payload.id),
        };
      }
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };

    case 'TOGGLE_FAVORITE':
      const isFavorite = state.favorites.includes(action.payload);
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter(id => id !== action.payload)
          : [...state.favorites, action.payload],
      };

    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
      };

    case 'SET_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload,
      };

    case 'SET_PRICE_RANGE':
      return {
        ...state,
        priceRange: action.payload,
      };

    case 'SET_SORT':
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortOrder: action.payload.sortOrder,
      };

    case 'SET_VIEW_MODE':
      return {
        ...state,
        viewMode: action.payload,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
}

const StoreContext = createContext<{
  state: StoreState;
  dispatch: React.Dispatch<StoreAction>;
} | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('celebal-cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        cartItems.forEach((item: CartItem) => {
          dispatch({ type: 'ADD_TO_CART', payload: item });
        });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('celebal-cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}

// Utility function to format Indian currency
export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}
