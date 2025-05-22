
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";
import { PropertyType } from '@/components/PropertyCard';

const PropertyForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: 1,
    area: 0,
    image_url: '',
    property_type: 'casa',
    transaction_type: 'Venda',
    featured: false,
    sold: false
  });
  
  useEffect(() => {
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
      
      if (isEditMode) {
        fetchProperty();
      } else {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [id, isEditMode, navigate]);
  
  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) {
        console.error('Erro ao buscar detalhes do imóvel:', error);
        toast.error('Não foi possível carregar os detalhes do imóvel.');
        navigate('/admin/properties');
      } else if (data) {
        setFormData({
          title: data.title,
          description: data.description,
          price: data.price.toString(),
          location: data.location,
          bedrooms: data.bedrooms,
          area: data.area,
          image_url: data.image_url,
          property_type: data.property_type,
          transaction_type: data.transaction_type,
          featured: data.featured,
          sold: data.sold
        });
      }
    } catch (err) {
      console.error('Erro inesperado:', err);
      toast.error('Ocorreu um erro inesperado.');
      navigate('/admin/properties');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'price' && value) {
      // Limitar entrada a números para o preço
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else if (name === 'bedrooms' || name === 'area') {
      // Converter para número
      setFormData(prev => ({ ...prev, [name]: value ? Number(value) : 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.price || !formData.location || !formData.image_url) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    try {
      setIsSaving(true);
      
      const propertyData = {
        ...formData,
        price: parseFloat(formData.price)
      };
      
      let result;
      
      if (isEditMode) {
        result = await supabase
          .from('properties')
          .update(propertyData)
          .eq('id', id);
      } else {
        result = await supabase
          .from('properties')
          .insert([propertyData]);
      }
      
      const { error } = result;
      
      if (error) {
        console.error('Erro ao salvar imóvel:', error);
        toast.error(`Erro ao ${isEditMode ? 'atualizar' : 'criar'} o imóvel`);
      } else {
        toast.success(`Imóvel ${isEditMode ? 'atualizado' : 'criado'} com sucesso!`);
        navigate('/admin/properties');
      }
    } catch (err) {
      console.error('Erro inesperado:', err);
      toast.error('Ocorreu um erro inesperado');
    } finally {
      setIsSaving(false);
    }
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
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl text-white">
            {isEditMode ? 'Editar' : 'Adicionar'} <span className="text-gold">Imóvel</span>
          </h1>
        </div>
        
        <div className="bg-dark-light border border-gold/20 rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm text-gold mb-2">Título *</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-3 bg-dark border border-gold/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-gold/50"
                  placeholder="Casa em Alphaville"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm text-gold mb-2">Localização *</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-3 bg-dark border border-gold/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-gold/50"
                  placeholder="Alphaville, São Paulo"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="property_type" className="block text-sm text-gold mb-2">Tipo de Imóvel *</label>
                <select
                  id="property_type"
                  name="property_type"
                  value={formData.property_type}
                  onChange={handleChange}
                  className="w-full p-3 bg-dark border border-gold/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-gold/50"
                  required
                >
                  <option value="casa">Casa</option>
                  <option value="apartamento">Apartamento</option>
                  <option value="terreno">Terreno</option>
                  <option value="kitnet">Kitnet</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="transaction_type" className="block text-sm text-gold mb-2">Tipo de Transação *</label>
                <select
                  id="transaction_type"
                  name="transaction_type"
                  value={formData.transaction_type}
                  onChange={handleChange}
                  className="w-full p-3 bg-dark border border-gold/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-gold/50"
                  required
                >
                  <option value="Venda">Venda</option>
                  <option value="Aluguel">Aluguel</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm text-gold mb-2">Preço (R$) *</label>
                <input
                  id="price"
                  name="price"
                  type="text"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-3 bg-dark border border-gold/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-gold/50"
                  placeholder="450000"
                  required
                />
                <small className="text-gray-400">
                  {formData.price 
                    ? `R$ ${parseInt(formData.price).toLocaleString('pt-BR')}`
                    : 'Digite apenas números'
                  }
                </small>
              </div>
              
              <div>
                <label htmlFor="bedrooms" className="block text-sm text-gold mb-2">Quartos *</label>
                <input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  min="0"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full p-3 bg-dark border border-gold/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-gold/50"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="area" className="block text-sm text-gold mb-2">Área (m²) *</label>
                <input
                  id="area"
                  name="area"
                  type="number"
                  min="0"
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full p-3 bg-dark border border-gold/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-gold/50"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="image_url" className="block text-sm text-gold mb-2">URL da Imagem *</label>
                <input
                  id="image_url"
                  name="image_url"
                  type="text"
                  value={formData.image_url}
                  onChange={handleChange}
                  className="w-full p-3 bg-dark border border-gold/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-gold/50"
                  placeholder="https://exemplo.com/imagem.jpg"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm text-gold mb-2">Descrição *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-3 bg-dark border border-gold/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-gold/50"
                  rows={5}
                  placeholder="Descreva o imóvel detalhadamente..."
                  required
                />
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    id="featured"
                    name="featured"
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="h-4 w-4 text-gold border-gold/30 focus:ring-gold"
                  />
                  <label htmlFor="featured" className="ml-2 text-white">Destaque</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="sold"
                    name="sold"
                    type="checkbox"
                    checked={formData.sold}
                    onChange={(e) => setFormData({...formData, sold: e.target.checked})}
                    className="h-4 w-4 text-gold border-gold/30 focus:ring-gold"
                  />
                  <label htmlFor="sold" className="ml-2 text-white">Vendido</label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between pt-6 border-t border-gold/10">
              <button
                type="button"
                onClick={() => navigate('/admin/properties')}
                className="px-5 py-2 bg-dark-lighter border border-gold/30 text-white rounded-md hover:bg-dark-light transition-colors"
              >
                Cancelar
              </button>
              
              <button
                type="submit"
                className="gold-button px-5 py-2 rounded-md flex items-center"
                disabled={isSaving}
              >
                {isSaving ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
                ) : (
                  isEditMode ? 'Salvar Alterações' : 'Adicionar Imóvel'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;
