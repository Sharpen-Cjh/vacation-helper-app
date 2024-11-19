import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/styles/colors';

type HeaderComponentProps = {
  monthYear: string;
  handleCreateVacationButton: () => void;
};

function HeaderComponent({
  monthYear,
  handleCreateVacationButton
}: HeaderComponentProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
