
function less(v, w) {
  return v < w;
}

function exchange(a, i, j) {
  const temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

/**
 *
 * @param {Array} a
 */
export function selectionSort(a) {
  const n = a.length
  for (let i = 0; i < n; i++) {
    let min = i
    for (let j = i + 1; j < n; j++) {
      if (less(a[j], a[min])) {
        min = j
      }
    }
    exchange(a, i, min)
  }
  return a;
}
