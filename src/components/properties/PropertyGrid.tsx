
import PropertyCard, { PropertyType } from '@/components/PropertyCard';

interface PropertyGridProps {
  properties: PropertyType[];
  onClearFilters: () => void;
}

const PropertyGrid = ({ properties, onClearFilters }: PropertyGridProps) => {
  if (properties.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-white text-xl mb-4">Nenhum imóvel encontrado com os filtros selecionados.</p>
        <button 
          onClick={onClearFilters}
          className="gold-button px-6 py-2 rounded-md"
        >
          Limpar Filtros
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyGrid;
