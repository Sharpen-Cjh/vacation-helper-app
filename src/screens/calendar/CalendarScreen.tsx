import React, { useState } from 'react';
import { StyleSheet, View, Modal, TextInput, Text, Switch } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import LeaveForm from './LeaveForm';

interface CalendarScreenProps {}

function CalendarScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateData | null>(null);

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        theme={{
          'stylesheet.day.basic': {
            base: {
              width: 30,
              height: 100
            }
          }
        }}
        style={styles.calendarContainer}
        onDayPress={handleDayPress}
        markedDates={{
          '2024-09-16': {
            selected: true,
            marked: true,
            selectedColor: 'blue'
          },
          '2024-09-17': { marked: true },
          '2024-09-18': { disabled: true }
        }}
      />
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <LeaveForm selectedDate={selectedDate} closeModal={closeModal} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  calendarContainer: {
    minHeight: '100%'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)' // 투명한 배경
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    padding: 20,
    backgroundColor: 'white'
  },
  leaveForm: {
    flex: 1,
    padding: 20
  }
});

export default CalendarScreen;
