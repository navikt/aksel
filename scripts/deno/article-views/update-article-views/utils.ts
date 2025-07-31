export const hashString = (str: string) => {
  let output = 1;
  for (let i = 0; i < str.length; i++) {
    output *= str[i].charCodeAt(0);
    output %= Number.MAX_SAFE_INTEGER;
  }

  return output;
};

export const amplitudeFetchJSON = async (chart_id: string) => {
  const url = `https://reops-proxy.intern.nav.no/amplitude/100002016/api/3/chart/${chart_id}/query`;
  return await fetch(url)
    .then((res) => res.json())
    .catch((e) => {
      throw new Error(e);
    });
};

export const sum_last_n = (view_entry: { value: number }[], last_n: number) => {
  return view_entry
    .slice(-last_n) // the query holds more than 24 hours of data, but we only want the last 24
    .reduce((a: number, b: { value: number }) => a + b.value, 0);
};
