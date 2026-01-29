import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

interface AuthNavigatorProps {
  onLoginSuccess: () => void;
}

export function AuthNavigator({ onLoginSuccess }: AuthNavigatorProps) {
  const LoginScreenWithNav = (
    props: NativeStackScreenProps<AuthStackParamList, 'Login'>
  ) => (
    <LoginScreen
      onLoginSuccess={onLoginSuccess}
      onNavigateSignUp={() => props.navigation.navigate('SignUp')}
    />
  );

  const SignUpScreenWithNav = (
    props: NativeStackScreenProps<AuthStackParamList, 'SignUp'>
  ) => (
    <SignUpScreen
      onSignUpSuccess={onLoginSuccess}
      onNavigateLogin={() => props.navigation.goBack()}
    />
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#E8F4FC' },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreenWithNav} />
      <Stack.Screen name="SignUp" component={SignUpScreenWithNav} />
    </Stack.Navigator>
  );
}
