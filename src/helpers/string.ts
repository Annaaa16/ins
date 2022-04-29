export const isEmptyInput = (str: string | undefined) => {
  if (str == null) return true;

  return str.trim() === '';
};
