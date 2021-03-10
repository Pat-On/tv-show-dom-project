export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export function debounce(func, wait, immediate) {
  let timeout;

  return function executedFunction() {
    let later = function () {
      timeout = null;
      if (!immediate) func();
    };

    let callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func();
  };
}
