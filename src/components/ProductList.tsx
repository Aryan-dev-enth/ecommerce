
import { useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { useStore } from '@/contexts/StoreContext';

export function ProductList() {
  const { state } = useStore();

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = state.products;

    // Filter by category
    if (state.selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === state.selectedCategory);
    }

    // Filter by search term
    if (state.searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (state.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
      }

      return state.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [state.products, state.selectedCategory, state.searchTerm, state.sortBy, state.sortOrder]);

  if (filteredAndSortedProducts.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold mb-2">No products found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {state.viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode={state.viewMode}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode={state.viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}
