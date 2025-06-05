
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building, Bed } from 'lucide-react';
import { PropertyType } from './PropertyCard';
import { formatPrice, formatArea, formatBedrooms } from '@/utils/formatters';

interface OptimizedPropertyCardProps {
  property: PropertyType;
}

const OptimizedPropertyCard = memo(({ property }: OptimizedPropertyCardProps) => {
  const imageUrl = property.imageUrl || property.image_url || '/placeholder.svg';

  return (
    <Link to={`/property/${property.id}`} className="block group">
      <div className={`glass-dark rounded-xl overflow-hidden border transition-all duration-300 ${
        property.sold 
          ? 'border-red-500/30 opacity-75' 
          : 'border-gold/20 hover:border-gold/40 group-hover:scale-[1.02] group-hover:shadow-xl'
      }`}>
        <div className="relative h-64 overflow-hidden">
          <img
            src={imageUrl}
            alt={property.title}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              property.sold ? 'grayscale' : 'group-hover:scale-110'
            }`}
            loading="lazy"
          />
          
          {property.sold && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="bg-red-600 px-8 py-4 rounded-lg transform rotate-12 shadow-lg">
                <span className="text-white text-xl font-bold">VENDIDO</span>
              </div>
            </div>
          )}
          
          {property.sold && (
            <div className="absolute top-4 left-4 bg-red-600 text-white py-1 px-3 rounded-md text-sm font-medium animate-pulse">
              VENDIDO
            </div>
          )}
          
          {!property.sold && (
            <div className="absolute top-4 right-4 bg-gold text-dark py-1 px-3 rounded-md text-sm font-bold">
              {property.transaction_type || property.type}
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className={`text-xl font-semibold mb-3 line-clamp-2 leading-tight ${
            property.sold ? 'text-gray-400' : 'text-white'
          }`}>
            {property.title}
          </h3>
          
          <div className="flex items-center text-gray-400 mb-4">
            <MapPin className="h-4 w-4 text-gold mr-2 flex-shrink-0" />
            <span className="text-sm truncate">{property.location}</span>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div className={`flex items-center space-x-4 text-sm ${
              property.sold ? 'text-gray-500' : 'text-gray-300'
            }`}>
              <div className="flex items-center">
                <Bed className="h-4 w-4 text-gold mr-1" />
                <span>{formatBedrooms(property.bedrooms)}</span>
              </div>
              <div className="flex items-center">
                <Building className="h-4 w-4 text-gold mr-1" />
                <span>{formatArea(property.area)}</span>
              </div>
            </div>
          </div>
          
          <div className={`text-2xl font-bold ${
            property.sold ? 'text-gray-500' : 'text-gold'
          }`}>
            {property.sold ? 'VENDIDO' : formatPrice(property.price)}
          </div>
        </div>
      </div>
    </Link>
  );
});

OptimizedPropertyCard.displayName = 'OptimizedPropertyCard';

export default OptimizedPropertyCard;
