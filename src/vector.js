import { rand } from '../util';
import Fib from '../fib';

class Vector {
  constructor() {
    this._elems = [];
  }

  swap(a, b) {
    var temp = this._elems[a];
    this._elems[a] = this._elems[b];
    this._elems[b] = temp;
  }

  copyFrom(A, lo, hi) {
    this._elems = [];
    for (var i = lo, j = 0; i < hi; i++) {
      this._elems[j++] = A.get(i);
    }
  }

  bubble(lo, hi) {
    var sorted = true;
    while (++lo < hi) {
      if (this._elems[lo-1] > this._elems[lo]) {
        sorted = false;
        swap(lo - 1, lo);
      }
    }
    return sorted;
  }

  bubbleSort(lo, hi) {
    while (!bubble(lo, hi--));
  }

  max(lo, hi) {

  }

  selectionSort(lo, hi) {

  }

  merge(lo, mi, hi) {
    var la = mi - lo;
    var lb = hi - mi;
    var tempA = this._elems.slice(lo, mi);
    var tempB = this._elems.slice(mi, hi);
    for (var i = 0, j = 0, k = 0; (j < la) || (k < lb);) {
      if ((j < la) && (!(k < lb) || tempA[j] <= tempB[k])) {
        A[i++] = tempA[j++];
      }
      if ((k < lb) && (!(j < la) || (tempB[k] < tempA[j])) {
        A[i++] = tempB[k++];
      }
    }

  }

  mergeSort(lo, hi) {
    if (hi - lo < 2) {
      return;
    }
    var mi = (lo + hi) / 2;
    mergeSort(lo, mi);
    mergeSort(mi, hi);
    merge(lo, mi, hi);
  }

  partition(lo, hi) {

  }

  quickSort(lo, hi) {

  }

  heapSort(lo, hi) {

  }

  // 只读接口
  size() {
    return this._elems.length;
  }

  empty() {
    return !this.size();
  }

  disordered() {
    var n = 0;
    for (var i = 1; i < this.size(); i++) {
      if (this._elems[i - 1] > this._elems[i]) {
        n++;
      }
    }
    return n;
  }

  // 无序查找
  find(e) {
    return findInArea(e, 0, this.size());
  }

  findInArea(e, lo, hi) {
    while ((lo < hi--) && (e !== this._elems[hi])); // 从后向前查找
    return hi;  // 失败返回 lo - 1
  }

  // 有序查找
  search(e) {
    return 0 < this.size() ? this.searchInArea(e, 0, this.size()) : -1; 
  }

  searchInArea(e, lo, hi) {
    return (rand() % 2) ? binSearch(e, lo, hi) : fibSearch(e, lo, hi);
  }

  binSearch(e, lo, hi) {
    while (lo < hi) {
      var mi = (lo + hi) >> 1;
      (e < this._elems[mi]) ? hi = mi : lo = mi + 1;
    }
    return --lo;
  }

  fibSearch(e, lo, hi) {
    var fib = new Fib(hi - lo);
    while (lo < hi) {
      var mi = lo + fib.get() - 1;
      if (e < A[mi]) {
        hi = mi;
      } else if (A[mi] < e) {
        lo = mi + 1;
      } else {
        return mi;
      }
    }
  }

  // 可写访问接口
  get(r) {
    return this._elems[r];
  }

  set(r, e) {
    return this._elems[r] = e;
  }

  remove(r) {
    var e = this._elems[r];
    this.removeInArea(r, r + 1);
    return e;
  }

  removeInArea(lo, hi) {
    if (lo === hi) {
      return 0;
    }
    while (hi < this.size()) {
      this._elems[lo++] = this._elems[hi++];
    }
    return hi - lo;
  }

  insert(r, e) {
    for (var i = this.size(); i > r; i--) {
      this._elems[i] = this._elems[i - 1];
    }
    this._elems[r] = e;
    return r;
  }

  insert(e) {
    return this.insert(this.size(), e);
  }

  sort() {
    return this.sort(0, this.size());
  }

  sortInArea(lo, hi) {
    switch (rand() % 5) {
      case 1: bubbleSort(lo, hi);
        break;
      case 2: selectionSort(lo, hi);
        break;
      case 3: mergeSort(lo, hi);
        break;
      case 4: headSort(lo, hi);
        break;
      default: quickSort(lo, hi);
        break;
    }
  }

  unsort() {
    this.unsortInArea(0, this.size());
  }

  unsortInArea(lo, hi) {
    for (var i = hi; i > 0; i--) {
      swap(i - 1, Math.random() % i);
    }
  }

  deduplicate() {
    var oldSize = this.size();
    var i = 1;
    while (i < this.size()) {
      (this.findInArea(this._elems[i], 0, i) < 0) ?
      i++: remove(i);
    }
    return oldSize - this.size();
  }

  uniquify() {
    var i = 0;
    var j = 0;
    while (j++ < this.size()) {
      if (this._elems[j] !== this._elems[i]) {
        this._elems[++i] = this._elems[j];
      }
    }
    return j - i;
  }

  traverse(visit) {
    for (var i = 0; i < this.size(); i++) {
      visit(this._elems[i]);
    }
  }
};

module.exports = Vector;