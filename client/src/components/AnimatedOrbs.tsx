import { motion } from 'framer-motion';

interface AnimatedOrbsProps {
  animated?: boolean;
}

export function AnimatedOrbs({ animated = true }: AnimatedOrbsProps) {
  if (!animated) {
    return (
      <>
        <div className="absolute top-[10%] left-[20%] w-64 h-64 rounded-full bg-[#D4AF37]/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[20%] w-80 h-80 rounded-full bg-[#B5912B]/10 blur-[100px] pointer-events-none" />
      </>
    );
  }
  return (
    <>
      <motion.div
        animate={{ y: [-20, 20, -20], x: [-20, 20, -20] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[10%] left-[20%] w-64 h-64 rounded-full bg-[#D4AF37]/10 blur-[80px] pointer-events-none"
      />
      <motion.div
        animate={{ y: [20, -20, 20], x: [20, -20, 20] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-[10%] right-[20%] w-80 h-80 rounded-full bg-[#B5912B]/10 blur-[100px] pointer-events-none"
      />
    </>
  );
}
