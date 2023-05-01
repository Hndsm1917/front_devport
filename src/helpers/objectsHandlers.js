/**
  @description Recursively extracts all non-object properties and returns them as an array.
  @param {Object} obj - The object to extract properties from.
  @returns {Array} An array of non-object properties in the format "key: value".
  @throws {Error} If the argument is not an object.
 */
export function recursiveObjFields(obj) {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('The argument should be an object.');
  }

  const arr = [];

  /**
    @description Recursively iterates through the object and extracts all non-object properties.
    @param {Object} obj - The object to iterate through.
   */
  function iterateObj(obj) {
    Object.keys(obj).forEach((key) => {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (typeof value === 'object' && value !== null) {
          iterateObj(value);
        } else {
          arr.push(`${key}: ${value}`);
        }
      }
    });
  }

  iterateObj(obj);

  return arr;
}

export function rewriteValInObj(field, val, compareField, compareVal) {
  // return arr.map((_obj) => {
  //   const obj = { ..._obj };
  //   if (_obj[compareVal] === compareVal) {
  //     obj[field] = val;
  //     console.log(obj);
  //   }
  //
  //   return obj;
  // });
}
