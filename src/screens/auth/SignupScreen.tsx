import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';

import InputField from '@/src/components/InputField';

import useForm from '@/src/hooks/useForm';
import CustomButton from '@/src/components/CustomButton';
import { validateSignup } from '@/src/utils';

function SignupScreen() {
  const signup = useForm({
    initialValue: {
      email: '',
      password: '',
      passwordConfirm: ''
    },
    validate: validateSignup
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder='이메일'
          error={signup.errors.email}
          touched={signup.touched.email}
          inputMode='email'
          {...signup.getTextInputProps('email')}
        />
        <InputField
          placeholder='비밀번호'
          error={signup.errors.password}
          touched={signup.touched.password}
          secureTextEntry
          {...signup.getTextInputProps('password')}
        />
        <InputField
          placeholder='비밀번호 확인'
          error={signup.errors.passwordConfirm}
          touched={signup.touched.passwordConfirm}
          secureTextEntry
          {...signup.getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton label='회원가입' variant='filled' size='large' />
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

export default SignupScreen;
