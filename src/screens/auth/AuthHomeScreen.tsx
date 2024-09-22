import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthStackParamList } from '../../navigations/stack/AuthStackNavigator';
import { authNavigations } from '@/src/constants';
import CustomButton from '@/src/components/CustomButton';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

function AuthHomeScreen({ navigation }: AuthHomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode='contain'
          style={styles.image}
          source={require('@/src/assets/images/logo.png')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          label='로그인하기'
          onPress={() => navigation.navigate(authNavigations.LOGIN)}
        />
        <CustomButton
          label='회원가입하기'
          variant='outlined'
          onPress={() => navigation.navigate(authNavigations.SIGNUP)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    alignItems: 'center'
  },
  imageContainer: {
    flex: 1.5,
    width: Dimensions.get('screen').width / 2
  },
  image: {
    width: '100%',
    height: '100%'
  },
  buttonContainer: {
    flex: 1,
    gap: 10
  }
});

export default AuthHomeScreen;
