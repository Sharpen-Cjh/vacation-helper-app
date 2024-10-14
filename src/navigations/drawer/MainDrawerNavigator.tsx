import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CalendarScreen from '@/src/screens/calendar/CalendarScreen';

const Drawer = createDrawerNavigator();

function MainDrawerNavigator() {
  return (
    <>
      <Drawer.Navigator>
        <Drawer.Screen
          name='Calendar'
          component={CalendarScreen}
          options={{
            headerShown: false
          }}
        />
      </Drawer.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    padding: 10
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
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    borderRadius: 25,
    padding: 5
  }
});

export default MainDrawerNavigator;
