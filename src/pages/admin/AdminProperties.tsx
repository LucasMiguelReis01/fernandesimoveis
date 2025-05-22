
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { PropertyType } from '@/components/PropertyCard';
import { supabase } from "@/integrations/supabase/client";

const AdminProperties = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if admin is authenticated
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/admin');
        return;
      }
      
      // Check if user is an admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
      
      if (!profile || profile.role !== 'admin') {
        navigate('/admin');
        toast.error('Acesso negado. Você não tem permissões de administrador.');
        return;
      }
      
      fetchProperties();
    };
    
    checkAuth();
  }, [navigate]);
  
  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Erro ao buscar imóveis:', error);
        toast.error('Erro ao carregar imóveis');
      } else {
        // Formatar os dados para o formato esperado
        const formattedData = data.map(item => ({
          id: item.id,
          title: item.title,
          type: item.transaction_type,
          price: item.price,
          location: item.location,
          bedrooms: item.bedrooms,
          area: item.area,
          imageUrl: item.image_url,
          featured: item.featured,
          sold: item.sold
        }));
        setProperties(formattedData);
      }
    } catch (err) {
      console.error('Erro inesperado:', err);
      toast.error('Ocorreu um erro inesperado');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };
  
  const handlePropertySold = async (id: string) => {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ sold: true })
        .eq('id', id);
        
      if (error) {
        console.error('Erro ao marcar imóvel como vendido:', error);
        toast.error('Não foi possível marcar o imóvel como vendido');
      } else {
        // Atualizar a lista localmente
        const updatedProperties = properties.map(property => 
          property.id === id ? { ...property, sold: true } : property
        );
        
        setProperties(updatedProperties);
        toast.success('Imóvel marcado como vendido!');
      }
    } catch (err) {
      console.error('Erro inesperado:', err);
      toast.error('Ocorreu um erro inesperado');
    }
  };
  
  const handleDeleteProperty = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este imóvel?')) {
      try {
        const { error } = await supabase
          .from('properties')
          .delete()
          .eq('id', id);
          
        if (error) {
          console.error('Erro ao excluir imóvel:', error);
          toast.error('Não foi possível excluir o imóvel');
        } else {
          // Remover o imóvel da lista localmente
          const updatedProperties = properties.filter(property => property.id !== id);
          setProperties(updatedProperties);
          toast.success('Imóvel excluído com sucesso!');
        }
      } catch (err) {
        console.error('Erro inesperado:', err);
        toast.error('Ocorreu um erro inesperado');
      }
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
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
                      <td className="px-4 py-3 text-sm text-gray-300">{property.id.substring(0, 8)}...</td>
                      <td className="px-4 py-3 text-sm text-white">{property.title}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{property.type}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {typeof property.price === 'number' 
                          ? `R$ ${property.price.toLocaleString('pt-BR')}` 
                          : property.price
                        }
                      </td>
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
