export function Button({ children, className = '', variant = 'default', ...props }) {
  let base = 'px-4 py-2 rounded font-medium focus:outline-none transition';
  let variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-400 text-gray-700 bg-white hover:bg-gray-100',
  };
  return (
    <button className={`${base} ${variants[variant] || ''} ${className}`} {...props}>
      {children}
    </button>
  );
}
