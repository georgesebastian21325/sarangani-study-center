export const MEAL_COLORS = {
  breakfast: '#f97316',
  lunch: '#10b981',
  merienda: '#8b5cf6',
  supper: '#3b82f6',
};

export const MEAL_ICONS = {
  breakfast: '🌅',
  lunch: '☀️',
  merienda: '🌤️',
  supper: '🌙',
};

export const RESIDENTS = [
  {
    id: 1,
    name: 'Alice Johnson',
    avatar: 'AJ',
    meals: { breakfast: true, lunch: true, merienda: false, supper: true },
    week: 14,
    total: 20,
  },
  {
    id: 2,
    name: 'Bob Smith',
    avatar: 'BS',
    meals: { breakfast: true, lunch: true, merienda: true, supper: true },
    week: 20,
    total: 20,
  },
  {
    id: 3,
    name: 'Charlie Davis',
    avatar: 'CD',
    meals: { breakfast: true, lunch: false, merienda: false, supper: false },
    week: 5,
    total: 20,
  },
  {
    id: 4,
    name: 'Diana Prince',
    avatar: 'DP',
    meals: { breakfast: true, lunch: true, merienda: true, supper: false },
    week: 16,
    total: 20,
  },
  {
    id: 5,
    name: 'Ethan Moore',
    avatar: 'EM',
    meals: { breakfast: false, lunch: true, merienda: true, supper: true },
    week: 18,
    total: 20,
  },
  {
    id: 6,
    name: 'Fiona Clarke',
    avatar: 'FC',
    meals: { breakfast: true, lunch: true, merienda: false, supper: false },
    week: 10,
    total: 20,
  },
];

export const WEEKLY_DATA = [
  { day: 'Mon', breakfast: 38, lunch: 42, merienda: 28, supper: 35 },
  { day: 'Tue', breakfast: 36, lunch: 40, merienda: 30, supper: 33 },
  { day: 'Wed', breakfast: 40, lunch: 38, merienda: 25, supper: 36 },
  { day: 'Thu', breakfast: 35, lunch: 44, merienda: 32, supper: 38 },
  { day: 'Fri', breakfast: 42, lunch: 41, merienda: 27, supper: 30 },
  { day: 'Sat', breakfast: 42, lunch: 41, merienda: 27, supper: 30 },
  { day: 'Sun', breakfast: 42, lunch: 41, merienda: 27, supper: 30 },
];

export const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'residents', label: 'Resident Status' },
  { id: 'calendar', label: 'Meal Calendar' },
];

export const MEALS = ['breakfast', 'lunch', 'merienda', 'supper'];

