export default getDate = () => {
  const d = new Date();
  return toDateString(d);
};

export const toDateString = (dateObject) => {
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  let date = "";
  if (day < 10 && month < 10) {
    date = `${year}-0${month}-0${day}`;
  } else if (month < 10) {
    date = `${year}-0${month}-${day}`;
  } else if (day < 10) {
    date = `${year}-${month}-0${day}`;
  } else {
    date = `${year}-${month}-${day}`;
  }
  return date;
};

export const toDateObject = (dateString) => {
  const year = parseInt(dateString.substring(0, 4));
  const month = parseInt(dateString.substring(5, 7)) - 1;
  const day = parseInt(dateString.substring(8, 10)) + 1;

  return new Date(year, month, day);
};

export const getLastDays = (dateObject, days) => {
  let result = [];
  dateObject.setDate(dateObject.getDate() - days);
  for (i = 0; i < days; i++) {
    result.push(toDateString(dateObject));
    dateObject.setDate(dateObject.getDate() + 1);
  }
  return result;
};
