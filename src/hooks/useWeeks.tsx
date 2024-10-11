import { useMemo } from 'react';
import { DAYS_IN_A_WEEK } from '@constants/constants';

const useWeeks = (days: Date[]) => {
  return useMemo(() => {
    const weekChunks: Date[][] = [];
    for (let i = 0; i < days.length; i += DAYS_IN_A_WEEK) {
      weekChunks.push(days.slice(i, i + DAYS_IN_A_WEEK));
    }
    return weekChunks;
  }, [days]);
};

export default useWeeks;
