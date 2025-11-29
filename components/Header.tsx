
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
        <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
            <div className="container mx-auto px-4 md:px-6 h-20 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center cursor-pointer" onClick={onReset}>
                    <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center mr-2 text-white font-serif text-xl font-bold">
                        F
                    </div>
                    <span className="text-2xl font-sans font-extrabold text-gray-900 tracking-tight">FurniFit</span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-8 text-sm font-semibold text-gray-600">
                    <a href="#" onClick={(e) => { e.preventDefault(); onReset(); }} className="hover:text-amber-600 transition-colors">Home</a>
                    <a href="#products" className="hover:text-amber-600 transition-colors">Shop All</a>
                    <a href="#" className="hover:text-amber-600 transition-colors">Living</a>
                    <a href="#" className="hover:text-amber-600 transition-colors">Bedroom</a>
                    {showReset && (
                        <button onClick={onReset} className="text-amber-600">
                            AI Designer
                        </button>
                    )}
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    {/* Search - Hidden on mobile for simplicity */}
                    <div className="hidden md:block relative">
                        <input 
                            type="text" 
                            placeholder="Search furniture..." 
                            className="bg-gray-100 text-sm rounded-full pl-4 pr-8 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                        />
                        <svg className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Auth */}
                    {user ? (
                        <div className="flex items-center gap-2 group relative">
                            <span className="text-sm font-medium text-gray-700 hidden md:block">Hi, {user.name.split(' ')[0]}</span>
                            <button onClick={onLogout} className="text-gray-500 hover:text-red-500 text-xs underline">Logout</button>
                        </div>
                    ) : (
                        <button onClick={onOpenAuth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </button>
                    )}

                    {/* Cart */}
                    <button 
                        onClick={onOpenCart}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-amber-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
};
