'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface UIContextType {
  isNeuralViewActive: boolean;
  toggleNeuralView: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isNeuralViewActive, setIsNeuralViewActive] = useState(false);

  const toggleNeuralView = () => {
    setIsNeuralViewActive(prev => !prev);
  };

  return (
    <UIContext.Provider value={{ isNeuralViewActive, toggleNeuralView }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
