import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import BottomTabNavigator from '../tab/BottomTabNavigator';
import useAuth from '@/src/hooks/queries/useAuth';

function RootNavigator() {
  const { isLogin } = useAuth();
  return <>{isLogin ? <BottomTabNavigator /> : <AuthStackNavigator />}</>;
}
export default RootNavigator;
