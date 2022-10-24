export const getPublishDate = (time: number) => {
  const dateTimeStr = new Date(time * 1000).toLocaleString();
  return dateTimeStr;
};
