
import React, { useRef, useState, useCallback } from 'react';

interface ImageUploaderProps {
  onAnalyze: (file: File) => void;
  isLoading: boolean;
  imagePreview: string | null;
  setImagePreview: (preview: string | null) => void;
}

const CameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onAnalyze, isLoading, imagePreview, setImagePreview }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleAnalyzeClick = useCallback(() => {
    if (selectedFile) {
        onAnalyze(selectedFile);
    }
  }, [selectedFile, onAnalyze]);

  return (
    <div className="w-full bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden">
      <div className="p-6 bg-stone-900 text-white text-center">
        <h3 className="text-xl font-bold">AI Interior Designer</h3>
        <p className="text-stone-300 text-sm mt-1">Upload a photo of your room to get furniture recommendations</p>
      </div>
      
      <div className="p-6">
      {!imagePreview ? (
        <div 
          className="flex flex-col items-center justify-center border-2 border-dashed border-stone-300 rounded-lg p-10 cursor-pointer hover:border-amber-600 hover:bg-stone-50 transition-all group"
          onClick={handleUploadClick}
        >
          <div className="group-hover:scale-110 transition-transform duration-300">
            <CameraIcon />
          </div>
          <p className="mt-4 text-lg font-semibold text-stone-600">Snap Room Photo</p>
          <p className="text-sm text-stone-500">Upload or take a picture of your space</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
            capture="environment"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="relative w-full max-h-80 mb-6 rounded-lg overflow-hidden shadow-md">
            <img src={imagePreview} alt="Room preview" className="w-full h-full object-cover" />
          </div>
          <button
            onClick={handleAnalyzeClick}
            disabled={isLoading}
            className="w-full md:w-auto px-10 py-3 bg-stone-900 text-white font-bold rounded-lg shadow-lg hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-opacity-50 transition-all duration-300 disabled:bg-stone-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Designing Space...
              </>
            ) : (
              'Get Design Advice'
            )}
          </button>
        </div>
      )}
      </div>
    </div>
  );
};
