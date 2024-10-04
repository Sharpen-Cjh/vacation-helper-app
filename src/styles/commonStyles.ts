// src/styles/commonStyles.ts
import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.medium
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textHeader: {
    ...typography.header
  },
  textSubheader: {
    ...typography.subHeader
  },
  textBody: {
    ...typography.body
  },
  textLeft: {
    textAlign: 'left'
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    padding: spacing.medium,
    borderRadius: 8
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  },
  iconSmall: {
    fontSize: 20,
    color: colors.black,
    marginRight: spacing.small
  },
  iconMedium: {
    fontSize: 30,
    color: colors.black,
    marginRight: spacing.medium
  },
  iconLarge: {
    fontSize: 40,
    color: colors.black,
    marginRight: spacing.large
  },
  modalOverlayFull: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContainerFull: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.white,
    padding: spacing.large,
    justifyContent: 'center'
  },
  modalOverlaySmall: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContainerSmall: {
    width: '90%',
    padding: spacing.large,
    backgroundColor: colors.white,
    borderRadius: 10
  }
});
