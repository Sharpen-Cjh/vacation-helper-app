import React, { useRef } from 'react';
import { StyleSheet, SafeAreaView, View, TextInput } from 'react-native';

import useForm from '@/src/hooks/useForm';
import useAuth from '@/src/hooks/queries/useAuth';

import InputField from '@/src/components/InputField';
import CustomButton from '@/src/components/CustomButton';

import { validateSignup } from '@/src/utils';

function SignupScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const { signupMutation, loginMutation } = useAuth();

  const signup = useForm({
    initialValue: {
      email: '',
      password: '',
      passwordConfirm: ''
    },
    validate: validateSignup
  });

  const handleSubmit = () => {
    const { email, password } = signup.values;
    signupMutation.mutate(
      { email, password },
      {
        onSuccess: () => loginMutation.mutate({ email, password }),
        onError: (error) => {
          console.log(error);
        }
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder='이메일'
          error={signup.errors.email}
          touched={signup.touched.email}
          inputMode='email'
          returnKeyType='next'
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...signup.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder='비밀번호'
          textContentType='oneTimeCode'
          error={signup.errors.password}
          touched={signup.touched.password}
          secureTextEntry
          returnKeyType='next'
          blurOnSubmit={false}
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          {...signup.getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder='비밀번호 확인'
          error={signup.errors.passwordConfirm}
          touched={signup.touched.passwordConfirm}
          secureTextEntry
          {...signup.getTextInputProps('passwordConfirm')}
          onSubmitEditing={handleSubmit}
        />
      </View>
      <CustomButton
        label='회원가입'
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

export default SignupScreen;
