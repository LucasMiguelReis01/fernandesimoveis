
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Building, Bed, ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import { PropertyType } from '@/components/PropertyCard';
import { supabase } from "@/integrations/supabase/client";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<PropertyType & { description: string; images: string[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      
      try {
        // Buscar detalhes do imóvel do Supabase
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          console.error('Erro ao buscar detalhes do imóvel:', error);
          setError('Não foi possível carregar os detalhes do imóvel.');
        } else if (data) {
          // Formatar os dados para o formato esperado
          const formattedProperty = {
            id: data.id,
            title: data.title,
            type: data.transaction_type,
            transaction_type: data.transaction_type,
            price: data.price,
            location: data.location,
            bedrooms: data.bedrooms,
            area: data.area,
            imageUrl: data.image_url,
            image_url: data.image_url,
            featured: data.featured,
            sold: data.sold,
            property_type: data.property_type,
            description: data.description,
            // Para demo, usando a mesma imagem repetida 3 vezes - em produção, isso viria do banco de dados
            images: [data.image_url, data.image_url, data.image_url]
          };
          setProperty(formattedProperty);
        } else {
          setError('Imóvel não encontrado.');
        }
      } catch (err) {
        console.error('Erro inesperado:', err);
        setError('Ocorreu um erro inesperado.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const nextImage = () => {
    if (property) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (property) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
      );
    }
  };

  const handleWhatsAppClick = () => {
    const message = `Olá! Gostaria de obter mais informações sobre o imóvel: ${property?.title}`;
    const phoneNumber = "5511950824205"; // Número formatado sem hífen ou espaços
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

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

  return (
    <div className="min-h-screen pt-32 pb-16 bg-dark">
      <div className="container mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
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
        
        {/* Image Gallery */}
        <div className="relative h-96 md:h-[500px] mb-8 rounded-xl overflow-hidden">
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          
          {property.sold && (
            <div className="absolute top-4 left-4 bg-red-600 text-white py-1 px-4 rounded-md">
              VENDIDO
            </div>
          )}
          
          <button 
            onClick={prevImage}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          
          <button 
            onClick={nextImage}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? 'bg-gold' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Property Thumbnails */}
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
          {property.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-24 h-24 rounded-md overflow-hidden ${
                index === currentImageIndex ? 'ring-2 ring-gold' : ''
              }`}
            >
              <img
                src={image}
                alt={`${property.title} - image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="text-gold text-sm font-medium bg-gold/10 px-3 py-1 rounded-md">
                {property.transaction_type || property.type}
              </span>
              <h1 className="text-white text-3xl md:text-4xl mt-4 mb-2">{property.title}</h1>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gold mr-1" />
                <span className="text-gray-300">{property.location}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 glass-dark rounded-lg text-center">
                <Building className="h-6 w-6 text-gold mx-auto mb-2" />
                <span className="block text-sm text-gray-400">Área</span>
                <span className="block text-white font-medium">{property.area} m²</span>
              </div>
              
              <div className="p-4 glass-dark rounded-lg text-center">
                <Bed className="h-6 w-6 text-gold mx-auto mb-2" />
                <span className="block text-sm text-gray-400">Quartos</span>
                <span className="block text-white font-medium">{property.bedrooms}</span>
              </div>
              
              <div className="p-4 glass-dark rounded-lg text-center">
                <Calendar className="h-6 w-6 text-gold mx-auto mb-2" />
                <span className="block text-sm text-gray-400">Tipo</span>
                <span className="block text-white font-medium">{property.property_type}</span>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-white text-xl mb-4">Descrição</h2>
              <p className="text-gray-300 leading-relaxed">{property.description}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-white text-xl mb-4">Localização</h2>
              <div className="bg-gray-800 h-64 rounded-lg overflow-hidden">
                {/* Em uma aplicação real, você integraria o Google Maps aqui */}
                <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-400">
                  <MapPin className="h-8 w-8 mr-2" />
                  <span>{property.location}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 glass-dark rounded-xl p-6 border border-gold/20">
              <div className="mb-4">
                <span className="text-gray-400 text-sm">Preço</span>
                <div className="text-gold text-2xl font-semibold">{formatPrice(property.price)}</div>
              </div>
              
              <div className="border-t border-gold/10 pt-4 mb-6">
                <h3 className="text-white font-medium mb-3">Fale com um corretor</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Interessado neste imóvel? Entre em contato conosco para obter mais informações ou agendar uma visita.
                </p>
              </div>
              
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md flex items-center justify-center mb-4"
              >
                <Phone className="h-5 w-5 mr-2" /> Contato via WhatsApp
              </button>
              
              <button
                className="w-full border border-gold text-gold py-3 rounded-md hover:bg-gold/10 transition-colors"
                onClick={() => {
                  const message = `Olá! Gostaria de agendar uma visita para o imóvel: ${property.title}`;
                  const phoneNumber = "5511950824205";
                  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                  window.open(url, '_blank');
                }}
              >
                Agendar Visita
              </button>
              
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>Código do Imóvel: FI-{property.id.substring(0, 8)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
