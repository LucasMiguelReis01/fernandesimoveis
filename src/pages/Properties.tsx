
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import FilterBar from '@/components/properties/FilterBar';
import PropertySorting from '@/components/properties/PropertySorting';
import LoadingState from '@/components/properties/LoadingState';
import PropertiesVisualization from '@/components/PropertiesVisualization';
import OptimizedPropertyCard from '@/components/OptimizedPropertyCard';
import { filterProperties, sortProperties } from '@/utils/propertyFilters';
import { PropertyType } from '@/components/PropertyCard';
import { Zap, Grid } from 'lucide-react';

const Properties = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  useEffect(() => {
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
        
        const { data, error } = await supabase
          .from('properties')
          .select('id, title, transaction_type, price, location, bedrooms, area, image_url, featured, sold, property_type, code')
          .order('created_at', { ascending: false });
          
        if (error) {
          setError('Não foi possível carregar os imóveis.');
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
            property_type: item.property_type,
            code: item.code
          }));
          setProperties(formattedData);
        }
      } catch (err) {
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

  const handlePropertySelect = (property: PropertyType) => {
    navigate(`/property/${property.id}`);
  };

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
          
          <div className="flex justify-center mt-6">
            <div className="bg-dark-light border border-gold/20 rounded-lg p-1 flex">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-gold text-dark' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="h-4 w-4" />
                Grade
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  viewMode === 'map' 
                    ? 'bg-gold text-dark' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Zap className="h-4 w-4" />
                Interativo
              </button>
            </div>
          </div>
        </div>
      </div>
      
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
              
              {viewMode === 'grid' ? (
                <div className="mt-8">
                  {sortedProperties.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-400 mb-4">Nenhum imóvel encontrado com os filtros aplicados.</p>
                      <button
                        onClick={handleClearFilters}
                        className="gold-button px-6 py-3 rounded-md"
                      >
                        Limpar Filtros
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {sortedProperties.map((property) => (
                        <OptimizedPropertyCard key={property.id} property={property} />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-8">
                  <PropertiesVisualization 
                    properties={sortedProperties}
                    height="h-[600px]"
                    onPropertySelect={handlePropertySelect}
                  />
                  {sortedProperties.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-400 mb-4">Nenhum imóvel encontrado com os filtros aplicados.</p>
                      <button
                        onClick={handleClearFilters}
                        className="gold-button px-6 py-3 rounded-md"
                      >
                        Limpar Filtros
                      </button>
                    </div>
                  )}
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
