
import SearchFilters from './SearchFilters';

const HeroBanner = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&q=80)',
          backgroundPosition: 'center',
          backgroundColor: '#121212',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/50"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-24 relative z-10">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h1 className="text-white mb-6 leading-tight">
            ENCONTRE SEU<br /> 
            <span className="text-gold">IMÓVEL DE ALTO PADRÃO</span>
          </h1>
          <p className="text-white/80 text-xl md:text-2xl max-w-2xl mx-auto">
            Com a Fernandes Imóveis, seu próximo lar está ao alcance.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <SearchFilters />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
