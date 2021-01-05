
import { Entry, Skiplist } from '../src/skiplist';
import { expect } from 'chai';
import { selectionSort } from '../src/sort';

describe('Skiplist', () => {
  describe('qSize', () => {
    it('should return sort list', () => {
      const list = [4, 3, 1, 5, 5, 8, 0, 10]
      const expected = [0, 1, 3, 4, 5, 5, 8, 10]
      expect(selectionSort(list)).to.deep.equal(expected);
    });
  });
})