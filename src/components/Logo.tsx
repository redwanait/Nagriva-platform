export default function Logo({ className = '' }: { className?: string }) {
  return (
    <a href="/" className={`flex items-center ${className}`}>
      <img
        src="/assets/logos/icon.png"
        alt="Nagriva"
        className="h-8 w-auto object-contain"
        draggable={false}
      />
    </a>
  );
}
