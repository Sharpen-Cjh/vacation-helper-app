import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { commonStyles } from '@/src/styles/commonStyles';
import { colors } from '../styles/colors';

interface ButtonRowProps {
  primaryTitle?: string;
  secondaryTitle?: string;
  onPrimaryPress?: () => void;
  onSecondaryPress?: () => void;
}

const ButtonRow: React.FC<ButtonRowProps> = ({
  primaryTitle,
  secondaryTitle,
  onPrimaryPress,
  onSecondaryPress
}) => {
  return (
    <View style={[commonStyles.row, styles.buttonContainer]}>
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={onSecondaryPress}
      >
        <Text style={styles.secondaryButtonText}>{secondaryTitle}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={onPrimaryPress}
      >
        <Text style={styles.primaryButtonText}>{primaryTitle}</Text>
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
    fontWeight: 'bold',
    fontSize: 16
  },
  secondaryButton: {},
  secondaryButtonText: {
    color: colors.PRIMARY,
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default ButtonRow;
