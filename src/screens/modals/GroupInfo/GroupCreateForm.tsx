import ButtonRow from '@/src/components/\bButtonRow';
import BottomBorderedInput from '@/src/components/BottomBorderedInput';
import { commonStyles } from '@/src/styles/commonStyles';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface GroupCreateFormProps {
  closeModal: () => void;
  title?: string;
}

const handlePressSaveButton = () => {
  console.log('save');
};

const GroupCreateForm = ({
  closeModal,
  title = '그룹 생성'
}: GroupCreateFormProps) => {
  const [groupName, setGroupName] = useState<string>('');

  return (
    <View style={{ gap: 10 }}>
      <Text style={[commonStyles.textHeader, commonStyles.textLeft]}>
        {title}
      </Text>
      <BottomBorderedInput
        placeholder='그룹 이름을 입력해주세요'
        value={groupName}
        onChangeText={(text) => {
          setGroupName(text);
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
};

const styles = StyleSheet.create({});

export default GroupCreateForm;
