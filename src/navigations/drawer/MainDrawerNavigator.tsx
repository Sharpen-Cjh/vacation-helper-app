import { createDrawerNavigator } from '@react-navigation/drawer';
import { Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import BottomTabNavigator from '../tab/BottomTabNavigator';
import AccountForm from '@/src/screens/modals/AccountForm/AccountForm';
import GroupList from '@/src/screens/modals/GroupInfo/GroupList';

import { colors } from '@/src/styles/colors';

import useAuth from '@/src/hooks/queries/useAuth';

const Drawer = createDrawerNavigator();

function MainDrawerNavigator() {
  const { logoutMutation } = useAuth();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'Gmarket-Sans-Medium',
          fontSize: 16
        },
        drawerLabelStyle: {
          fontFamily: 'Gmarket-Sans-Medium',
          fontSize: 16
        },
        drawerActiveTintColor: colors.PRIMARY,
        drawerInactiveTintColor: 'gray'
      }}
    >
      <Drawer.Screen
        name='홈'
        component={BottomTabNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons name='home' size={20} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name='개인 정보 수정'
        component={AccountForm}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name='person' size={20} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name='그룹 관리'
        component={GroupList}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name='people' size={20} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name='로그아웃'
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name='log-out-outline' size={20} color={color} />
          )
        }}
        listeners={{
          focus: () => {
            Alert.alert(
              '로그아웃',
              '정말 로그아웃 하시겠습니까?',
              [
                { text: '취소', style: 'cancel' },
                { text: '확인', onPress: () => logoutMutation.mutate({}) }
              ],
              { cancelable: true }
            );
          }
        }}
      >
        {() => null}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  logoutContainer: {
    padding: 10
  },
  logoutButton: {
    flexDirection: 'row',
    gap: 25,
    padding: 10
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Gmarket-Sans-Medium',
    color: colors.GRAY_500
  }
});

export default MainDrawerNavigator;
