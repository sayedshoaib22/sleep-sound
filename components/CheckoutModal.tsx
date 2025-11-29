
import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    cart: CartItem[];
    total: number;
    onComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cart, total, onComplete }) => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handlePay = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(3); // Success
            setTimeout(() => {
                onComplete();
                setStep(1);
            }, 3000);
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
                <div className="p-6 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Checkout</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="p-8 overflow-y-auto">
                    {step === 1 && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-bold text-gray-800 mb-4">Shipping Address</h3>
                                    <form className="space-y-3">
                                        <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg" />
                                        <input type="text" placeholder="Address Line 1" className="w-full p-3 border rounded-lg" />
                                        <div className="grid grid-cols-2 gap-3">
                                            <input type="text" placeholder="City" className="w-full p-3 border rounded-lg" />
                                            <input type="text" placeholder="ZIP Code" className="w-full p-3 border rounded-lg" />
                                        </div>
                                        <input type="text" placeholder="Phone Number" className="w-full p-3 border rounded-lg" />
                                    </form>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 mb-4">Order Summary</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                        {cart.map(item => (
                                            <div key={item.id} className="flex justify-between text-sm">
                                                <span className="text-gray-600">{item.name} x {item.quantity}</span>
                                                <span className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                                            </div>
                                        ))}
                                        <div className="border-t pt-3 flex justify-between font-bold text-lg text-amber-600">
                                            <span>Total</span>
                                            <span>₹{total.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setStep(2)}
                                        className="w-full mt-6 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-black transition-colors"
                                    >
                                        Proceed to Payment
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                         <div className="max-w-md mx-auto text-center">
                            <h3 className="text-xl font-bold mb-6">Payment Method</h3>
                            <div className="space-y-3 mb-6">
                                <div className="p-4 border rounded-lg flex items-center gap-3 cursor-pointer hover:border-amber-500 bg-amber-50 border-amber-500">
                                    <div className="w-4 h-4 rounded-full bg-amber-600"></div>
                                    <span className="font-medium">Credit / Debit Card</span>
                                </div>
                                <div className="p-4 border rounded-lg flex items-center gap-3 cursor-pointer hover:border-amber-500">
                                    <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                                    <span className="font-medium">UPI / Net Banking</span>
                                </div>
                                <div className="p-4 border rounded-lg flex items-center gap-3 cursor-pointer hover:border-amber-500">
                                    <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                                    <span className="font-medium">Cash on Delivery</span>
                                </div>
                            </div>
                            
                            <div className="p-4 bg-gray-100 rounded-lg mb-6">
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Total Amount</span>
                                    <span className="font-bold">₹{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-300 rounded-lg font-bold">Back</button>
                                <button 
                                    onClick={handlePay} 
                                    disabled={loading}
                                    className="flex-1 py-3 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 disabled:opacity-70 flex justify-center items-center"
                                >
                                    {loading ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : 'Pay Now'}
                                </button>
                            </div>
                         </div>
                    )}

                    {step === 3 && (
                        <div className="text-center py-10">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
                            <p className="text-gray-600">Thank you for shopping with FurniFit.</p>
                            <p className="text-sm text-gray-500 mt-2">Order #FF-{Math.floor(Math.random() * 10000)}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
