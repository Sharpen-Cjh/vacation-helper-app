import React, { useRef } from 'react';
import { StyleSheet, View, SafeAreaView, TextInput } from 'react-native';

import InputField from '@/src/components/InputField';
import CustomButton from '@/src/components/CustomButton';

import useForm from '@/src/hooks/useForm';
import useAuth from '@/src/hooks/queries/useAuth';

import { validateLogin } from '@/src/utils';

interface LoginScreenProps {}

function LoginScreen({}: LoginScreenProps) {
  const passwordRef = useRef<TextInput | null>(null);
  const { loginMutation } = useAuth();
  const login = useForm({
    initialValue: {
      email: '',
      password: ''
    },
    validate: validateLogin
  });

  const handleSubmit = () => {
    loginMutation.mutate(login.values);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder='이메일'
          error={login.errors.email}
          touched={login.touched.email}
          inputMode='email'
          returnKeyType='next'
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...login.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder='비밀번호'
          error={login.errors.password}
          touched={login.touched.password}
          secureTextEntry
          returnKeyType='join'
          blurOnSubmit={false}
          onSubmitEditing={handleSubmit}
          {...login.getTextInputProps('password')}
        />
      </View>
      <CustomButton
        label='로그인'
        variant='filled'
        size='large'
        onPress={handleSubmit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30
  }
});

export default LoginScreen;
