
import { ChevronDown } from 'lucide-react';

interface PropertySortingProps {
  sortBy: string;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  totalCount: number;
}

const PropertySorting = ({ sortBy, onSortChange, totalCount }: PropertySortingProps) => {
  return (
    <div className="mb-8 flex justify-between items-center">
      <h2 className="text-white text-xl">
        {totalCount} {totalCount === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
      </h2>
      <div className="relative border border-gold/30 rounded-lg">
        <select 
          className="p-2 bg-dark text-white appearance-none pr-8 focus:outline-none"
          value={sortBy}
          onChange={onSortChange}
        >
          <option value="recent">Mais Recentes</option>
          <option value="lowPrice">Menor Preço</option>
          <option value="highPrice">Maior Preço</option>
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gold h-4 w-4 pointer-events-none" />
      </div>
    </div>
  );
};

export default PropertySorting;
