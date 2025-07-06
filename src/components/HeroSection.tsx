
import { Button } from '@/components/ui/button';
import { useStore } from '@/contexts/StoreContext';
import { Sparkles, Heart, Star } from 'lucide-react';

export function HeroSection() {
  const { dispatch } = useStore();

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden py-24 mb-16">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 blur-3xl animate-pulse delay-1000"></div>
        
        {/* Floating Icons */}
        <div className="absolute top-20 left-1/4 text-primary/20 animate-bounce delay-300">
          <Sparkles size={24} />
        </div>
        <div className="absolute top-32 right-1/4 text-accent/20 animate-bounce delay-700">
          <Heart size={20} />
        </div>
        <div className="absolute bottom-32 left-1/3 text-primary/20 animate-bounce delay-500">
          <Star size={22} />
        </div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-2 mb-8 animate-fade-in">
            <span className="text-2xl">🇮🇳</span>
            <span className="text-sm font-medium text-primary">Celebrating Indian Excellence</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
              Celebal Store
            </span>
            <br />
            <span className="text-3xl md:text-4xl text-foreground/80 font-normal">
              Where Tradition Meets Innovation
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-300">
            Discover authentic Indian products, premium lifestyle essentials, and modern innovations. 
            <br className="hidden md:block" />
            Experience the finest selection curated with love for the Indian spirit.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in delay-500">
            <Button 
              size="lg" 
              onClick={scrollToProducts}
              className="gradient-primary text-white hover:opacity-90 transition-all transform hover:scale-105 celebration-glow px-8 py-4 text-lg font-semibold rounded-xl"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Explore Collection
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => dispatch({ type: 'SET_CATEGORY', payload: 'Fashion' })}
              className="hover:scale-105 transition-all px-8 py-4 text-lg rounded-xl border-2 hover:bg-primary/5"
            >
              <Heart className="mr-2 h-5 w-5" />
              Traditional Wear
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-fade-in delay-700">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Premium Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Cities Served</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent mb-2">4.8★</div>
              <div className="text-sm text-muted-foreground">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
