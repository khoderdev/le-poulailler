import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoWebp from '../assets/le-poulailler-logo.webp';
import logoPng from '../assets/le-poulailler-logo.png';

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

const sizeDimensions = {
  sm: { width: 176, height: 64 },
  md: { width: 264, height: 96 },
  lg: { width: 352, height: 128 },
  xl: { width: 528, height: 192 },
};

const Logo = ({ size = 'md', animate = true, className = '' }: LogoProps) => {
  const { width, height } = sizeDimensions[size];
  
  const imgElement = (
    <picture>
      <source srcSet={logoWebp} type="image/webp" />
      <img
        src={logoPng}
        alt="Le Poulailler"
        width={width}
        height={height}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className={`w-auto object-contain ${sizeClasses[size]} ${className}`}
      />
    </picture>
  );

  const content = animate ? (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
      className="inline-block"
    >
      {imgElement}
    </motion.div>
  ) : (
    imgElement
  );

  return (
    <Link to="/" className="cursor-pointer">
      {content}
    </Link>
  );
};

export default Logo;
