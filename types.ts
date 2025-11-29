
export interface ColorPalette {
  name: string;
  hex: string;
}

export interface DesignAdvice {
  roomType: string;
  designStyle: string;
  colorSuggestions: ColorPalette[];
  furnitureRecommendations: string[];
  layoutTips: string;
  mood: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number; // Changed to number for calculations
  displayPrice: string; // Formatted price
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
