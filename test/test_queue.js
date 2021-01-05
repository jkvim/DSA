import Queue from '../src/queue';

describe('Queue', () => {
  describe('enqueue', () => {
    it('should insert a element at last', () => {
      const q = new Queue([1, 2, 3]);
      q.enqueue(4);
      expect(q.toArray()).toEqual([1, 2, 3, 4]);
    });
  });

  describe('dequeue', () => {
    it('should remove a element at first', () => {
      const q = new Queue([1, 2, 3]);
      const front = q.dequeue();
      expect(front).toBe(1);
      expect(q.toArray()).toEqual([2, 3]);
    });
  });

  describe('front', () => {
    it('should return the first element', () => {
      const q = new Queue([1, 2, 3]);
      expect(q.front()).toBe(1);
    });
  });
});
