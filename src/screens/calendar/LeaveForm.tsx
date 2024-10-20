import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Switch,
  ScrollView,
  Dimensions
} from 'react-native';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { DateData } from 'react-native-calendars';

import ButtonRow from '@/src/components/\bButtonRow';
import DatePickerOption from '@/src/components/DatePickerOption';
import { commonStyles } from '@/src/styles/commonStyles';
import { VacationInfo } from '@/src/types/vacationInfo';

type LeaveFormProps = {
  selectedVacation: VacationInfo | null;
  selectedDate: DateData | null;
  closeModal: () => void;
};

function LeaveForm({ selectedVacation, closeModal }: LeaveFormProps) {
  const [memo, setMemo] = useState(selectedVacation?.title || '');
  const [annualLeaveDays, setAnnualLeaveDays] = useState(
    selectedVacation?.annualLeaveDays || 0
  );
  const [underOneYearAnnualLeaveDays, setUnderOneYearAnnualLeaveDays] =
    useState(selectedVacation?.underOneYearAnnualLeaveDays || 0);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [isStartVisible, setIsStartVisible] = useState<boolean>(false);
  const [isEndVisible, setIsEndVisible] = useState<boolean>(false);
  const [isGroupShared, setIsGroupShared] = useState<boolean>(false);

  const handleChangeStartDate = (
    event: DateTimePickerEvent,
    pickedDate?: Date
  ) => {
    setIsStartVisible(false);

    if (event.type === 'set') {
      if (pickedDate) {
        setStartDate(pickedDate);
      }
    }
  };

  const handleChangeEndDate = (
    event: DateTimePickerEvent,
    pickedDate?: Date
  ) => {
    setIsEndVisible(false);

    if (event.type === 'set') {
      if (pickedDate) {
        setEndDate(pickedDate);
      }
    }
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
            value={memo}
            onChangeText={(text) => setMemo(text)}
          />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={commonStyles.textHeader}>시작일</Text>
          <Text
            style={styles.modalText}
            onPress={() => setIsStartVisible(true)}
          >
            {startDate.toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={commonStyles.textHeader}>종료일</Text>
          <Text style={styles.modalText} onPress={() => setIsEndVisible(true)}>
            {endDate.toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={commonStyles.textHeader}>연차 잔여 15일</Text>
          <TextInput
            style={styles.modalText}
            value={annualLeaveDays.toString()}
            onChangeText={(text) => setAnnualLeaveDays(parseFloat(text) || 0)}
            keyboardType='numeric'
          />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={commonStyles.textHeader}>1년 미만 연차 잔여 15일</Text>
          <TextInput
            style={styles.modalText}
            value={underOneYearAnnualLeaveDays.toString()}
            onChangeText={(text) =>
              setUnderOneYearAnnualLeaveDays(parseFloat(text) || 0)
            }
            keyboardType='numeric'
          />
        </View>
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
          onSecondaryPress={closeModal}
        />

        {isStartVisible && (
          <DatePickerOption
            date={startDate}
            onChangeDate={handleChangeStartDate}
          />
        )}
        {isEndVisible && (
          <DatePickerOption date={endDate} onChangeDate={handleChangeEndDate} />
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
    width: '100%',
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
