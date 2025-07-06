
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStore } from '@/contexts/StoreContext';

const categories = ['All', 'Electronics', 'Fashion', 'Food & Grocery', 'Beauty & Health', 'Home & Decor', 'Sports & Fitness'];

export function ProductFilters() {
  const { state, dispatch } = useStore();

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split('-') as ['name' | 'price' | 'rating', 'asc' | 'desc'];
    dispatch({ type: 'SET_SORT', payload: { sortBy, sortOrder } });
  };

  return (
    <div className="bg-card border rounded-lg p-6 mb-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={state.selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => dispatch({ type: 'SET_CATEGORY', payload: category })}
              className="transition-all duration-200 hover:scale-105"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
          <Select
            value={`${state.sortBy}-${state.sortOrder}`}
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="price-asc">Price (Low to High)</SelectItem>
              <SelectItem value="price-desc">Price (High to Low)</SelectItem>
              <SelectItem value="rating-desc">Rating (High to Low)</SelectItem>
              <SelectItem value="rating-asc">Rating (Low to High)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
