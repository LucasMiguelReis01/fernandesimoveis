
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import OptimizedPropertyCard from './OptimizedPropertyCard';
import { useFeaturedProperties } from '@/hooks/useFeaturedProperties';

const FeaturedPropertiesSection = memo(() => {
  const { properties, isLoading, error, refetch } = useFeaturedProperties(3);

  return (
    <section className="bg-dark py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-white mb-4">
            IMÓVEIS DE <span className="text-gold">DESTAQUE</span>
          </h2>
          <div className="w-24 h-1 bg-gold/40 mx-auto" />
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold" />
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={refetch}
              className="gold-button px-6 py-2 rounded-md"
            >
              Tentar novamente
            </button>
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {properties.map((property) => (
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
        
        <div className="text-center">
          <Link 
            to="/properties" 
            className="gold-button inline-block px-8 py-3 rounded-md transition-all duration-300 hover:scale-105"
          >
            Ver Todos os Imóveis
          </Link>
        </div>
      </div>
    </section>
  );
});

FeaturedPropertiesSection.displayName = 'FeaturedPropertiesSection';

export default FeaturedPropertiesSection;
