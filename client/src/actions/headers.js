export const setHeaders = () => {
  const token = localStorage.getItem('userToken');
  return { headers: { Authorization: `Token token=${token}`} };
};
