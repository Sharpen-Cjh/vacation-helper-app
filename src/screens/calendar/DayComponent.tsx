import React from 'react';
import { View, Text, Dimensions, Pressable } from 'react-native';
import { DateData } from 'react-native-calendars';
import { colors } from '@/src/styles/colors';
import { VacationInfo } from '@/src/types/vacationInfo';
import { truncateText } from '@/src/utils';

const { height } = Dimensions.get('window');

interface DayComponentProps {
  date: DateData;
  vacationInfos: VacationInfo[];
  onPress: () => void;
}

const DayComponent = ({ date, vacationInfos, onPress }: DayComponentProps) => {
  const isToday = date.dateString === new Date().toISOString().split('T')[0];
  const dayOfWeek = new Date(date.dateString).getDay();

  const dayColor =
    dayOfWeek === 0 ? colors.PRIMARY : dayOfWeek === 6 ? 'skyblue' : 'black';

  return (
    <Pressable
      style={{
        width: '100%',
        height: height / 6,
        borderWidth: 1,
        borderColor: colors.GRAY_200,
        paddingLeft: 5,
        paddingTop: 5
      }}
      onPress={onPress}
    >
      <View
        style={{
          borderRadius: 15,
          borderColor: isToday ? colors.PRIMARY : 'transparent',
          borderWidth: isToday ? 1 : 0,
          width: 20,
          padding: 1,
          alignItems: 'center'
        }}
      >
        <Text
          style={{
            color: dayColor,
            fontFamily: 'Gmarket-Sans-Medium',
            fontSize: 10
          }}
        >
          {date.day}
        </Text>
      </View>
      {vacationInfos.slice(0, 3).map((vacation, index) => (
        <View
          key={index}
          style={{
            width: '100%',
            backgroundColor: colors.PRIMARY,
            marginVertical: 1,
            borderRadius: 2
          }}
        >
          <Text
            style={{
              fontSize: 8,
              padding: 2,
              textAlign: 'center',
              color: 'white',
              fontFamily: 'Gmarket-Sans-Medium'
            }}
          >
            {truncateText(vacation.title, 4)}
          </Text>
        </View>
      ))}
      {vacationInfos.length > 3 && (
        <Text
          style={{
            fontSize: 10,
            color: 'gray',
            marginTop: 2,
            fontFamily: 'Gmarket-Sans-Medium'
          }}
        >
          +{vacationInfos.length - 3} more
        </Text>
      )}
    </Pressable>
  );
};

export default DayComponent;
