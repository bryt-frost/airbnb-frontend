import { create } from 'zustand';

export type SearchQuery = {
  country: string | undefined;
  category: string | '';
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  guests: number;
  bathrooms: number;
  bedrooms: number;
};

interface SearchModalStore {
  isOpen: boolean;
  open: (step: string) => void;
  close: () => void;
  query: SearchQuery;
  setQuery: (query: SearchQuery) => void;
  step: string;
}

const useSearchModal = create<SearchModalStore>((set) => ({
  isOpen: false,
  step: '',
  open: (step) => set({ isOpen: true, step: step }),
  close: () => set({ isOpen: false }),
  setQuery: (query: SearchQuery) => set({ query: query }),
  query: {
    country: '',
    checkIn: undefined,
    checkOut: undefined,
    guests: 1,
    bathrooms: 0,
    bedrooms: 0,
    category: '',
  },
}));
export default useSearchModal;
