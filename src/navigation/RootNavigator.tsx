import React, { useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './AuthNavigator';
import { AppTabs } from './AppTabs';

export function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AppTabs />
      ) : (
        <AuthNavigator onLoginSuccess={handleLoginSuccess} />
      )}
    </NavigationContainer>
  );
}
