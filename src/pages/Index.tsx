
import { useState, useEffect } from 'react';
import HeroBanner from '@/components/HeroBanner';
import PropertyCard, { PropertyType } from '@/components/PropertyCard';

const featuredProperties: PropertyType[] = [
  {
    id: '1',
    title: 'Casa de Luxo em Alphaville',
    type: 'Venda',
    price: 'R$ 2.400.000',
    location: 'Alphaville, São Paulo',
    bedrooms: 4,
    area: 350,
    imageUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
    featured: true
  },
  {
    id: '2',
    title: 'Mansão Contemporânea',
    type: 'Venda',
    price: 'R$ 4.900.000',
    location: 'Barra da Tijuca, Rio de Janeiro',
    bedrooms: 5,
    area: 480,
    imageUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742',
    featured: true
  },
  {
    id: '3',
    title: 'Penthouse com Vista para o Mar',
    type: 'Venda',
    price: 'R$ 3.200.000',
    location: 'Balneário Camboriú, SC',
    bedrooms: 3,
    area: 220,
    imageUrl: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334',
    featured: true
  }
];

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <HeroBanner />
      
      <section className="bg-dark py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-white mb-4">
              IMÓVEIS DE <span className="text-gold">DESTAQUE</span>
            </h2>
            <div className="w-24 h-1 bg-gold/40 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <a 
              href="/properties" 
              className="gold-button inline-block px-8 py-3 rounded-md"
            >
              Ver Todos os Imóveis
            </a>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-dark-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-white mb-6">
              POR QUE ESCOLHER A <span className="text-gold">FERNANDES IMÓVEIS</span>?
            </h2>
            <p className="text-gray-300 mb-12">
              Somos especialistas em imóveis de alto padrão, com foco em proporcionar 
              uma experiência de compra ou locação excepcional para nossos clientes.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 glass-dark rounded-lg">
                <div className="h-14 w-14 border border-gold/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gold text-2xl">01</span>
                </div>
                <h3 className="text-white text-lg mb-2">Exclusividade</h3>
                <p className="text-gray-400">
                  Trabalhamos com imóveis exclusivos e de alto padrão, cuidadosamente selecionados.
                </p>
              </div>
              
              <div className="p-6 glass-dark rounded-lg">
                <div className="h-14 w-14 border border-gold/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gold text-2xl">02</span>
                </div>
                <h3 className="text-white text-lg mb-2">Atendimento</h3>
                <p className="text-gray-400">
                  Oferecemos um serviço personalizado e dedicado a cada cliente.
                </p>
              </div>
              
              <div className="p-6 glass-dark rounded-lg">
                <div className="h-14 w-14 border border-gold/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gold text-2xl">03</span>
                </div>
                <h3 className="text-white text-lg mb-2">Conhecimento</h3>
                <p className="text-gray-400">
                  Nossa equipe possui amplo conhecimento do mercado imobiliário local.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-dark relative">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb)',
          }}
        ></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-white mb-6">
              PRONTO PARA ENCONTRAR SEU <span className="text-gold">IMÓVEL IDEAL</span>?
            </h2>
            <p className="text-gray-300 mb-8">
              Nossa equipe está pronta para ajudá-lo a encontrar o imóvel dos seus sonhos.
              Entre em contato conosco para um atendimento personalizado.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/properties" 
                className="gold-button px-8 py-3 rounded-md"
              >
                Ver Imóveis
              </a>
              <a 
                href="/contact" 
                className="border border-gold text-gold px-8 py-3 rounded-md hover:bg-gold/10 transition-colors"
              >
                Fale Conosco
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
