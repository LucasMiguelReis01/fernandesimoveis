
import React, { useState } from 'react';
import { PropertyType } from '@/components/PropertyCard';
import { MapPin, Filter, Zap } from 'lucide-react';

interface PropertiesVisualizationProps {
  properties: PropertyType[];
  className?: string;
  height?: string;
  onPropertySelect?: (property: PropertyType) => void;
}

const PropertiesVisualization: React.FC<PropertiesVisualizationProps> = ({ 
  properties, 
  className = "", 
  height = "h-96",
  onPropertySelect
}) => {
  const [hoveredProperty, setHoveredProperty] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('all');

  // Get unique cities
  const cities = Array.from(new Set(properties.map(p => p.location.split(',')[0].trim())));
  
  // Filter properties by selected city
  const filteredProperties = selectedCity === 'all' 
    ? properties 
    : properties.filter(p => p.location.includes(selectedCity));

  const handlePropertyClick = (property: PropertyType) => {
    if (onPropertySelect) {
      onPropertySelect(property);
    }
  };

  const formatPrice = (price: string | number): string => {
    if (typeof price === 'string' && price.includes('R$')) {
      return price;
    }
    
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    
    if (isNaN(numericPrice)) {
      return 'Consulte';
    }
    
    if (numericPrice < 1000) {
      return `R$ ${numericPrice}`;
    }
    
    return `R$ ${numericPrice.toLocaleString('pt-BR')}`;
  };

  return (
    <div className={`${height} ${className} glass-dark rounded-xl border border-gold/20 overflow-hidden`}>
      {/* Header */}
      <div className="p-4 border-b border-gold/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white text-lg font-semibold flex items-center gap-2">
            <Zap className="h-5 w-5 text-gold" />
            Visualização Interativa ({filteredProperties.length} imóveis)
          </h3>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gold" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-dark-light border border-gold/20 text-white text-sm rounded px-2 py-1"
            >
              <option value="all">Todas as cidades</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="p-4 h-full overflow-y-auto">
        {filteredProperties.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <MapPin className="h-12 w-12 text-gray-600 mb-4" />
            <p className="text-gray-400 mb-2">Nenhum imóvel encontrado</p>
            <p className="text-sm text-gray-500">Tente ajustar os filtros</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className={`group cursor-pointer transition-all duration-300 ${
                  hoveredProperty === property.id ? 'scale-105' : 'scale-100'
                }`}
                onMouseEnter={() => setHoveredProperty(property.id)}
                onMouseLeave={() => setHoveredProperty(null)}
                onClick={() => handlePropertyClick(property)}
              >
                <div className="bg-dark-light border border-gold/20 rounded-lg p-4 hover:border-gold/40 transition-colors">
                  {/* Property Image */}
                  <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                    <img
                      src={property.imageUrl || property.image_url || '/placeholder.svg'}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {property.sold && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                        VENDIDO
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {property.transaction_type || property.type}
                    </div>
                  </div>

                  {/* Property Info */}
                  <h4 className="text-white font-medium text-sm mb-1 truncate">{property.title}</h4>
                  
                  <div className="flex items-center text-gray-400 text-xs mb-2">
                    <MapPin className="h-3 w-3 mr-1 text-gold" />
                    <span className="truncate">{property.location}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gold font-semibold text-sm">
                      {formatPrice(property.price)}
                    </span>
                    <div className="text-xs text-gray-400">
                      {property.bedrooms} qts • {property.area}m²
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className={`mt-2 transition-all duration-300 ${
                    hoveredProperty === property.id ? 'opacity-100 max-h-10' : 'opacity-0 max-h-0'
                  } overflow-hidden`}>
                    <div className="text-xs text-center text-gold bg-gold/10 py-1 rounded">
                      Clique para ver detalhes
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesVisualization;
