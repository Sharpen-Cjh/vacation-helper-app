import { View, StyleSheet, Modal, Text, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import MapHomeScreen from '@/src/screens/MapHomeScreen';
import CalendarScreen from '@/src/screens/calendar/CalendarScreen';
import { useState } from 'react';
import AccountForm from '@/src/screens/modals/AccountForm/AccountForm';
import GroupList from '@/src/screens/modals/GroupList/GroupList';

const Drawer = createDrawerNavigator();

function MainDrawerNavigator() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<
    'group' | 'account' | 'vacation' | null
  >(null);

  const openModal = (content: 'group' | 'account' | 'vacation') => {
    setModalContent(content);
    setModalVisible(true); // 모달 열기
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  const renderModalContent = () => {
    switch (modalContent) {
      case 'group':
        return <GroupList />;
      case 'account':
        return <AccountForm />;
      case 'vacation':
        return <Text>휴가목록</Text>;
    }
  };

  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          headerRight: () => (
            <View style={styles.row}>
              <Ionicons
                name='people-sharp'
                size={25}
                color='black'
                style={{ marginRight: 15 }}
                onPress={() => {
                  openModal('group');
                }}
              />
              <Ionicons
                name='person'
                size={25}
                color='black'
                style={{ marginRight: 15 }}
                onPress={() => {
                  openModal('account');
                }}
              />
              <Ionicons
                name='clipboard'
                size={25}
                color='black'
                style={{ marginRight: 15 }}
                onPress={() => {
                  openModal('vacation');
                }}
              />
            </View>
          )
        }}
      >
        <Drawer.Screen name='Calendar' component={CalendarScreen} />
        <Drawer.Screen name='MapHome' component={MapHomeScreen} />
      </Drawer.Navigator>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {renderModalContent()}
            <Button title='Close' onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
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
    padding: 20,
    backgroundColor: 'white'
  }
});

export default MainDrawerNavigator;
