import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Switch,
  ScrollView,
  Pressable,
  Modal
} from 'react-native';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import ButtonRow from '@/src/components/\bButtonRow';
import DatePickerOption from '@/src/components/DatePickerOption';
import { commonStyles } from '@/src/styles/commonStyles';
import { VacationInfo } from '@/src/types/vacationInfo';
import useVacation from '@/src/hooks/queries/useVacation';
import useForm from '@/src/hooks/useForm';
import { formatDate, validateEventForm } from '@/src/utils';
import { UserProfile } from '@/src/types/auth';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/styles/colors';
import ConfirmActionModal from '../modals/GroupInfo/ConfirmActionModal';

type EventFormProps = {
  selectedVacation: VacationInfo | null;
  closeModal: () => void;
  availableAnnualLeavesData: Partial<UserProfile>;
  refetchVacations: () => void;
};

function EventForm({
  selectedVacation,
  closeModal,
  availableAnnualLeavesData,
  refetchVacations
}: EventFormProps) {
  const [isStartVisible, setIsStartVisible] = useState<boolean>(false);
  const [isEndVisible, setIsEndVisible] = useState<boolean>(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const annualLeaveRef = useRef<TextInput>(null);
  const underOneYearAnnualLeaveRef = useRef<TextInput>(null);

  const {
    postVacationInfoMutation,
    updateVacationInfoMutation,
    deleteVacationInfoMutation
  } = useVacation(null);

  const {
    title = '',
    start,
    end,
    annualLeaveDays = 0,
    underOneYearAnnualLeaveDays = 0,
    shareWithGroup = false
  } = selectedVacation || {};

  const { values, errors, getTextInputProps, getSwitchProps, touched } =
    useForm({
      initialValue: {
        title,
        start: start || formatDate(new Date()),
        end: end || start || formatDate(new Date()),
        annualLeaveDays,
        underOneYearAnnualLeaveDays,
        shareWithGroup
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
      shareWithGroup: values.shareWithGroup
    };

    if (!selectedVacation) {
      postVacationInfoMutation.mutate(vacationInfo, {
        onSuccess: () => {
          refetchVacations();
          closeModal();
        }
      });
    } else {
      const vacationInfoWithID = { ...vacationInfo, id: selectedVacation.id };
      updateVacationInfoMutation.mutate(vacationInfoWithID, {
        onSuccess: () => {
          refetchVacations();
          closeModal();
        }
      });
    }
  };

  const deleteEvent = () => {
    if (selectedVacation) {
      deleteVacationInfoMutation.mutate(selectedVacation.id, {
        onSuccess: () => {
          refetchVacations();
          closeModal();
        }
      });
    }
  };

  const closeConfirmModal = () => {
    setConfirmModalVisible(false);
  };

  const handleDeleteButton = () => {
    setConfirmModalVisible(true);
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
            multiline={true}
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
            <Text style={commonStyles.textBody}>
              연차 잔여 {availableAnnualLeavesData.availableAnnualLeaves}일
            </Text>
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
        {typeof availableAnnualLeavesData.availableUnderOneYearLeaves ===
          'number' && (
          <Pressable
            onPress={() => underOneYearAnnualLeaveRef.current?.focus()}
            style={{ flex: 1 }}
          >
            <View style={[commonStyles.row, { gap: 30 }]}>
              <Text style={commonStyles.textBody}>
                1년 미만 연차 잔여{' '}
                {availableAnnualLeavesData.availableUnderOneYearLeaves}일
              </Text>
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
        )}

        <View style={styles.sectionContainer}>
          <Text style={commonStyles.textBody}>그룹 공유</Text>
          <Switch {...getSwitchProps('shareWithGroup')} />
        </View>
        <View style={[commonStyles.row, { justifyContent: 'space-between' }]}>
          <Pressable onPress={handleDeleteButton}>
            <Ionicons name='trash' size={30} color={colors.PRIMARY} />
          </Pressable>
          <ButtonRow
            primaryTitle='저장'
            secondaryTitle='취소'
            onPrimaryPress={handleSaveButton}
            onSecondaryPress={closeModal}
            primaryButtonDisabled={isSaveDisabled}
          />
        </View>

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
      <Modal
        animationType='slide'
        transparent={true}
        visible={confirmModalVisible}
        onRequestClose={closeModal}
      >
        <View style={commonStyles.modalOverlaySmall}>
          <View style={commonStyles.modalContainerSmall}>
            <ConfirmActionModal
              closeModal={closeConfirmModal}
              onConfirm={deleteEvent}
              message='정말 삭제 하시겠습니까?'
              confirmText='삭제'
              cancelText='취소'
            />
          </View>
        </View>
      </Modal>
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
