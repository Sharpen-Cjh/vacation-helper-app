import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import ButtonRow from '@/src/components/\bButtonRow';
import { commonStyles } from '@/src/styles/commonStyles';

import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import DatePickerOption from '@/src/components/DatePickerOption';
import { useUpdateAnnualLeave } from '@/src/hooks/queries/useAccount';
import useAuth from '@/src/hooks/queries/useAuth';
import useForm from '@/src/hooks/useForm';
import {
  formatDate,
  updateAvailableUnderOneYearLeaves,
  validateAnnualLeaveForm
} from '@/src/utils';
import InputField from '@/src/components/InputField';
import { colors } from '@/src/styles/colors';

interface LeaveDaysFormProps {
  closeModal: () => void;
}

function AnnualLeaveForm({ closeModal }: LeaveDaysFormProps) {
  const updateAnnualLeaveMutation = useUpdateAnnualLeave();
  const { getProfileQuery } = useAuth();
  const { values, getTextInputProps, setValues, errors } = useForm({
    initialValue: {
      updatedAvailableAnnualLeave: 0,
      updatedAvailableUnderOneYearLeaves: 0,
      dateOfJoining: formatDate(new Date()),
      newRecruitsMode: false
    },
    validate: validateAnnualLeaveForm
  });

  const [isJoiningDatePickerVisible, setIsJoiningDatePickerVisible] =
    useState<boolean>(false);

  const handlePressDatePicker = () => {
    setIsJoiningDatePickerVisible(true);
  };

  const handleChangeDateOfJoining = (
    event: DateTimePickerEvent,
    pickedDate?: Date
  ) => {
    if (event.type === 'set' && pickedDate) {
      getTextInputProps('dateOfJoining').onChangeText(formatDate(pickedDate));
    }

    setIsJoiningDatePickerVisible(false);
  };

  const handlePressSaveButton = () => {
    updateAnnualLeaveMutation.mutate(values);
    closeModal();
  };

  const handleChangeNewRecruitsMode = () => {
    setValues((prevValues) => {
      const newRecruitsMode = !prevValues.newRecruitsMode;
      // 신입사원 모드가 켜졌을 때 입사 날짜를 오늘로 변경
      const dateOfJoining = newRecruitsMode
        ? formatDate(new Date())
        : prevValues.dateOfJoining;

      return {
        ...prevValues,
        newRecruitsMode,
        dateOfJoining
      };
    });
  };
  useEffect(() => {
    if (getProfileQuery.isSuccess && getProfileQuery.data) {
      const data = getProfileQuery.data as {
        availableAnnualLeaves: number;
        availableUnderOneYearLeaves: number;
        dateOfJoining: string;
        newRecruitsMode: boolean;
      };

      const {
        availableAnnualLeaves,
        availableUnderOneYearLeaves,
        dateOfJoining,
        newRecruitsMode
      } = data;

      const utcDate = new Date(dateOfJoining);
      const localDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);

      setValues({
        updatedAvailableAnnualLeave: availableAnnualLeaves,
        updatedAvailableUnderOneYearLeaves: availableUnderOneYearLeaves,
        dateOfJoining: formatDate(localDate),
        newRecruitsMode
      });
    }
  }, []);

  useEffect(() => {
    setValues((prevValues) => ({
      ...prevValues,
      updatedAvailableUnderOneYearLeaves: updateAvailableUnderOneYearLeaves(
        new Date(values.dateOfJoining)
      )
    }));
  }, [values.dateOfJoining]);

  return (
    <View style={{ gap: 20 }}>
      <Text style={[commonStyles.textBody, { textAlign: 'center' }]}>
        잔여 연차 변경
      </Text>
      <View style={[commonStyles.row, { gap: 30 }]}>
        <Text style={commonStyles.textBody}>신입사원 모드</Text>
        <Switch
          onChange={handleChangeNewRecruitsMode}
          value={values.newRecruitsMode}
        />
      </View>

      {values.newRecruitsMode && (
        <View style={{ gap: 20 }}>
          <Pressable onPress={handlePressDatePicker} style={{ gap: 20 }}>
            <Text style={commonStyles.textBody}>입사 날짜</Text>
            <Text>{values.dateOfJoining}</Text>
            {errors.dateOfJoining && (
              <Text
                style={{
                  color: colors.RED_500,
                  fontSize: 12,
                  paddingTop: 5
                }}
              >
                {errors.dateOfJoining}
              </Text>
            )}
          </Pressable>
          <View style={{ gap: 20 }}>
            <Text style={commonStyles.textBody}>
              1년 미만 휴가 잔여 일수(신입 사원)
            </Text>
            <InputField
              containerStyle={{
                borderBottomWidth: 1,
                borderBottomColor: '#ccc'
              }}
              inputStyle={commonStyles.textBody}
              {...getTextInputProps('updatedAvailableUnderOneYearLeaves')}
              readOnly
            />
          </View>
        </View>
      )}
      <Text style={commonStyles.textBody}>휴가 잔여 일수</Text>
      <InputField
        containerStyle={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }}
        inputStyle={commonStyles.textBody}
        placeholder='휴가 잔여 일수를 입력하세요'
        {...getTextInputProps('updatedAvailableAnnualLeave')}
        keyboardType='numeric'
      />

      <ButtonRow
        primaryTitle='저장'
        secondaryTitle='취소'
        onPrimaryPress={handlePressSaveButton}
        onSecondaryPress={closeModal}
        primaryButtonDisabled={Object.values(errors).some((error) => !!error)}
      />
      {isJoiningDatePickerVisible && (
        <DatePickerOption
          date={new Date(values.dateOfJoining)}
          onChangeDate={handleChangeDateOfJoining}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

export default AnnualLeaveForm;
