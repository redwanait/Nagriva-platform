import { useInView } from '../../hooks/useInView';

interface CategoryFilterProps {
  categories: Array<{ name: string; count: number }>;
  activeCategory: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({ categories, activeCategory, onSelect }: CategoryFilterProps) {
  const { ref, isInView } = useInView(0.1);

  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => onSelect(cat.name)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
              activeCategory === cat.name
                ? 'bg-royal-blue text-white shadow-sm shadow-royal-blue/20'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-royal-blue/20 hover:text-royal-blue'
            }`}
          >
            {cat.name}
            <span className={`text-xs ${activeCategory === cat.name ? 'text-white/70' : 'text-gray-400'}`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
