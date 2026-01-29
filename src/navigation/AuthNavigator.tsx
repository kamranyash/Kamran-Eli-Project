import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { CreateAccountChoiceScreen } from '../screens/CreateAccountChoiceScreen';
import { SignUpBusinessScreen } from '../screens/SignUpBusinessScreen';

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  CreateAccountChoice: undefined;
  SignUpBusiness: undefined;
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
      onNavigateSignUp={() => props.navigation.navigate('CreateAccountChoice')}
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

  const CreateAccountChoiceWithNav = (
    props: NativeStackScreenProps<AuthStackParamList, 'CreateAccountChoice'>
  ) => (
    <CreateAccountChoiceScreen
      onSelectBusiness={() => props.navigation.navigate('SignUpBusiness')}
      onSelectPersonal={() => {}}
      onBack={() => props.navigation.goBack()}
    />
  );

  const SignUpBusinessWithNav = (
    props: NativeStackScreenProps<AuthStackParamList, 'SignUpBusiness'>
  ) => (
    <SignUpBusinessScreen
      onSignUpSuccess={onLoginSuccess}
      onBack={() => props.navigation.goBack()}
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
      <Stack.Screen
        name="CreateAccountChoice"
        component={CreateAccountChoiceWithNav}
      />
      <Stack.Screen name="SignUpBusiness" component={SignUpBusinessWithNav} />
      <Stack.Screen name="SignUp" component={SignUpScreenWithNav} />
    </Stack.Navigator>
  );
}
