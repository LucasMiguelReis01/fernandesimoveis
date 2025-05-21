
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-light border-t border-gold/20 pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full border border-gold/50 flex items-center justify-center">
                <span className="text-gold text-lg font-bold">F</span>
              </div>
              <div className="ml-3">
                <p className="text-white font-bold">FERNANDES</p>
                <p className="text-gold text-xs">IMÓVEIS</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Especializada em imóveis de alto padrão, terrenos, chácaras e 
              imóveis residenciais para venda e aluguel.
            </p>
            <div className="mt-4 flex space-x-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-light transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-gold text-sm transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-400 hover:text-gold text-sm transition-colors">
                  Imóveis
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-gold text-sm transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-gold text-sm transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contato</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>contato@fernandesimóveis.com.br</li>
              <li>(11) 99999-9999</li>
              <li>São Paulo, SP</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gold/10 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-xs mb-2 md:mb-0">
              © {currentYear} Fernandes Imóveis. CNPJ: 00.000.000/0001-00. Todos os direitos reservados.
            </p>
            <div className="flex space-x-4 text-xs text-gray-500">
              <Link to="/privacy" className="hover:text-gold transition-colors">
                Política de Privacidade
              </Link>
              <Link to="/terms" className="hover:text-gold transition-colors">
                Termos de Uso
              </Link>
              <a 
                href="https://lovable.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
              >
                Criado por Lovable
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
