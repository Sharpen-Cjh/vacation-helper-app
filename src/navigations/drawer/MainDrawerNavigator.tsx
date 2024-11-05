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

export default MainDrawerNavigator;
