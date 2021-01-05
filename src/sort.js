
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


/**
 * 
 * @param {Array} a 
 */
export function insertSort(a) {
  const n = a.length
  for (let i = 1; i < n; i++) {
    for (let j = i; j > 0 && less(a[j], a[j - 1]); j--) {
      exchange(a, j, j - 1)
    }
  }
  return a
}

/**
 * 
 * @param {Array} a 
 */
export function shellSort(a) {
  const N = a.length
  let h = 1
  while (h < N / 3) h = 3 * h + 1
  while (h >= 1) {
    for (let i = h; i < N; i++) {
      for (let j = i; j >= h && less(a[j], a[j - h]); j -= h) {
        exchange(a, j, j - h);
      }
    }
    h = Math.floor(h / 3)
  }
  return a
}