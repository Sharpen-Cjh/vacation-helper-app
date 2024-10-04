import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity
} from 'react-native';
import { DateData } from 'react-native-calendars';

type LeaveFormProps = {
  selectedDate: DateData | null;
  closeModal: () => void;
};

function LeaveForm({ selectedDate, closeModal }: LeaveFormProps) {
  const [vacationInfo, setVacationInfo] = useState({
    start: new Date(),
    end: new Date(),
    title: '',
    shareWithGroup: false
  });

  const [underOneYearAnnualLeaveDays, setUnderOneYearAnnualLeaveDays] =
    useState(0);
  const [
    initialAvailableUnderOneYearLeaves,
    setInitialAvailableUnderOneYearLeaves
  ] = useState(10);
  const [annualLeaveDays, setAnnualLeaveDays] = useState(0);
  const [initialAvailableAnnualLeaves, setInitialAvailableAnnualLeaves] =
    useState(20);
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);

  const handleDateChange =
    (field: 'start' | 'end') => (event: any, selectedDate?: Date) => {
      const currentDate = selectedDate || vacationInfo[field];
      setVacationInfo({ ...vacationInfo, [field]: currentDate });
    };

  const handleDaysChange = (value: string) => {
    setAnnualLeaveDays(parseFloat(value));
  };

  const handleUnderOneYearDaysChange = (value: string) => {
    setUnderOneYearAnnualLeaveDays(parseFloat(value));
  };

  const handleInputChange = (value: string) => {
    setVacationInfo({ ...vacationInfo, title: value });
  };

  const handleSubmit = () => {
    // Form submission logic
  };

  const confirmDelete = () => {
    // Delete logic
  };

  return (
    <View style={styles.leaveForm}>
      <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      <Text style={styles.modalText}>{selectedDate?.dateString}</Text>
      <Text style={styles.modalText}>메모</Text>
      <TextInput style={styles.memoInput} placeholder='메모를 입력하세요' />
      <Text style={styles.modalText}>연차 잔여 15일</Text>
      <TextInput placeholder='연차 입력' style={{ padding: 10 }}></TextInput>
      <Text style={styles.modalText}>1년 미만 연차 잔여 15일</Text>
      <TextInput
        placeholder='1년 미만 연차 입력'
        style={{ padding: 10 }}
      ></TextInput>
      <View style={styles.row}>
        <Text>그룹 공유</Text>
        <Switch value={true} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  leaveForm: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // 배경색 추가
    borderRadius: 10, // 부드러운 테두리
    shadowColor: '#000', // 그림자
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    justifyContent: 'space-evenly' // 요소 간격 균등하게
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between' // 요소 간격 균등하게
  },
  column: {
    flex: 1,
    marginRight: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8, // 부드러운 테두리
    backgroundColor: '#f9f9f9', // 입력창 배경색
    marginBottom: 12,
    fontSize: 16 // 폰트 크기 조정
  },
  memoInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    height: 100, // 메모 입력창 높이
    marginBottom: 20,
    fontSize: 16,
    textAlignVertical: 'top' // 텍스트가 위에서부터 입력되도록
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20, // 크기 조정
    fontWeight: 'bold',
    color: '#333' // 텍스트 색상
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
    padding: 8
  },
  closeButtonText: {
    fontSize: 18, // 크기 조정
    fontWeight: 'bold',
    color: 'palevioletred' // 닫기 버튼 텍스트 색상
  }
});

export default LeaveForm;
