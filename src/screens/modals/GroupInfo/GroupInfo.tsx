import { colors } from '@/src/styles/colors';
import { commonStyles } from '@/src/styles/commonStyles';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import GroupDetail from './GroupDetail';
import GroupCreateForm from './GroupCreateForm';
import GroupJoinForm from './GroupJoinForm';

interface GroupListProps {}

function GroupList({}: GroupListProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<
    'groupCreate' | 'groupJoin' | 'groupDetail' | null
  >(null);

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderModalContent = () => {
    switch (modalContent) {
      case 'groupCreate':
        return <GroupCreateForm closeModal={closeModal} />;
      case 'groupJoin':
        return <GroupJoinForm closeModal={closeModal} />;
      case 'groupDetail':
        return <GroupDetail />;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={commonStyles.textHeader}>그룹 목록</Text>
      <View style={{ flex: 1, padding: 10, justifyContent: 'space-evenly' }}>
        <View
          style={[
            commonStyles.row,
            {
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: colors.GRAY_200,
              paddingBottom: 10
            }
          ]}
        >
          <Text style={commonStyles.textSubheader}>고필봉</Text>
          <MaterialCommunityIcons
            name='dots-vertical'
            style={[commonStyles.iconSmall, { color: colors.SECONDARY }]}
            onPress={() => {
              setModalVisible(true);
              setModalContent('groupDetail');
            }}
          />
        </View>
      </View>
      <View style={[commonStyles.row, { justifyContent: 'space-evenly' }]}>
        <Pressable
          style={commonStyles.row}
          onPress={() => {
            setModalVisible(true);
            setModalContent('groupCreate');
          }}
        >
          <MaterialCommunityIcons
            name='plus-circle'
            style={[commonStyles.iconSmall, { color: colors.SECONDARY }]}
          />
          <Text>그룹 만들기</Text>
        </Pressable>
        <Pressable
          style={[commonStyles.row]}
          onPress={() => {
            setModalVisible(true);
            setModalContent('groupJoin');
          }}
        >
          <MaterialCommunityIcons
            name='run'
            style={[commonStyles.iconSmall, { color: colors.SECONDARY }]}
          />
          <Text>그룹 참가하기</Text>
        </Pressable>
      </View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={commonStyles.modalOverlaySmall}>
          <View style={commonStyles.modalContainerSmall}>
            {renderModalContent()}
            {modalContent === 'groupDetail' && (
              <Pressable style={styles.closeButton} onPress={closeModal}>
                <Ionicons name='close' size={30} color={colors.PRIMARY} />
              </Pressable>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    justifyContent: 'space-evenly',
    margin: 10 // 외부 여백 추가
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    borderRadius: 25,
    padding: 5
  }
});

export default GroupList;
