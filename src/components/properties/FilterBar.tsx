
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterBarProps {
  filters: {
    transactionType: string;
    propertyType: string;
    priceRange: string;
    city: string;
  };
  setFilters: (filters: {
    transactionType: string;
    propertyType: string;
    priceRange: string;
    city: string;
  }) => void;
}

const FilterBar = ({ filters, setFilters }: FilterBarProps) => {
  const handleFilterChange = (filterName: string, value: string) => {
    setFilters({
      ...filters,
      [filterName]: value
    });
  };

  return (
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
  );
};

export default FilterBar;
