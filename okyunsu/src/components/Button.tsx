interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  rounded?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  rounded = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-semibold transition-colors duration-200';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
  };

  const sizes = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg'
  };

  const roundedStyle = rounded ? 'rounded-full' : 'rounded-lg';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${roundedStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
} 