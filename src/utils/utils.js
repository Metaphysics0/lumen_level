// Check if token is still valid
// Returns true if token is null/expired
// Returns false if token is still valid
const hasTokenExpired = (time) => {
  if (time) {
    return time + 36000 < Date.now();
  }
  return true;
};

// Convert MM/DD/YYYY to YYYY-MM-DD format
const formatDate = (date) => {
  const split = date.split('/');
  return [split[2], split[0], split[1]].join('-');
};

// Emojis
const emojis = {
  Bedtime: '😴',
  Fasting: '🙅',
  IntermittentFasting: '⏳',
  PostWorkout: '💪🏻',
  PostMeal: '🍽',
  PreMeal: '🍱',
  PreWorkout: '🏋🏻‍♀️',
};

export { hasTokenExpired, formatDate, emojis };
