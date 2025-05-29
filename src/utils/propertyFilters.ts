
import { PropertyType } from '@/components/PropertyCard';

interface FilterOptions {
  transactionType: string;
  propertyType: string;
  priceRange: string;
  city: string;
  code?: string;
}

export const filterProperties = (properties: PropertyType[], filters: FilterOptions): PropertyType[] => {
  return properties.filter(property => {
    // Code filter (highest priority - if code is provided, search by code only)
    if (filters.code && filters.code.trim() !== '') {
      const searchCode = filters.code.toLowerCase().trim();
      const propertyCode = property.code?.toLowerCase() || '';
      return propertyCode.includes(searchCode);
    }

    // Transaction type filter
    if (filters.transactionType !== 'todos' && property.transaction_type !== filters.transactionType) {
      return false;
    }

    // Property type filter
    if (filters.propertyType !== 'todos' && property.property_type !== filters.propertyType) {
      return false;
    }

    // City filter
    if (filters.city && !property.location.toLowerCase().includes(filters.city.toLowerCase())) {
      return false;
    }

    // Price range filter
    if (filters.priceRange !== 'todos') {
      const price = typeof property.price === 'number' ? property.price : parseFloat(property.price.toString());
      
      switch (filters.priceRange) {
        case 'ate500':
          if (price > 500000) return false;
          break;
        case '500a1m':
          if (price <= 500000 || price > 1000000) return false;
          break;
        case '1ma2m':
          if (price <= 1000000 || price > 2000000) return false;
          break;
        case 'acima2m':
          if (price <= 2000000) return false;
          break;
      }
    }

    return true;
  });
};

export const sortProperties = (properties: PropertyType[], sortBy: string): PropertyType[] => {
  const sortedProperties = [...properties];
  
  switch (sortBy) {
    case 'price-asc':
      return sortedProperties.sort((a, b) => {
        const priceA = typeof a.price === 'number' ? a.price : parseFloat(a.price.toString());
        const priceB = typeof b.price === 'number' ? b.price : parseFloat(b.price.toString());
        return priceA - priceB;
      });
    case 'price-desc':
      return sortedProperties.sort((a, b) => {
        const priceA = typeof a.price === 'number' ? a.price : parseFloat(a.price.toString());
        const priceB = typeof b.price === 'number' ? b.price : parseFloat(b.price.toString());
        return priceB - priceA;
      });
    case 'recent':
    default:
      return sortedProperties;
  }
};
