
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import FilterBar from '@/components/properties/FilterBar';
import PropertySorting from '@/components/properties/PropertySorting';
import PropertyGrid from '@/components/properties/PropertyGrid';
import LoadingState from '@/components/properties/LoadingState';
import { filterProperties, sortProperties } from '@/utils/propertyFilters';
import { PropertyType } from '@/components/PropertyCard';

const Properties = () => {
  const location = useLocation();
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [filters, setFilters] = useState({
    transactionType: 'todos',
    propertyType: 'todos',
    priceRange: 'todos',
    city: '',
    code: ''
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    // Aplicar filtros que possam ter sido passados no estado da localização
    const locationState = location.state as any;
    if (locationState) {
      setFilters(prev => ({
        ...prev,
        transactionType: locationState.transactionType || prev.transactionType,
        propertyType: locationState.propertyType || prev.propertyType,
        priceRange: locationState.priceRange || prev.priceRange,
        city: locationState.city || prev.city,
        code: locationState.code || prev.code
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
            description: item.description,
            code: item.code
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

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleClearFilters = () => {
    setFilters({
      transactionType: 'todos',
      propertyType: 'todos',
      priceRange: 'todos',
      city: '',
      code: ''
    });
  };

  // Filtrar e ordenar propriedades
  const filteredProperties = filterProperties(properties, filters);
  const sortedProperties = sortProperties(filteredProperties, sortBy);

  return (
    <div className={`min-h-screen transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative pt-20 pb-12 bg-dark-light">
        <div className="container mx-auto px-4 md:px-6 pt-16">
          <h1 className="text-white text-center mb-10">
            NOSSOS <span className="text-gold">IMÓVEIS</span>
          </h1>
          
          <FilterBar filters={filters} setFilters={setFilters} />
        </div>
      </div>
      
      {/* Listagem de Propriedades */}
      <section className="py-16 bg-dark">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <LoadingState error={error} onRetry={() => window.location.reload()} />
          ) : (
            <>
              <PropertySorting 
                sortBy={sortBy} 
                onSortChange={handleSortChange} 
                totalCount={sortedProperties.length} 
              />
              
              <PropertyGrid 
                properties={sortedProperties} 
                onClearFilters={handleClearFilters} 
              />
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Properties;
