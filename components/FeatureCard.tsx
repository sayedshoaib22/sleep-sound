
import React from 'react';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
    return (
        <div className="bg-stone-50 p-6 rounded-xl border border-stone-100 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex justify-center items-center text-amber-700 mb-4 space-x-2">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-2">{title}</h3>
            <p className="text-stone-600 leading-relaxed">{description}</p>
        </div>
    );
};
