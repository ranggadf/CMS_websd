import React from 'react';
import { InputText } from 'primereact/inputtext';

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ searchTerm, setSearchTerm, placeholder = "Cari..." }) => {
  return (
    <div className="p-input-icon-right flex justify-content-end w-full sm:w-3">
      <i className="pi pi-search" />
      <InputText 
        className="w-full"
        value={searchTerm} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)} 
        placeholder={placeholder} 
      />
    </div>
  );
};

export default SearchFilter;