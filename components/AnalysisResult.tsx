
import React from 'react';
import { DesignAdvice } from '../types';

interface AnalysisResultProps {
    data: DesignAdvice;
}

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
        <h3 className="text-lg font-bold text-stone-800 mb-4 border-b border-stone-100 pb-2">{title}</h3>
        <div className="text-stone-600">{children}</div>
    </div>
);

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ data }) => {
    return (
        <div className="mt-8 space-y-6 animate-fade-in">
            <div className="p-8 bg-stone-900 rounded-xl shadow-lg text-white text-center">
                <p className="text-amber-400 font-medium tracking-wide uppercase text-sm mb-2">Design Concept</p>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">{data.designStyle} {data.roomType}</h2>
                <p className="text-stone-300 text-lg italic">"{data.mood}"</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard title="Color Palette">
                    <div className="flex flex-wrap gap-4">
                        {data.colorSuggestions.map((color, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                                <div
                                    className="w-16 h-16 rounded-full shadow-md border-2 border-white"
                                    style={{ backgroundColor: color.hex }}
                                ></div>
                                <span className="text-xs mt-2 font-medium text-stone-500">{color.name}</span>
                            </div>
                        ))}
                    </div>
                </InfoCard>

                <InfoCard title="Furniture Recommendations">
                    <ul className="space-y-2">
                        {data.furnitureRecommendations.map((item, idx) => (
                            <li key={idx} className="flex items-center text-stone-700">
                                <svg className="w-5 h-5 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {item}
                            </li>
                        ))}
                    </ul>
                </InfoCard>
            </div>

            <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                <div className="flex items-start">
                    <svg className="w-6 h-6 text-amber-700 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <h3 className="font-bold text-stone-800 text-lg mb-2">Pro Layout Tip</h3>
                        <p className="text-stone-700 leading-relaxed">{data.layoutTips}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
