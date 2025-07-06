
import { useState } from 'react';
import { Search, ShoppingCart, Grid2X2, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/contexts/StoreContext';
import { ThemeSelector } from './ThemeSelector';
import { Cart } from './Cart';

export function Header() {
  const { state, dispatch } = useStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (value: string) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: value });
  };

  const toggleViewMode = () => {
    dispatch({ 
      type: 'SET_VIEW_MODE', 
      payload: state.viewMode === 'grid' ? 'list' : 'grid' 
    });
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center celebration-glow">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Celebal Store
              </span>
              <p className="text-xs text-muted-foreground">Celebrating Indian Excellence</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for products, brands and more..."
                value={state.searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Selector */}
            <ThemeSelector />
            
            {/* View Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleViewMode}
              className="hidden sm:flex hover:bg-primary/10"
            >
              {state.viewMode === 'grid' ? (
                <List className="h-4 w-4" />
              ) : (
                <Grid2X2 className="h-4 w-4" />
              )}
            </Button>

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCartOpen(true)}
              className="relative hover:bg-primary/10"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
