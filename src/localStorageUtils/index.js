export const getLocalStorage = (value) => {
  return JSON.parse(localStorage.getItem(value));
};
export const removeLocaltorage = (value) => {
  return localStorage.removeItem(value);
};
export const setLocaltorage = (value, data) => {
  localStorage.setItem(value, JSON.stringify(data));
};
