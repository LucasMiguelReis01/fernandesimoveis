
import { useState, useEffect } from 'react';
import HeroBanner from '@/components/HeroBanner';
import FeaturedPropertiesSection from '@/components/FeaturedPropertiesSection';
import BenefitsSection from '@/components/BenefitsSection';
import CTASection from '@/components/CTASection';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <HeroBanner />
      <FeaturedPropertiesSection />
      <BenefitsSection />
      <CTASection />
    </div>
  );
};

export default Index;
