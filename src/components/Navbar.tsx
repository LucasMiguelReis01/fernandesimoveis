
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { name: 'INICIO', path: '/' },
    { name: 'IMOVEIS', path: '/properties' },
    { name: 'SOBRE', path: '/about' },
    { name: 'CONTATO', path: '/contact' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center">
            <div className="h-14 w-14 rounded-full overflow-hidden bg-dark-lighter flex items-center justify-center border border-gold/30">
              <img 
                src="/lovable-uploads/26864e40-d0ce-47e4-a4ac-391dc0e36082.png" 
                alt="Fernandes Imóveis" 
                className="h-12 w-12 object-contain"
              />
            </div>
            <div className="ml-3">
              <p className="text-white font-bold text-lg">FERNANDES</p>
              <p className="text-gold text-sm">IMÓVEIS</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm ${
                  isActive(item.path)
                    ? 'text-gold font-medium'
                    : 'text-white hover:text-gold'
                } transition-colors`}
              >
                {item.name}
              </Link>
            ))}
            <button 
              aria-label="Search" 
              className="p-2 rounded-full hover:bg-dark-lighter transition-colors"
            >
              <Search className="h-5 w-5 text-gold" />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-light border-t border-gold/20 shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`py-3 ${
                  isActive(item.path)
                    ? 'text-gold font-medium'
                    : 'text-white'
                }`}
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
            <button 
              aria-label="Search" 
              className="mt-2 py-3 flex items-center text-white hover:text-gold"
            >
              <Search className="h-5 w-5 mr-2" /> Buscar
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
