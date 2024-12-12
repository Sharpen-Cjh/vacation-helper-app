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
  currentUserId?: number;
  holidayInfo: string | null;
}

const DayComponent = ({
  date,
  vacationInfos,
  onPress,
  currentUserId,
  holidayInfo
}: DayComponentProps) => {
  const isToday = date.dateString === new Date().toISOString().split('T')[0];
  const dayOfWeek = new Date(date.dateString).getDay();

  const dayColor = holidayInfo
    ? colors.PRIMARY
    : dayOfWeek === 0
    ? colors.PRIMARY
    : dayOfWeek === 6
    ? colors.SECONDARY
    : 'black';

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
          alignItems: 'center',
          flexDirection: 'row',
          gap: 5
        }}
      >
        <View
          style={{
            borderRadius: 15,
            borderColor: isToday ? colors.PRIMARY : 'transparent',
            borderWidth: isToday ? 1 : 0,
            width: isToday ? '30%' : 'auto',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              color: dayColor,
              fontFamily: 'Gmarket-Sans-Medium',
              fontSize: 9
            }}
          >
            {date.day}
          </Text>
        </View>

        {holidayInfo && (
          <Text
            style={{
              fontSize: 6,
              color: colors.PRIMARY,
              fontFamily: 'Gmarket-Sans-Medium'
            }}
          >
            {truncateText(holidayInfo, 5)}
          </Text>
        )}
      </View>
      {vacationInfos.slice(0, 3).map((vacation, index) => {
        const isOwner = vacation.user?.id === currentUserId;
        const backgroundColor = isOwner ? colors.PRIMARY : colors.SECONDARY;
        return (
          <View
            key={index}
            style={{
              width: '100%',
              backgroundColor,
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
              {isOwner
                ? truncateText(vacation.title, 4)
                : truncateText(vacation.user!.name, 5)}
            </Text>
          </View>
        );
      })}
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
