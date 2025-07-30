import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'white';
  showText?: boolean;
  className?: string;
}

export function Logo({ 
  size = 'md', 
  variant = 'default', 
  showText = true,
  className = ''
}: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Image
        src={`/images/logo.svg`}
        alt="Prompter Logo"
        width={32}
        height={32}
        className={sizeClasses[size]}
      />
      {showText && (
        <span className="text-xl font-bold text-white logo-text">prompter</span>
      )}
    </div>
  );
} 