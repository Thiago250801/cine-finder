import { ChangeEvent } from "react";

interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Buscar por título..."
      className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 mb-6 focus:outline-none focus:ring-2 focus:ring-secondary"
    />
  );
}
