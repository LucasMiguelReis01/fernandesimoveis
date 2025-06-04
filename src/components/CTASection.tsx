
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const CTASection = memo(() => {
  return (
    <section className="py-20 bg-dark relative">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed opacity-20"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb)',
        }}
      />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-white mb-6">
            PRONTO PARA ENCONTRAR SEU <span className="text-gold">IMÓVEL IDEAL</span>?
          </h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Nossa equipe está pronta para ajudá-lo a encontrar o imóvel dos seus sonhos.
            Entre em contato conosco para um atendimento personalizado.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/properties" 
              className="gold-button px-8 py-3 rounded-md transition-all duration-300 hover:scale-105"
            >
              Ver Imóveis
            </Link>
            <Link 
              to="/contact" 
              className="border border-gold text-gold px-8 py-3 rounded-md hover:bg-gold/10 transition-all duration-300"
            >
              Fale Conosco
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

CTASection.displayName = 'CTASection';

export default CTASection;
