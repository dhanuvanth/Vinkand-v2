import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, centered = true }) => {
  return (
    <div className={`mb-12 md:mb-20 ${centered ? 'text-center' : 'text-left'}`}>
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-8 tracking-tight text-slate-900 leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-600 text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto font-medium leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;