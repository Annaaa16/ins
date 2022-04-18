export const displayLikeCounts = (items: any[], displayed: string) => {
  return `${items.length} ${displayed}${items.length > 1 ? 's' : ''}`;
};

export const getNameInMail = (mail?: string) => {
  return mail?.split('@')[0] ?? 'name';
};
