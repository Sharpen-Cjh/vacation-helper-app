import ButtonRow from '@/src/components/\bButtonRow';
import BottomBorderedInput from '@/src/components/BottomBorderedInput';
import { commonStyles } from '@/src/styles/commonStyles';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface GroupJoinFormProps {
  closeModal: () => void;
}
const handlePressSaveButton = () => {
  console.log('save');
};
function GroupJoinForm({ closeModal }: GroupJoinFormProps) {
  const [groupCode, setGroupCode] = useState<string>('');

  return (
    <View style={{ gap: 10 }}>
      <Text style={[commonStyles.textHeader, commonStyles.textLeft]}>
        그룹 참가
      </Text>
      <BottomBorderedInput
        placeholder='그룹 코드를 입력해주세요'
        value={groupCode}
        onChangeText={(text) => {
          setGroupCode(text);
        }}
      />
      <ButtonRow
        primaryTitle='저장'
        secondaryTitle='취소'
        onPrimaryPress={handlePressSaveButton}
        onSecondaryPress={closeModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

export default GroupJoinForm;
