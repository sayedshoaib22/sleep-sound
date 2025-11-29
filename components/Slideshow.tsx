
import React, { useState, useEffect } from 'react';

const SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&q=80&w=2000",
    title: "Sleep Like Never Before",
    subtitle: "Premium orthopedic mattresses and solid wood beds.",
    cta: "Shop Bedroom"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000",
    title: "Modern Living Defined",
    subtitle: "Minimalist sofas designed for maximum comfort.",
    cta: "Shop Living"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=80&w=2000",
    title: "Dine in Style",
    subtitle: "Handcrafted dining sets for family gatherings.",
    cta: "Shop Dining"
  }
];

export const Slideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gray-900">
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={slide.image} 
            alt={slide.title} 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 animate-fade-in-up">
              {slide.title}
            </h2>
            <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-2xl animate-fade-in-up delay-100">
              {slide.subtitle}
            </p>
            <button 
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-amber-500 hover:text-white transition-colors duration-300 animate-fade-in-up delay-200"
            >
              {slide.cta}
            </button>
          </div>
        </div>
      ))}
      
      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-amber-500 w-8' : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
