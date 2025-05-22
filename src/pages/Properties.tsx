
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import PropertyCard, { PropertyType } from '@/components/PropertyCard';
import { supabase } from "@/integrations/supabase/client";

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('recent');

  // Mapeamento de faixas de preço para valores reais
  const priceRangeMap: Record<string, [number, number]> = {
    'ate500': [0, 500000],
    '500a1m': [500000, 1000000],
    '1ma2m': [1000000, 2000000],
    'acima2m': [2000000, Infinity]
  };

  useEffect(() => {
    // Aplicar filtros que possam ter sido passados no estado da localização
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

    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        
        // Buscar propriedades do Supabase
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Erro ao buscar propriedades:', error);
          setError('Não foi possível carregar os imóveis.');
        } else {
          // Formatar os dados para o formato esperado pelo PropertyCard
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
            property_type: item.property_type,
            description: item.description
          }));
          setProperties(formattedData);
        }
      } catch (err) {
        console.error('Erro inesperado:', err);
        setError('Ocorreu um erro inesperado.');
      } finally {
        setIsLoading(false);
        setIsLoaded(true);
      }
    };

    fetchProperties();
  }, [location]);

  // Filtrar propriedades com base na seleção do usuário
  const filteredProperties = properties.filter(property => {
    // Filtrar por tipo de transação
    if (filters.transactionType !== 'todos') {
      const transactionType = property.transaction_type || property.type || '';
      if (filters.transactionType === 'comprar' && transactionType !== 'Venda') return false;
      if (filters.transactionType === 'alugar' && transactionType !== 'Aluguel') return false;
    }
    
    // Filtrar por tipo de propriedade
    if (filters.propertyType !== 'todos') {
      const propertyType = property.property_type || '';
      if (filters.propertyType.toLowerCase() !== propertyType.toLowerCase()) return false;
    }
    
    // Filtrar por faixa de preço
    if (filters.priceRange !== 'todos') {
      const priceValue = typeof property.price === 'string' ? parseFloat(property.price.replace(/\D+/g, '')) : property.price;
      const [minPrice, maxPrice] = priceRangeMap[filters.priceRange] || [0, Infinity];
      
      if (priceValue < minPrice || priceValue > maxPrice) {
        return false;
      }
    }
    
    // Filtrar por cidade
    if (filters.city) {
      const locationLower = property.location.toLowerCase();
      if (!locationLower.includes(filters.city.toLowerCase())) {
        return false;
      }
    }
    
    return true;
  });

  // Ordenar propriedades com base na seleção
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    const priceA = typeof a.price === 'string' ? parseFloat(a.price.replace(/\D+/g, '')) : a.price;
    const priceB = typeof b.price === 'string' ? parseFloat(b.price.replace(/\D+/g, '')) : b.price;
    
    if (sortBy === 'lowPrice') {
      return priceA - priceB;
    } else if (sortBy === 'highPrice') {
      return priceB - priceA;
    }
    // Default para recentes (sem ordenação necessária, pois já estão ordenados por recência)
    return 0;
  });

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters({
      ...filters,
      [filterName]: value
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  return (
    <div className={`min-h-screen transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative pt-20 pb-12 bg-dark-light">
        <div className="container mx-auto px-4 md:px-6 pt-16">
          <h1 className="text-white text-center mb-10">
            NOSSOS <span className="text-gold">IMÓVEIS</span>
          </h1>
          
          {/* Filtros */}
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
                  <option value="kitnet">Kitnet</option>
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
      
      {/* Listagem de Propriedades */}
      <section className="py-16 bg-dark">
        <div className="container mx-auto px-4 md:px-6">
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
          ) : (
            <>
              <div className="mb-8 flex justify-between items-center">
                <h2 className="text-white text-xl">
                  {sortedProperties.length} {sortedProperties.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
                </h2>
                <div className="relative border border-gold/30 rounded-lg">
                  <select 
                    className="p-2 bg-dark text-white appearance-none pr-8 focus:outline-none"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    <option value="recent">Mais Recentes</option>
                    <option value="lowPrice">Menor Preço</option>
                    <option value="highPrice">Maior Preço</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gold h-4 w-4 pointer-events-none" />
                </div>
              </div>
              
              {sortedProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sortedProperties.map((property) => (
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
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Properties;
