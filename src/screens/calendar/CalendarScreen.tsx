import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  Pressable,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import LeaveForm from './LeaveForm';

import useVacation from '@/src/hooks/queries/useVacation';
import type { VacationInfo } from '@/src/types/vacationInfo';
import { colors } from '@/src/styles/colors';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import GroupInfo from '../modals/GroupInfo/GroupInfo';
import AccountForm from '../modals/AccountForm/AccountForm';
import { processFontFamily } from 'expo-font';

interface CustomMarkingProps extends MarkingProps {
  id?: number;
}

type CustomMarkedDates = {
  [key: string]: CustomMarkingProps;
};

LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월'
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일'
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘'
};

LocaleConfig.defaultLocale = 'ko';

const { height } = Dimensions.get('window');
const formatVacationDataForMarkedDates = (vacations: VacationInfo[]) => {
  const markedDates: CustomMarkedDates = {};

  vacations.forEach((vacation) => {
    const startDate = vacation.start;
    const endDate = vacation.end;

    const color = vacation.shareWithGroup ? colors.PRIMARY : 'gray';

    markedDates[startDate] = {
      marked: true,
      selectedColor: color,
      dotColor: color,
      id: vacation.id
    };

    markedDates[endDate] = {
      marked: true,
      selectedColor: color,
      dotColor: color,
      id: vacation.id
    };
  });

  return markedDates;
};

function CalendarScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<
    'group' | 'account' | 'vacation' | 'leave' | null
  >(null);
  const [selectedDate, setSelectedDate] = useState<DateData | null>(null);
  const [selectedVacation, setSelectedVacation] = useState<VacationInfo | null>(
    null
  );

  const { getAllVacationQuery } = useVacation();

  const markedDates: CustomMarkedDates = getAllVacationQuery.isSuccess
    ? formatVacationDataForMarkedDates(
        getAllVacationQuery.data as VacationInfo[]
      )
    : {};
  const handleDayPress = (day: DateData) => {
    const selectedDayInfo = markedDates[day.dateString];

    if (selectedDayInfo && selectedDayInfo.id) {
      const vacationInfo = getAllVacationQuery.data.find(
        (vacation: VacationInfo) => vacation.id === selectedDayInfo.id
      );

      setSelectedVacation(vacationInfo || null);
      setSelectedDate(day);
      openModal('leave');
    } else {
      setSelectedVacation(null);
      setSelectedDate(day);
      openModal('leave');
    }
  };
  const openModal = (content: 'group' | 'account' | 'vacation' | 'leave') => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderModalContent = () => {
    switch (modalContent) {
      case 'group':
        return <GroupInfo />;
      case 'account':
        return <AccountForm />;
      case 'vacation':
        return <Text>휴가목록</Text>;
      case 'leave':
        return (
          <LeaveForm
            selectedVacation={selectedVacation}
            selectedDate={selectedDate}
            closeModal={closeModal}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        renderHeader={(date: string) => {
          const parsedDate = new Date(date);
          const monthYear = parsedDate.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long'
          });
          return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 24,
                  flex: 1,
                  fontFamily: 'Gmarket-Sans-Medium'
                }}
              >
                {monthYear}
              </Text>
              <View style={styles.headerIcons}>
                <Ionicons
                  name='people-outline'
                  size={30}
                  color='skyblue'
                  onPress={() => {
                    openModal('group');
                  }}
                />
                <Ionicons
                  name='person-outline'
                  size={25}
                  color={colors.PRIMARY}
                  onPress={() => {
                    openModal('account');
                  }}
                />
                <Ionicons
                  name='clipboard-outline'
                  size={25}
                  color='black'
                  onPress={() => {
                    openModal('vacation');
                  }}
                />
              </View>
            </View>
          );
        }}
        theme={{
          textDayFontFamily: 'Gmarket-Sans-Medium',
          textMonthFontFamily: 'Gmarket-Sans-Medium',
          textDayHeaderFontFamily: 'Gmarket-Sans-Medium',
          textDayFontSize: 12,
          textMonthFontSize: 24,
          textDayHeaderFontSize: 14,
          'stylesheet.day.basic': {
            base: {
              width: '100%',
              height: (height * 0.8) / 6,
              borderWidth: 1,
              borderColor: colors.GRAY_200,
              paddingLeft: 5,
              fontFamily: 'Gmarket-Sans-Medium'
            },
            today: {
              borderRadius: 0
            }
          },
          'stylesheet.calendar.header': {
            dayTextAtIndex0: {
              color: colors.PRIMARY
            },
            dayTextAtIndex6: {
              color: 'skyblue'
            },
            dayTextAtIndex1: {
              color: 'black'
            },
            dayTextAtIndex2: {
              color: 'black'
            },
            dayTextAtIndex3: {
              color: 'black'
            },
            dayTextAtIndex4: {
              color: 'black'
            },
            dayTextAtIndex5: {
              color: 'black'
            }
          },
          'stylesheet.calendar.main': {
            week: {
              flexDirection: 'row',
              justifyContent: 'space-around'
            }
          }
        }}
        style={styles.calendarContainer}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        enableSwipeMonths={true}
        hideArrows={true}
      />
      <View style={styles.bottomBar}>
        <Ionicons
          name='add-circle-outline'
          size={40}
          color={colors.PRIMARY}
          onPress={() => {
            openModal('leave');
          }}
        />
      </View>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>{renderModalContent()}</View>
          {modalContent !== 'leave' && (
            <Pressable style={styles.closeButton} onPress={closeModal}>
              <Ionicons name='close' size={30} color={colors.PRIMARY} />
            </Pressable>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 15,
    padding: 10
  },
  calendarContainer: {
    width: '100%',
    height: height * 0.8,
    minHeight: '100%'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white'
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    borderRadius: 25,
    padding: 5
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});

export default CalendarScreen;
