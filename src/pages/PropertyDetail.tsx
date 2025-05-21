
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Building, Bed, ChevronLeft, ChevronRight } from 'lucide-react';
import { PropertyType } from '@/components/PropertyCard';

// Sample property data
const properties: Record<string, PropertyType & { description: string; features: string[]; images: string[] }> = {
  '1': {
    id: '1',
    title: 'Casa de Luxo em Alphaville',
    type: 'Venda',
    price: 'R$ 2.400.000',
    location: 'Alphaville, São Paulo',
    bedrooms: 4,
    area: 350,
    imageUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
    description: 'Esplêndida casa de luxo em Alphaville, com acabamentos de alta qualidade, piscina, jardim e ampla área de lazer. Localizada em um dos condomínios mais exclusivos da região, oferece privacidade e segurança 24 horas. A residência possui 4 suítes, home office, espaço gourmet e garagem para 4 carros.',
    features: ['4 Suítes', 'Piscina', 'Jardim', 'Home Office', 'Espaço Gourmet', '4 Vagas de Garagem', 'Segurança 24h'],
    images: [
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
      'https://images.unsplash.com/photo-1502005097973-6a7082348e28',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750'
    ]
  },
  '2': {
    id: '2',
    title: 'Mansão Contemporânea',
    type: 'Venda',
    price: 'R$ 4.900.000',
    location: 'Barra da Tijuca, Rio de Janeiro',
    bedrooms: 5,
    area: 480,
    imageUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742',
    description: 'Luxuosa mansão contemporânea na Barra da Tijuca com vista panorâmica para o mar. Projeto arquitetônico assinado, com 5 suítes, cinema em casa, academia, piscina de borda infinita e deck para iates. Um verdadeiro refúgio de luxo com acabamentos de padrão internacional.',
    features: ['5 Suítes', 'Cinema', 'Academia', 'Piscina de Borda Infinita', 'Vista para o Mar', 'Deck para Iates', '6 Vagas de Garagem'],
    images: [
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'
    ]
  },
  '3': {
    id: '3',
    title: 'Penthouse com Vista para o Mar',
    type: 'Venda',
    price: 'R$ 3.200.000',
    location: 'Balneário Camboriú, SC',
    bedrooms: 3,
    area: 220,
    imageUrl: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334',
    description: 'Deslumbrante penthouse de 220m² no coração de Balneário Camboriú, oferecendo uma vista panorâmica imbatível do mar. Com 3 suítes luxuosas, sala de estar ampla com pé direito duplo, cozinha gourmet e uma extensa varanda com jacuzzi. Empreendimento com serviços exclusivos de hotel cinco estrelas.',
    features: ['3 Suítes', 'Pé Direito Duplo', 'Varanda Gourmet', 'Jacuzzi', 'Vista para o Mar', 'Serviços de Hotel 5 Estrelas', '2 Vagas de Garagem'],
    images: [
      'https://images.unsplash.com/photo-1483058712412-4245e9b90334',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858'
    ]
  }
};

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<(PropertyType & { description: string; features: string[]; images: string[] }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // In a real application, fetch the property from an API
    if (id && properties[id]) {
      setProperty(properties[id]);
    }
    setLoading(false);
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
    const phoneNumber = "5511999999999"; // Replace with actual WhatsApp number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-dark flex items-center justify-center">
        <div className="animate-pulse text-gold">Carregando...</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center py-16">
            <h2 className="text-white text-2xl mb-4">Imóvel não encontrado</h2>
            <p className="text-gray-300 mb-8">O imóvel que você está procurando não existe ou foi removido.</p>
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
                {property.type}
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
                <span className="block text-sm text-gray-400">Publicado</span>
                <span className="block text-white font-medium">Hoje</span>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-white text-xl mb-4">Descrição</h2>
              <p className="text-gray-300 leading-relaxed">{property.description}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-white text-xl mb-4">Características</h2>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-8">
              <h2 className="text-white text-xl mb-4">Localização</h2>
              <div className="bg-gray-800 h-64 rounded-lg overflow-hidden">
                {/* In a real application, you would integrate Google Maps here */}
                <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-400">
                  <MapPin className="h-8 w-8 mr-2" />
                  <span>Mapa Indisponível</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 glass-dark rounded-xl p-6 border border-gold/20">
              <div className="mb-4">
                <span className="text-gray-400 text-sm">Preço</span>
                <div className="text-gold text-2xl font-semibold">{property.price}</div>
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
              >
                Agendar Visita
              </button>
              
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>Código do Imóvel: FI-{property.id.padStart(4, '0')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
