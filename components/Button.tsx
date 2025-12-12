import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'inverse';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  className = '', 
  disabled,
  ...props 
}) => {
  // Sharp edges, uppercase, tracking-widest for Cyberpunk feel
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 border-2 font-display text-sm font-bold uppercase tracking-widest shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cyber-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed clip-path-slant";
  
  const variants = {
    // Solid Yellow background, black text
    primary: "border-cyber-yellow text-black bg-cyber-yellow hover:bg-yellow-300 hover:shadow-neon focus:ring-cyber-yellow",
    // Transparent background, yellow border
    secondary: "border-cyber-yellow text-cyber-yellow bg-transparent hover:bg-cyber-yellow/10 focus:ring-cyber-yellow",
    // Black background, Yellow text (Inverse)
    inverse: "border-cyber-black text-cyber-yellow bg-cyber-black hover:bg-slate-900 focus:ring-cyber-black",
    // Red for danger
    danger: "border-red-600 text-white bg-red-600/20 hover:bg-red-600 hover:text-white focus:ring-red-500",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          PROCESSANDO_
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;