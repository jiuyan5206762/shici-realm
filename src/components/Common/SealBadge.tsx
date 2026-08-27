import React from 'react';

interface SealBadgeProps {
  text: string;
  variant?: 'cinnabar' | 'gold' | 'bamboo' | 'indigo' | 'ink';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SealBadge: React.FC<SealBadgeProps> = ({
  text,
  variant = 'cinnabar',
  size = 'md',
  className = '',
}) => {
  const variantStyles = {
    cinnabar: 'border-[#BA3B46] text-[#BA3B46] bg-[#BA3B46]/5 hover:bg-[#BA3B46]/10 shadow-[inset_0_0_0_1px_#BA3B46]',
    gold: 'border-[#C5A059] text-[#C5A059] bg-[#C5A059]/5 hover:bg-[#C5A059]/10 shadow-[inset_0_0_0_1px_#C5A059]',
    bamboo: 'border-[#3D5A45] text-[#3D5A45] bg-[#3D5A45]/5 hover:bg-[#3D5A45]/10 shadow-[inset_0_0_0_1px_#3D5A45]',
    indigo: 'border-[#2A4365] text-[#2A4365] bg-[#2A4365]/5 hover:bg-[#2A4365]/10 shadow-[inset_0_0_0_1px_#2A4365]',
    ink: 'border-stone-700 text-stone-700 dark:border-stone-400 dark:text-stone-300 bg-stone-500/5 shadow-[inset_0_0_0_1px_rgba(41,37,36,0.3)]',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-1.5 py-0.5 rounded-[3px] border',
    md: 'text-xs px-2 py-0.5 rounded-[4px] border-[1.5px]',
    lg: 'text-sm px-2.5 py-1 rounded-[5px] border-2',
  };

  return (
    <span
      className={`inline-flex items-center justify-center font-serif font-bold tracking-widest select-none transition-all duration-200 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {text}
    </span>
  );
};
