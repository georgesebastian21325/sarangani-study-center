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
