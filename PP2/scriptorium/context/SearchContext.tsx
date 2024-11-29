import { createContext, useContext, useState } from "react";

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFilter: string | null;
  setSelectedFilter: (filter: string | null) => void;
  sortingMethod: string | null;
  setSortingMethod: (method: string | null) => void;
  searchResults: any[];
  setSearchResults: (results: any[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [sortingMethod, setSortingMethod] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedFilter,
        setSelectedFilter,
        sortingMethod,
        setSortingMethod,
        searchResults,
        setSearchResults,
        loading,
        setLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};
