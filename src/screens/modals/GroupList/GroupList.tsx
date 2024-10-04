import { colors } from '@/src/styles/colors';
import { commonStyles } from '@/src/styles/commonStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';

interface GroupListProps {}

function GroupList({}: GroupListProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={[commonStyles.container]}>
      <Text style={commonStyles.textHeader}>그룹 목록</Text>
      <View style={{ flex: 1, padding: 10, justifyContent: 'space-evenly' }}>
        <View
          style={[
            commonStyles.row,
            {
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: colors.gray,
              paddingBottom: 10
            }
          ]}
        >
          <Text style={commonStyles.textSubheader}>고필봉</Text>
          <MaterialCommunityIcons
            name='dots-vertical'
            style={[commonStyles.iconSmall, { color: colors.gray }]}
            onPress={() => {
              setModalVisible(true);
            }}
          />
        </View>
      </View>
      <View style={[commonStyles.row, { justifyContent: 'space-evenly' }]}>
        <View style={commonStyles.row}>
          <MaterialCommunityIcons
            name='plus-circle'
            style={[commonStyles.iconSmall, { color: colors.gray }]}
            onPress={() => {}}
          />
          <Text>그룹 만들기</Text>
        </View>
        <View style={[commonStyles.row]}>
          <MaterialCommunityIcons
            name='run'
            style={[commonStyles.iconSmall, { color: colors.gray }]}
            onPress={() => {}}
          />
          <Text>그룹 참가하기</Text>
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
            <View style={{ gap: 15 }}>
              <View
                style={[{ alignSelf: 'center', gap: 10 }, commonStyles.row]}
              >
                <Text style={commonStyles.textSubheader}>고필봉</Text>
                <MaterialCommunityIcons
                  name='pencil'
                  style={[commonStyles.iconSmall, { color: colors.gray }]}
                />
              </View>
              <View style={commonStyles.row}>
                <MaterialCommunityIcons
                  name='chess-queen'
                  style={[commonStyles.iconSmall, { color: colors.gray }]}
                />
                <Text>방장</Text>
              </View>
              <View style={commonStyles.row}>
                <MaterialCommunityIcons
                  name='email-newsletter'
                  style={[commonStyles.iconSmall, { color: colors.gray }]}
                />
                <Text>초대 코드</Text>
              </View>
              <View style={commonStyles.row}>
                <MaterialCommunityIcons
                  name='human-queue'
                  style={[commonStyles.iconSmall, { color: colors.gray }]}
                />
                <Text>멤버 목록</Text>
              </View>
              <View style={{ padding: 10, gap: 10 }}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    paddingBottom: 5,
                    borderBottomColor: colors.gray
                  }}
                >
                  <Text style={commonStyles.textBody}>jhchoi</Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    paddingBottom: 5,
                    borderBottomColor: colors.gray
                  }}
                >
                  <Text>쥬히히</Text>
                </View>
              </View>
              <Button title='닫기' onPress={closeModal}></Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({});

export default GroupList;
