import React from 'react';
import { User } from '../types';

interface HeaderProps {
    onReset: () => void;
    showReset: boolean;
    cartCount: number;
    onOpenCart: () => void;
    onOpenAuth: () => void;
    user: User | null;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
    onReset, 
    showReset, 
    cartCount, 
    onOpenCart, 
    onOpenAuth,
    user,
    onLogout
}) => {
    return (
        <header className="bg-white sticky top-0 z-50 shadow-sm">
            {/* Top Bar */}
            <div className="bg-purple-700 text-white">
                <div className="container mx-auto px-4 md:px-6 h-16 flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center cursor-pointer" onClick={onReset}>
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-2 text-purple-700 font-serif text-xl font-bold">
                            F
                        </div>
                        <span className="text-2xl font-sans font-extrabold tracking-tight">
                            FurniFit
                        </span>
                    </div>

                    {/* Search Bar (Desktop) */}
                    <div className="hidden md:block flex-1 max-w-2xl mx-8">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Search furniture..." 
                                className="w-full bg-white text-gray-900 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-700">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center space-x-6">
                        {/* Stores */}
                        <button className="hidden md:flex flex-col items-center hover:text-purple-200 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className="text-xs mt-1">Stores</span>
                        </button>

                        {/* Bulk Orders */}
                        <button className="hidden md:flex flex-col items-center hover:text-purple-200 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <span className="text-xs mt-1">Bulk Orders</span>
                        </button>

                        {/* Contact */}
                        <button className="hidden md:flex flex-col items-center hover:text-purple-200 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="text-xs mt-1">Contact</span>
                        </button>

                        {/* Auth */}
                        {user ? (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={onOpenAuth}
                                    className="flex flex-col items-center hover:text-purple-200 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="text-xs mt-1">{user.name.split(' ')[0]}</span>
                                </button>
                                <button
                                    onClick={onLogout}
                                    className="text-xs underline hover:text-red-200"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={onOpenAuth}
                                className="flex flex-col items-center hover:text-purple-200 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="text-xs mt-1">Login</span>
                            </button>
                        )}

                        {/* Wishlist */}
                        <button className="flex flex-col items-center hover:text-purple-200 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span className="text-xs mt-1">Wishlist</span>
                        </button>

                        {/* Cart */}
                        <button 
                            onClick={onOpenCart}
                            className="flex flex-col items-center hover:text-purple-200 transition-colors relative"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span className="text-xs mt-1">Cart</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-purple-700">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Category / Main Navigation */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 md:px-6">
                    <nav className="flex items-center space-x-1 overflow-x-auto scrollbar-hide">
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); onReset(); }}
                            className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-t-lg transition-colors whitespace-nowrap"
                        >
                            Home
                        </a>
                        <a
                            href="#products"
                            className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-t-lg transition-colors whitespace-nowrap"
                        >
                            Shop All
                        </a>

                        {/* Original category list from code2 */}
                        <a href="#products" className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-t-lg transition-colors whitespace-nowrap">
                            Zense
                        </a>
                        <a href="#products" className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-t-lg transition-colors whitespace-nowrap">
                            Mattress
                        </a>
                        <a href="#products" className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-t-lg transition-colors whitespace-nowrap">
                            Bedroom
                        </a>
                        <a href="#products" className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-t-lg transition-colors whitespace-nowrap">
                            Living
                        </a>
                        <a href="#products" className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-t-lg transition-colors whitespace-nowrap">
                            Dining
                        </a>
                        <a href="#products" className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-t-lg transition-colors whitespace-nowrap">
                            Study
                        </a>
                        <a href="#products" className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-t-lg transition-colors whitespace-nowrap">
                            Furnishing
                        </a>
                        <a href="#products" className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-t-lg transition-colors whitespace-nowrap">
                            Kitchen
                        </a>
                        <a href="#products" className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-t-lg transition-colors whitespace-nowrap">
                            Decor
                        </a>
                        <a href="#products" className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-t-lg transition-colors whitespace-nowrap">
                            Essentials
                        </a>
                        <a href="#products" className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-t-lg transition-colors whitespace-nowrap">
                            Kids
                        </a>
                        <a href="#products" className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-t-lg transition-colors whitespace-nowrap">
                            Plus Series
                        </a>

                        {/* AI Designer from both headers */}
                        {showReset && (
                            <button
                                onClick={onReset}
                                className="px-4 py-3 text-sm font-medium text-purple-700 bg-purple-50 rounded-t-lg transition-colors whitespace-nowrap"
                            >
                                AI Designer
                            </button>
                        )}

                        <a
                            href="#products"
                            className="px-4 py-3 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-t-lg transition-colors whitespace-nowrap"
                        >
                            Offers
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
};
