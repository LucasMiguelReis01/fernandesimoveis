
import { useEffect, useState } from 'react';

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-dark-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-white mb-6">
              SOBRE A <span className="text-gold">FERNANDES IMÓVEIS</span>
            </h1>
            <p className="text-gray-300 text-xl">
              Especialistas em todos os tipos de imóveis com foco em excelência e atendimento personalizado.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 bg-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-white text-3xl mb-6">
                Nossa <span className="text-gold">História</span>
              </h2>
              <p className="text-gray-300 mb-4">
                A Fernandes Imóveis foi fundada em 2020 com o objetivo de oferecer um serviço imobiliário 
                diferenciado, trabalhando com todos os tipos de imóveis e focando no atendimento personalizado 
                aos clientes mais exigentes.
              </p>
              <p className="text-gray-300 mb-4">
                Com experiência crescente no mercado, nos especializamos em entender as necessidades 
                específicas de cada cliente, proporcionando uma experiência exclusiva na busca pelo imóvel perfeito, 
                seja ele residencial, comercial ou de qualquer categoria.
              </p>
              <p className="text-gray-300">
                Nossa missão é transformar o processo de compra, venda ou locação de imóveis em uma experiência 
                agradável e segura, garantindo o melhor negócio para nossos clientes em todos os segmentos do mercado.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1460574283810-2aab119d8511" 
                  alt="Edifício moderno" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold/20 rounded-full"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gold/20 rounded-full"></div>
            </div>
          </div>
          
          {/* Logo Section */}
          <div className="flex justify-center mt-16">
            <div className="bg-dark-lighter p-8 rounded-xl border border-gold/30">
              <img 
                src="/lovable-uploads/26864e40-d0ce-47e4-a4ac-391dc0e36082.png" 
                alt="Logo Fernandes Imóveis" 
                className="h-32 w-32 object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission, Vision, Values */}
      <section className="py-16 bg-dark-light relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-gold/5 to-transparent rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-t from-gold/5 to-transparent rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-white text-3xl mb-6">
              Nossos <span className="text-gold">Princípios</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-dark p-8 rounded-xl">
              <h3 className="text-gold text-xl mb-4">Missão</h3>
              <p className="text-gray-300">
                Oferecer soluções imobiliárias de excelência para todos os tipos de imóveis, 
                garantindo a satisfação e superando as expectativas de nossos clientes.
              </p>
            </div>
            
            <div className="glass-dark p-8 rounded-xl">
              <h3 className="text-gold text-xl mb-4">Visão</h3>
              <p className="text-gray-300">
                Ser referência no mercado imobiliário, reconhecida pela excelência 
                no atendimento e pela qualidade dos imóveis ofertados em todo o território nacional.
              </p>
            </div>
            
            <div className="glass-dark p-8 rounded-xl">
              <h3 className="text-gold text-xl mb-4">Valores</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                  Ética e Transparência
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                  Excelência em Atendimento
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                  Compromisso com Resultados
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                  Inovação e Adaptabilidade
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section className="py-16 bg-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-white text-3xl mb-6">
              Nosso <span className="text-gold">Time</span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Conheça nossa equipe de profissionais, especialistas em todos os tipos de imóveis e 
              comprometidos com sua satisfação.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-dark rounded-xl overflow-hidden group">
              <div className="aspect-w-3 aspect-h-4">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" 
                  alt="Roberto Fernandes" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-white text-xl mb-1">Roberto Fernandes</h3>
                <p className="text-gold text-sm mb-3">Fundador e CEO</p>
                <p className="text-gray-400">
                  Com mais de 20 anos no mercado imobiliário, Roberto fundou a Fernandes Imóveis 
                  com a visão de transformar o segmento de alto padrão.
                </p>
              </div>
            </div>
            
            <div className="glass-dark rounded-xl overflow-hidden group">
              <div className="aspect-w-3 aspect-h-4">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZSUyMHdvbWFufGVufDB8fDB8fHww" 
                  alt="Márcia Santos" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-white text-xl mb-1">Márcia Santos</h3>
                <p className="text-gold text-sm mb-3">Diretora de Vendas</p>
                <p className="text-gray-400">
                  Especialista em negociações de alto valor, Márcia lidera nossa equipe de vendas 
                  com foco em resultados e satisfação do cliente.
                </p>
              </div>
            </div>
            
            <div className="glass-dark rounded-xl overflow-hidden group">
              <div className="aspect-w-3 aspect-h-4">
                <img 
                  src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGUlMjBtYW58ZW58MHx8MHx8fDA%3D" 
                  alt="André Mendes" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-white text-xl mb-1">André Mendes</h3>
                <p className="text-gold text-sm mb-3">Consultor de Imóveis</p>
                <p className="text-gray-400">
                  Com amplo conhecimento do mercado de luxo, André é especialista em 
                  encontrar o imóvel perfeito para cada cliente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-gradient-to-b from-dark-lighter to-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-white text-3xl mb-6">
              Pronto para encontrar seu imóvel <span className="text-gold">ideal</span>?
            </h2>
            <p className="text-gray-300 mb-8">
              Nossa equipe está pronta para ajudá-lo a encontrar o imóvel dos seus sonhos.
              Entre em contato conosco para um atendimento personalizado.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/properties" 
                className="gold-button px-8 py-3 rounded-md"
              >
                Ver Imóveis
              </a>
              <a 
                href="/contact" 
                className="border border-gold text-gold px-8 py-3 rounded-md hover:bg-gold/10 transition-colors"
              >
                Fale Conosco
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
