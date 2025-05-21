
import { Link } from 'react-router-dom';
import { Building, Bed, MapPin } from 'lucide-react';

export interface PropertyType {
  id: string;
  title: string;
  type: string;
  price: string;
  location: string;
  bedrooms: number;
  area: number;
  imageUrl: string;
  featured?: boolean;
}

interface PropertyCardProps {
  property: PropertyType;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Link 
      to={`/property/${property.id}`} 
      className="block bg-dark-light rounded-lg overflow-hidden border border-gold/10 hover:border-gold/30 transition-colors group"
    >
      <div className="relative overflow-hidden">
        <div className="h-64 overflow-hidden">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        
        {property.featured && (
          <div className="absolute top-3 right-3">
            <span className="bg-gold px-3 py-1 text-xs font-medium text-black rounded">
              Destaque
            </span>
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark to-transparent h-20"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-white text-xl mb-2 group-hover:text-gold transition-colors">
          {property.title}
        </h3>
        
        <div className="flex items-center mb-3">
          <MapPin className="h-4 w-4 text-gold mr-1" />
          <span className="text-gray-400 text-sm">{property.location}</span>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center">
            <Building className="h-4 w-4 text-gold mr-2" />
            <span className="text-white text-sm">{property.area} m²</span>
          </div>
          
          <div className="flex items-center">
            <Bed className="h-4 w-4 text-gold mr-2" />
            <span className="text-white text-sm">
              {property.bedrooms} {property.bedrooms > 1 ? 'Quartos' : 'Quarto'}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gold/10">
          <div className="text-gold font-semibold">{property.price}</div>
          <span className="text-xs text-gray-400">{property.type}</span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
