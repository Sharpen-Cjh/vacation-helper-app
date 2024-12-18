import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ButtonRow from '@/src/components/\bButtonRow';
import BottomBorderedInput from '@/src/components/BottomBorderedInput';
import { commonStyles } from '@/src/styles/commonStyles';

import useGroupInfo from '@/src/hooks/queries/useGroup';

interface GroupJoinFormProps {
  closeModal: () => void;
}

function GroupJoinForm({ closeModal }: GroupJoinFormProps) {
  const [groupCode, setGroupCode] = useState<string>('');
  const { joinGroupMutation } = useGroupInfo();

  const handlePressSaveButton = () => {
    joinGroupMutation.mutate(groupCode, {
      onSuccess: () => {
        closeModal();
      }
    });
  };

  return (
    <View style={{ gap: 10 }}>
      <Text style={[commonStyles.textBody, commonStyles.textLeft]}>
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
        primaryTitle='참가'
        secondaryTitle='취소'
        onPrimaryPress={handlePressSaveButton}
        onSecondaryPress={closeModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

export default GroupJoinForm;
