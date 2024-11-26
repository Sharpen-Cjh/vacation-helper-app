import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/styles/colors';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { GroupListItem } from '@/src/types/group';

type HeaderComponentProps = {
  monthYear: string;
  handleCreateVacationButton: () => void;
  isGroupCalendar: boolean;
  groupList: GroupListItem[];
  onGroupChange: (groupId: number | null) => void;
  selectedGroupId: number | null;
};

function HeaderComponent({
  monthYear,
  handleCreateVacationButton,
  isGroupCalendar,
  groupList = [],
  onGroupChange,
  selectedGroupId
}: HeaderComponentProps) {
  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.header}>
      <Pressable onPress={openDrawer} style={styles.drawerButton}>
        <Ionicons name='menu' size={30} />
      </Pressable>

      <Text style={styles.monthYear}>{monthYear}</Text>
      {isGroupCalendar && (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedGroupId}
            onValueChange={(value) => onGroupChange(value)}
          >
            {groupList.map((group) => (
              <Picker.Item
                key={group.id}
                label={group.name}
                value={group.id}
                fontFamily='Gmarket-Sans-Medium'
              />
            ))}
          </Picker>
        </View>
      )}
      <Pressable style={styles.addButton} onPress={handleCreateVacationButton}>
        <Ionicons name='add-circle-outline' size={40} color={colors.PRIMARY} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  drawerButton: {
    marginRight: 20
  },
  monthYear: {
    fontSize: 16,
    flex: 1,
    fontFamily: 'Gmarket-Sans-Medium'
  },
  pickerContainer: {
    flex: 1,
    marginRight: 20
  },
  addButton: {
    flexDirection: 'row',
    gap: 15
  }
});

export default HeaderComponent;
