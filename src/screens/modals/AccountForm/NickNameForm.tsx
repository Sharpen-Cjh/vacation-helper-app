import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ButtonRow from '@/src/components/\bButtonRow';
import BottomBorderedInput from '@/src/components/BottomBorderedInput';
import { commonStyles } from '@/src/styles/commonStyles';

import { useUpdateNickname } from '@/src/hooks/queries/useAccount';

interface NickNameFormProps {
  closeModal: () => void;
}

function NickNameForm({ closeModal }: NickNameFormProps) {
  const updateNicknameMutation = useUpdateNickname();
  const [nickName, setNickName] = useState<string>('');
  const handlePressSaveButton = () => {
    updateNicknameMutation.mutate(nickName);
    closeModal();
  };

  return (
    <View style={{ gap: 10 }}>
      <Text style={[commonStyles.textBody, commonStyles.textLeft]}>
        닉네임 변경
      </Text>
      <BottomBorderedInput
        placeholder='새로운 닉네임을 입력해주세요'
        value={nickName}
        onChangeText={(text) => {
          setNickName(text);
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

export default NickNameForm;
