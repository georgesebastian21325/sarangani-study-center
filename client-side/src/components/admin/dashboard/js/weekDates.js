export const DAY_NAMES = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
  Sun: 'Sunday',
};

const DAY_ORDER = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const getCurrentWeekDates = () => {
  const today = new Date();
  const day = today.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(today);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(today.getDate() + mondayOffset);

  return DAY_ORDER.reduce((weekDates, dayKey, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return { ...weekDates, [dayKey]: date };
  }, {});
};

export const formatTableDate = (date) =>
  date.toLocaleDateString('default', { month: 'short', day: 'numeric' });

export const formatWeekRange = (weekDates) =>
  `${formatTableDate(weekDates.Mon)} - ${formatTableDate(weekDates.Sun)}`;

