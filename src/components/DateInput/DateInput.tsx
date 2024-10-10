import React, { memo, useCallback, useEffect,useState } from 'react';
import { countMonths, maxYearLength } from '@constants/constants';
import { images } from '@constants/images';
import {
  createValidatedDate,
  formatInputValue,
  validateDay,
  validateMonth,
} from '@utils/dateUtils';

import { ClearButton, InputContainer, InputLabel, StyledInput } from './styled';

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regExValue = regExInput(event.target.value);
    const { day, month, year } = formatInputValue(regExValue, maxYearLength);

    const validatedMonth = validateMonth(month, countMonths);
    const validatedDay = validateDay(day, validatedMonth);
    const validatedYear =
      year.length === maxYearLength && validateYear ? validateYear(year) : year;

    const formattedValue = `${validatedDay}${validatedMonth ? '/' + validatedMonth : ''}${validatedYear ? '/' + validatedYear : ''}`;
    setInputValue(formattedValue);

    if (validatedYear.length === maxYearLength) {
      const date = createValidatedDate(
        validatedYear,
        validatedMonth,
        validatedDay,
      );

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
    <InputLabel>
      {labelText && labelText}
      <InputContainer>
        <img src={images.calendarIcon} alt="calendar" />
        <StyledInput
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Choose Date"
        />
        <ClearButton onClick={handleClear} data-cy="clear-button">
          <img src={images.clearInput} alt="clear" />
        </ClearButton>
      </InputContainer>
    </InputLabel>
  );
};

export default memo(DateInput);
