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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GroupCreateForm from './GroupCreateForm';
import Toast, { BaseToast, BaseToastProps } from 'react-native-toast-message';

import { colors } from '@/src/styles/colors';
import { commonStyles } from '@/src/styles/commonStyles';

import type { GroupMember } from '@/src/types/group';

import * as Clipboard from 'expo-clipboard';

import useGroupInfo from '@/src/hooks/queries/useGroup';
import useAuth from '@/src/hooks/queries/useAuth';
import { UserProfile } from '@/src/types/auth';

interface GroupDetailProps {
  groupID: string;
}
const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: colors.SECONDARY
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold'
      }}
      text2Style={{
        fontSize: 14,
        color: '#555'
      }}
    />
  )
};
function GroupDetail({ groupID }: GroupDetailProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    getGroupByIdQuery: { data, isError, isLoading }
  } = useGroupInfo(groupID);
  const { getProfileQuery } = useAuth();

  const userInfo = getProfileQuery.data as UserProfile;

  const closeModal = () => {
    setModalVisible(false);
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(data.inviteCode);
    Toast.show({
      type: 'success',
      text1: '초대 코드 복사 완료',
      text2: '클립보드에 초대 코드가 복사되었습니다.',
      visibilityTime: 1000
    });
  };

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size='small' color={colors.PRIMARY} />
        <Text>그룹 정보를 가져오는 중입니다...</Text>
      </View>
    );
  }

  // 에러 상태 처리
  if (isError || !data) {
    return (
      <View>
        <Text>그룹 정보를 가져오는 데 실패했습니다.</Text>
      </View>
    );
  }
  const isCreator = userInfo?.id === data.creator.id;
  const renderGroupMemberItem = ({ item }: { item: GroupMember }) => (
    <View
      style={{
        borderBottomWidth: 1,
        paddingBottom: 5,
        borderBottomColor: colors.GRAY_200
      }}
    >
      <Text style={commonStyles.textBody}>{item.name}</Text>
    </View>
  );

  return (
    <View style={{ gap: 15 }}>
      <Pressable
        style={[{ alignSelf: 'center', gap: 10 }, commonStyles.row]}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={commonStyles.textSubheader}>{data.name}</Text>
        {isCreator && (
          <MaterialCommunityIcons
            name='pencil'
            style={[commonStyles.iconSmall, { color: colors.PRIMARY }]}
          />
        )}
      </Pressable>
      <View style={commonStyles.row}>
        <MaterialCommunityIcons
          name='chess-queen'
          style={[commonStyles.iconSmall, { color: colors.PRIMARY }]}
        />
        <Text>{data.creator.name}</Text>
      </View>
      <View style={commonStyles.row}>
        <MaterialCommunityIcons
          name='email-newsletter'
          style={[commonStyles.iconSmall, { color: colors.PRIMARY }]}
        />
        <Text>초대 코드: {data.inviteCode}</Text>
        <Pressable onPress={copyToClipboard}>
          <MaterialCommunityIcons
            name='content-copy'
            style={[
              commonStyles.iconSmall,
              { color: colors.PRIMARY },
              { marginLeft: 10 }
            ]}
          />
        </Pressable>
      </View>
      <View style={commonStyles.row}>
        <MaterialCommunityIcons
          name='human-queue'
          style={[commonStyles.iconSmall, { color: colors.PRIMARY }]}
        />
        <Text>멤버 목록</Text>
      </View>
      <View style={{ padding: 10, gap: 10 }}>
        <FlatList
          data={data.members}
          keyExtractor={(item) => item.id}
          renderItem={renderGroupMemberItem}
          contentContainerStyle={{ gap: 20 }}
        />
      </View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={commonStyles.modalOverlaySmall}>
          <View style={commonStyles.modalContainerSmall}>
            <GroupCreateForm
              closeModal={closeModal}
              title='그룹 이름 수정'
              groupID={data.id}
            />
          </View>
        </View>
      </Modal>
      <Toast config={toastConfig} />
    </View>
  );
}

const styles = StyleSheet.create({});

export default GroupDetail;
