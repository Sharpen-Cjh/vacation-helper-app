import ButtonRow from '@/src/components/\bButtonRow';
import BottomBorderedInput from '@/src/components/BottomBorderedInput';
import { commonStyles } from '@/src/styles/commonStyles';
import React from 'react';
import {
  Button,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View
} from 'react-native';

interface LeaveDaysFormProps {
  closeModal: () => void;
}

function LeaveDaysForm({ closeModal }: LeaveDaysFormProps) {
  return (
    <View style={{ gap: 20 }}>
      <Text style={commonStyles.textHeader}> 잔여 휴가 일수 변경</Text>
      <View style={[commonStyles.row, { gap: 30 }]}>
        <Text style={commonStyles.textBody}>신입사원 모드</Text>
        <Switch />
      </View>
      <BottomBorderedInput label='입사 날짜' placeholder='날짜를 입력하세요' />
      <BottomBorderedInput label='1년미만 휴가 잔여 일수' />
      <BottomBorderedInput
        label='휴가 잔여 일수'
        placeholder='잔여 휴가 일수를 입력하세요'
      />

      <ButtonRow
        primaryTitle='저장'
        secondaryTitle='취소'
        onPrimaryPress={closeModal}
        onSecondaryPress={closeModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

export default LeaveDaysForm;
