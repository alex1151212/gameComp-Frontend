import { lowerFirst } from "lodash";

export const camelCaseKeys = (object: any): any => {
  if (Array.isArray(object)) {
    return object.map((v) => camelCaseKeys(v));
  } else if (object && object !== null && object.constructor === Object) {
    return Object.keys(object).reduce((result, key) => {
      if (key === "Channels") {
        return {
          ...result,
          [lowerFirst(key)]: object[key],
        };
      } else {
        return {
          ...result,
          [key === "ID" ? "ID" : lowerFirst(key)]: camelCaseKeys(object[key]),
        };
      }
    }, {});
  }
  return object;
};
