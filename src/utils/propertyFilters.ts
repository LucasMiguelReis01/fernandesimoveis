
import { PropertyType } from '@/components/PropertyCard';

export const priceRangeMap: Record<string, [number, number]> = {
  'ate500': [0, 500000],
  '500a1m': [500000, 1000000],
  '1ma2m': [1000000, 2000000],
  'acima2m': [2000000, Infinity]
};

export const filterProperties = (properties: PropertyType[], filters: {
  transactionType: string;
  propertyType: string;
  priceRange: string;
  city: string;
}) => {
  return properties.filter(property => {
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
};

export const sortProperties = (properties: PropertyType[], sortBy: string) => {
  return [...properties].sort((a, b) => {
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
};
