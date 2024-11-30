import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ButtonRow from '@/src/components/\bButtonRow';
import { commonStyles } from '@/src/styles/commonStyles';

import useForm from '@/src/hooks/useForm';
import { validateChangePasswordForm } from '@/src/utils';
import InputField from '@/src/components/InputField';
import { useUpdatePassword } from '@/src/hooks/queries/useAccount';

type ChangePasswordFormProps = {
  closeModal: () => void;
};

function ChangePasswordForm({ closeModal }: ChangePasswordFormProps) {
  const passwordChange = useForm({
    initialValue: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      general: ''
    },
    validate: validateChangePasswordForm
  });

  const updatePassword = useUpdatePassword();

  const handleSaveButton = () => {
    updatePassword.mutate(passwordChange.values, {
      onSuccess: () => {
        closeModal();
      },
      onError: (error: any) => {
        passwordChange.setErrors({
          currentPassword: error.response?.data?.currentPassword || '',
          newPassword: error.response?.data?.newPassword || '',
          general: error.response?.data?.message[0] || ''
        });
      }
    });
  };

  return (
    <View style={{ gap: 10 }}>
      <Text
        style={[
          commonStyles.textBody,
          { textAlign: 'center', marginBottom: 30 }
        ]}
      >
        비밀번호 변경
      </Text>
      <Text style={commonStyles.textBody}>현재 비밀번호</Text>
      <InputField
        containerStyle={{
          borderBottomWidth: 1,
          borderBottomColor: '#ccc'
        }}
        {...passwordChange.getTextInputProps('currentPassword')}
        error={passwordChange.errors.currentPassword}
        touched={passwordChange.touched.currentPassword}
        secureTextEntry
        returnKeyType='next'
      />
      <Text style={commonStyles.textBody}>새 비밀번호</Text>
      <InputField
        autoFocus
        containerStyle={{
          borderBottomWidth: 1,
          borderBottomColor: '#ccc'
        }}
        {...passwordChange.getTextInputProps('newPassword')}
        error={passwordChange.errors.newPassword}
        touched={passwordChange.touched.newPassword}
        secureTextEntry
        blurOnSubmit={false}
        returnKeyType='next'
      />
      <Text style={commonStyles.textBody}>새 비밀번호 확인</Text>
      <InputField
        containerStyle={{
          borderBottomWidth: 1,
          borderBottomColor: '#ccc'
        }}
        {...passwordChange.getTextInputProps('confirmPassword')}
        error={passwordChange.errors.confirmPassword}
        touched={passwordChange.touched.confirmPassword}
        blurOnSubmit={false}
        secureTextEntry
      />
      {passwordChange.errors.general !== '' && (
        <Text style={styles.errorText}>{passwordChange.errors.general}</Text>
      )}
      <ButtonRow
        primaryTitle='저장'
        secondaryTitle='취소'
        onPrimaryPress={handleSaveButton}
        onSecondaryPress={closeModal}
        primaryButtonDisabled={Object.values(passwordChange.errors).some(
          (error) => !!error
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginBottom: 20,
    fontSize: 12,
    fontFamily: 'Gmarket-Sans-Medium'
  }
});

export default ChangePasswordForm;
