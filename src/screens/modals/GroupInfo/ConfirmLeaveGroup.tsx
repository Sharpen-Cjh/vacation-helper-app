import { colors } from '@/src/styles/colors';
import { commonStyles } from '@/src/styles/commonStyles';
import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

interface ConfirmLeaveGroupProps {
  closeModal: () => void;
  onConfirmLeave: () => void;
}

function ConfirmLeaveGroup({
  closeModal,
  onConfirmLeave
}: ConfirmLeaveGroupProps) {
  return (
    <>
      <Text style={[commonStyles.textBody, { textAlign: 'center' }]}>
        정말 그룹에서 나가시겠습니까?
      </Text>
      <View
        style={[
          commonStyles.row,
          { marginTop: 40 },
          { justifyContent: 'space-evenly' }
        ]}
      >
        <Pressable onPress={closeModal}>
          <Text style={commonStyles.textBody}>취소</Text>
        </Pressable>
        <Pressable onPress={onConfirmLeave}>
          <Text style={[commonStyles.textBody, { color: colors.PRIMARY }]}>
            나가기
          </Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  cancelButton: {
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    borderRadius: 5
  }
});

export default ConfirmLeaveGroup;
