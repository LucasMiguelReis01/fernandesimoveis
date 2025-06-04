
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { PropertyType } from '@/components/PropertyCard';

export const useProperty = (id: string | undefined) => {
  const [property, setProperty] = useState<PropertyType & { description: string; images: string[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          setError('Não foi possível carregar os detalhes do imóvel.');
          return;
        }

        if (!data) {
          setError('Imóvel não encontrado.');
          return;
        }

        // Parse images efficiently
        let images = [];
        if (data.images && Array.isArray(data.images)) {
          images = data.images;
        } else if (data.images && typeof data.images === 'string') {
          try {
            const parsed = JSON.parse(data.images);
            images = Array.isArray(parsed) ? parsed : [data.images];
          } catch {
            images = [data.images];
          }
        }
        
        if (images.length === 0 && data.image_url) {
          images = [data.image_url];
        }
        
        if (images.length === 0) {
          images = ['/placeholder.svg'];
        }

        const formattedProperty = {
          id: data.id,
          title: data.title,
          type: data.transaction_type,
          transaction_type: data.transaction_type,
          price: data.price,
          location: data.location,
          bedrooms: data.bedrooms,
          area: data.area,
          imageUrl: images[0],
          image_url: images[0],
          featured: data.featured,
          sold: data.sold,
          property_type: data.property_type,
          description: data.description,
          code: data.code,
          images: images
        };
        
        setProperty(formattedProperty);
      } catch (err) {
        setError('Ocorreu um erro inesperado.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  return { property, loading, error };
};
