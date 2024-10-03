import React, { useState, useCallback, memo, useEffect } from 'react';
import { ClearButton, InputContainer, InputLabel, StyledInput } from './styled';
import { images } from '@constants/images';
import { countMonths, maxYearLength } from '@constants/constants';

export interface DateInputProps {
  handleSelectDate: (date: Date | null) => void;
  validateYear?: (year: string) => string;
  validateDate?: (date: Date) => boolean;
  value?: Date | null;
  labelText?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  handleSelectDate,
  validateYear,
  value,
  labelText,
}) => {
  const [inputValue, setInputValue] = useState('');

  const regExInput = (input: string) => input.replace(/\D/g, '');

  const formatDate = (regExValue: string) => {
    const day = regExValue.substring(0, 2);
    const month = regExValue.substring(2, 4);
    const year = regExValue.substring(4, 4 + maxYearLength);
    return { day, month, year };
  };

  useEffect(() => {
    if (value) {
      const day = String(value.getDate()).padStart(2, '0');
      const month = String(value.getMonth() + 1).padStart(2, '0');
      const year = String(value.getFullYear());
      setInputValue(`${day}/${month}/${year}`);
    } else {
      setInputValue('');
    }
  }, [value]);
  const validateMonth = (month: string) => {
    const monthNum = parseInt(month);
    return monthNum > countMonths ? `${countMonths}` : month;
  };

  const validateDay = (day: string, month: string) => {
    if (!day || !month) return day;
    const maxDays = new Date(
      new Date().getFullYear(),
      parseInt(month),
      0,
    ).getDate();
    return parseInt(day) > maxDays ? `${maxDays}` : day;
  };

  const createDate = (year: string, month: string, day: string) => {
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regExValue = regExInput(event.target.value);
    const { day, month, year } = formatDate(regExValue);

    const validatedMonth = validateMonth(month);
    const validatedDay = validateDay(day, validatedMonth);
    const validatedYear =
      year.length === maxYearLength && validateYear ? validateYear(year) : year;

    const formattedValue = `${validatedDay}${validatedMonth ? '/' + validatedMonth : ''}${validatedYear ? '/' + validatedYear : ''}`;
    setInputValue(formattedValue);

    if (validatedYear.length === maxYearLength) {
      const date = createDate(validatedYear, validatedMonth, validatedDay);

      handleSelectDate(date);
    }

    if (regExValue.trim().length === 0) {
      handleClear();
    }
  };

  const handleClear = useCallback(() => {
    setInputValue('');
    handleSelectDate(null);
  }, [handleSelectDate]);

  return (
    <>
      {labelText && <InputLabel>{labelText}</InputLabel>}
      <InputContainer>
        <img src={images.calendarIcon} alt="calendar" />
        <StyledInput
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Choose Date"
        />
        <ClearButton onClick={handleClear}>
          <img src={images.clearInput} alt="clear" />
        </ClearButton>
      </InputContainer>
    </>
  );
};

export default memo(DateInput);
