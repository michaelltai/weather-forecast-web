export const displayTime = (unix) => {
  let unix_timestamp = unix;
  var tmp = new Date(unix_timestamp * 1000);
  var toDate = tmp.toLocaleTimeString();
  return toDate;
};

export const convertToHours = (i) => {
  let t = new Date(i * 1000);
  let hours = t.getHours();
  return hours;
};

export const convertToDate = (i) => {
  let t = new Date(i * 1000);
  let date = t.toLocaleDateString();
  return date;
};
