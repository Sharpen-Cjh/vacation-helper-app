import ButtonRow from '@/src/components/\bButtonRow';
import { commonStyles } from '@/src/styles/commonStyles';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

interface NickNameFormProps {
  closeModal: () => void;
}

function NickNameForm({ closeModal }: NickNameFormProps) {
  return (
    <View style={{ gap: 10 }}>
      <Text style={[commonStyles.textHeader, commonStyles.textLeft]}>
        닉네임 변경
      </Text>
      <View
        style={[{ gap: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }]}
      >
        <TextInput placeholder='닉네임을 입력하세요.' />
      </View>
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

export default NickNameForm;
