import React, { useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './AuthNavigator';
import { AppTabs } from './AppTabs';
import { ConsumerTabs } from './ConsumerTabs';
import { useAppMode } from '../context/AppModeContext';

export function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { mode } = useAppMode();

  const handleLoginSuccess = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <AuthNavigator onLoginSuccess={handleLoginSuccess} />
      ) : mode === 'consumer' ? (
        <ConsumerTabs />
      ) : (
        <AppTabs />
      )}
    </NavigationContainer>
  );
}
