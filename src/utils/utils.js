// Check if token is still valid
const hasTokenExpired = (time) => {
  return time + 36000 > Date.now();
};

export { hasTokenExpired };
