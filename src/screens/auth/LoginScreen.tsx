import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';

import InputField from '@/src/components/InputField';
import CustomButton from '@/src/components/CustomButton';

import useForm from '@/src/hooks/useForm';
import { validateLogin } from '@/src/utils';

interface LoginScreenProps {}

function LoginScreen({}: LoginScreenProps) {
  const login = useForm({
    initialValue: {
      email: '',
      password: ''
    },
    validate: validateLogin
  });

  const handleSubmit = () => {
    console.log(login.values);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder='이메일'
          error={login.errors.email}
          touched={login.touched.email}
          inputMode='email'
          {...login.getTextInputProps('email')}
        />
        <InputField
          placeholder='비밀번호'
          error={login.errors.password}
          touched={login.touched.password}
          secureTextEntry
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
