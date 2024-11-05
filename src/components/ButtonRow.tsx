import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { commonStyles } from '@/src/styles/commonStyles';
import { colors } from '../styles/colors';

interface ButtonRowProps {
  primaryTitle?: string;
  secondaryTitle?: string;
  onPrimaryPress?: () => void;
  onSecondaryPress?: () => void;
  primaryButtonDisabled?: boolean;
}

const ButtonRow = ({
  primaryTitle,
  secondaryTitle,
  onPrimaryPress,
  onSecondaryPress,
  primaryButtonDisabled = false
}: ButtonRowProps) => {
  return (
    <View style={[commonStyles.row, styles.buttonContainer]}>
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={onSecondaryPress}
      >
        <Text style={styles.secondaryButtonText}>{secondaryTitle}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          styles.primaryButton,
          primaryButtonDisabled && styles.disabledButton
        ]}
        onPress={onPrimaryPress}
        disabled={primaryButtonDisabled}
      >
        <Text
          style={[
            styles.primaryButtonText,
            primaryButtonDisabled && styles.disabledButtonText
          ]}
        >
          {primaryTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'flex-end',
    gap: 10
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center'
  },
  primaryButton: {},
  primaryButtonText: {
    color: colors.PRIMARY,
    fontSize: 16,
    fontFamily: 'Gmarket-Sans-Medium'
  },
  secondaryButton: {},
  secondaryButtonText: {
    color: colors.PRIMARY,
    fontSize: 16,
    fontFamily: 'Gmarket-Sans-Medium'
  },
  disabledButton: {
    color: colors.GRAY_500
  },
  disabledButtonText: {
    color: colors.GRAY_500 // 비활성화 텍스트 색상 설정
  }
});

export default ButtonRow;
