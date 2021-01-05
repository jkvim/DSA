import AVL from '../src/avl_tree';
import Queue from '../src/queue';
import { BinNode } from '../src/binary_tree';

describe('AVL', () => {
  describe('balanced', () => {
    it('should return true when subtree have same height', () => {
      const tree = new AVL();
      const root = tree.insertAsRoot(0);
      const q = new Queue([root]);
      for (let i = 1; i < 6; i += 2) {
        const node = q.dequeue();
        q.enqueue(tree.insertAsLC(node, i));
        q.enqueue(tree.insertAsRC(node, i + 1));
      }
      expect(AVL.balanced(root)).toBe(true);
    });

    it('should return false when subtree height not equal', () => {
      const tree = new AVL();
      tree.insert(0);
      tree.insert(1);
      expect(AVL.balanced(tree.root)).toBe(false);
    });
  });

  describe('balFac', () => {
    it('should return balance fator', () => {
      const tree = new AVL();
      tree.insert(0);
      tree.insert(1);
      expect(AVL.balFac(tree.root)).toBe(-1);
    });
  });

  describe('avlBalance', () => {
    it('should return true when tree is balance in avl', () => {
      const tree = new AVL();
      tree.insert(1);
      tree.insert(0);
      tree.insert(2);
      tree.insert(3);
      expect(AVL.avlBalanced(tree.root)).toBe(true);
    });
  });

  describe('tallerChild', () => {
    it('should return the taller child', () => {
      const tree = new AVL();
      tree.insert(1);
      tree.insert(0);
      tree.insert(2);
      tree.insert(3);
      tree.insert(4);
      expect(AVL.tallerChild(tree.root)).toEqual(tree.root.rc);
    });
  });

  describe('insert', () => {
    it('should balance the tree when insert', () => {
      const tree = new AVL();
      const g = tree.insert(0);
      const p = tree.insert(1);
      const q = tree.insert(2);
      expect(tree.root).toEqual(p);
      expect(p.lc).toEqual(g);
      expect(p.rc).toEqual(q);
      expect(tree.root.height).toBe(1);
    });
  });

  describe('remove', () => {
    it('should balance the tree when remove', () => {
      const tree = new AVL();
      const r = tree.insert(2);
      const lc = tree.insert(1);
      const rc = tree.insert(3);
      const v = tree.insert(0);
      expect(r.lc).toEqual(lc);
      expect(r.rc).toEqual(rc);
      expect(lc.lc).toEqual(v);
      expect(r.height).toBe(2);
      tree.remove(3);
      expect(tree.root.height).toBe(1);
      expect(lc.rc).toEqual(r);
      expect(lc.lc).toEqual(v);
      expect(tree.root).toEqual(lc);
    });
  });
});
