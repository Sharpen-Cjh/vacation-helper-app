import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/styles/colors';
import { DrawerActions, useNavigation } from '@react-navigation/native';
type HeaderComponentProps = {
  monthYear: string;
  handleCreateVacationButton: () => void;
};

function HeaderComponent({
  monthYear,
  handleCreateVacationButton
}: HeaderComponentProps) {
  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Pressable onPress={openDrawer} style={{ marginRight: 20 }}>
        <Ionicons name='menu' size={30} />
      </Pressable>
      <Text
        style={{
          fontSize: 16,
          flex: 1,
          fontFamily: 'Gmarket-Sans-Medium'
        }}
      >
        {monthYear}
      </Text>
      <Pressable
        style={{ flexDirection: 'row', gap: 15 }}
        onPress={handleCreateVacationButton}
      >
        <Ionicons name='add-circle-outline' size={40} color={colors.PRIMARY} />
      </Pressable>
    </View>
  );
}

export default HeaderComponent;
