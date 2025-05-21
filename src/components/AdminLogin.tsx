
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple authentication for demo purposes
    // In a real app, this would be a secure API request
    if (username === 'admin' && password === 'admin123') {
      // Save authentication state
      localStorage.setItem('adminAuthenticated', 'true');
      toast.success('Login bem sucedido!');
      navigate('/admin/properties');
    } else {
      toast.error('Credenciais inválidas. Tente novamente.');
    }
  };
  
  return (
    <div className="min-h-screen bg-dark pt-32 pb-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="glass-dark rounded-lg p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-dark-lighter flex items-center justify-center border border-gold/30">
              <img 
                src="/lovable-uploads/26864e40-d0ce-47e4-a4ac-391dc0e36082.png" 
                alt="Fernandes Imóveis" 
                className="h-14 w-14 object-contain"
              />
            </div>
          </div>
          <h1 className="text-2xl text-center text-white mb-6">Área <span className="text-gold">Administrativa</span></h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gold mb-2" htmlFor="username">
                Usuário
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 bg-dark border border-gold/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-gold/50"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm text-gold mb-2" htmlFor="password">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-dark border border-gold/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-gold/50"
                required
              />
            </div>
            
            <button 
              type="submit"
              className="w-full gold-button py-3 rounded-lg flex items-center justify-center"
            >
              <Lock className="h-4 w-4 mr-2" />
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
