
import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

const ImageUpload = ({ value, onChange, placeholder = "Adicionar imagem" }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Formato não suportado. Use JPG, PNG ou WebP');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Arquivo muito grande. Máximo 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `properties/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        toast.error('Erro ao fazer upload da imagem');
        return;
      }

      // Get public URL
      const { data } = supabase.storage
        .from('property-images')
        .getPublicUrl(filePath);

      onChange(data.publicUrl);
      toast.success('Imagem enviada com sucesso!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Erro inesperado ao fazer upload');
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const removeImage = async () => {
    if (value) {
      try {
        // Extract file path from URL
        const url = new URL(value);
        const filePath = url.pathname.split('/').slice(-2).join('/'); // Get 'properties/filename'
        
        // Delete from storage
        await supabase.storage
          .from('property-images')
          .remove([filePath]);
        
        onChange('');
        toast.success('Imagem removida');
      } catch (error) {
        console.error('Error removing image:', error);
        onChange(''); // Remove from form even if deletion fails
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isUploading ? 'border-gold bg-gold/10' : 'border-gray-600 hover:border-gold/50'
        }`}
      >
        {value ? (
          <div className="relative">
            <img
              src={value}
              alt="Imagem do imóvel"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <Upload className={`h-12 w-12 mx-auto mb-4 ${isUploading ? 'text-gold animate-pulse' : 'text-gold'}`} />
            <p className="text-white mb-2">
              {isUploading ? 'Enviando imagem...' : 'Clique para selecionar uma imagem'}
            </p>
            <p className="text-gray-400 text-sm mb-4">ou arraste e solte aqui</p>
          </>
        )}
        
        {!value && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="bg-gold hover:bg-gold/80 text-dark px-6 py-2 rounded-md transition-colors disabled:opacity-50"
          >
            {isUploading ? 'Enviando...' : placeholder}
          </button>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
          disabled={isUploading}
        />
        
        {!value && (
          <p className="text-gray-500 text-xs mt-2">
            Formatos aceitos: JPG, PNG, WebP (máximo 5MB)
          </p>
        )}
      </div>

      {value && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full flex items-center justify-center gap-2 bg-dark border border-gold/30 text-gold px-4 py-2 rounded-md hover:bg-gold/10 transition-colors"
        >
          <ImageIcon className="h-4 w-4" />
          Trocar imagem
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
