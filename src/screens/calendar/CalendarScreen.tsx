import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  Pressable
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';

import HeaderComponent from './HeaderComponent';
import DayComponent from './DayComponent';
import BottomSheetModal from '../modals/BottomSheetModal';

import { formatVacationDataForMarkedDates } from '@/src/utils';

import useVacation from '@/src/hooks/queries/useVacation';
import type { VacationInfo } from '@/src/types/vacationInfo';
import { colors } from '@/src/styles/colors';

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

function CalendarScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVacation, setSelectedVacation] = useState<VacationInfo | null>(
    null
  );
  const [selectedVacations, setSelectedVacations] = useState<VacationInfo[]>(
    []
  );

  const { getAllVacationQuery } = useVacation();

  const markedDates = getAllVacationQuery.isSuccess
    ? formatVacationDataForMarkedDates(
        getAllVacationQuery.data as VacationInfo[]
      )
    : {};

  const renderHeader = (date: string) => {
    const parsedDate = new Date(date);
    const monthYear = parsedDate.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long'
    });

    return <HeaderComponent monthYear={monthYear} />;
  };

  const renderDayComponent = ({ date }: { date: DateData }) => {
    const vacationInfos = markedDates[date.dateString] || [];
    return (
      <DayComponent
        date={date}
        vacationInfos={vacationInfos}
        onPress={() => handleDayPress(vacationInfos)}
      />
    );
  };

  const openBottomSheet = () => {
    setModalVisible(true);
  };

  const closeBottomSheet = () => {
    setModalVisible(false);
  };

  const handleDayPress = (vacations: VacationInfo[]) => {
    if (vacations.length === 0) return;

    setSelectedVacations(vacations);
    openBottomSheet();
  };

  const renderVacationInfo = ({ item }: { item: VacationInfo }) => (
    <Pressable
      style={[
        styles.vacationInfoContainer,
        { flexDirection: 'row', justifyContent: 'space-between' }
      ]}
    >
      <Text style={styles.vacationInfoText}>{item.title}</Text>
      <Text style={styles.vacationInfoText}>
        {item.start} - {item.end}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        renderHeader={renderHeader}
        dayComponent={renderDayComponent}
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
            dayTextAtIndex0: { color: colors.PRIMARY },
            dayTextAtIndex6: { color: 'skyblue' },
            dayTextAtIndex1: { color: 'black' },
            dayTextAtIndex2: { color: 'black' },
            dayTextAtIndex3: { color: 'black' },
            dayTextAtIndex4: { color: 'black' },
            dayTextAtIndex5: { color: 'black' }
          },
          'stylesheet.calendar.main': {
            week: { flexDirection: 'row', justifyContent: 'space-around' }
          }
        }}
        style={styles.calendarContainer}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        enableSwipeMonths={true}
        hideArrows={true}
      />
      <BottomSheetModal visible={modalVisible} onClose={closeBottomSheet}>
        <FlatList
          data={selectedVacations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderVacationInfo}
          contentContainerStyle={styles.vacationListContainer}
          showsVerticalScrollIndicator={true}
        />
      </BottomSheetModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  calendarContainer: {
    width: '100%',
    paddingTop: 10
  },
  vacationListContainer: {
    padding: 10,
    backgroundColor: 'white'
  },
  vacationInfoContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: colors.PRIMARY,
    borderRadius: 8
  },
  vacationInfoText: {
    fontSize: 10,
    fontFamily: 'Gmarket-Sans-Medium',
    color: colors.WHITE
  }
});

export default CalendarScreen;
