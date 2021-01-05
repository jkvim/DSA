import { insertSort, selectionSort, shellSort } from '../src/sort_algorithms';

describe('Sort', () => {
  it('Selection Sort', () => {
    const list = [4, 3, 1, 5, 5, 8, 0, 10]
    const expected = [0, 1, 3, 4, 5, 5, 8, 10]
    expect(selectionSort(list)).toEqual(expected);
  });

  it('Insert Sort', () => {
    const list = [4, 3, 1, 5, 5, 8, 0, 10]
    const expected = [0, 1, 3, 4, 5, 5, 8, 10]
    expect(insertSort(list)).toEqual(expected);
  });

  it('Shell Sort', () => {
    const list = [4, 3, 1, 5, 5, 8, 0, 10]
    const expected = [0, 1, 3, 4, 5, 5, 8, 10]
    expect(shellSort(list)).toEqual(expected);
  })
})