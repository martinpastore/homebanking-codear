import { snakeCase, camelCase } from 'lodash';

export const objectToSnakeCase = (obj: any) => {
  const result = {};
  Object.keys(obj).map((key) => {
    return (result[snakeCase(key)] = obj[key]);
  });

  return result;
};

export const objectToCamelCase = (obj: any) => {
  const result = {};
  Object.keys(obj).map((key) => {
    return (result[camelCase(key)] = obj[key]);
  });

  return result;
};
