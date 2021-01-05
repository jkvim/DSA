import { BitMap, HashTable } from '../src/hashtable';

describe('HashTable', () => {
  describe('size', () => {
    it('should return element count in hashtable', () => {
      const ht = new HashTable();
      ht.put(1, 'foo');
      expect(ht.size()).toBe(1);
    });
  });

  describe('capacity', () => {
    it('should return capacity of hashtable and it should be a prime number', () => {
      const ht = new HashTable();
      expect(ht.capacity()).toBeGreaterThan(1);
      expect(HashTable.isPrime(ht.capacity())).toBe(true);
    });
  });

  describe('put', () => {
    it('should return true when put success', () => {
      const ht = new HashTable();
      expect(ht.put(1, 'foo')).toBe(true);
    });

    it('should return false when put same key entry', () => {
      const ht = new HashTable();
      expect(ht.put(1, 'foo')).toBe(true);
      expect(ht.put(1, 'foo')).toBe(false);
    });
  });

  describe('probe4Hit', () => {
    it('should return rank of the entry when hit', () => {
      const ht = new HashTable();
      ht.put(1, 'foo');
      ht.put(2, 'bar');
      const r = ht.probe4Hit(2);
      expect(ht.indexOf(r).value).toBe('bar');
    });

    it('should return rand of null when key not exist', () => {
      const ht = new HashTable();
      ht.put(1, 'foo');
      const r = ht.probe4Hit(2);
      expect(ht.indexOf(r)).toBeNull();
    });
  });

  describe('get', () => {
    it('should return value of entry when key exist', () => {
      const ht = new HashTable();
      ht.put(1, 'foo');
      expect(ht.get(1)).toBe('foo');
    });

    it('should return null when key not exist', () => {
      const ht = new HashTable(7);
      ht.put(1, 'foo');
      expect(ht.get(2)).toBeNull();
    });
  });

  describe('probe4Free', () => {
    it('should return rank to empty solt', () => {
      const ht = new HashTable();
      ht.put(1, 'foo');
      const r = ht.probe4Free(1);
      expect(ht.indexOf(r)).toBeNull();
    });
  });

  describe('remove', () => {
    it('should return true when key exist and remove success', () => {
      const ht = new HashTable();
      ht.put(1, 'foo');
      expect(ht.remove(1)).toBe(true);
      expect(ht.get(1)).toBeNull();
    });

    it('should return false when key not exist and remove fail', () => {
      const ht = new HashTable();
      expect(ht.remove(1)).toBe(false);
    });
  });

  describe('lazilyRemoved', () => {
    it('should return lazyRemoved mark', () => {
      const ht = new HashTable();
      ht.put(1, 'foo');
      ht.remove(1);
      expect(ht.lazilyRemoved(1)).toBe(true);
      expect(ht.lazilyRemoved(0)).toBe(false);
    });
  });

  describe('markAsRemoved', () => {
    it('should mark the solt as lazyRemoved', () => {
      const ht = new HashTable(7);
      ht.markAsRemoved(0);
      expect(ht.lazilyRemoved(0)).toBe(true);
    });
  });

  describe('rehash', () => {
    it('should expand capacity to double', () => {
      const ht = new HashTable();
      const oldCapacity = ht.capacity();
      ht.rehash();
      expect(ht.capacity()).toBe(2 * oldCapacity);
    });
  });

  describe('hashCode', () => {
    it('should return origin when argument is Number', () => {
      expect(HashTable.hashCode(2)).toBe(2);
    });

    it('should return hash result when argument is String', () => {
      expect(HashTable.hashCode('foo')).toBe(114852);
    });
  });

  describe('getPrime', () => {
    const prime = HashTable.getPrime(1, 100);
    expect(HashTable.isPrime(prime)).toBe(true);
  });

  describe('bucketSort', () => {
    const arr = [4, 9, 28, 1, 22];
    expect(HashTable.bucketSort(arr)).toEqual([1, 4, 9, 22, 28]);
  });

  describe('radixSort', () => {
    const arr = [0, 78, 56, 19, 20, 100];
    expect(HashTable.radixSort(arr)).toEqual([0, 19, 20, 56, 78, 100]);
  });
});
