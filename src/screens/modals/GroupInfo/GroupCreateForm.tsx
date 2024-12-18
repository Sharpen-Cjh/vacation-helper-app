import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ButtonRow from '@/src/components/\bButtonRow';
import { commonStyles } from '@/src/styles/commonStyles';
import useGroupInfo from '@/src/hooks/queries/useGroup';
import InputField from '@/src/components/InputField';
import useForm from '@/src/hooks/useForm';
import { validateGroupCreateForm } from '@/src/utils';

interface GroupCreateFormProps {
  closeModal: () => void;
  title?: string;
  groupId?: string;
}

const GroupCreateForm = ({
  closeModal,
  title = '그룹 생성',
  groupId = ''
}: GroupCreateFormProps) => {
  const { createGroupMutation, updateGroupInfoMutation } = useGroupInfo();
  const groupForm = useForm({
    initialValue: {
      groupName: ''
    },
    validate: validateGroupCreateForm
  });
  const isSaveDisabled = !!groupForm.errors.groupName;

  const handlePressSaveButton = () => {
    title === '그룹 생성' ? createGroup() : updateGroupName();
  };

  const createGroup = () => {
    createGroupMutation.mutate(groupForm.values.groupName, {
      onSuccess: () => {
        closeModal();
      }
    });
  };

  const updateGroupName = () => {
    updateGroupInfoMutation.mutate(
      {
        groupId: groupId,
        groupName: groupForm.values.groupName
      },
      {
        onSuccess: () => {
          closeModal();
        }
      }
    );
  };

  return (
    <View style={{ gap: 10 }}>
      <Text style={[commonStyles.textBody, commonStyles.textLeft]}>
        {title}
      </Text>
      <InputField
        containerStyle={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }}
        inputStyle={commonStyles.textBody}
        placeholder='그룹 이름을 입력해주세요'
        {...groupForm.getTextInputProps('groupName')}
      />
      {groupForm.errors.groupName !== '' && (
        <Text style={commonStyles.errorText}>{groupForm.errors.groupName}</Text>
      )}
      <ButtonRow
        primaryButtonDisabled={isSaveDisabled}
        primaryTitle='저장'
        secondaryTitle='취소'
        onPrimaryPress={handlePressSaveButton}
        onSecondaryPress={closeModal}
      />
    </View>
  );
};

export default GroupCreateForm;
