export function paginate(arr, size) {
  return arr.reduce((acc, val, i) => {
    let idx = Math.floor(i / size);
    if (!acc[idx]) {
      acc[idx] = [];
    }
    let page = acc[idx];
    page.push(val);

    return acc;
  }, []);
}
