import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Dimensions
} from 'react-native';
import { colors } from '../styles/colors';
import { truncateText } from '../utils';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface CustomPickerProps {
  options: { label: string; value: number }[];
  selectedValue: number | null;
  onValueChange: (value: number) => void;
  placeholder?: string;
}

const CustomPicker = ({
  options,
  selectedValue,
  onValueChange,
  placeholder = 'Select an option'
}: CustomPickerProps) => {
  const [isVisible, setIsVisible] = useState(false); // Modal 표시 여부

  const handleSelect = (value: number) => {
    onValueChange(value);
    setIsVisible(false);
  };

  return (
    <View>
      <Pressable
        style={styles.inputContainer}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.inputText}>
          {truncateText(
            options.find((option) => option.value === selectedValue)?.label ||
              placeholder,
            5
          )}
        </Text>
        <Ionicons name='caret-down' />
      </Pressable>

      <Modal visible={isVisible} transparent animationType='slide'>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    styles.option,
                    item.value === selectedValue && styles.selectedOption
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item.value === selectedValue && styles.selectedOptionText
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              )}
            />
            <Pressable
              style={styles.closeButton}
              onPress={() => setIsVisible(false)}
            >
              <Text style={styles.closeButtonText}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomPicker;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
    borderRadius: 8
  },
  inputText: {
    fontSize: 12,
    fontFamily: 'Gmarket-Sans-Medium',
    color: '#333'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  selectedOption: {
    backgroundColor: '#f0f8ff'
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Gmarket-Sans-Medium',
    color: '#333'
  },
  selectedOptionText: {
    color: colors.SECONDARY
  },
  closeButton: {
    marginTop: 30,
    alignSelf: 'center'
  },
  closeButtonText: {
    fontSize: 16,
    color: colors.PRIMARY,
    fontFamily: 'Gmarket-Sans-Medium'
  }
});
