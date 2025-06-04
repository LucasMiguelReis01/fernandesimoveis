
import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Phone, ExternalLink } from 'lucide-react';

interface LocationCardProps {
  location: string;
  className?: string;
  height?: string;
  showActions?: boolean;
}

const LocationCard: React.FC<LocationCardProps> = ({ 
  location, 
  className = "", 
  height = "h-64",
  showActions = true 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenMaps = () => {
    const encodedLocation = encodeURIComponent(location);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
    window.open(mapsUrl, '_blank');
  };

  const handleGetDirections = () => {
    const encodedLocation = encodeURIComponent(location);
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`;
    window.open(directionsUrl, '_blank');
  };

  const handleCallUber = () => {
    const encodedLocation = encodeURIComponent(location);
    const uberUrl = `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodedLocation}`;
    window.open(uberUrl, '_blank');
  };

  return (
    <div 
      className={`${height} ${className} glass-dark rounded-xl border border-gold/20 overflow-hidden relative group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Main Content */}
      <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
        {/* Animated Map Pin */}
        <div className={`relative mb-4 transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>
          <div className="absolute inset-0 bg-gold/20 rounded-full animate-pulse" />
          <div className="relative bg-gold rounded-full p-4">
            <MapPin className="h-8 w-8 text-dark" />
          </div>
          
          {/* Ripple Effect */}
          <div className={`absolute inset-0 bg-gold/30 rounded-full transition-all duration-1000 ${isHovered ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`} />
        </div>

        {/* Location Info */}
        <h3 className="text-white text-lg font-semibold mb-2">Localização</h3>
        <p className="text-gray-300 text-sm mb-6 leading-relaxed">{location}</p>

        {/* Interactive Actions */}
        {showActions && (
          <div className="grid grid-cols-3 gap-3 w-full">
            <button
              onClick={handleOpenMaps}
              className="flex flex-col items-center p-3 rounded-lg bg-dark-light/50 hover:bg-gold/10 transition-colors group"
              title="Ver no Google Maps"
            >
              <ExternalLink className="h-5 w-5 text-gold mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs text-gray-400 group-hover:text-gold">Ver Mapa</span>
            </button>
            
            <button
              onClick={handleGetDirections}
              className="flex flex-col items-center p-3 rounded-lg bg-dark-light/50 hover:bg-gold/10 transition-colors group"
              title="Como chegar"
            >
              <Navigation className="h-5 w-5 text-gold mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs text-gray-400 group-hover:text-gold">Direções</span>
            </button>
            
            <button
              onClick={handleCallUber}
              className="flex flex-col items-center p-3 rounded-lg bg-dark-light/50 hover:bg-gold/10 transition-colors group"
              title="Chamar Uber"
            >
              <Clock className="h-5 w-5 text-gold mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs text-gray-400 group-hover:text-gold">Transporte</span>
            </button>
          </div>
        )}

        {/* Contact Action */}
        <div className="mt-4 pt-4 border-t border-gold/10 w-full">
          <button
            onClick={() => {
              const message = `Olá! Gostaria de obter mais informações sobre o imóvel localizado em: ${location}`;
              const phoneNumber = "5511950824205";
              const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
              window.open(url, '_blank');
            }}
            className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span className="text-sm font-medium">Falar sobre este local</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
