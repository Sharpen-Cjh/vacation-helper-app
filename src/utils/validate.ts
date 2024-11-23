import { VacationInfo } from '../types/vacationInfo';

type UserInformation = {
  email: string;
  password: string;
};

type VacationInfoErrors = {
  title: string;
  start: string;
  end: string;
  annualLeaveDays: string;
  underOneYearAnnualLeaveDays: string;
};

type AnnualLeaveInfoErrors = {
  updatedAvailableAnnualLeave: string;
  updatedAvailableUnderOneYearLeaves: string;
  dateOfJoining: string;
};

function validateUser(values: UserInformation) {
  const errors = {
    email: '',
    password: ''
  };
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }

  if (!(values.password.length >= 8 && values.password.length < 20)) {
    errors.password = '비밀번호는 8자 이상 20자 이하로 입력해주세요.';
  }
  return errors;
}

function validateLogin(values: UserInformation) {
  return validateUser(values);
}

function validateSignup(values: UserInformation & { passwordConfirm: string }) {
  const errors = validateUser(values);
  const signupErrors = { ...errors, passwordConfirm: '' };

  if (values.password !== values.passwordConfirm) {
    signupErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  }

  return signupErrors;
}

const validateEventForm = (values: Omit<VacationInfo, 'id'>) => {
  const errors: Record<keyof VacationInfoErrors, string> = {
    title: '',
    start: '',
    end: '',
    annualLeaveDays: '',
    underOneYearAnnualLeaveDays: ''
  };

  if (!values.title) {
    errors.title = '메모를 입력해주세요';
  }

  if (!values.start) {
    errors.start = '시작일을 선택해주세요';
  }

  if (!values.end) {
    errors.end = '종료일을 선택해주세요';
  }

  if (!values.annualLeaveDays && values.annualLeaveDays !== 0) {
    errors.annualLeaveDays = '연차를 입력해주세요';
  }

  if (
    !values.underOneYearAnnualLeaveDays &&
    values.underOneYearAnnualLeaveDays !== 0
  ) {
    errors.underOneYearAnnualLeaveDays = '1년 미만 연차를 입력해주세요';
  }

  const startDate = new Date(values.start);
  const endDate = new Date(values.end);

  if (startDate > endDate) {
    errors.start = '시작일은 종료일보다 앞에 있어야 합니다.';
  }

  return errors;
};

const validateAnnualLeaveForm = (values: {
  updatedAvailableAnnualLeave: number;
  updatedAvailableUnderOneYearLeaves: number;
  dateOfJoining: string;
}) => {
  const errors: Record<keyof AnnualLeaveInfoErrors, string> = {
    updatedAvailableAnnualLeave: '',
    updatedAvailableUnderOneYearLeaves: '',
    dateOfJoining: ''
  };

  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const dateOfJoining = new Date(values.dateOfJoining);

  if (dateOfJoining > today) {
    errors.dateOfJoining = '입사 날짜는 오늘 이전이어야 힙니다.';
  } else if (dateOfJoining < oneYearAgo) {
    errors.dateOfJoining = '입사 날짜는 1년 이내여야 합니다.';
  }

  if (values.updatedAvailableAnnualLeave < 0) {
    errors.updatedAvailableAnnualLeave = '연차는 0 이상이어야 합니다.';
  }

  if (values.updatedAvailableUnderOneYearLeaves < 0) {
    errors.updatedAvailableUnderOneYearLeaves =
      '1년 미만 연차는 0 이상이어야 합니다.';
  }

  return errors;
};

const validateGroupCreateForm = (values: { groupName: string }) => {
  const errors = {
    groupName: ''
  };

  if (!values.groupName.trim()) {
    errors.groupName = '그룹 이름을 입력해주세요.';
  }

  if (values.groupName.length < 2) {
    errors.groupName = '그룹 이름은 최소 2자 이상이어야 합니다.';
  }

  if (values.groupName.length > 10) {
    errors.groupName = '그룹 이름은 최대 10자 이하이어야 합니다.';
  }

  return errors;
};

export {
  validateLogin,
  validateSignup,
  validateEventForm,
  validateAnnualLeaveForm,
  validateGroupCreateForm
};
