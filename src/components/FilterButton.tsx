interface FilterButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
  }
  
  export function FilterButton({ label, isActive, onClick }: FilterButtonProps) {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          isActive
            ? "bg-secondary text-black"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        {label}
      </button>
    );
  }