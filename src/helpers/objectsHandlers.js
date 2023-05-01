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

export function placeholder() {

}
