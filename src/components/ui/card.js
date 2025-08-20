export function Card({ className = '', children, ...props }) {
  return (
    <div className={`rounded-lg shadow bg-white ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ className = '', children, ...props }) {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
}
