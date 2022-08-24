export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = (key) => {
  const item = JSON.parse(localStorage.getItem(key) || "{}");
  return item;
};

export const removeStorage = (key) => {
  localStorage.removeItem(key);
};
