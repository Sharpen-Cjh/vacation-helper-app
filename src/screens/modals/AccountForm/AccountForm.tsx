import { commonStyles } from '@/src/styles/commonStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import NickNameForm from './NickNameForm';
import PasswordForm from './PasswordForm';
import LeaveDaysForm from './LeaveDaysForm';
import { colors } from '@/src/styles/colors';

interface AccountFormProps {}

function AccountForm({}: AccountFormProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<
    'nickname' | 'password' | 'leaveDays' | null
  >(null);

  const openModal = (content: 'nickname' | 'password' | 'leaveDays') => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  const renderModalContent = () => {
    switch (modalContent) {
      case 'nickname':
        return <NickNameForm closeModal={closeModal} />;
      case 'password':
        return <PasswordForm closeModal={closeModal} />;
      case 'leaveDays':
        return <LeaveDaysForm closeModal={closeModal} />;
    }
  };
  return (
    <>
      <View style={[commonStyles.container, { gap: 20 }]}>
        <Text style={[commonStyles.textHeader, { alignSelf: 'center' }]}>
          사용자 계정
        </Text>
        <View
          style={{
            gap: 10,
            borderBottomWidth: 1,
            borderBottomColor: colors.gray,
            padding: 10
          }}
        >
          <Text style={commonStyles.textHeader}>이메일</Text>
          <Text style={commonStyles.textSubheader}>dadbad007@naver.com</Text>
        </View>
        <View
          style={{
            gap: 10,
            borderBottomWidth: 1,
            borderBottomColor: colors.gray,
            padding: 10
          }}
        >
          <View style={[commonStyles.row, { gap: 10 }]}>
            <Text style={commonStyles.textHeader}>닉네임</Text>
            <MaterialCommunityIcons
              name='pencil'
              style={commonStyles.iconSmall}
              onPress={() => {
                openModal('nickname');
              }}
            />
          </View>
          <Text style={commonStyles.textSubheader}>dadbad007</Text>
        </View>
        <View style={[commonStyles.row, { gap: 10, padding: 10 }]}>
          <Text style={commonStyles.textHeader}>비밀번호</Text>
          <MaterialCommunityIcons
            name='pencil'
            style={commonStyles.iconSmall}
            onPress={() => {
              openModal('password');
            }}
          />
        </View>
        <View
          style={{
            gap: 10,
            borderBottomWidth: 1,
            borderBottomColor: colors.gray,
            padding: 10
          }}
        >
          <View style={[commonStyles.row, { gap: 10 }]}>
            <Text style={commonStyles.textHeader}>잔여 휴가 일수</Text>
            <MaterialCommunityIcons
              name='pencil'
              style={commonStyles.iconSmall}
              onPress={() => {
                openModal('leaveDays');
              }}
            />
          </View>
          <Text style={commonStyles.textSubheader}>15일</Text>
        </View>
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
          </View>
        </View>
      </Modal>
    </>
  );
}

export default AccountForm;
