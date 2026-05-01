export const getCompletionStatus = (pct) => {
  if (pct === 100) {
    return {
      label: 'Complete',
      color: '#047857',
      background: '#ecfdf5',
      border: '#a7f3d0',
    };
  }

  if (pct >= 50) {
    return {
      label: 'Partial',
      color: '#b45309',
      background: '#fffbeb',
      border: '#fde68a',
    };
  }

  return {
    label: 'Low',
    color: '#dc2626',
    background: '#fef2f2',
    border: '#fecaca',
  };
};

