import { insertSort, selectionSort } from '../src/sort';
import { expect } from 'chai';

describe('Sort', () => {
  it('Selection Sort', () => {
    const list = [4, 3, 1, 5, 5, 8, 0, 10]
    const expected = [0, 1, 3, 4, 5, 5, 8, 10]
    expect(selectionSort(list)).to.deep.equal(expected);
  });

  it('Insert Sort', () => {
    const list = [4, 3, 1, 5, 5, 8, 0, 10]
    const expected = [0, 1, 3, 4, 5, 5, 8, 10]
    expect(insertSort(list)).to.deep.equal(expected);
  });
})