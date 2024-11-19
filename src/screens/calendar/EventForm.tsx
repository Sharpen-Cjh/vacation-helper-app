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

import ButtonRow from '@/src/components/\bButtonRow';
import DatePickerOption from '@/src/components/DatePickerOption';
import { commonStyles } from '@/src/styles/commonStyles';
import { VacationInfo } from '@/src/types/vacationInfo';
import useVacation from '@/src/hooks/queries/useVacation';
import { formatDate } from '@/src/utils';
import useForm from '@/src/hooks/useForm';
import { validateEventForm } from '@/src/utils';

type LeaveFormProps = {
  selectedVacation: VacationInfo | null;
  closeModal: () => void;
};

function EventForm({ selectedVacation, closeModal }: LeaveFormProps) {
  const [isStartVisible, setIsStartVisible] = useState<boolean>(false);
  const [isEndVisible, setIsEndVisible] = useState<boolean>(false);
  const [isGroupShared, setIsGroupShared] = useState<boolean>(false);

  const annualLeaveRef = useRef<TextInput>(null);
  const underOneYearAnnualLeaveRef = useRef<TextInput>(null);

  const { postVacationInfoMutation } = useVacation();

  const {
    title = '',
    start,
    end,
    annualLeaveDays = 0,
    underOneYearAnnualLeaveDays = 0
  } = selectedVacation || {};

  const { values, errors, getTextInputProps, touched } = useForm({
    initialValue: {
      title,
      start: start || formatDate(new Date()),
      end: end || start || formatDate(new Date()),
      annualLeaveDays,
      underOneYearAnnualLeaveDays
    },
    validate: validateEventForm
  });
  const isSaveDisabled = Object.values(errors).some((error) => error !== '');

  const handleDateChange =
    (field: 'start' | 'end') =>
    (event: DateTimePickerEvent, pickedDate?: Date) => {
      if (event.type === 'set' && pickedDate) {
        getTextInputProps(field).onChangeText(formatDate(pickedDate));
      }
      field === 'start' ? setIsStartVisible(false) : setIsEndVisible(false);
    };

  const handleSaveButton = () => {
    const vacationInfo: Omit<VacationInfo, 'id'> = {
      title: values.title,
      start: values.start,
      end: values.end,
      annualLeaveDays: values.annualLeaveDays,
      underOneYearAnnualLeaveDays: values.underOneYearAnnualLeaveDays,
      shareWithGroup: isGroupShared
    };

    postVacationInfoMutation.mutate(vacationInfo);
    closeModal();
  };

  return (
    <ScrollView>
      <View style={styles.leaveForm}>
        <View>
          <Text style={[commonStyles.textBody, { marginBottom: 10 }]}>
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
            <Text style={commonStyles.textBody}>시작일</Text>
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
          <Text style={commonStyles.textBody}>종료일</Text>
          <Text style={styles.modalText} onPress={() => setIsEndVisible(true)}>
            {String(getTextInputProps('end').value)}
          </Text>
        </View>
        <Pressable
          onPress={() => annualLeaveRef.current?.focus()}
          style={{ flex: 1 }}
        >
          <View style={[commonStyles.row, { gap: 30 }]}>
            <Text style={commonStyles.textBody}>연차 잔여 15일</Text>
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
            <Text style={commonStyles.textBody}>1년 미만 연차 잔여 15일</Text>
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
          <Text style={commonStyles.textBody}>그룹 공유</Text>
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
          primaryButtonDisabled={isSaveDisabled}
        />

        {isStartVisible && (
          <DatePickerOption
            date={new Date(values.start)}
            onChangeDate={handleDateChange('start')}
          />
        )}
        {isEndVisible && (
          <DatePickerOption
            date={new Date(values.end)}
            onChangeDate={handleDateChange('end')}
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

export default EventForm;
