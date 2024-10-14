import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View
} from 'react-native';
import { commonStyles } from '../styles/commonStyles';

interface BottomBorderedInputProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

function BottomBorderedInput({
  label,
  placeholder,
  value,
  onChangeText,
  ...props
}: BottomBorderedInputProps) {
  return (
    <View style={styles.inputContainer}>
      {label && <Text style={commonStyles.textBody}>{label}</Text>}
      <TextInput
        style={commonStyles.textBody}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText} //
        {...props}
        autoCapitalize='none'
        spellCheck={false}
        autoCorrect={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
});

export default BottomBorderedInput;
