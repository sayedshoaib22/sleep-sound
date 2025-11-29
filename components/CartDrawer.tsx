
import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    cart: CartItem[];
    onUpdateQuantity: (id: number, delta: number) => void;
    onRemove: (id: number) => void;
    onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
    isOpen, 
    onClose, 
    cart, 
    onUpdateQuantity, 
    onRemove,
    onCheckout
}) => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <>
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />
            
            {/* Drawer */}
            <div className={`fixed inset-y-0 right-0 w-full md:w-[400px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-900">Your Cart ({cart.reduce((a,c) => a + c.quantity, 0)})</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                            <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <p className="text-lg font-medium">Your cart is empty</p>
                            <p className="text-sm">Looks like you haven't added anything yet.</p>
                            <button onClick={onClose} className="mt-6 text-amber-600 font-bold hover:underline">Start Shopping</button>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="flex gap-4">
                                <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                        <p className="text-xs text-gray-500">{item.category}</p>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="flex items-center border border-gray-300 rounded-md">
                                            <button 
                                                onClick={() => onUpdateQuantity(item.id, -1)}
                                                className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="px-2 text-sm font-medium">{item.quantity}</span>
                                            <button 
                                                onClick={() => onUpdateQuantity(item.id, 1)}
                                                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                                            <button 
                                                onClick={() => onRemove(item.id)}
                                                className="text-xs text-red-500 hover:underline mt-1"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-6 bg-gray-50 border-t border-gray-100">
                        <div className="flex justify-between mb-4 text-lg font-bold text-gray-900">
                            <span>Subtotal</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-6 text-center">Shipping & taxes calculated at checkout</p>
                        <button 
                            onClick={onCheckout}
                            className="w-full py-4 bg-amber-600 text-white font-bold rounded-lg shadow-lg hover:bg-amber-700 transition-colors"
                        >
                            Checkout Now
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};
