
import React, { memo } from 'react';
import { Phone } from 'lucide-react';

interface PropertySidebarProps {
  price: string | number;
  propertyTitle: string;
  propertyCode?: string;
}

const PropertySidebar = memo(({ price, propertyTitle, propertyCode }: PropertySidebarProps) => {
  const formatPrice = (price: string | number): string => {
    if (typeof price === 'string' && price.includes('R$')) return price;
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numericPrice)) return 'Preço sob consulta';
    return `R$ ${numericPrice.toLocaleString('pt-BR')}`;
  };

  const handleWhatsAppClick = () => {
    const message = `Olá! Gostaria de obter mais informações sobre o imóvel: ${propertyTitle}`;
    const phoneNumber = "5511950824205";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleScheduleVisit = () => {
    const message = `Olá! Gostaria de agendar uma visita para o imóvel: ${propertyTitle}`;
    const phoneNumber = "5511950824205";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="sticky top-32 glass-dark rounded-xl p-6 border border-gold/20">
      <div className="mb-4">
        <span className="text-gray-400 text-sm">Preço</span>
        <div className="text-gold text-2xl font-semibold">{formatPrice(price)}</div>
      </div>
      
      <div className="border-t border-gold/10 pt-4 mb-6">
        <h3 className="text-white font-medium mb-3">Fale com um corretor</h3>
        <p className="text-gray-400 text-sm mb-4">
          Interessado neste imóvel? Entre em contato conosco para obter mais informações ou agendar uma visita.
        </p>
      </div>
      
      <button
        onClick={handleWhatsAppClick}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md flex items-center justify-center mb-4 transition-colors"
      >
        <Phone className="h-5 w-5 mr-2" /> Contato via WhatsApp
      </button>
      
      <button
        onClick={handleScheduleVisit}
        className="w-full border border-gold text-gold py-3 rounded-md hover:bg-gold/10 transition-colors"
      >
        Agendar Visita
      </button>
      
      {propertyCode && (
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Código do Imóvel: {propertyCode}</p>
        </div>
      )}
    </div>
  );
});

PropertySidebar.displayName = 'PropertySidebar';

export default PropertySidebar;
