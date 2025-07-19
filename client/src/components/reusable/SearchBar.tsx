import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 5000);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="relative w-full max-w-xs mb-4 float-right">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <span className="absolute left-2 top-2 text-gray-400">
        <FaSearch className="relative left-2 top-1.5 text-gray-400" />
      </span>
    </div>
  );
};