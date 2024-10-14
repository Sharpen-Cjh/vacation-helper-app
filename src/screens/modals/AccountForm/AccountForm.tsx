import { commonStyles } from '@/src/styles/commonStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View, Pressable } from 'react-native';
import NickNameForm from './NickNameForm';
import PasswordForm from './PasswordForm';
import LeaveDaysForm from './LeaveDaysForm';
import { colors } from '@/src/styles/colors';
import useAuth from '@/src/hooks/queries/useAuth';
import { ResponseProfile } from '@/src/api/auth';

interface AccountFormProps {}

function AccountForm({}: AccountFormProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<
    'nickname' | 'password' | 'leaveDays' | null
  >(null);
  const { getProfileQuery } = useAuth();
  const [userInfo, setUserInfo] = useState<ResponseProfile | null>(null);

  useEffect(() => {
    if (getProfileQuery.isSuccess && getProfileQuery.data) {
      setUserInfo(getProfileQuery.data as ResponseProfile);
    }
  }, [getProfileQuery.isSuccess, getProfileQuery.data]);

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
      <View style={styles.container}>
        <Text style={styles.headerText}>사용자 계정</Text>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>이메일</Text>
          <Text style={styles.sectionContent}>{userInfo?.email}</Text>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.sectionTitle}>닉네임</Text>
            <Pressable onPress={() => openModal('nickname')}>
              <MaterialCommunityIcons name='pencil' style={styles.iconSmall} />
            </Pressable>
          </View>
          <Text style={styles.sectionContent}>{userInfo?.name}</Text>
        </View>
        <View style={styles.rowContainerWithPadding}>
          <Text style={styles.sectionTitle}>비밀번호</Text>
          <Pressable onPress={() => openModal('password')}>
            <MaterialCommunityIcons name='pencil' style={styles.iconSmall} />
          </Pressable>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.sectionTitle}>잔여 휴가 일수</Text>
            <Pressable onPress={() => openModal('leaveDays')}>
              <MaterialCommunityIcons name='pencil' style={styles.iconSmall} />
            </Pressable>
          </View>
          {userInfo && (
            <Text style={styles.sectionContent}>
              {userInfo?.availableAnnualLeaves +
                (userInfo?.availableUnderOneYearLeaves || 0)}
            </Text>
          )}
        </View>
      </View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>{renderModalContent()}</View>
        </View>
      </Modal>
    </>
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
  headerText: {
    ...commonStyles.textHeader,
    alignSelf: 'center',
    fontSize: 24,
    marginBottom: 10
  },
  sectionContainer: {
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY_200,
    paddingVertical: 15
  },
  rowContainer: {
    ...commonStyles.row,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rowContainerWithPadding: {
    ...commonStyles.row,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15
  },
  sectionTitle: {
    ...commonStyles.textHeader,
    fontSize: 18
  },
  sectionContent: {
    ...commonStyles.textSubheader,
    fontSize: 16,
    color: colors.GRAY_200
  },
  iconSmall: {
    ...commonStyles.iconSmall,
    color: colors.PRIMARY
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});

export default AccountForm;
