import { createDrawerNavigator } from '@react-navigation/drawer';
import MapHomeScreen from '@/src/screens/MapHomeScreen';
import CalendarScreen from '@/src/screens/calendar/CalendarScreen';

const Drawer = createDrawerNavigator();

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='MapHome' component={MapHomeScreen} />
      <Drawer.Screen name='Calendar' component={CalendarScreen} />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
