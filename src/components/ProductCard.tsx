
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product, useStore, formatPrice } from '@/contexts/StoreContext';
import { ShoppingCart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  featured?: boolean;
}

export function ProductCard({ product, viewMode, featured }: ProductCardProps) {
  const { dispatch } = useStore();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-sm ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-card border rounded-lg p-4 hover:shadow-lg transition-all duration-300 animate-fade-in">
        <div className="flex gap-4">
          <div className="relative w-24 h-24 flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-md"
            />
            {(product.featured || featured) && (
              <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500">
                Featured
              </Badge>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg truncate">{product.name}</h3>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                  <span className="ml-1 text-sm text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>
                <Badge variant="secondary">{product.category}</Badge>
              </div>
              
              <Button 
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="hover:scale-105 transition-transform"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-scale-in group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {(product.featured || featured) && (
          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500">
            Featured
          </Badge>
        )}
        {product.originalPrice && (
          <Badge variant="destructive" className="absolute top-2 left-2">
            {product.discount}% OFF
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          <div className="flex items-center">
            {renderStars(product.rating)}
            <span className="ml-1 text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
          </div>
          
          <Button 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            size="sm"
            className="hover:scale-105 transition-transform"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
