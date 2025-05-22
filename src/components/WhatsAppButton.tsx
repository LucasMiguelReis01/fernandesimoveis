
import { Phone } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = "5511950824205"; // Número formatado sem hífen ou espaços
  const message = "Olá! Gostaria de obter mais informações sobre os imóveis.";
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      aria-label="Contact via WhatsApp"
    >
      <Phone className="h-6 w-6 text-white" />
    </button>
  );
};

export default WhatsAppButton;
