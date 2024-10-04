import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { commonStyles } from '../styles/commonStyles';

type BottomBorderedInputProps = {
  label: string;
  placeholder?: string;
};

function BottomBorderedInput({ label, placeholder }: BottomBorderedInputProps) {
  return (
    <View style={styles.inputContainer}>
      <Text style={commonStyles.textBody}>{label}</Text>
      <TextInput placeholder={placeholder} />
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
