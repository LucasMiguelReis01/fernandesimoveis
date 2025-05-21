import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { PropertyType } from '@/components/PropertyCard';

// Sample properties data (same as in Properties.tsx)
const initialProperties: PropertyType[] = [
  {
    id: '1',
    title: 'Casa de Luxo em Alphaville',
    type: 'Venda',
    price: 'R$ 2.400.000',
    location: 'Alphaville, São Paulo',
    bedrooms: 4,
    area: 350,
    imageUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
    featured: true
  },
  {
    id: '2',
    title: 'Mansão Contemporânea',
    type: 'Venda',
    price: 'R$ 4.900.000',
    location: 'Barra da Tijuca, Rio de Janeiro',
    bedrooms: 5,
    area: 480,
    imageUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742',
    featured: true
  },
  {
    id: '3',
    title: 'Penthouse com Vista para o Mar',
    type: 'Venda',
    price: 'R$ 3.200.000',
    location: 'Balneário Camboriú, SC',
    bedrooms: 3,
    area: 220,
    imageUrl: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334',
    featured: true
  },
  {
    id: '4',
    title: 'Apartamento de Alto Padrão',
    type: 'Aluguel',
    price: 'R$ 12.000/mês',
    location: 'Jardins, São Paulo',
    bedrooms: 2,
    area: 150,
    imageUrl: 'https://images.unsplash.com/photo-1527576539890-dfa815648363'
  },
  {
    id: '5',
    title: 'Casa com Piscina em Condomínio',
    type: 'Venda',
    price: 'R$ 1.800.000',
    location: 'Ribeirão Preto, SP',
    bedrooms: 4,
    area: 280,
    imageUrl: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a'
  },
  {
    id: '6',
    title: 'Terreno em Área Nobre',
    type: 'Venda',
    price: 'R$ 900.000',
    location: 'Campinas, SP',
    bedrooms: 0,
    area: 500,
    imageUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff'
  }
];

const AdminProperties = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if admin is authenticated
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }
    
    // In a real app, fetch properties from API
    // For demo purposes, we'll use localStorage to persist changes
    const savedProperties = localStorage.getItem('properties');
    if (savedProperties) {
      setProperties(JSON.parse(savedProperties));
    } else {
      setProperties(initialProperties);
      localStorage.setItem('properties', JSON.stringify(initialProperties));
    }
    
    setIsLoading(false);
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin');
  };
  
  const handlePropertySold = (id: string) => {
    const updatedProperties = properties.map(property => 
      property.id === id ? { ...property, sold: true } : property
    );
    
    setProperties(updatedProperties);
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
    toast.success('Imóvel marcado como vendido!');
  };
  
  const handleDeleteProperty = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este imóvel?')) {
      const updatedProperties = properties.filter(property => property.id !== id);
      setProperties(updatedProperties);
      localStorage.setItem('properties', JSON.stringify(updatedProperties));
      toast.success('Imóvel excluído com sucesso!');
    }
  };
  
  const handleAddProperty = () => {
    navigate('/admin/property/new');
  };
  
  const handleEditProperty = (id: string) => {
    navigate(`/admin/property/edit/${id}`);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <p className="text-white">Carregando...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-dark pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl text-white">
            Gerenciamento de <span className="text-gold">Imóveis</span>
          </h1>
          <div className="space-x-4">
            <button 
              onClick={handleAddProperty}
              className="gold-button px-4 py-2 rounded flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" /> Novo Imóvel
            </button>
            <button 
              onClick={handleLogout}
              className="bg-dark-lighter text-white px-4 py-2 rounded border border-gold/30 hover:bg-dark-light transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
        
        {properties.length > 0 ? (
          <div className="bg-dark-light border border-gold/20 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gold/20 bg-dark">
                    <th className="px-4 py-3 text-left text-sm text-gold">ID</th>
                    <th className="px-4 py-3 text-left text-sm text-gold">Título</th>
                    <th className="px-4 py-3 text-left text-sm text-gold">Tipo</th>
                    <th className="px-4 py-3 text-left text-sm text-gold">Preço</th>
                    <th className="px-4 py-3 text-left text-sm text-gold">Localização</th>
                    <th className="px-4 py-3 text-left text-sm text-gold">Status</th>
                    <th className="px-4 py-3 text-right text-sm text-gold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property) => (
                    <tr key={property.id} className="border-b border-gold/10 hover:bg-dark-lighter">
                      <td className="px-4 py-3 text-sm text-gray-300">{property.id}</td>
                      <td className="px-4 py-3 text-sm text-white">{property.title}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{property.type}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{property.price}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{property.location}</td>
                      <td className="px-4 py-3 text-sm">
                        {property.sold ? (
                          <span className="text-green-500 flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1" /> Vendido
                          </span>
                        ) : (
                          <span className="text-gold">Disponível</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-right space-x-2">
                        <button 
                          onClick={() => handleEditProperty(property.id)}
                          className="text-white hover:text-gold p-1"
                          aria-label="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        {!property.sold && (
                          <button 
                            onClick={() => handlePropertySold(property.id)}
                            className="text-white hover:text-green-500 p-1"
                            aria-label="Marcar como vendido"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDeleteProperty(property.id)}
                          className="text-white hover:text-red-500 p-1"
                          aria-label="Excluir"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-dark-light border border-gold/20 rounded-lg p-8 text-center">
            <p className="text-white mb-4">Nenhum imóvel cadastrado.</p>
            <button 
              onClick={handleAddProperty}
              className="gold-button px-4 py-2 rounded flex items-center mx-auto"
            >
              <Plus className="h-4 w-4 mr-2" /> Adicionar Imóvel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProperties;
