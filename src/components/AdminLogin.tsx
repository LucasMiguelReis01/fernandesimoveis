
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }
    
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        toast.error(error.message || 'Erro ao fazer login');
        return;
      }
      
      if (data.user) {
        try {
          // Verificar se o perfil do usuário existe
          let { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .single();
            
          if (profileError) {
            console.log('Perfil não encontrado, criando novo perfil de admin');
            
            // Tentar criar o perfil com o RPC ou usando autenticação de serviço (se disponível)
            const { data: insertData, error: insertError } = await supabase
              .from('profiles')
              .insert({ 
                id: data.user.id, 
                role: 'admin' 
              })
              .select('role')
              .single();
              
            if (insertError) {
              console.error('Erro ao criar perfil:', insertError);
              
              // Se falhar, ainda permitimos o login se o usuário for o primeiro
              const { count } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true });
                
              if (count === 0) {
                // É o primeiro usuário, vamos permitir acesso como admin
                toast.success('Login realizado com sucesso como primeiro administrador');
                navigate('/admin/properties');
                return;
              }
              
              await supabase.auth.signOut();
              toast.error('Erro ao configurar seu perfil. Por favor, contate o suporte.');
              return;
            }
            
            profile = insertData;
          }
            
          if (profile && profile.role === 'admin') {
            toast.success('Login realizado com sucesso');
            navigate('/admin/properties');
          } else {
            // Deslogar o usuário que não é administrador
            await supabase.auth.signOut();
            toast.error('Acesso negado. Você não tem permissões de administrador');
          }
        } catch (err) {
          console.error('Erro ao verificar perfil:', err);
          await supabase.auth.signOut();
          toast.error('Ocorreu um erro ao verificar suas permissões');
        }
      }
    } catch (err) {
      console.error('Erro inesperado:', err);
      toast.error('Ocorreu um erro inesperado');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="bg-dark-light p-8 rounded-xl border border-gold/20 shadow-xl w-full max-w-md">
        <h1 className="text-2xl text-white text-center mb-6">
          Área <span className="text-gold">Administrativa</span>
        </h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm text-gold mb-2">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-dark border border-gold/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gold/50"
              placeholder="admin@exemplo.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm text-gold mb-2">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-dark border border-gold/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gold/50"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full gold-button py-3 rounded-md flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
            ) : (
              'Entrar'
            )}
          </button>
          
          <div className="text-center text-sm text-gray-400">
            <p>Acesso restrito a administradores</p>
            <a href="/" className="text-gold hover:underline">Voltar para o site</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
