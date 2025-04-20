import React, { createContext, useContext, ReactNode } from 'react';
import { useDocumentStore } from '../store/documentStore';

interface DocumentContextProps {
  children: ReactNode;
}

const DocumentContext = createContext<null>(null);

export const DocumentProvider: React.FC<DocumentContextProps> = ({ children }) => {
  return (
    <DocumentContext.Provider value={null}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = () => {
  const store = useDocumentStore();
  return store;
};