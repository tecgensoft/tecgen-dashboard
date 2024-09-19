
/* eslint-disable @typescript-eslint/ban-ts-comment */
 // @ts-nocheck 
export const formatDate = (date) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const result = new Date(date);
  return result.toLocaleString('en-US', options);
};
export const formatTime = (time) => {
  const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  const result = new Date(time);
  return result.toLocaleString('en-US', options);
};