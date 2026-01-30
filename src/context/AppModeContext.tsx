import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type AppMode = 'business' | 'consumer';

interface AppModeContextValue {
  mode: AppMode;
  switchToBusiness: () => void;
  switchToConsumer: () => void;
}

const AppModeContext = createContext<AppModeContextValue | null>(null);

export function AppModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AppMode>('business');

  const switchToBusiness = useCallback(() => setMode('business'), []);
  const switchToConsumer = useCallback(() => setMode('consumer'), []);

  return (
    <AppModeContext.Provider value={{ mode, switchToBusiness, switchToConsumer }}>
      {children}
    </AppModeContext.Provider>
  );
}

export function useAppMode() {
  const ctx = useContext(AppModeContext);
  if (!ctx) {
    return {
      mode: 'business' as AppMode,
      switchToBusiness: () => {},
      switchToConsumer: () => {},
    };
  }
  return ctx;
}
