export const getModifiedDates = (mealSelections, requestData) =>
  Array.from(
    new Set([
      ...Object.keys(mealSelections).filter(
        (key) => mealSelections[key].length > 0
      ),
      ...Object.keys(requestData).filter((key) => {
        const request = requestData[key];
        return (
          request?.viand ||
          request?.sandwich ||
          request?.eggs ||
          request?.guests > 0
        );
      }),
    ])
  ).sort((a, b) => new Date(a) - new Date(b));
