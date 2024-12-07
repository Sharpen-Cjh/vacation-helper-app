import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  Pressable,
  View
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';

import HeaderComponent from './HeaderComponent';
import DayComponent from './DayComponent';
import BottomSheetModal from '../modals/BottomSheetModal';
import EventForm from './EventForm';

import { formatVacationDataForMarkedDates, truncateText } from '@/src/utils';

import type { Holidays, VacationInfo } from '@/src/types/vacationInfo';
import type { UserProfile } from '@/src/types/auth';
import { colors } from '@/src/styles/colors';
import CommonModal from '../modals/CommonModal';

import useVacation from '@/src/hooks/queries/useVacation';
import useAuth from '@/src/hooks/queries/useAuth';
import useGroupInfo from '@/src/hooks/queries/useGroup';

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

type TabParamList = {
  Calendar: undefined;
  Group: { group: boolean };
};

function CalendarScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [commonModalVisible, setCommonModalVisible] = useState<boolean>(false);
  const [selectedVacation, setSelectedVacation] = useState<VacationInfo | null>(
    null
  );
  const [selectedVacations, setSelectedVacations] = useState<VacationInfo[]>(
    []
  );
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  const { getAllVacationQuery, getGroupVacationsQuery, getHolidaysQuery } =
    useVacation(selectedGroupId, currentYear);
  const { getProfileQuery } = useAuth();
  const { getUserGroupListQuery } = useGroupInfo();

  const route = useRoute<RouteProp<TabParamList, 'Group'>>();
  const isGroupCalendar = route.params?.group || false;

  useEffect(() => {
    if (isGroupCalendar && getUserGroupListQuery.isSuccess) {
      const firstGroup = getUserGroupListQuery.data?.[0];
      if (firstGroup) {
        setSelectedGroupId(firstGroup.id);
      }
    }
  }, [getUserGroupListQuery.isSuccess, isGroupCalendar]);

  const {
    additionalUnderOneYearLeaveAdded,
    availableAnnualLeaves,
    availableUnderOneYearLeaves,
    id: currentUserId
  } = getProfileQuery.data as Partial<UserProfile>;

  const availableAnnualLeavesData = {
    additionalUnderOneYearLeaveAdded,
    availableAnnualLeaves,
    availableUnderOneYearLeaves
  };

  const holidays: Holidays = getHolidaysQuery.isSuccess
    ? Array.isArray(getHolidaysQuery.data.response.body.items.item)
      ? getHolidaysQuery.data.response.body.items.item
      : [getHolidaysQuery.data.response.body.items.item] // 단일 객체를 배열로 변환
    : [];

  const vacations =
    isGroupCalendar && getGroupVacationsQuery.isSuccess
      ? getGroupVacationsQuery.data
      : getAllVacationQuery.isSuccess
      ? getAllVacationQuery.data
      : [];

  const holidayDates: Record<string, string> = holidays.reduce(
    (acc, holiday) => {
      const formattedDate = holiday.locdate
        .toString()
        .replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'); // YYYYMMDD를 YYYY-MM-DD로 변환
      acc[formattedDate] = holiday.dateName; // 날짜를 키로, 공휴일 이름을 값으로 저장
      return acc;
    },
    {} as Record<string, string>
  );

  const markedDates = (() => {
    const vacationDates = formatVacationDataForMarkedDates(vacations);

    return vacationDates;
  })();

  const handleMonthChange = (monthData: DateData) => {
    const newYear = new Date(monthData.dateString).getFullYear();
    if (newYear !== currentYear) {
      setCurrentYear(newYear);
    }
  };
  const handleGroupChange = (groupId: number | null) => {
    setSelectedGroupId(groupId);
  };

  const refetchVacations = async () => {
    if (isGroupCalendar) {
      const { data: updatedGroupVacationData } =
        await getGroupVacationsQuery.refetch();

      if (!updatedGroupVacationData) return;

      const updatedMarkedDates = formatVacationDataForMarkedDates(
        updatedGroupVacationData as VacationInfo[]
      );

      const updatedVacations = updatedMarkedDates[selectedDate] || [];

      setSelectedVacations(updatedVacations);
    } else {
      const { data: updatedVacationData } = await getAllVacationQuery.refetch();

      if (!updatedVacationData) return;

      const updatedMarkedDates = formatVacationDataForMarkedDates(
        updatedVacationData as VacationInfo[]
      );

      const updatedVacations = updatedMarkedDates[selectedDate] || [];

      setSelectedVacations(updatedVacations);
    }
  };

  const showLeaveForm = (vacationInfo: VacationInfo | null) => {
    setSelectedVacation(vacationInfo);
    setCommonModalVisible(true);
  };

  const handleDayPress = (date: DateData, vacations: VacationInfo[]) => {
    if (vacations.length === 0) return;

    setSelectedVacations(vacations);
    setSelectedDate(date.dateString);
    openBottomSheet();
  };

  const openBottomSheet = () => {
    setModalVisible(true);
  };

  const closeBottomSheet = () => {
    setModalVisible(false);
  };

  const renderHeader = (date: string) => {
    const parsedDate = new Date(date);
    const monthYear = parsedDate.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long'
    });

    return (
      <HeaderComponent
        isGroupCalendar={isGroupCalendar}
        monthYear={monthYear}
        groupList={getUserGroupListQuery.data}
        handleCreateVacationButton={() => {
          showLeaveForm(null);
        }}
        onGroupChange={handleGroupChange}
        selectedGroupId={selectedGroupId}
      />
    );
  };

  const renderDayComponent = ({ date }: { date: DateData }) => {
    const vacationInfos = markedDates[date.dateString] || [];
    const holidayInfo = holidayDates[date.dateString] || null;
    return (
      <DayComponent
        date={date}
        vacationInfos={vacationInfos}
        holidayInfo={holidayInfo}
        onPress={() => handleDayPress(date, vacationInfos)}
        currentUserId={currentUserId}
      />
    );
  };

  const renderVacationInfo = ({ item }: { item: VacationInfo }) => {
    const isOwner = item.user?.id === currentUserId;

    return (
      <Pressable
        style={[
          styles.vacationInfoContainer,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderLeftColor: isOwner ? colors.PRIMARY : colors.SECONDARY
          }
        ]}
        onPress={isOwner ? () => showLeaveForm(item) : null}
      >
        <Text style={styles.vacationInfoText}>
          {isOwner
            ? truncateText(item.title, 20)
            : truncateText(item.user!.name, 20)}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        renderHeader={renderHeader}
        dayComponent={renderDayComponent}
        onMonthChange={handleMonthChange}
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
        markedDates={markedDates}
        enableSwipeMonths={true}
        hideArrows={true}
      />
      <CommonModal
        modalVisible={commonModalVisible}
        closeModal={() => setCommonModalVisible(false)}
      >
        <EventForm
          selectedVacation={selectedVacation}
          closeModal={() => setCommonModalVisible(false)}
          availableAnnualLeavesData={availableAnnualLeavesData}
          refetchVacations={refetchVacations}
        />
      </CommonModal>
      <BottomSheetModal visible={modalVisible} onClose={closeBottomSheet}>
        <View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: colors.GRAY_200,
              padding: 10
            }}
          >
            <Text>{selectedDate}</Text>
          </View>
          <FlatList
            data={selectedVacations}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderVacationInfo}
            contentContainerStyle={styles.vacationListContainer}
            showsVerticalScrollIndicator={true}
          />
        </View>
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
    height: 50,
    marginBottom: 10,
    padding: 10,
    borderRadius: 2,
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 5,
    borderRightWidth: 1,
    borderRightColor: colors.GRAY_200,
    borderBlockColor: colors.GRAY_200
  },
  vacationInfoText: {
    fontSize: 10,
    fontFamily: 'Gmarket-Sans-Medium'
  }
});

export default CalendarScreen;
