import { colors } from '@/src/styles/colors';
import { commonStyles } from '@/src/styles/commonStyles';
import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface ConfirmActionModalProps {
  closeModal: () => void;
  onConfirm: () => void;
  confirmText: string;
  cancelText: string;
  message: string;
}

function ConfirmActionModal({
  closeModal,
  onConfirm,
  confirmText,
  cancelText,
  message
}: ConfirmActionModalProps) {
  return (
    <>
      <Text style={[commonStyles.textBody, { textAlign: 'center' }]}>
        {message}
      </Text>
      <View
        style={[
          commonStyles.row,
          { marginTop: 40 },
          { justifyContent: 'space-evenly' }
        ]}
      >
        <Pressable onPress={closeModal}>
          <Text style={commonStyles.textBody}>{cancelText}</Text>
        </Pressable>
        <Pressable onPress={onConfirm}>
          <Text style={[commonStyles.textBody, { color: colors.PRIMARY }]}>
            {confirmText}
          </Text>
        </Pressable>
      </View>
    </>
  );
}

export default ConfirmActionModal;
