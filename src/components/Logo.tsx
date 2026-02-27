import { motion } from 'framer-motion';
import logo from '../assets/le-poulailler-logo.png';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'h-12 md:h-16',
  md: 'h-16 md:h-24',
  lg: 'h-24 md:h-32',
  xl: 'h-32 md:h-48',
};

const Logo = ({ size = 'md', animate = true, className = '' }: LogoProps) => {
  const imgElement = (
    <img
      src={logo}
      alt="Le Poulailler"
      className={`w-auto object-contain ${sizeClasses[size]} ${className}`}
    />
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        whileHover={{ scale: 1.02 }}
        className="inline-block"
      >
        {imgElement}
      </motion.div>
    );
  }

  return imgElement;
};

export default Logo;
