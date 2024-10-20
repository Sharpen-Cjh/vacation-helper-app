import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import ButtonRow from '@/src/components/\bButtonRow';
import BottomBorderedInput from '@/src/components/BottomBorderedInput';
import { commonStyles } from '@/src/styles/commonStyles';

import { useUpdateAnnualLeave } from '@/src/hooks/queries/useAccount';
import useAuth from '@/src/hooks/queries/useAuth';
import DatePickerOption from '@/src/components/DatePickerOption';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface LeaveDaysFormProps {
  closeModal: () => void;
}

function LeaveDaysForm({ closeModal }: LeaveDaysFormProps) {
  const updateAnnualLeaveMutation = useUpdateAnnualLeave();
  const { getProfileQuery } = useAuth();

  // const [date, setDate] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);
  const [isPicked, setIsPicked] = useState(false);
  const [annualLeaveInfo, setAnnualLeaveInfo] = useState<{
    updatedAvailableAnnualLeave: number;
    updatedAvailableUnderOneYearLeaves: number;
    dateOfJoining: Date;
    newRecruitsMode: boolean;
  }>({
    updatedAvailableAnnualLeave: 0,
    updatedAvailableUnderOneYearLeaves: 0,
    dateOfJoining: new Date(),
    newRecruitsMode: false
  });

  const handleChangeDate = (_: DateTimePickerEvent, pickedDate?: Date) => {
    setAnnualLeaveInfo({
      ...annualLeaveInfo,
      dateOfJoining: pickedDate || new Date()
    });
    setIsVisible(false);
  };

  useEffect(() => {
    if (getProfileQuery.isSuccess && getProfileQuery.data) {
      const data = getProfileQuery.data as {
        availableAnnualLeaves: number;
        availableUnderOneYearLeaves: number;
        dateOfJoining: Date;
        newRecruitsMode: boolean;
      };

      const {
        availableAnnualLeaves,
        availableUnderOneYearLeaves,
        dateOfJoining,
        newRecruitsMode
      } = data;

      setAnnualLeaveInfo({
        updatedAvailableAnnualLeave: availableAnnualLeaves,
        updatedAvailableUnderOneYearLeaves: availableUnderOneYearLeaves,
        dateOfJoining,
        newRecruitsMode
      });
    }
  }, []);

  const handlePressSaveButton = () => {
    updateAnnualLeaveMutation.mutate(annualLeaveInfo);
    closeModal();
  };

  return (
    <View style={{ gap: 20 }}>
      <Text style={commonStyles.textHeader}> 잔여 휴가 일수 변경</Text>
      <View style={[commonStyles.row, { gap: 30 }]}>
        <Text style={commonStyles.textBody}>신입사원 모드</Text>
        <Switch
          onChange={() => {
            setAnnualLeaveInfo({
              ...annualLeaveInfo,
              newRecruitsMode: !annualLeaveInfo.newRecruitsMode
            });
          }}
        />
      </View>
      <BottomBorderedInput
        label='입사 날짜'
        placeholder='날짜를 입력하세요'
        value={annualLeaveInfo.dateOfJoining.toDateString()}
        onPress={() => {
          setIsVisible(true);
        }}
      />
      <BottomBorderedInput
        label='1년미만 휴가 잔여 일수'
        placeholder='1년 미만 잔여 휴가 일수를 입력하세요'
        onChangeText={(text) => {
          setAnnualLeaveInfo({
            ...annualLeaveInfo,
            updatedAvailableUnderOneYearLeaves: Number(text)
          });
        }}
      />
      <BottomBorderedInput
        label='휴가 잔여 일수'
        placeholder='잔여 휴가 일수를 입력하세요'
        onChangeText={(text) => {
          setAnnualLeaveInfo({
            ...annualLeaveInfo,
            updatedAvailableAnnualLeave: Number(text)
          });
        }}
      />

      <ButtonRow
        primaryTitle='저장'
        secondaryTitle='취소'
        onPrimaryPress={handlePressSaveButton}
        onSecondaryPress={closeModal}
      />
      {isVisible && (
        <DatePickerOption
          date={annualLeaveInfo.dateOfJoining}
          onChangeDate={handleChangeDate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

export default LeaveDaysForm;
