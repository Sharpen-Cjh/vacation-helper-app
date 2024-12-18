import React, { useState } from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Pressable,
  ActivityIndicator
} from 'react-native';
import { colors } from '@/src/styles/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

import useVacation from '@/src/hooks/queries/useVacation';
import useAuth from '../hooks/queries/useAuth';
import { truncateText } from '@/src/utils';
import { VacationInfo } from '@/src/types/vacationInfo';
import CommonModal from './modals/CommonModal';
import EventForm from './calendar/EventForm';
import { UserProfile } from '../types/auth';

function VacationList() {
  const { getAllVacationQuery } = useVacation(null);
  const { getProfileQuery } = useAuth();
  const [selectedVacation, setSelectedVacation] = useState<VacationInfo | null>(
    null
  );
  const [commonModalVisible, setCommonModalVisible] = useState<boolean>(false);

  const {
    additionalUnderOneYearLeaveAdded,
    availableAnnualLeaves,
    availableUnderOneYearLeaves
  } = getProfileQuery.data as Partial<UserProfile>;

  const availableAnnualLeavesData = {
    additionalUnderOneYearLeaveAdded,
    availableAnnualLeaves,
    availableUnderOneYearLeaves
  };

  const showEventForm = (vacationInfo: VacationInfo | null) => {
    setSelectedVacation(vacationInfo);
    setCommonModalVisible(true);
  };

  if (getAllVacationQuery.isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size='large' color={colors.PRIMARY} />
      </View>
    );
  }

  if (getAllVacationQuery.isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          데이터를 불러오는 중 오류가 발생했습니다.
        </Text>
      </View>
    );
  }

  const vacations: VacationInfo[] = getAllVacationQuery.data || [];

  const renderItem = ({ item }: { item: VacationInfo }) => (
    <Pressable
      style={styles.itemContainer}
      onPress={() => {
        showEventForm(item);
      }}
    >
      <View style={styles.textContainer}>
        <Text style={styles.vacationTitle}>{truncateText(item.title, 20)}</Text>
        <Text style={styles.vacationDate}>
          {item.start} - {item.end}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={vacations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>등록된 휴가가 없습니다.</Text>
          </View>
        }
      />
      <CommonModal
        modalVisible={commonModalVisible}
        closeModal={() => setCommonModalVisible(false)}
      >
        <EventForm
          selectedVacation={selectedVacation}
          closeModal={() => setCommonModalVisible(false)}
          availableAnnualLeavesData={availableAnnualLeavesData}
          refetchVacations={() => {}}
        />
      </CommonModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
    padding: 10
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    fontFamily: 'Gmarket-Sans-Medium'
  },
  listContent: {
    alignItems: 'center',
    paddingBottom: 20
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    padding: 15,
    marginVertical: 5,
    backgroundColor: colors.WHITE,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  textContainer: {
    flex: 1,
    gap: 10
  },
  vacationTitle: {
    fontSize: 16,
    color: colors.PRIMARY,
    fontFamily: 'Gmarket-Sans-Medium'
  },
  vacationDate: {
    fontSize: 14,
    color: colors.GRAY_500,
    fontFamily: 'Gmarket-Sans-Medium'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  emptyText: {
    fontSize: 16,
    color: colors.GRAY_500,
    fontFamily: 'Gmarket-Sans-Medium'
  }
});

export default VacationList;
