interface GoldDividerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const widthMap = { sm: 'w-20', md: 'w-24', lg: 'w-32' };

export function GoldDivider({ size = 'md', className = '' }: GoldDividerProps) {
  return (
    <div
      className={`h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B5912B] mx-auto rounded-full shadow-[0_2px_10px_rgba(212,175,55,0.5)] ${widthMap[size]} ${className}`}
    />
  );
}
