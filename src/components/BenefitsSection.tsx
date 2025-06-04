
import React, { memo } from 'react';
import BenefitCard from './BenefitCard';

const benefitsData = [
  {
    number: "01",
    title: "Diversidade",
    description: "Trabalhamos com imóveis de todos os padrões, desde populares até alto luxo, cuidadosamente selecionados."
  },
  {
    number: "02", 
    title: "Atendimento",
    description: "Oferecemos um serviço personalizado e dedicado a cada cliente, independente do valor do imóvel."
  },
  {
    number: "03",
    title: "Conhecimento", 
    description: "Nossa equipe possui amplo conhecimento do mercado imobiliário local e financiamentos."
  }
];

const BenefitsSection = memo(() => {
  return (
    <section className="py-20 bg-dark-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white mb-6">
            POR QUE ESCOLHER A <span className="text-gold">FERNANDES IMÓVEIS</span>?
          </h2>
          <p className="text-gray-300 mb-12 leading-relaxed">
            Somos especialistas em imóveis de todas as categorias, desde imóveis populares até alto padrão,
            com foco em proporcionar uma experiência de compra ou locação excepcional para nossos clientes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefitsData.map((benefit) => (
              <BenefitCard
                key={benefit.number}
                number={benefit.number}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

BenefitsSection.displayName = 'BenefitsSection';

export default BenefitsSection;
