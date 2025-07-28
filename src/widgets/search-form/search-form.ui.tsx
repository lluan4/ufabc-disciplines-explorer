import { useEffect } from 'react';

import { Search } from 'lucide-react';

import { useDebounce } from '@/shared/hooks/use-debounce';
import { Label } from '@/shared/ui/components/label';
import { SidebarGroup, SidebarGroupContent, SidebarInput } from '@/shared/ui/components/sidebar';

type SearchFormProps = {
  onDebounce: (value: string) => void;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchValue?: string;
  placeholder?: string;
};

export function SearchForm({ setSearchValue, searchValue = '', onDebounce, placeholder }: SearchFormProps) {
  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    onDebounce(debouncedSearchValue);
  }, [debouncedSearchValue, onDebounce]);

  return (
    <SidebarGroup className="py-0">
      <SidebarGroupContent className="relative">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <SidebarInput
          id="search"
          placeholder={placeholder ?? 'Pesquisar'}
          className="pl-8"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
