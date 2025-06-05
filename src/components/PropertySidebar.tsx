
import React, { memo } from 'react';
import { Phone, AlertCircle } from 'lucide-react';
import { formatPrice } from '@/utils/formatters';

interface PropertySidebarProps {
  price: string | number;
  propertyTitle: string;
  propertyCode?: string;
  sold?: boolean;
}

const PropertySidebar = memo(({ price, propertyTitle, propertyCode, sold }: PropertySidebarProps) => {
  const handleWhatsAppClick = () => {
    if (sold) return;
    
    const message = `Olá! Gostaria de obter mais informações sobre o imóvel: ${propertyTitle}`;
    const phoneNumber = "5511950824205";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleScheduleVisit = () => {
    if (sold) return;
    
    const message = `Olá! Gostaria de agendar uma visita para o imóvel: ${propertyTitle}`;
    const phoneNumber = "5511950824205";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className={`sticky top-32 glass-dark rounded-xl p-6 border transition-colors ${
      sold 
        ? 'border-red-500/30 bg-red-900/10' 
        : 'border-gold/20 hover:border-gold/30'
    }`}>
      {sold && (
        <div className="mb-6 p-4 bg-red-600/20 border border-red-500/30 rounded-lg">
          <div className="flex items-center text-red-400 mb-2">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span className="font-semibold">IMÓVEL VENDIDO</span>
          </div>
          <p className="text-red-300 text-sm">
            Este imóvel já foi vendido e não está mais disponível para visitação ou negociação.
          </p>
        </div>
      )}
      
      <div className="mb-4">
        <span className="text-gray-400 text-sm block mb-1">
          {sold ? 'Status' : 'Preço'}
        </span>
        <div className={`text-2xl font-semibold ${
          sold ? 'text-red-400' : 'text-gold'
        }`}>
          {sold ? 'VENDIDO' : formatPrice(price)}
        </div>
      </div>
      
      <div className="border-t border-gold/10 pt-4 mb-6">
        <h3 className="text-white font-medium mb-3">
          {sold ? 'Imóvel não disponível' : 'Fale com um corretor'}
        </h3>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          {sold 
            ? 'Este imóvel foi vendido. Entre em contato para conhecer outras opções disponíveis.'
            : 'Interessado neste imóvel? Entre em contato conosco para obter mais informações ou agendar uma visita.'
          }
        </p>
      </div>
      
      <button
        onClick={handleWhatsAppClick}
        disabled={sold}
        className={`w-full py-3 rounded-md flex items-center justify-center mb-4 transition-all duration-300 ${
          sold 
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
            : 'bg-green-600 hover:bg-green-700 text-white hover:scale-105'
        }`}
      >
        <Phone className="h-5 w-5 mr-2" /> 
        {sold ? 'Imóvel Vendido' : 'Contato via WhatsApp'}
      </button>
      
      <button
        onClick={handleScheduleVisit}
        disabled={sold}
        className={`w-full py-3 rounded-md transition-all duration-300 ${
          sold 
            ? 'border border-gray-600 text-gray-400 cursor-not-allowed' 
            : 'border border-gold text-gold hover:bg-gold/10'
        }`}
      >
        {sold ? 'Não Disponível' : 'Agendar Visita'}
      </button>
      
      {propertyCode && (
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Código: <span className="text-gold font-medium">{propertyCode}</span></p>
        </div>
      )}
    </div>
  );
});

PropertySidebar.displayName = 'PropertySidebar';

export default PropertySidebar;
