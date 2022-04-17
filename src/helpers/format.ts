export const displayLikeCounts = (items: any[], displayed: string) => {
  return `${items.length} ${displayed}${items.length > 1 ? 's' : ''}`;
};
