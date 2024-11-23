import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from '@/src/styles/commonStyles';
import { colors } from '@/src/styles/colors';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import useGroupInfo from '@/src/hooks/queries/useGroup';

import GroupJoinForm from './GroupJoinForm';
import GroupDetail from './GroupDetail';
import GroupCreateForm from './GroupCreateForm';

import type { GroupListItem } from '@/src/types/group';
import ConfirmLeaveGroup from './ConfirmLeaveGroup';

function GroupList() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<
    'groupCreate' | 'groupJoin' | 'groupDetail' | 'confirmLeave' | null
  >(null);
  const [selectedGroup, setSelectedGroup] = useState<GroupListItem | null>(
    null
  );

  const {
    getUserGroupListQuery: { data: groupListData, isError, isLoading, refetch },
    leaveGroupMutation
  } = useGroupInfo();

  const closeModal = () => {
    setModalVisible(false);
    setSelectedGroup(null);
  };

  const handleLeaveGroupIcon = (group: GroupListItem) => {
    setSelectedGroup(group);
    setModalVisible(true);
    setModalContent('confirmLeave');
  };

  const leaveGroup = () => {
    if (!selectedGroup) return;
    leaveGroupMutation.mutate(selectedGroup.id, {
      onSuccess: () => {
        closeModal();
      }
    });
  };

  const renderModalContent = () => {
    switch (modalContent) {
      case 'groupCreate':
        return <GroupCreateForm closeModal={closeModal} />;
      case 'groupJoin':
        return <GroupJoinForm closeModal={closeModal} />;
      case 'groupDetail':
        return selectedGroup ? (
          <GroupDetail groupID={selectedGroup.id} />
        ) : null;
      case 'confirmLeave':
        return (
          <ConfirmLeaveGroup
            closeModal={closeModal}
            onConfirmLeave={leaveGroup}
          />
        );
    }
  };

  const renderGroupListItem = ({ item }: { item: GroupListItem }) => (
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
      <Text style={commonStyles.textSubheader}>{item.name}</Text>
      <View style={[commonStyles.row, { gap: 15 }]}>
        <MaterialCommunityIcons
          name='logout-variant'
          style={[commonStyles.iconSmall, { color: colors.PRIMARY }]}
          onPress={() => {
            handleLeaveGroupIcon(item);
          }}
        />
        <MaterialCommunityIcons
          name='dots-vertical'
          style={[commonStyles.iconSmall, { color: colors.SECONDARY }]}
          onPress={() => {
            setSelectedGroup(item);
            setModalVisible(true);
            setModalContent('groupDetail');
          }}
        />
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator size='large' color={colors.PRIMARY} />
          <Text style={commonStyles.textBody}>
            그룹 정보를 불러오는 중입니다...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={commonStyles.textBody}>
            그룹 정보를 가져오는 데 실패했습니다.
          </Text>
          <Pressable
            style={[styles.retryButton, commonStyles.row]}
            onPress={() => {
              // 에러 발생 시 재시도 로직
              refetch();
            }}
          >
            <MaterialCommunityIcons
              name='reload'
              size={20}
              color={colors.PRIMARY}
            />
            <Text style={commonStyles.textSubheader}>다시 시도</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, padding: 20, justifyContent: 'space-evenly' }}>
        <FlatList
          data={groupListData}
          keyExtractor={(item) => item.id}
          renderItem={renderGroupListItem}
          contentContainerStyle={{ gap: 20 }}
        />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    justifyContent: 'space-evenly'
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    borderRadius: 25,
    padding: 5
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  retryButton: {
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: colors.PRIMARY,
    borderRadius: 5
  }
});

export default GroupList;
