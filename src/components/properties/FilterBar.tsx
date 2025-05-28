
import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface FilterBarProps {
  filters: {
    transactionType: string;
    propertyType: string;
    priceRange: string;
    city: string;
    code?: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    transactionType: string;
    propertyType: string;
    priceRange: string;
    city: string;
    code?: string;
  }>>;
}

const FilterBar = ({ filters, setFilters }: FilterBarProps) => {
  const [showCodeSearch, setShowCodeSearch] = useState(false);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      transactionType: 'todos',
      propertyType: 'todos',
      priceRange: 'todos',
      city: '',
      code: ''
    });
    setShowCodeSearch(false);
  };

  const hasActiveFilters = filters.transactionType !== 'todos' || 
                          filters.propertyType !== 'todos' || 
                          filters.priceRange !== 'todos' || 
                          filters.city !== '' ||
                          filters.code !== '';

  return (
    <div className="bg-dark-light rounded-lg p-6 mb-8">
      <div className="flex flex-wrap gap-4 mb-4">
        {/* Transaction Type Filter */}
        <div className="flex-1 min-w-48">
          <label className="block text-sm text-gold mb-2">Tipo de Transação</label>
          <select
            value={filters.transactionType}
            onChange={(e) => handleFilterChange('transactionType', e.target.value)}
            className="w-full p-3 bg-dark border border-gold/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-gold/50"
          >
            <option value="todos">Todos</option>
            <option value="Venda">Venda</option>
            <option value="Aluguel">Aluguel</option>
          </select>
        </div>

        {/* Property Type Filter */}
        <div className="flex-1 min-w-48">
          <label className="block text-sm text-gold mb-2">Tipo de Imóvel</label>
          <select
            value={filters.propertyType}
            onChange={(e) => handleFilterChange('propertyType', e.target.value)}
            className="w-full p-3 bg-dark border border-gold/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-gold/50"
          >
            <option value="todos">Todos</option>
            <option value="casa">Casa</option>
            <option value="apartamento">Apartamento</option>
            <option value="terreno">Terreno</option>
            <option value="kitnet">Kitnet</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="flex-1 min-w-48">
          <label className="block text-sm text-gold mb-2">Faixa de Preço</label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="w-full p-3 bg-dark border border-gold/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-gold/50"
          >
            <option value="todos">Todos</option>
            <option value="ate500">Até R$ 500 mil</option>
            <option value="500a1m">R$ 500 mil - R$ 1 milhão</option>
            <option value="1ma2m">R$ 1 milhão - R$ 2 milhões</option>
            <option value="acima2m">Acima de R$ 2 milhões</option>
          </select>
        </div>

        {/* City Filter */}
        <div className="flex-1 min-w-48">
          <label className="block text-sm text-gold mb-2">Cidade</label>
          <input
            type="text"
            placeholder="Digite a cidade"
            value={filters.city}
            onChange={(e) => handleFilterChange('city', e.target.value)}
            className="w-full p-3 bg-dark border border-gold/30 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gold/50"
          />
        </div>
      </div>

      {/* Code Search Section */}
      <div className="border-t border-gold/10 pt-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowCodeSearch(!showCodeSearch)}
            className="flex items-center gap-2 text-gold hover:text-gold/80 transition-colors"
          >
            <Search className="h-4 w-4" />
            Buscar por Código
          </button>
          
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
            >
              <X className="h-4 w-4" />
              Limpar Filtros
            </button>
          )}
        </div>

        {showCodeSearch && (
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Digite o código do imóvel (ex: FI-001)"
              value={filters.code || ''}
              onChange={(e) => handleFilterChange('code', e.target.value)}
              className="w-full p-3 bg-dark border border-gold/30 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gold/50"
            />
            <p className="text-gray-400 text-sm mt-1">
              Busque diretamente pelo código único do imóvel
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
