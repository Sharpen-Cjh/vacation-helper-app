import { useState, useEffect } from 'react';

interface UseFormProps<T> {
  initialValue: T;
  validate: (values: T) => Partial<Record<keyof T, string>>;
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChangeValue = (name: keyof T, value: T[keyof T]) => {
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true
    });
  };

  const getTextInputProps = (name: keyof T) => {
    const value = values[name];
    const onChangeText = (value: T[keyof T]) => handleChangeValue(name, value);
    const onBlur = () => handleBlur(name);

    return { value: String(value), onChangeText, onBlur };
  };

  const getSwitchProps = (name: keyof T) => {
    const value = values[name];
    const onValueChange = (value: T[keyof T]) => handleChangeValue(name, value);

    return { value: Boolean(value), onValueChange };
  };

  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [validate, values]);

  return {
    values,
    errors,
    touched,
    setValues,
    getTextInputProps,
    getSwitchProps
  };
}

export default useForm;
