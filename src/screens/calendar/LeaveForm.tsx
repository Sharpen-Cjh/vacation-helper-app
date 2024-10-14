import ButtonRow from '@/src/components/\bButtonRow';
import BottomBorderedInput from '@/src/components/BottomBorderedInput';
import { colors } from '@/src/styles/colors';
import { commonStyles } from '@/src/styles/commonStyles';
import { VacationInfo } from '@/src/types/vacationInfo';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Switch } from 'react-native';
import { DateData } from 'react-native-calendars';

type LeaveFormProps = {
  selectedVacation: VacationInfo | null;
  selectedDate: DateData | null;
  closeModal: () => void;
};

function LeaveForm({
  selectedVacation,
  selectedDate,
  closeModal
}: LeaveFormProps) {
  const [memo, setMemo] = useState(selectedVacation?.title || '');
  const [annualLeaveDays, setAnnualLeaveDays] = useState(
    selectedVacation?.annualLeaveDays || 0
  );
  const [underOneYearAnnualLeaveDays, setUnderOneYearAnnualLeaveDays] =
    useState(selectedVacation?.underOneYearAnnualLeaveDays || 0);

  return (
    <View style={styles.leaveForm}>
      <Text style={commonStyles.textHeader}>{selectedDate?.dateString}</Text>
      <View>
        <Text style={styles.modalText}>메모</Text>
        <TextInput
          style={styles.memoInput}
          placeholder='메모를 입력하세요'
          value={memo}
          onChangeText={(text) => setMemo(text)}
        />
      </View>
      <View>
        <Text style={styles.modalText}>연차 잔여 15일</Text>
        <BottomBorderedInput
          placeholder='사용할 연차 일수를 입력해주세요'
          value={annualLeaveDays.toString()}
          onChangeText={(text) => setAnnualLeaveDays(parseFloat(text) || 0)}
        />
      </View>
      <View>
        <Text style={styles.modalText}>1년 미만 연차 잔여 15일</Text>
        <BottomBorderedInput
          placeholder='사용할 1년 미만 연차를 입력해주세요'
          value={underOneYearAnnualLeaveDays.toString()}
          onChangeText={(text) =>
            setUnderOneYearAnnualLeaveDays(parseFloat(text) || 0)
          }
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.modalText}>그룹 공유</Text>
        <Switch value={true} />
      </View>
      <ButtonRow
        primaryTitle='저장'
        secondaryTitle='취소'
        onSecondaryPress={closeModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  leaveForm: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    justifyContent: 'space-evenly',
    margin: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  memoInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 12, // 모서리를 더 둥글게
    backgroundColor: '#f7f7f7', // 약간 더 밝은 배경색
    height: 120, // 텍스트 입력 필드 높이 증가
    fontSize: 14,
    textAlignVertical: 'top'
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8 // 텍스트와 입력 필드 사이 여백 추가
  }
});

export default LeaveForm;
