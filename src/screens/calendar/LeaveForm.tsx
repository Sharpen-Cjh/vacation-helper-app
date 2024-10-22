import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Switch,
  ScrollView,
  Pressable
} from 'react-native';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { DateData } from 'react-native-calendars';

import ButtonRow from '@/src/components/\bButtonRow';
import DatePickerOption from '@/src/components/DatePickerOption';
import { commonStyles } from '@/src/styles/commonStyles';
import { VacationInfo } from '@/src/types/vacationInfo';
import useVacation from '@/src/hooks/queries/useVacation';
import formatDate from '@/src/utils/date';
import useForm from '@/src/hooks/useForm';
import { validateLeaveForm } from '@/src/utils';

type LeaveFormProps = {
  selectedVacation: VacationInfo | null;
  selectedDate: DateData | null;
  closeModal: () => void;
};

function LeaveForm({ selectedVacation, closeModal }: LeaveFormProps) {
  const [isStartVisible, setIsStartVisible] = useState<boolean>(false);
  const [isEndVisible, setIsEndVisible] = useState<boolean>(false);
  const [isGroupShared, setIsGroupShared] = useState<boolean>(false);

  const annualLeaveRef = useRef<TextInput>(null);
  const underOneYearAnnualLeaveRef = useRef<TextInput>(null);

  const { postVacationInfoMutation } = useVacation();

  const { values, errors, getTextInputProps, touched } = useForm({
    initialValue: {
      title: selectedVacation?.title || '',
      start: formatDate(new Date()),
      end: formatDate(new Date()),
      annualLeaveDays: selectedVacation?.annualLeaveDays || 0,
      underOneYearAnnualLeaveDays:
        selectedVacation?.underOneYearAnnualLeaveDays || 0
    },
    validate: validateLeaveForm
  });

  const handleChangeStartDate = (
    event: DateTimePickerEvent,
    pickedDate?: Date
  ) => {
    setIsStartVisible(false);
    if (event.type === 'set' && pickedDate) {
      getTextInputProps('start').onChangeText(formatDate(pickedDate));
    }
  };

  const handleChangeEndDate = (
    event: DateTimePickerEvent,
    pickedDate?: Date
  ) => {
    setIsEndVisible(false);

    if (event.type === 'set' && pickedDate) {
      getTextInputProps('end').onChangeText(formatDate(pickedDate));
    }
  };

  const handleSaveButton = () => {
    const vacationInfo: VacationInfo = {
      title: values.title,
      start: values.start,
      end: values.end,
      annualLeaveDays: values.annualLeaveDays,
      underOneYearAnnualLeaveDays: values.underOneYearAnnualLeaveDays,
      shareWithGroup: isGroupShared
    };

    postVacationInfoMutation.mutate(vacationInfo);
  };

  return (
    <ScrollView>
      <View style={styles.leaveForm}>
        <View>
          <Text style={[commonStyles.textHeader, { marginBottom: 10 }]}>
            메모
          </Text>
          <TextInput
            style={styles.memoInput}
            placeholder='메모를 입력하세요'
            value={String(getTextInputProps('title').value)}
            onChangeText={getTextInputProps('title').onChangeText}
            onBlur={getTextInputProps('title').onBlur}
          />
          {touched.title && (
            <Text style={commonStyles.errorText}>{errors.title}</Text>
          )}
        </View>
        <View>
          <View style={styles.sectionContainer}>
            <Text style={commonStyles.textHeader}>시작일</Text>
            <Text
              style={styles.modalText}
              onPress={() => setIsStartVisible(true)}
            >
              {values.start}
            </Text>
          </View>
          {touched.start && (
            <Text style={commonStyles.errorText}>{errors.start}</Text>
          )}
        </View>
        <View style={styles.sectionContainer}>
          <Text style={commonStyles.textHeader}>종료일</Text>
          <Text style={styles.modalText} onPress={() => setIsEndVisible(true)}>
            {String(getTextInputProps('end').value)}
          </Text>
        </View>
        <Pressable
          onPress={() => annualLeaveRef.current?.focus()}
          style={{ flex: 1 }}
        >
          <View style={[commonStyles.row, { gap: 30 }]}>
            <Text style={commonStyles.textHeader}>연차 잔여 15일</Text>
            <TextInput
              ref={annualLeaveRef}
              style={styles.modalText}
              value={String(getTextInputProps('annualLeaveDays').value)}
              onChangeText={getTextInputProps('annualLeaveDays').onChangeText}
              onBlur={getTextInputProps('annualLeaveDays').onBlur}
              keyboardType='numeric'
            />
          </View>
          {touched.annualLeaveDays && (
            <Text style={commonStyles.errorText}>{errors.annualLeaveDays}</Text>
          )}
        </Pressable>
        <Pressable
          onPress={() => underOneYearAnnualLeaveRef.current?.focus()}
          style={{ flex: 1 }}
        >
          <View style={[commonStyles.row, { gap: 30 }]}>
            <Text style={commonStyles.textHeader}>1년 미만 연차 잔여 15일</Text>
            <TextInput
              ref={underOneYearAnnualLeaveRef}
              style={styles.modalText}
              value={String(
                getTextInputProps('underOneYearAnnualLeaveDays').value
              )}
              onChangeText={
                getTextInputProps('underOneYearAnnualLeaveDays').onChangeText
              }
              onBlur={getTextInputProps('underOneYearAnnualLeaveDays').onBlur}
              keyboardType='numeric'
            />
          </View>
          {touched.underOneYearAnnualLeaveDays && (
            <Text style={commonStyles.errorText}>
              {errors.underOneYearAnnualLeaveDays}
            </Text>
          )}
        </Pressable>
        <View style={styles.sectionContainer}>
          <Text style={commonStyles.textHeader}>그룹 공유</Text>
          <Switch
            onChange={() => {
              setIsGroupShared(!isGroupShared);
            }}
            value={isGroupShared}
          />
        </View>
        <ButtonRow
          primaryTitle='저장'
          secondaryTitle='취소'
          onPrimaryPress={handleSaveButton}
          onSecondaryPress={closeModal}
        />

        {isStartVisible && (
          <DatePickerOption
            date={new Date(values.start)}
            onChangeDate={handleChangeStartDate}
          />
        )}
        {isEndVisible && (
          <DatePickerOption
            date={new Date(values.end)}
            onChangeDate={handleChangeEndDate}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  leaveForm: {
    padding: 20,
    backgroundColor: '#ffffff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    margin: 10,
    gap: 50
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30
  },
  memoInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#f7f7f7',
    height: 120,
    textAlignVertical: 'top',
    fontSize: 14,
    fontFamily: 'Gmarket-Sans-Medium'
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Gmarket-Sans-Medium'
  }
});

export default LeaveForm;
