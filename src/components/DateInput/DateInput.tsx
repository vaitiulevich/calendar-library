import React, { useEffect, useState, useCallback, memo } from 'react';
import { ClearButton, InputContainer, StyledInput } from './styled';
import { images } from '@constants/images';

export interface DateInputProps {
  value: string;
  handleSelectDate: (date: Date) => void;
  validateYear?: (year: string) => string;
  validateDate?: (date: Date) => boolean;
}

const countMonths = 12;
const maxYearLength = 4;

const DateInput: React.FC<DateInputProps> = ({
  value,
  handleSelectDate,
  validateYear,
  validateDate,
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const sanitizeInput = (input: string) => input.replace(/\D/g, '');

  const formatDate = (sanitizedValue: string) => {
    const day = sanitizedValue.substring(0, 2);
    const month = sanitizedValue.substring(2, 4);
    const year = sanitizedValue.substring(4, 4 + maxYearLength);
    return { day, month, year };
  };

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
    const sanitizedValue = sanitizeInput(event.target.value);
    const { day, month, year } = formatDate(sanitizedValue);

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

    if (sanitizedValue.trim().length === 0) {
      handleClear();
    }
  };

  const handleClear = useCallback(() => {
    setInputValue('');
    handleSelectDate(new Date());
  }, [handleSelectDate]);

  return (
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
  );
};

export default memo(DateInput);
