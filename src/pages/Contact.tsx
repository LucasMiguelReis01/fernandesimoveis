
import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Contact = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em breve.",
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "5511999999999"; // Replace with actual WhatsApp number
    const message = "Olá! Gostaria de obter mais informações sobre os imóveis.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className={`min-h-screen transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-dark-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-white mb-6">
              ENTRE EM <span className="text-gold">CONTATO</span>
            </h1>
            <p className="text-gray-300 text-xl">
              Estamos prontos para ajudá-lo na busca pelo imóvel dos seus sonhos.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Information & Form */}
      <section className="py-16 bg-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-white text-2xl mb-6">Informações de Contato</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-gold/10 rounded-full p-3 mr-4">
                    <MapPin className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg mb-1">Endereço</h3>
                    <p className="text-gray-300">
                      Av. Paulista, 1000, Conjunto 1001<br />
                      Bela Vista, São Paulo - SP<br />
                      CEP: 01310-000
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gold/10 rounded-full p-3 mr-4">
                    <Phone className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg mb-1">Telefone</h3>
                    <p className="text-gray-300">
                      (11) 3333-4444<br />
                      (11) 99999-9999
                    </p>
                    <button 
                      onClick={handleWhatsAppClick}
                      className="mt-2 text-green-500 hover:text-green-400 flex items-center text-sm"
                    >
                      <Phone className="h-4 w-4 mr-1" /> Contato via WhatsApp
                    </button>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gold/10 rounded-full p-3 mr-4">
                    <Mail className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg mb-1">E-mail</h3>
                    <p className="text-gray-300">
                      contato@fernandesimóveis.com.br<br />
                      vendas@fernandesimóveis.com.br
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h2 className="text-white text-2xl mb-6">Horário de Funcionamento</h2>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex justify-between">
                    <span>Segunda a Sexta</span>
                    <span>09:00 - 18:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sábado</span>
                    <span>09:00 - 13:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Domingo</span>
                    <span>Fechado</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <h2 className="text-white text-2xl mb-6">Envie-nos uma Mensagem</h2>
              <div className="glass-dark rounded-xl p-6">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-sm text-gold mb-1">Nome Completo</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 bg-dark-lighter border border-gold/20 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gold/50"
                        placeholder="Seu nome"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm text-gold mb-1">E-mail</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 bg-dark-lighter border border-gold/20 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gold/50"
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm text-gold mb-1">Telefone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 bg-dark-lighter border border-gold/20 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gold/50"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm text-gold mb-1">Assunto</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full p-3 bg-dark-lighter border border-gold/20 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-gold/50 appearance-none"
                        required
                      >
                        <option value="">Selecione</option>
                        <option value="compra">Compra de Imóvel</option>
                        <option value="venda">Venda de Imóvel</option>
                        <option value="aluguel">Aluguel de Imóvel</option>
                        <option value="avaliacao">Avaliação de Imóvel</option>
                        <option value="outros">Outros</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm text-gold mb-1">Mensagem</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-3 bg-dark-lighter border border-gold/20 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gold/50 min-h-[150px]"
                      placeholder="Como podemos ajudá-lo?"
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`gold-button w-full py-3 rounded-lg flex items-center justify-center ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>Enviando...</>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" /> Enviar Mensagem
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map */}
      <section className="py-16 bg-dark-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-white text-2xl mb-6">Nossa Localização</h2>
          </div>
          
          <div className="w-full h-[400px] bg-gray-800 rounded-xl overflow-hidden">
            {/* In a real application, this would be a Google Maps iframe */}
            <div className="w-full h-full flex items-center justify-center bg-dark-lighter">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gold mx-auto mb-4" />
                <p className="text-gray-300">
                  Mapa indisponível.<br />
                  Visite-nos em Av. Paulista, 1000, Bela Vista, São Paulo - SP
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
