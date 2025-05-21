
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import PropertyCard, { PropertyType } from '@/components/PropertyCard';

// Sample properties data
const allProperties: PropertyType[] = [
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
  },
  {
    id: '4',
    title: 'Apartamento de Alto Padrão',
    type: 'Aluguel',
    price: 'R$ 12.000/mês',
    location: 'Jardins, São Paulo',
    bedrooms: 2,
    area: 150,
    imageUrl: 'https://images.unsplash.com/photo-1527576539890-dfa815648363'
  },
  {
    id: '5',
    title: 'Casa com Piscina em Condomínio',
    type: 'Venda',
    price: 'R$ 1.800.000',
    location: 'Ribeirão Preto, SP',
    bedrooms: 4,
    area: 280,
    imageUrl: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a'
  },
  {
    id: '6',
    title: 'Terreno em Área Nobre',
    type: 'Venda',
    price: 'R$ 900.000',
    location: 'Campinas, SP',
    bedrooms: 0,
    area: 500,
    imageUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff'
  }
];

const Properties = () => {
  const location = useLocation();
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [filters, setFilters] = useState({
    transactionType: 'todos',
    propertyType: 'todos',
    priceRange: 'todos',
    city: ''
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Apply any filters that might have been passed in location state
    const locationState = location.state as any;
    if (locationState) {
      setFilters(prev => ({
        ...prev,
        transactionType: locationState.transactionType || prev.transactionType,
        propertyType: locationState.propertyType || prev.propertyType,
        priceRange: locationState.priceRange || prev.priceRange,
        city: locationState.city || prev.city
      }));
    }

    // In a real application, you would fetch data from your API here
    setProperties(allProperties);
    setIsLoaded(true);
  }, [location]);

  // Filter properties based on user selection
  const filteredProperties = properties.filter(property => {
    // In a real application, you would implement proper filtering logic here
    if (filters.transactionType !== 'todos') {
      if (filters.transactionType === 'comprar' && property.type !== 'Venda') return false;
      if (filters.transactionType === 'alugar' && property.type !== 'Aluguel') return false;
    }
    
    if (filters.city && !property.location.toLowerCase().includes(filters.city.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters({
      ...filters,
      [filterName]: value
    });
  };

  return (
    <div className={`min-h-screen transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative pt-20 pb-12 bg-dark-light">
        <div className="container mx-auto px-4 md:px-6 pt-16">
          <h1 className="text-white text-center mb-10">
            NOSSOS <span className="text-gold">IMÓVEIS</span>
          </h1>
          
          {/* Filters */}
          <div className="mb-10 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <label className="block text-sm text-gold mb-2">Tipo de Transação</label>
              <div className="relative border border-gold/30 rounded-lg">
                <select
                  className="w-full p-3 bg-dark appearance-none text-white focus:outline-none"
                  value={filters.transactionType}
                  onChange={(e) => handleFilterChange('transactionType', e.target.value)}
                >
                  <option value="todos">Todos</option>
                  <option value="comprar">Comprar</option>
                  <option value="alugar">Alugar</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gold h-4 w-4 pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gold mb-2">Tipo de Imóvel</label>
              <div className="relative border border-gold/30 rounded-lg">
                <select
                  className="w-full p-3 bg-dark appearance-none text-white focus:outline-none"
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                >
                  <option value="todos">Todos</option>
                  <option value="casa">Casa</option>
                  <option value="apartamento">Apartamento</option>
                  <option value="terreno">Terreno</option>
                  <option value="chacara">Chácara</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gold h-4 w-4 pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gold mb-2">Faixa de Preço</label>
              <div className="relative border border-gold/30 rounded-lg">
                <select
                  className="w-full p-3 bg-dark appearance-none text-white focus:outline-none"
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                >
                  <option value="todos">Todos</option>
                  <option value="ate500">Até R$500 mil</option>
                  <option value="500a1m">R$500 mil - R$1 milhão</option>
                  <option value="1ma2m">R$1 milhão - R$2 milhões</option>
                  <option value="acima2m">Acima de R$2 milhões</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gold h-4 w-4 pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gold mb-2">Cidade</label>
              <input
                type="text"
                placeholder="Digite uma cidade"
                className="w-full p-3 bg-dark border border-gold/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gold/50"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Property Listings */}
      <section className="py-16 bg-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-white text-xl">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
            </h2>
            <div className="relative border border-gold/30 rounded-lg">
              <select className="p-2 bg-dark text-white appearance-none pr-8 focus:outline-none">
                <option>Mais Recentes</option>
                <option>Menor Preço</option>
                <option>Maior Preço</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gold h-4 w-4 pointer-events-none" />
            </div>
          </div>
          
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white text-xl mb-4">Nenhum imóvel encontrado com os filtros selecionados.</p>
              <button 
                onClick={() => setFilters({
                  transactionType: 'todos',
                  propertyType: 'todos',
                  priceRange: 'todos',
                  city: ''
                })}
                className="gold-button px-6 py-2 rounded-md"
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Properties;
