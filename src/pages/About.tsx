
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
          <div className="max-w-4xl mx-auto text-center">
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
                Facilitar a realização do sonho da casa própria através de um atendimento personalizado 
                e transparente, conectando pessoas aos imóveis ideais com segurança e confiança.
              </p>
            </div>
            
            <div className="glass-dark p-8 rounded-xl">
              <h3 className="text-gold text-xl mb-4">Visão</h3>
              <p className="text-gray-300">
                Ser a imobiliária de referência na região, reconhecida pela excelência no atendimento, 
                inovação tecnológica e compromisso com a satisfação total dos nossos clientes.
              </p>
            </div>
            
            <div className="glass-dark p-8 rounded-xl">
              <h3 className="text-gold text-xl mb-4">Valores</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                  Transparência e Honestidade
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                  Atendimento Humanizado
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                  Compromisso com Resultados
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                  Agilidade e Eficiência
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
              Nossa <span className="text-gold">Fundadora</span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Conheça a profissional por trás da Fernandes Imóveis, especialista em todos os tipos de imóveis e 
              comprometida com sua satisfação.
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="glass-dark rounded-xl overflow-hidden group">
              <div className="aspect-w-3 aspect-h-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b993?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHdvbWFufGVufDB8fDB8fHww" 
                  alt="Inácia Fernandes" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-white text-xl mb-1">Inácia Fernandes</h3>
                <p className="text-gold text-sm mb-3">Fundadora, CEO e Corretora</p>
                <p className="text-gray-400">
                  Com mais de 5 anos de experiência no mercado imobiliário, Inácia fundou a Fernandes Imóveis 
                  com o objetivo de oferecer um atendimento diferenciado e personalizado, sempre focando 
                  nas necessidades específicas de cada cliente para encontrar o imóvel ideal.
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
