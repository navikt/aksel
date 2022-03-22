// https://github.com/mui/material-ui/blob/99a344214e1e83de5e715c49a3c604bc88bff077/packages/mui-utils/src/debounce.js
export default function debounce(func, wait = 166) {
  let timeout;
  function debounced(...args) {
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
