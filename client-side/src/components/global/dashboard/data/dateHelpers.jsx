import { Coffee, Moon, Sun } from 'lucide-react';

export const getGreetingConfig = () => {
  const hour = new Date().getHours();
  if (hour < 12)
    return {
      text: 'Good Morning',
      icon: <Coffee size={20} className="text-orange-400" />,
    };
  if (hour < 18)
    return {
      text: 'Good Afternoon',
      icon: <Sun size={20} className="text-yellow-500" />,
    };
  return {
    text: 'Good Evening',
    icon: <Moon size={20} className="text-indigo-400" />,
  };
};

export const isPastDate = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compare = new Date(date);
  compare.setHours(0, 0, 0, 0);
  return compare < today;
};

export const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const generateCalendarDays = (viewDate) => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(1 - firstDayOfMonth.getDay());

  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return {
      fullDate: date,
      currentMonth: date.getMonth() === month,
      key: date.toDateString(),
    };
  });
};

