const arr = [];

export function recursiveObjFields(obj) {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      recursiveObjFields(obj[key]);
    } else {
      arr.push(`${key}: ${obj[key]}`);
    }
  });

  return arr;
}

export function rewriteValInObj(field, val, compareField, compareVal) {
  return arr.map((_obj) => {
    const obj = { ..._obj };
    if (_obj[compareVal] === compareVal) {
      obj[field] = val;
      console.log(obj);
    }

    return obj;
  });
}
