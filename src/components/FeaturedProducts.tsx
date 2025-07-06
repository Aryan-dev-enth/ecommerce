
import { useStore } from '@/contexts/StoreContext';
import { ProductCard } from './ProductCard';
import { Sparkles, TrendingUp } from 'lucide-react';

export function FeaturedProducts() {
  const { state } = useStore();
  
  const featuredProducts = state.products.filter(product => product.featured);

  if (featuredProducts.length === 0) return null;

  return (
    <section className="mb-16 animate-fade-in">
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-2 mb-4">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">Handpicked Selection</span>
        </div>
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Featured Collection
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Discover our most loved products, carefully selected for their exceptional quality, 
          authentic Indian heritage, and customer satisfaction.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {featuredProducts.map((product, index) => (
          <div 
            key={product.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ProductCard
              product={product}
              viewMode="grid"
            />
          </div>
        ))}
      </div>

      {/* Trending Indicator */}
      <div className="flex items-center justify-center mt-8 text-sm text-muted-foreground">
        <TrendingUp className="h-4 w-4 mr-2 text-accent" />
        <span>Updated with today's trending products</span>
      </div>
    </section>
  );
}
