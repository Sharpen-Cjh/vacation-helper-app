import React from 'react';
import { Modal, SafeAreaView, StyleSheet, View } from 'react-native';
import { colors } from '@/src/styles/colors';
import DateTimePicker, {
  DateTimePickerEvent
} from '@react-native-community/datetimepicker';

interface DatePickerOptionProps {
  isVisible: boolean;
  date: Date;
  onChangeDate: (_: DateTimePickerEvent, date?: Date) => void;
  onConfirmDate: () => void;
}

function DatePickerOption({
  isVisible,
  date,
  onChangeDate,
  onConfirmDate
}: DatePickerOptionProps) {
  return (
    <Modal visible={isVisible} transparent animationType='slide'>
      <SafeAreaView style={styles.optionBackground}>
        <View style={styles.optionContainer}>
          <DateTimePicker
            value={date}
            mode='date'
            textColor={colors.BLACK}
            onChange={onChangeDate}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  optionBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0 / 0.5)',
    justifyContent: 'flex-end'
  },
  optionContainer: {
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: colors.GRAY_200,
    overflow: 'hidden'
  },
  optionButton: {
    padding: 10,
    alignItems: 'center'
  }
});

export default DatePickerOption;
