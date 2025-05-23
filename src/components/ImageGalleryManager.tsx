
import React, { useState, useRef } from 'react';
import { Upload, Download, X, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface ImageGalleryManagerProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  propertyTitle?: string;
}

const ImageGalleryManager = ({ images, onImagesChange, propertyTitle = "Imóvel" }: ImageGalleryManagerProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newImages: string[] = [];
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    Array.from(files).forEach(file => {
      if (!validTypes.includes(file.type)) {
        toast.error(`Arquivo ${file.name} não é uma imagem válida`);
        return;
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error(`Arquivo ${file.name} é muito grande (máximo 5MB)`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newImages.push(e.target.result as string);
          if (newImages.length === Array.from(files).filter(f => 
            validTypes.includes(f.type) && f.size <= 5 * 1024 * 1024
          ).length) {
            onImagesChange([...images, ...newImages]);
            toast.success(`${newImages.length} imagem(ns) adicionada(s) com sucesso`);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
    toast.success('Imagem removida');
  };

  const exportImage = (imageUrl: string, index: number) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${propertyTitle.replace(/[^a-zA-Z0-9]/g, '_')}_imagem_${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Imagem exportada');
  };

  const exportAllImages = () => {
    if (images.length === 0) {
      toast.error('Não há imagens para exportar');
      return;
    }

    images.forEach((imageUrl, index) => {
      setTimeout(() => {
        exportImage(imageUrl, index);
      }, index * 100); // Small delay between downloads
    });

    toast.success(`Exportando ${images.length} imagens`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Galeria de Imagens</h3>
        {images.length > 0 && (
          <button
            onClick={exportAllImages}
            className="flex items-center gap-2 bg-gold hover:bg-gold/80 text-dark px-4 py-2 rounded-md transition-colors"
          >
            <Download className="h-4 w-4" />
            Exportar Todas ({images.length})
          </button>
        )}
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-gold bg-gold/10'
            : 'border-gray-600 hover:border-gold/50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload className="h-12 w-12 text-gold mx-auto mb-4" />
        <p className="text-white mb-2">Arraste e solte imagens aqui</p>
        <p className="text-gray-400 text-sm mb-4">ou</p>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-gold hover:bg-gold/80 text-dark px-6 py-2 rounded-md transition-colors"
        >
          Selecionar Arquivos
        </button>
        <p className="text-gray-500 text-xs mt-2">
          Formatos aceitos: JPG, PNG, WebP (máximo 5MB cada)
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <img
                src={imageUrl}
                alt={`Imagem ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                <button
                  onClick={() => exportImage(imageUrl, index)}
                  className="p-2 bg-gold hover:bg-gold/80 text-dark rounded-full transition-colors"
                  title="Exportar imagem"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  onClick={() => removeImage(index)}
                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
                  title="Remover imagem"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGalleryManager;
