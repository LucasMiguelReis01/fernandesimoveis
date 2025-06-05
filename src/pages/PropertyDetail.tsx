
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Building, Bed } from 'lucide-react';
import { useProperty } from '@/hooks/useProperty';
import PropertyImageGallery from '@/components/PropertyImageGallery';
import PropertySidebar from '@/components/PropertySidebar';
import LocationCard from '@/components/LocationCard';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { property, loading, error } = useProperty(id);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center py-16">
            <h2 className="text-white text-2xl mb-4">Imóvel não encontrado</h2>
            <p className="text-gray-300 mb-8">{error || 'O imóvel que você está procurando não existe ou foi removido.'}</p>
            <Link to="/properties" className="gold-button px-6 py-3 rounded-md">
              Voltar para Imóveis
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16 bg-dark">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-400 hover:text-gold transition-colors">
              Início
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link to="/properties" className="text-gray-400 hover:text-gold transition-colors">
              Imóveis
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gold">{property.title}</span>
          </div>
        </div>
        
        <PropertyImageGallery 
          images={property.images}
          title={property.title}
          sold={property.sold}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-sm font-medium px-3 py-1 rounded-md ${
                  property.sold 
                    ? 'text-red-400 bg-red-900/20 border border-red-500/30' 
                    : 'text-gold bg-gold/10'
                }`}>
                  {property.sold ? 'VENDIDO' : (property.transaction_type || property.type)}
                </span>
                {property.sold && (
                  <span className="text-red-400 text-sm font-medium animate-pulse">
                    • Imóvel não disponível
                  </span>
                )}
              </div>
              
              <h1 className={`text-3xl md:text-4xl mt-4 mb-2 ${
                property.sold ? 'text-gray-400' : 'text-white'
              }`}>
                {property.title}
              </h1>
              
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gold mr-1" />
                <span className="text-gray-300">{property.location}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className={`p-4 rounded-lg text-center ${
                property.sold ? 'bg-gray-800/50' : 'glass-dark'
              }`}>
                <Building className="h-6 w-6 text-gold mx-auto mb-2" />
                <span className="block text-sm text-gray-400">Área</span>
                <span className={`block font-medium ${
                  property.sold ? 'text-gray-500' : 'text-white'
                }`}>
                  {property.area} m²
                </span>
              </div>
              
              <div className={`p-4 rounded-lg text-center ${
                property.sold ? 'bg-gray-800/50' : 'glass-dark'
              }`}>
                <Bed className="h-6 w-6 text-gold mx-auto mb-2" />
                <span className="block text-sm text-gray-400">Quartos</span>
                <span className={`block font-medium ${
                  property.sold ? 'text-gray-500' : 'text-white'
                }`}>
                  {property.bedrooms}
                </span>
              </div>
              
              <div className={`p-4 rounded-lg text-center ${
                property.sold ? 'bg-gray-800/50' : 'glass-dark'
              }`}>
                <Calendar className="h-6 w-6 text-gold mx-auto mb-2" />
                <span className="block text-sm text-gray-400">Tipo</span>
                <span className={`block font-medium ${
                  property.sold ? 'text-gray-500' : 'text-white'
                }`}>
                  {property.property_type}
                </span>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-white text-xl mb-4">Descrição</h2>
              <p className={`leading-relaxed ${
                property.sold ? 'text-gray-500' : 'text-gray-300'
              }`}>
                {property.description}
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-white text-xl mb-4">Localização</h2>
              <LocationCard 
                location={property.location}
                height="h-80"
                className="border border-gold/20"
              />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <PropertySidebar 
              price={property.price}
              propertyTitle={property.title}
              propertyCode={property.code}
              sold={property.sold}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
