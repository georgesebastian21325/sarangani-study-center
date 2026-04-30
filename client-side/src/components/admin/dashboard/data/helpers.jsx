import { Coffee, Moon, Sun } from 'lucide-react';

export const getGreetingConfig = () => {
  const hour = new Date().getHours();
  if (hour < 12)
    return {
      text: 'Good Morning',
      icon: <Coffee size={18} className="text-orange-400" />,
    };
  if (hour < 18)
    return {
      text: 'Good Afternoon',
      icon: <Sun size={18} className="text-yellow-500" />,
    };
  return {
    text: 'Good Evening',
    icon: <Moon size={18} className="text-indigo-400" />,
  };
};

export const isPastDate = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const c = new Date(date);
  c.setHours(0, 0, 0, 0);
  return c < today;
};

export const isToday = (date) => {
  const t = new Date();
  return (
    date.getDate() === t.getDate() &&
    date.getMonth() === t.getMonth() &&
    date.getFullYear() === t.getFullYear()
  );
};

export const generateCalendarDays = (viewDate) => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const first = new Date(year, month, 1);
  const start = new Date(first);
  start.setDate(1 - first.getDay());

  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return {
      fullDate: d,
      currentMonth: d.getMonth() === month,
      key: d.toDateString(),
    };
  });
};

export const getMockDayCounts = (dateKey) => {
  const seed = dateKey.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const rng = (n) => ((seed * 7 + n * 13) % 20) + 22;
  return {
    breakfast: rng(1),
    lunch: rng(2),
    merienda: rng(3),
    supper: rng(4),
  };
};

