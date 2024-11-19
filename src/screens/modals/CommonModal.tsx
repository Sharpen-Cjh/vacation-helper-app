import { colors } from '@/src/styles/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

interface CommonModalProps {
  children: React.ReactNode;
  modalVisible: boolean;
  closeModal: () => void;
}

function CommonModal({ children, modalVisible, closeModal }: CommonModalProps) {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>{children}</View>
        <Pressable style={styles.closeButton} onPress={closeModal}>
          <Ionicons name='close' size={30} color={colors.PRIMARY} />
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white'
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    borderRadius: 25,
    padding: 5
  }
});

export default CommonModal;
