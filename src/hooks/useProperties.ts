
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { PropertyType } from '@/components/PropertyCard';

export const useProperties = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('properties')
          .select('id, title, transaction_type, price, location, bedrooms, area, image_url, featured, sold, property_type, code')
          .order('created_at', { ascending: false });
          
        if (error) {
          setError('Não foi possível carregar os imóveis.');
          return;
        }

        const formattedData = data.map(item => ({
          id: item.id,
          title: item.title,
          type: item.transaction_type,
          transaction_type: item.transaction_type,
          price: item.price,
          location: item.location,
          bedrooms: item.bedrooms,
          area: item.area,
          imageUrl: item.image_url,
          image_url: item.image_url,
          featured: item.featured,
          sold: item.sold,
          property_type: item.property_type,
          code: item.code
        }));
        
        setProperties(formattedData);
      } catch (err) {
        setError('Ocorreu um erro inesperado.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return { properties, isLoading, error, refetch: () => window.location.reload() };
};
