import React from 'react';
import { useRef, forwardRef, ForwardedRef } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  TextInputProps,
  Text,
  Pressable,
  ViewStyle,
  TextStyle
} from 'react-native';
import { colors } from '@/src/styles/colors';
import { mergeRefs } from '../utils';

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

const deviceHeight = Dimensions.get('screen').height;

const InputField = forwardRef(
  (
    {
      disabled = false,
      error,
      touched,
      containerStyle,
      inputStyle,
      ...props
    }: InputFieldProps,
    ref?: ForwardedRef<TextInput>
  ) => {
    const innerRef = useRef<TextInput | null>(null);

    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    return (
      <Pressable onPress={handlePressInput}>
        <View
          style={[
            !containerStyle && styles.container,
            containerStyle,
            disabled && styles.disabled,
            touched && Boolean(error) && styles.inputError
          ]}
        >
          <TextInput
            ref={ref ? mergeRefs(innerRef, ref) : innerRef}
            editable={!disabled}
            placeholderTextColor={colors.GRAY_500}
            style={[
              !inputStyle && styles.input,
              inputStyle,
              disabled && styles.disabled
            ]}
            autoCapitalize='none'
            spellCheck={false}
            autoCorrect={false}
            {...props}
          />
          {touched && Boolean(error) && (
            <Text style={styles.error}>{error}</Text>
          )}
        </View>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    padding: deviceHeight > 700 ? 15 : 10
  },
  input: {
    fontSize: 16,
    fontFamily: 'Gmarket-Sans-Medium',
    color: colors.BLACK,
    padding: 0
  },
  disabled: {
    backgroundColor: colors.GRAY_200,
    color: colors.GRAY_700
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.RED_300
  },
  error: {
    color: colors.RED_500,
    fontSize: 12,
    fontFamily: 'Gmarket-Sans-Medium',
    paddingTop: 5
  }
});

export default InputField;
