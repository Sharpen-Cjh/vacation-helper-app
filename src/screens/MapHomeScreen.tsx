import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import useAuth from '../hooks/queries/useAuth';

function MapHomeScreen({}) {
  const { logoutMutation } = useAuth();

  return (
    <View>
      <Text>MapHomeScreen</Text>
      <Button
        title='로그아웃'
        onPress={() => logoutMutation.mutate(null)}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({});

export default MapHomeScreen;
