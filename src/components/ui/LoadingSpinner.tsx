interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'blue' | 'amber' | 'white';
  text?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'blue', 
  text = 'Carregando...' 
}: LoadingSpinnerProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const colors = {
    blue: 'border-blue-500',
    amber: 'border-amber-400',
    white: 'border-white'
  };

  const textColors = {
    blue: 'text-blue-600',
    amber: 'text-amber-600',
    white: 'text-white'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Animated Logo */}
      <div className="relative">
        <div className={`${sizes[size]} rounded-full border-2 ${colors[color]} border-t-transparent animate-spin`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xs animate-pulse">⚖️</div>
        </div>
      </div>
      
      {/* Loading Text */}
      {text && (
        <div className={`text-sm font-medium ${textColors[color]} animate-pulse`}>
          {text}
        </div>
      )}
      
      {/* Animated Dots */}
      <div className="flex space-x-1">
        <div className={`w-2 h-2 ${color === 'white' ? 'bg-white' : `bg-${color}-400`} rounded-full animate-bounce`}></div>
        <div className={`w-2 h-2 ${color === 'white' ? 'bg-white' : `bg-${color}-400`} rounded-full animate-bounce delay-100`}></div>
        <div className={`w-2 h-2 ${color === 'white' ? 'bg-white' : `bg-${color}-400`} rounded-full animate-bounce delay-200`}></div>
      </div>
    </div>
  );
} 