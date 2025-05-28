
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Search } from 'lucide-react';

const SearchFilters = () => {
  const navigate = useNavigate();
  const [transactionType, setTransactionType] = useState('comprar');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [city, setCity] = useState('');
  const [code, setCode] = useState('');
  const [showCodeSearch, setShowCodeSearch] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mapear valores para filtros usados na página Properties.tsx
    const filters = { 
      transactionType: transactionType === 'comprar' ? 'Venda' : 'Aluguel', 
      propertyType, 
      priceRange, 
      city,
      code
    };
    
    navigate('/properties', { state: filters });
  };

  return (
    <div className="glass-dark rounded-lg p-6">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <div className="border border-gold/30 rounded-lg p-4 text-white bg-dark-light/50 flex justify-between items-center cursor-pointer group">
              <span>{transactionType === 'comprar' ? 'Comprar' : 'Alugar'}</span>
              <ChevronDown className="h-4 w-4 text-gold" />
              
              <div className="hidden absolute left-0 right-0 top-full mt-2 bg-dark-lighter border border-gold/30 rounded-md shadow-lg z-10 group-hover:block">
                <div 
                  className="p-3 hover:bg-gold/10 cursor-pointer"
                  onClick={() => setTransactionType('comprar')}
                >
                  Comprar
                </div>
                <div 
                  className="p-3 hover:bg-gold/10 cursor-pointer" 
                  onClick={() => setTransactionType('alugar')}
                >
                  Alugar
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="border border-gold/30 rounded-lg p-4 text-white bg-dark-light/50 flex justify-between items-center cursor-pointer group">
              <span>{propertyType || 'Tipo de Imóvel'}</span>
              <ChevronDown className="h-4 w-4 text-gold" />
              
              <div className="hidden absolute left-0 right-0 top-full mt-2 bg-dark-lighter border border-gold/30 rounded-md shadow-lg z-10 group-hover:block">
                {['Casa', 'Apartamento', 'Terreno', 'Kitnet'].map((type) => (
                  <div 
                    key={type} 
                    className="p-3 hover:bg-gold/10 cursor-pointer"
                    onClick={() => setPropertyType(type.toLowerCase())}
                  >
                    {type}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="border border-gold/30 rounded-lg p-4 text-white bg-dark-light/50 flex justify-between items-center cursor-pointer group">
              <span>{priceRange || 'Faixa de Preço'}</span>
              <ChevronDown className="h-4 w-4 text-gold" />
              
              <div className="hidden absolute left-0 right-0 top-full mt-2 bg-dark-lighter border border-gold/30 rounded-md shadow-lg z-10 group-hover:block">
                {[
                  {label: 'Até R$500 mil', value: 'ate500'}, 
                  {label: 'R$500 mil - R$1 milhão', value: '500a1m'},
                  {label: 'R$1 milhão - R$2 milhões', value: '1ma2m'},
                  {label: 'Acima de R$2 milhões', value: 'acima2m'}
                ].map((range) => (
                  <div 
                    key={range.value} 
                    className="p-3 hover:bg-gold/10 cursor-pointer"
                    onClick={() => setPriceRange(range.value)}
                  >
                    {range.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Cidade"
              className="flex-1 border border-gold/30 rounded-lg p-4 text-white bg-dark-light/50 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gold/50"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button 
              type="submit" 
              className="gold-button px-6 rounded-lg"
            >
              BUSCAR
            </button>
          </div>
        </div>

        {/* Seção de busca por código */}
        <div className="border-t border-gold/10 pt-4">
          <button
            type="button"
            onClick={() => setShowCodeSearch(!showCodeSearch)}
            className="flex items-center gap-2 text-gold hover:text-gold/80 transition-colors mb-4"
          >
            <Search className="h-4 w-4" />
            Buscar por Código do Imóvel
          </button>

          {showCodeSearch && (
            <div className="max-w-md">
              <input
                type="text"
                placeholder="Digite o código do imóvel (ex: FI-001)"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-3 bg-dark border border-gold/30 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gold/50"
              />
              <p className="text-gray-400 text-sm mt-1">
                Busque diretamente pelo código único do imóvel
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;
