import { commonStyles } from '@/src/styles/commonStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View, Pressable } from 'react-native';
import NickNameForm from './NickNameForm';
import PasswordForm from './ChangePasswordForm';
import AnnualLeaveForm from './AnnualLeaveForm';
import { colors } from '@/src/styles/colors';
import useAuth from '@/src/hooks/queries/useAuth';
import { UserProfile } from '@/src/types/auth';

interface AccountFormProps {}

function AccountForm({}: AccountFormProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<
    'nickname' | 'password' | 'leaveDays' | 'deleteAccount' | null
  >(null);
  const { getProfileQuery, deleteAccountMutation } = useAuth();
  const [userInfo, setUserInfo] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (getProfileQuery.isSuccess && getProfileQuery.data) {
      setUserInfo(getProfileQuery.data as UserProfile);
    }
  }, [getProfileQuery.isSuccess, getProfileQuery.data]);

  const openModal = (
    content: 'nickname' | 'password' | 'leaveDays' | 'deleteAccount'
  ) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  const handleDeleteAccount = () => {
    deleteAccountMutation.mutate({});
    closeModal();
  };

  const renderModalContent = () => {
    switch (modalContent) {
      case 'nickname':
        return <NickNameForm closeModal={closeModal} />;
      case 'password':
        return <PasswordForm closeModal={closeModal} />;
      case 'leaveDays':
        return <AnnualLeaveForm closeModal={closeModal} />;
      case 'deleteAccount':
        return (
          <View>
            <Text style={styles.modalText}>정말 계정을 탈퇴하시겠습니까? </Text>
            <Text style={styles.modalText}>데이터가 전부 삭제됩니다.</Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={styles.confirmButton}
                onPress={handleDeleteAccount}
              >
                <Text style={styles.confirmText}>삭제</Text>
              </Pressable>
              <Pressable style={styles.cancelButton} onPress={closeModal}>
                <Text style={styles.cancelText}>취소</Text>
              </Pressable>
            </View>
          </View>
        );
    }
  };

  return (
    <>
      <View style={styles.container}>
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
            <Text style={styles.sectionTitle}>잔여 연차 일수</Text>
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
        <Pressable
          style={styles.deleteAccountButton}
          onPress={() => openModal('deleteAccount')}
        >
          <Text style={styles.deleteAccountText}>계정 탈퇴</Text>
        </Pressable>
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
    padding: 30,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    justifyContent: 'space-evenly'
  },
  headerText: {
    ...commonStyles.textHeader,
    alignSelf: 'center',
    fontSize: 20,
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
    fontSize: 16
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
  },
  deleteAccountButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: colors.PRIMARY,
    borderRadius: 10,
    alignItems: 'center'
  },
  deleteAccountText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Gmarket-Sans-Medium'
  },
  modalText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Gmarket-Sans-Medium',
    marginBottom: 20
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  confirmButton: {
    padding: 10,
    backgroundColor: colors.PRIMARY,
    borderRadius: 5,
    marginHorizontal: 10
  },
  cancelButton: {
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
    marginHorizontal: 10
  },
  confirmText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Gmarket-Sans-Medium'
  },
  cancelText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Gmarket-Sans-Medium'
  }
});

export default AccountForm;
