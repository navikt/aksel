interface GeneralObject {
  [key: string]: any;
}

export function merge(...objs: GeneralObject[]) {
  let final = {};

  for (const obj of objs) {
    final = mergeRecursively(final, obj);
  }

  return final;
}

function mergeRecursively(objA: GeneralObject, objB: GeneralObject) {
  const objARes: GeneralObject = { ...objA };

  for (const key in objB) {
    if (!(key in objB)) {
      continue;
    } else if (isMergeableValue(objB[key]) && isMergeableValue(objARes[key])) {
      objARes[key] = mergeRecursively(objARes[key], objB[key]);
    } else {
      objARes[key] = objB[key];
    }
  }

  return objARes;
}

function isMergeableValue(value: any) {
  return value !== null && typeof value === "object";
}
