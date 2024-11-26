import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import CalendarScreen from '@/src/screens/calendar/CalendarScreen';
import GroupList from '@/src/screens/modals/GroupInfo/GroupList';
// import VacationList from '@/src/screens/modals/VacationList';
import { colors } from '@/src/styles/colors';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = 'calendar';

          if (route.name === 'Calendar') {
            iconName = 'calendar';
          } else if (route.name === 'Account') {
            iconName = 'person';
          } else if (route.name === 'Group') {
            iconName = 'people';
          } else if (route.name === 'VacationList') {
            iconName = 'clipboard';
          }

          return (
            <Ionicons
              name={iconName as keyof typeof Ionicons.glyphMap}
              size={size}
              color={color}
            />
          );
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.PRIMARY,
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      })}
    >
      <Tab.Screen name='Calendar' component={CalendarScreen} />
      <Tab.Screen
        name='Group'
        component={CalendarScreen}
        initialParams={{ group: true }}
      />
      {/* <Tab.Screen name='VacationList' component={VacationList} /> */}
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
