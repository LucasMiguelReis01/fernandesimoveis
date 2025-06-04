
export const formatPrice = (price: string | number): string => {
  if (typeof price === 'string' && price.includes('R$')) return price;
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(numericPrice)) return 'Preço sob consulta';
  return `R$ ${numericPrice.toLocaleString('pt-BR')}`;
};

export const formatArea = (area: number): string => {
  return `${area}m²`;
};

export const formatBedrooms = (bedrooms: number): string => {
  return `${bedrooms} qts`;
};
