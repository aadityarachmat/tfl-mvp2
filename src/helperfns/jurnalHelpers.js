import { getUserId } from "./InitializeUser";
import { getData } from "./firebaseHelpers";

export const getJurnalData = async (date, jurnal) => {
  const userId = getUserId();
  const path = `userData/${userId}/${jurnal}/${date}`;
  const data = await getData(path);
  return await data;
};

const getValuesArr = (obj) => {
  const arr = [];
  for (key in obj) {
    arr.push(obj[key].value);
  }
  return arr;
};

export const toObjectOfArrays = (data) => {
  let result = {};
  for (key in data) {
    result[key] = getValuesArr(data[key]);
  }
  return result;
};

export const toGridArr = (arr, rows, columns) => {
  const result = [];
  let index = 0;
  for (i = 0; i < rows; i++) {
    if (typeof arr[index] === "undefined") break;
    result.push([]);
    for (j = 0; j < columns; j++) {
      if (typeof arr[index] === "undefined") break;
      result[i].push(arr[index]);
      index++;
    }
  }
  return result;
};
