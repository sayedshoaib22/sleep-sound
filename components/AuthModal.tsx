
import React, { useState } from 'react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: (email: string, name: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate auth
        const userName = name || email.split('@')[0];
        onLogin(email, userName);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
                <div className="flex border-b border-gray-200">
                    <button
                        className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider ${isLogin ? 'bg-white text-amber-600 border-b-2 border-amber-600' : 'bg-gray-50 text-gray-500'}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider ${!isLogin ? 'bg-white text-amber-600 border-b-2 border-amber-600' : 'bg-gray-50 text-gray-500'}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Register
                    </button>
                </div>

                <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h3>
                    <p className="text-gray-500 mb-6 text-sm">
                        {isLogin ? 'Enter your details to access your account' : 'Join FurniFit today for exclusive offers'}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                        )}
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors"
                                placeholder="name@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-gray-900 text-white font-bold rounded-lg shadow-md hover:bg-black transform transition-all duration-200 hover:-translate-y-1 mt-4"
                        >
                            {isLogin ? 'Sign In' : 'Sign Up'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
