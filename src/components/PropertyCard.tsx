
import { Link } from 'react-router-dom';
import { Building, Bed, MapPin, Phone } from 'lucide-react';

export interface PropertyType {
  id: string;
  title: string;
  type?: string;
  transaction_type?: string;
  price: string | number;
  location: string;
  bedrooms: number;
  area: number;
  imageUrl?: string;
  image_url?: string;
  featured?: boolean;
  sold?: boolean;
  property_type?: string;
  description?: string;
  code?: string;
}

interface PropertyCardProps {
  property: PropertyType;
}

const formatPrice = (price: string | number): string => {
  if (typeof price === 'string' && price.includes('R$')) {
    return price;
  }
  
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(numericPrice)) {
    return 'Preço sob consulta';
  }
  
  // Se o preço for menor que 1000, provavelmente é aluguel
  if (numericPrice < 1000) {
    return `R$ ${numericPrice.toLocaleString('pt-BR')}/mês`;
  }
  
  return `R$ ${numericPrice.toLocaleString('pt-BR')}`;
};

const PropertyCard = ({ property }: PropertyCardProps) => {
  // Use o campo image_url se disponível, senão use imageUrl (compatibilidade)
  const imageSource = property.image_url || property.imageUrl;
  // Use o campo transaction_type se disponível, senão use type (compatibilidade)
  const transactionType = property.transaction_type || property.type;
  // Use o campo property_type se disponível
  const propertyType = property.property_type || '';
  
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Não permitir envio de mensagem se o imóvel estiver vendido
    if (property.sold) {
      return;
    }
    
    const message = `Olá! Gostaria de obter mais informações sobre o imóvel: ${property.title}`;
    const phoneNumber = "5511950824205"; // Número formatado sem hífen ou espaços
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <Link 
      to={`/property/${property.id}`} 
      className={`block bg-dark-light rounded-lg overflow-hidden border transition-colors group ${
        property.sold 
          ? 'border-red-500/30 opacity-75' 
          : 'border-gold/10 hover:border-gold/30'
      }`}
    >
      <div className="relative overflow-hidden">
        <div className="h-64 overflow-hidden">
          <img
            src={imageSource}
            alt={property.title}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              property.sold ? 'grayscale' : 'group-hover:scale-110'
            }`}
            loading="lazy"
          />
        </div>
        
        {property.featured && !property.sold && (
          <div className="absolute top-3 right-3">
            <span className="bg-gold px-3 py-1 text-xs font-medium text-black rounded">
              Destaque
            </span>
          </div>
        )}
        
        {property.sold && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-red-600 px-6 py-3 rounded-lg transform rotate-12">
              <span className="text-white text-lg font-bold">VENDIDO</span>
            </div>
          </div>
        )}

        {property.sold && (
          <div className="absolute top-3 left-3">
            <span className="bg-red-600 px-3 py-1 text-xs font-medium text-white rounded animate-pulse">
              VENDIDO
            </span>
          </div>
        )}

        {/* Código do imóvel sempre visível */}
        {property.code && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-dark/80 backdrop-blur-sm px-2 py-1 text-xs font-medium text-gold rounded border border-gold/30">
              {property.code}
            </span>
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark to-transparent h-20"></div>
      </div>
      
      <div className="p-6">
        <h3 className={`text-xl mb-2 transition-colors ${
          property.sold 
            ? 'text-gray-400' 
            : 'text-white group-hover:text-gold'
        }`}>
          {property.title}
        </h3>
        
        <div className="flex items-center mb-3">
          <MapPin className="h-4 w-4 text-gold mr-1" />
          <span className="text-gray-400 text-sm">{property.location}</span>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center">
            <Building className="h-4 w-4 text-gold mr-2" />
            <span className={`text-sm ${property.sold ? 'text-gray-500' : 'text-white'}`}>
              {property.area} m²
            </span>
          </div>
          
          <div className="flex items-center">
            <Bed className="h-4 w-4 text-gold mr-2" />
            <span className={`text-sm ${property.sold ? 'text-gray-500' : 'text-white'}`}>
              {property.bedrooms} {property.bedrooms > 1 ? 'Quartos' : 'Quarto'}
            </span>
          </div>
          
          {propertyType && (
            <div className="flex items-center">
              <span className={`text-sm px-2 py-1 rounded-md ${
                property.sold 
                  ? 'text-gray-500 bg-gray-800' 
                  : 'text-white bg-dark-lighter'
              }`}>
                {propertyType}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gold/10">
          <div className={`font-semibold ${property.sold ? 'text-gray-500' : 'text-gold'}`}>
            {property.sold ? 'VENDIDO' : formatPrice(property.price)}
          </div>
          <span className="text-xs text-gray-400">{transactionType}</span>
        </div>
        
        <button
          onClick={handleWhatsAppClick}
          disabled={property.sold}
          className={`mt-4 w-full py-2 rounded-md flex items-center justify-center transition-colors ${
            property.sold 
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          <Phone className="h-4 w-4 mr-2" /> 
          {property.sold ? 'Imóvel Vendido' : 'Falar no WhatsApp'}
        </button>
      </div>
    </Link>
  );
};

export default PropertyCard;
