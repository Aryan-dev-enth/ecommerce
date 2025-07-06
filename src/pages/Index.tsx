
import { StoreProvider } from '@/contexts/StoreContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { ProductFilters } from '@/components/ProductFilters';
import { ProductList } from '@/components/ProductList';

const Index = () => {
  return (
    <ThemeProvider>
      <StoreProvider>
        <div className="min-h-screen bg-background relative">
          {/* Indian pattern background */}
          <div className="fixed inset-0 indian-pattern pointer-events-none"></div>
          
          <Header />
          <main className="pb-12 relative z-10">
            <HeroSection />
            
            <div className="container mx-auto px-4">
              <FeaturedProducts />
              
              <div id="products-section" className="scroll-mt-20">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Discover Our Collection
                  </h2>
                  <p className="text-muted-foreground">
                    Curated products celebrating Indian heritage and modern lifestyle
                  </p>
                </div>
                
                <ProductFilters />
                <ProductList />
              </div>
            </div>
          </main>
          
          {/* Footer */}
          <footer className="bg-gradient-to-r from-background via-muted/30 to-background border-t py-16 relative">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div className="md:col-span-2">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center celebration-glow">
                      <span className="text-white font-bold text-lg">C</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Celebal Store
                      </h3>
                      <p className="text-sm text-muted-foreground">Celebrating Indian Excellence</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 max-w-md">
                    Your trusted destination for authentic Indian products, modern lifestyle essentials, 
                    and premium quality goods. Celebrating the spirit of India with every purchase.
                  </p>
                  <div className="flex space-x-4 text-sm text-muted-foreground">
                    <span>🇮🇳 Made in India</span>
                    <span>•</span>
                    <span>✨ Premium Quality</span>
                    <span>•</span>
                    <span>🚚 Pan-India Delivery</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="hover:text-primary cursor-pointer transition-colors">About Us</p>
                    <p className="hover:text-primary cursor-pointer transition-colors">Contact</p>
                    <p className="hover:text-primary cursor-pointer transition-colors">Support</p>
                    <p className="hover:text-primary cursor-pointer transition-colors">Track Order</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4 text-foreground">Categories</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="hover:text-primary cursor-pointer transition-colors">Fashion</p>
                    <p className="hover:text-primary cursor-pointer transition-colors">Electronics</p>
                    <p className="hover:text-primary cursor-pointer transition-colors">Food & Grocery</p>
                    <p className="hover:text-primary cursor-pointer transition-colors">Home & Decor</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-border pt-8 text-center">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <span>© 2024 Celebal Store. All rights reserved.</span>
                    <span>•</span>
                    <span>Proudly Indian 🇮🇳</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
                    <span>•</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
                    <span>•</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </StoreProvider>
    </ThemeProvider>
  );
};

export default Index;
