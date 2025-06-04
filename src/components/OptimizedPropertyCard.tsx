
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
      <div className="glass-dark rounded-xl overflow-hidden border border-gold/20 hover:border-gold/40 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl">
        <div className="relative h-64 overflow-hidden">
          <img
            src={imageUrl}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {property.sold && (
            <div className="absolute top-4 left-4 bg-red-600 text-white py-1 px-3 rounded-md text-sm font-medium">
              VENDIDO
            </div>
          )}
          <div className="absolute top-4 right-4 bg-gold text-dark py-1 px-3 rounded-md text-sm font-bold">
            {property.transaction_type || property.type}
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-white text-xl font-semibold mb-3 line-clamp-2 leading-tight">
            {property.title}
          </h3>
          
          <div className="flex items-center text-gray-400 mb-4">
            <MapPin className="h-4 w-4 text-gold mr-2 flex-shrink-0" />
            <span className="text-sm truncate">{property.location}</span>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4 text-sm text-gray-300">
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
          
          <div className="text-gold text-2xl font-bold">
            {formatPrice(property.price)}
          </div>
        </div>
      </div>
    </Link>
  );
});

OptimizedPropertyCard.displayName = 'OptimizedPropertyCard';

export default OptimizedPropertyCard;
