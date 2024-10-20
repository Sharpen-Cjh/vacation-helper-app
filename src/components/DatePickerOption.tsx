import React from 'react';
import { Platform } from 'react-native';
import { colors } from '@/src/styles/colors';
import DateTimePicker, {
  DateTimePickerEvent
} from '@react-native-community/datetimepicker';

interface DatePickerOptionProps {
  date: Date;
  onChangeDate: (event: DateTimePickerEvent, date?: Date) => void;
}

function DatePickerOption({ date, onChangeDate }: DatePickerOptionProps) {
  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      onChangeDate(event, selectedDate);
    }
  };

  return (
    <>
      {Platform.OS === 'ios' ? (
        <DateTimePicker
          display='spinner'
          value={date}
          mode='date'
          textColor={colors.BLACK}
          onChange={handleChange}
        />
      ) : (
        <DateTimePicker
          display='default'
          value={date}
          mode='date'
          onChange={handleChange}
        />
      )}
    </>
  );
}

export default DatePickerOption;
