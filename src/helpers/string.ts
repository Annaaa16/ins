export const isEmptyInput = (str?: string) => {
  if (str == null) return false;

  return !str.trim();
};
