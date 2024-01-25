import dayjs from 'dayjs';

export function getWeekParams() {
  const endDate = dayjs().format('YYYY-MM-DD 23:59:59');
  const startDate = dayjs(new Date().getTime() - 6 * 24 * 3600 * 1000).format(
    'YYYY-MM-DD 00:00:00',
  );
  return [startDate, endDate];
}

export function getWeekParamsByKey(start: string = '0', end: string = '1') {
  const weeks = getWeekParams();
  return {
    [start]: weeks[0],
    [end]: weeks[1],
  };
}

export function getThreeDayParams(start: string = '0', end: string = '1') {
  const endDate = dayjs().format('YYYY-MM-DD 23:59:59');
  const startDate = dayjs(new Date().getTime() - 2 * 24 * 3600 * 1000).format(
    'YYYY-MM-DD 00:00:00',
  );
  return {
    [start]: startDate,
    [end]: endDate,
  };
}
