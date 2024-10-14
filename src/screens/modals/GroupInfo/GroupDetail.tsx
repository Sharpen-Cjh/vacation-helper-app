import { colors } from '@/src/styles/colors';
import { commonStyles } from '@/src/styles/commonStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import GroupCreateForm from './GroupCreateForm';

interface GroupDetailProps {}

function GroupDetail({}: GroupDetailProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ gap: 15 }}>
      <Pressable
        style={[{ alignSelf: 'center', gap: 10 }, commonStyles.row]}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={commonStyles.textSubheader}>고필봉</Text>
        <MaterialCommunityIcons
          name='pencil'
          style={[commonStyles.iconSmall, { color: colors.PRIMARY }]}
        />
      </Pressable>
      <View style={commonStyles.row}>
        <MaterialCommunityIcons
          name='chess-queen'
          style={[commonStyles.iconSmall, { color: colors.PRIMARY }]}
        />
        <Text>방장</Text>
      </View>
      <View style={commonStyles.row}>
        <MaterialCommunityIcons
          name='email-newsletter'
          style={[commonStyles.iconSmall, { color: colors.PRIMARY }]}
        />
        <Text>초대 코드</Text>
      </View>
      <View style={commonStyles.row}>
        <MaterialCommunityIcons
          name='human-queue'
          style={[commonStyles.iconSmall, { color: colors.PRIMARY }]}
        />
        <Text>멤버 목록</Text>
      </View>
      <View style={{ padding: 10, gap: 10 }}>
        <View
          style={{
            borderBottomWidth: 1,
            paddingBottom: 5,
            borderBottomColor: colors.GRAY_200
          }}
        >
          <Text style={commonStyles.textBody}>jhchoi</Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            paddingBottom: 5,
            borderBottomColor: colors.GRAY_200
          }}
        >
          <Text>쥬히히</Text>
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
            <GroupCreateForm closeModal={closeModal} title='그룹 이름 수정' />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({});

export default GroupDetail;
