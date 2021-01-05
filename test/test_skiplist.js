import { Entry, Skiplist } from '../src/skiplist';

describe('Skiplist', () => {
  describe('qSize', () => {
    it('should return quadlist(bottom level) size', () => {
      const skiplist = new Skiplist();
      skiplist.put(1, 'foo');
      skiplist.put(2, 'bar');
      expect(skiplist.qSize()).toBe(2);
    });
  });

  describe('level', () => {
    it('shoud return 0 if skiplist is empty', () => {
      const skiplist = new Skiplist();
      expect(skiplist.level()).toBe(0);
    });

    it('should at least one level when insert node', () => {
      const skiplist = new Skiplist();
      skiplist.put(1, 'foo');
      expect(skiplist.level()).toBeGreaterThanOrEqual(1);
    });
  });

  describe('put', () => {
    it('should insert a entry', () => {
      const skiplist = new Skiplist();
      expect(skiplist.put(1, 'foo')).toBe(true);
    });

    it('should allow insert repeat key', () => {
      const skiplist = new Skiplist();
      expect(skiplist.put(1, 'foo'));
      expect(skiplist.put(1, 'foo'));
      expect(skiplist.qSize()).toBe(2);
    });
  });

  describe('get', () => {
    it('should return a entry if exist', () => {
      const skiplist = new Skiplist();
      skiplist.put(1, 'foo');
      expect(skiplist.get(1)).toBe('foo');
    });

    it('should return null if not exist', () => {
      const skiplist = new Skiplist();
      skiplist.put(1, 'foo');
      expect(skiplist.get(2)).toBeNull();
    });
  });

  describe('remove', () => {
    it('should return true if remove success', () => {
      const skiplist = new Skiplist();
      skiplist.put(1, 'foo');
      expect(skiplist.remove(1)).toBe(true);
    });

    it('should return false if not exist', () => {
      const skiplist = new Skiplist();
      expect(skiplist.remove(1)).toBe(false);
    });
  });

  describe('skipSearch', () => {
    it('should return quadlistNode if found', () => {
      const skiplist = new Skiplist();
      skiplist.put(1, 'foo');
      skiplist.put(2, 'bar');
      const quadlist = skiplist.first();
      const quadNode = quadlist.data.first();
      const q = skiplist.skipSearch(quadlist, quadNode, 2);
      expect(q.entry.value).toBe('bar');
    });

    it('should return null if not found', () => {
      const skiplist = new Skiplist();
      skiplist.put(1, 'foo');
      const quadlist = skiplist.first();
      const quadNode = quadlist.data.first();
      const q = skiplist.skipSearch(quadlist, quadNode, 2);
      expect(q).toBeNull();
    });
  });
});

