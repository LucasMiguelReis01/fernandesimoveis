
import React, { memo } from 'react';

interface BenefitCardProps {
  number: string;
  title: string;
  description: string;
}

const BenefitCard = memo(({ number, title, description }: BenefitCardProps) => {
  return (
    <div className="p-6 glass-dark rounded-lg hover:scale-105 transition-transform duration-300">
      <div className="h-14 w-14 border border-gold/40 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-gold text-2xl font-bold">{number}</span>
      </div>
      <h3 className="text-white text-lg font-semibold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
});

BenefitCard.displayName = 'BenefitCard';

export default BenefitCard;
