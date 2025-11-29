
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { AnalysisResult } from './components/AnalysisResult';
import { Loader } from './components/Loader';
import { ErrorDisplay } from './components/ErrorDisplay';
import { FeatureCard } from './components/FeatureCard';
import { Slideshow } from './components/Slideshow';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { CheckoutModal } from './components/CheckoutModal';
import { DesignAdvice, Product, CartItem, User } from './types';
import { analyzeRoomImage } from './services/geminiService';

// Mock Data
const PRODUCTS: Product[] = [
  { id: 1, name: "Nordic Comfort Sofa", category: "Living", price: 24999, displayPrice: "₹24,999", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800", description: "Minimalist grey 3-seater" },
  { id: 2, name: "Royal Oak Bed", category: "Bedroom", price: 35499, displayPrice: "₹35,499", image: "https://images.unsplash.com/photo-1505693416388-b0346efee535?auto=format&fit=crop&q=80&w=800", description: "Queen size with storage" },
  { id: 3, name: "Walnut Dining Set", category: "Dining", price: 18999, displayPrice: "₹18,999", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=80&w=800", description: "4-seater solid wood" },
  { id: 4, name: "Lounge Armchair", category: "Living", price: 12499, displayPrice: "₹12,499", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800", description: "Teal velvet finish" },
  { id: 5, name: "Study Desk Pro", category: "Office", price: 8999, displayPrice: "₹8,999", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800", description: "Ergonomic design" },
  { id: 6, name: "Ambient Floor Lamp", category: "Living", price: 3499, displayPrice: "₹3,499", image: "https://images.unsplash.com/photo-1507473888900-52e1adad54cd?auto=format&fit=crop&q=80&w=800", description: "Warm light corner lamp" },
];

const App: React.FC = () => {
  // AI State
  const [analysis, setAnalysis] = useState<DesignAdvice | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showAI, setShowAI] = useState<boolean>(false);

  // E-commerce State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Cart Logic
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Auth Logic
  const handleLogin = (email: string, name: string) => {
    setUser({ id: '1', name, email });
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
  };

  // Checkout Logic
  const handleCheckoutInit = () => {
    setIsCartOpen(false);
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    setIsCheckoutOpen(true);
  };

  const handleCheckoutComplete = () => {
    setCart([]);
    setIsCheckoutOpen(false);
  };

  // AI Logic
  const handleAnalyze = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const base64String = (reader.result as string).split(',')[1];
        if (!base64String) {
          throw new Error("Failed to read image file.");
        }
        const result = await analyzeRoomImage(base64String, file.type);
        setAnalysis(result);
      } catch (e: any) {
        setError(e.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      setError("Failed to process image file.");
      setIsLoading(false);
    };
  }, []);

  const handleReset = () => {
    setAnalysis(null);
    setError(null);
    setIsLoading(false);
    setImagePreview(null);
    setShowAI(false);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-amber-100">
      <Header 
        onReset={() => setShowAI(false)} 
        showReset={showAI} 
        cartCount={cart.reduce((a,c) => a + c.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        user={user}
        onLogout={handleLogout}
      />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckoutInit}
      />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLogin={handleLogin}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        total={cartTotal}
        onComplete={handleCheckoutComplete}
      />
      
      {!showAI ? (
        <main>
          {/* Slideshow */}
          <Slideshow />

          {/* Features */}
          <div className="container mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose FurniFit?</h2>
              <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <FeatureCard 
                icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                title="Premium Quality" 
                description="Crafted with the finest solid wood and premium fabrics for lasting durability. 10 Year Warranty." 
              />
              <FeatureCard 
                icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                title="Direct Factory Prices" 
                description="We cut out the middleman to bring you luxury furniture at honest prices. Save up to 40%." 
              />
              <FeatureCard 
                icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>}
                title="AI Design Assistant" 
                description="Not sure what fits? Use our exclusive AI tool to analyze your room and recommend products." 
              />
            </div>
          </div>

          {/* AI Banner CTA */}
          <div className="bg-gray-100 py-16">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
                <div className="mb-8 md:mb-0 md:pr-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Confused about your interior?</h2>
                    <p className="text-lg text-gray-600 mb-6">Take a photo of your room and let our AI Interior Designer suggest the perfect furniture and color palette.</p>
                    <button 
                        onClick={() => { window.scrollTo({top:0}); setShowAI(true); }}
                        className="px-8 py-3 bg-gray-900 text-white font-bold rounded-full hover:bg-amber-600 transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        Try AI Designer
                    </button>
                </div>
                <div className="w-full md:w-1/3 rounded-lg overflow-hidden shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500">
                    <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600" alt="Room Analysis" />
                </div>
            </div>
          </div>

          {/* Product Grid (The Showroom) */}
          <div className="bg-white py-20" id="products">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-10 text-center">Best Sellers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {PRODUCTS.map(product => (
                  <div key={product.id} className="group flex flex-col h-full bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="relative overflow-hidden aspect-[4/3] bg-gray-100">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-900 rounded-sm">
                        {product.category}
                      </div>
                      
                      {/* Overlay Add to Cart */}
                      <button 
                        onClick={() => addToCart(product)}
                        className="absolute bottom-4 right-4 bg-amber-600 text-white p-3 rounded-full shadow-lg transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-amber-700"
                        title="Add to Cart"
                      >
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                      </button>
                    </div>
                    
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                             <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors">{product.name}</h3>
                             <span className="font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded text-sm">{product.displayPrice}</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
                      </div>
                      <button 
                        onClick={() => addToCart(product)}
                        className="w-full py-2 border-2 border-gray-900 text-gray-900 font-bold rounded-lg hover:bg-gray-900 hover:text-white transition-colors text-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      ) : (
        /* AI Interface Section */
        <main className="container mx-auto p-4 md:p-8 max-w-4xl py-12 animate-fade-in">
           <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4">AI Design Consultant</h1>
            <p className="text-xl text-gray-600">Upload a photo of your empty room, and we'll visualize the potential.</p>
          </div>

          <ImageUploader 
            onAnalyze={handleAnalyze} 
            isLoading={isLoading} 
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            />

          {isLoading && <Loader />}
          {error && <ErrorDisplay message={error} />}
          {analysis && <AnalysisResult data={analysis} />}
        </main>
      )}

      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
                <h4 className="text-white text-2xl font-bold mb-6 font-serif">FurniFit</h4>
                <p className="leading-relaxed">Bringing premium style and comfort to every modern home. Designed for life.</p>
                <div className="flex space-x-4 mt-6">
                    {/* Social icons placeholder */}
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer">FB</div>
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer">IG</div>
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer">TW</div>
                </div>
            </div>
            <div>
                <h4 className="text-white text-lg font-bold mb-6">Shop</h4>
                <ul className="space-y-3">
                    <li className="hover:text-white cursor-pointer transition-colors">Living Room</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Bedroom</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Dining</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Office</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Mattresses</li>
                </ul>
            </div>
             <div>
                <h4 className="text-white text-lg font-bold mb-6">Help</h4>
                <ul className="space-y-3">
                    <li className="hover:text-white cursor-pointer transition-colors">Track Order</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Returns & Refunds</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Shipping Policy</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Warranty</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
                </ul>
            </div>
             <div>
                <h4 className="text-white text-lg font-bold mb-6">Newsletter</h4>
                <p className="mb-4">Subscribe to get special offers and design inspiration.</p>
                <div className="flex">
                    <input type="email" placeholder="Email Address" className="bg-gray-800 text-white px-4 py-2 rounded-l-lg w-full focus:outline-none focus:ring-1 focus:ring-amber-500" />
                    <button className="bg-amber-600 text-white px-4 py-2 rounded-r-lg font-bold hover:bg-amber-700 transition-colors">Go</button>
                </div>
            </div>
        </div>
        <div className="text-center mt-16 pt-8 border-t border-gray-800 text-sm">
            <p>&copy; {new Date().getFullYear()} FurniFit Showroom. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
