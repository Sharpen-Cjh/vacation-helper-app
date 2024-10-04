import ButtonRow from '@/src/components/\bButtonRow';
import BottomBorderedInput from '@/src/components/BottomBorderedInput';
import { commonStyles } from '@/src/styles/commonStyles';
import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

type PasswordFormProps = {
  closeModal: () => void;
};

function PasswordForm({ closeModal }: PasswordFormProps) {
  return (
    <View style={{ gap: 10 }}>
      <Text style={commonStyles.textHeader}>비밀번호 변경</Text>
      <BottomBorderedInput label='현재 비밀 번호' />
      <BottomBorderedInput label='새 비밀번호' />
      <BottomBorderedInput label='새 비밀번호 확인' />

      <ButtonRow
        primaryTitle='저장'
        secondaryTitle='취소'
        onPrimaryPress={closeModal}
        onSecondaryPress={closeModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

export default PasswordForm;
