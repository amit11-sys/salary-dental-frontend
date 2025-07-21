import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the structure of each suggestion item
export interface SuggestionItem {
  _id: string;
  speciality: string;
  sub_specialty?: string;
}

// Define the context shape
interface SuggestionsContextType {
  suggestions: SuggestionItem[];
  setSuggestions: React.Dispatch<React.SetStateAction<SuggestionItem[]>>;
}

// Create the context
const SuggestionsContext = createContext<SuggestionsContextType | undefined>(undefined);

// Provider component
export const SuggestionsProvider = ({ children }: { children: ReactNode }) => {
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);

  return (
    <SuggestionsContext.Provider value={{ suggestions, setSuggestions }}>
      {children}
    </SuggestionsContext.Provider>
  );
};

// Hook to use the context
export const useSuggestions = (): SuggestionsContextType => {
  const context = useContext(SuggestionsContext);
  if (!context) {
    throw new Error("useSuggestions must be used within a SuggestionsProvider");
  }
  return context;
};
