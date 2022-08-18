// https://github.com/mui/material-ui/blob/master/packages/mui-utils/src/debounce.js
export default function debounce(func, wait = 166) {
  let timeout;
  function debounced(this: any, ...args) {
    const later = () => {
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }

  debounced.clear = () => {
    clearTimeout(timeout);
  };

  return debounced;
}
