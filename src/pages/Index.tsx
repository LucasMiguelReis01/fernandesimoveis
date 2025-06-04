import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '@/components/HeroBanner';
import OptimizedPropertyCard from '@/components/OptimizedPropertyCard';
import { supabase } from "@/integrations/supabase/client";
import { PropertyType } from '@/components/PropertyCard';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [featuredProperties, setFeaturedProperties] = useState<PropertyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('id, title, transaction_type, price, location, bedrooms, area, image_url, featured, sold, property_type')
          .eq('featured', true)
          .limit(3);
        
        if (error) {
          setError('Não foi possível carregar os imóveis destacados.');
        } else {
          const formattedData = data.map(item => ({
            id: item.id,
            title: item.title,
            type: item.transaction_type,
            transaction_type: item.transaction_type,
            price: item.price,
            location: item.location,
            bedrooms: item.bedrooms,
            area: item.area,
            imageUrl: item.image_url,
            image_url: item.image_url,
            featured: item.featured,
            sold: item.sold,
            property_type: item.property_type
          }));
          setFeaturedProperties(formattedData);
        }
      } catch (err) {
        setError('Ocorreu um erro inesperado.');
      } finally {
        setIsLoading(false);
        setIsLoaded(true);
      }
    };

    fetchFeaturedProperties();
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
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="gold-button px-6 py-2 rounded-md"
              >
                Tentar novamente
              </button>
            </div>
          ) : featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <OptimizedPropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white mb-4">Nenhum imóvel destacado encontrado.</p>
              <Link to="/properties" className="gold-button px-8 py-3 rounded-md">
                Ver Todos os Imóveis
              </Link>
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Link 
              to="/properties" 
              className="gold-button inline-block px-8 py-3 rounded-md"
            >
              Ver Todos os Imóveis
            </Link>
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
              Somos especialistas em imóveis de todas as categorias, desde imóveis populares até alto padrão,
              com foco em proporcionar uma experiência de compra ou locação excepcional para nossos clientes.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 glass-dark rounded-lg">
                <div className="h-14 w-14 border border-gold/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gold text-2xl">01</span>
                </div>
                <h3 className="text-white text-lg mb-2">Diversidade</h3>
                <p className="text-gray-400">
                  Trabalhamos com imóveis de todos os padrões, desde populares até alto luxo, cuidadosamente selecionados.
                </p>
              </div>
              
              <div className="p-6 glass-dark rounded-lg">
                <div className="h-14 w-14 border border-gold/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gold text-2xl">02</span>
                </div>
                <h3 className="text-white text-lg mb-2">Atendimento</h3>
                <p className="text-gray-400">
                  Oferecemos um serviço personalizado e dedicado a cada cliente, independente do valor do imóvel.
                </p>
              </div>
              
              <div className="p-6 glass-dark rounded-lg">
                <div className="h-14 w-14 border border-gold/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gold text-2xl">03</span>
                </div>
                <h3 className="text-white text-lg mb-2">Conhecimento</h3>
                <p className="text-gray-400">
                  Nossa equipe possui amplo conhecimento do mercado imobiliário local e financiamentos.
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
              <Link 
                to="/properties" 
                className="gold-button px-8 py-3 rounded-md"
              >
                Ver Imóveis
              </Link>
              <Link 
                to="/contact" 
                className="border border-gold text-gold px-8 py-3 rounded-md hover:bg-gold/10 transition-colors"
              >
                Fale Conosco
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
