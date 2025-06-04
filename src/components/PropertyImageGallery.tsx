
import React, { memo, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyImageGalleryProps {
  images: string[];
  title: string;
  sold?: boolean;
}

const PropertyImageGallery = memo(({ images, title, sold }: PropertyImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToImage = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  if (!images || images.length === 0) {
    return (
      <div className="h-96 md:h-[500px] mb-8 rounded-xl overflow-hidden bg-gray-800 flex items-center justify-center">
        <span className="text-gray-400">Nenhuma imagem disponível</span>
      </div>
    );
  }

  return (
    <>
      <div className="relative h-96 md:h-[500px] mb-8 rounded-xl overflow-hidden">
        <img
          src={images[currentImageIndex]}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {sold && (
          <div className="absolute top-4 left-4 bg-red-600 text-white py-1 px-4 rounded-md">
            VENDIDO
          </div>
        )}
        
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            
            <button 
              onClick={nextImage}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-gold' : 'bg-white/50'
                  }`}
                  aria-label={`Ir para imagem ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      {images.length > 1 && (
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 w-24 h-24 rounded-md overflow-hidden transition-all ${
                index === currentImageIndex ? 'ring-2 ring-gold' : ''
              }`}
            >
              <img
                src={image}
                alt={`${title} - imagem ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </>
  );
});

PropertyImageGallery.displayName = 'PropertyImageGallery';

export default PropertyImageGallery;
