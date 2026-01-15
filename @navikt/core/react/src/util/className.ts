type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | bigint
  | null
  | boolean
  | undefined;
type ClassDictionary = Record<string, any>;
type ClassArray = ClassValue[];

function toVal(mix: Exclude<ClassValue, null | undefined | false>) {
  let result = "";

  if (typeof mix === "string" || typeof mix === "number") {
    result += mix;
  } else if (typeof mix === "object") {
    if (Array.isArray(mix)) {
      for (let i = 0; i < mix.length; i++) {
        if (mix[i]) {
          const parsedValue = toVal(mix[i]);
          if (parsedValue) {
            result && (result += " ");
            result += parsedValue;
          }
        }
      }
    } else {
      for (const key in mix) {
        if (mix[key]) {
          result && (result += " ");
          result += key;
        }
      }
    }
  }

  return result;
}

export function cl(...inputs: ClassValue[]) {
  let parsedValue = "";
  let currentValue: ClassValue;
  let result = "";

  for (let i = 0; i < inputs.length; i++) {
    if ((currentValue = inputs[i])) {
      if ((parsedValue = toVal(currentValue))) {
        result && (result += " ");
        result += parsedValue;
      }
    }
  }

  return result;
}
