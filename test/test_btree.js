import { BTNode, BTree } from '../src/btree';

describe('Btree', () => {
  describe('empty', () => {
    it('should return true when the tree is empty', () => {
      const tree = new BTree();
      expect(tree.empty).toBe(true);
    });

    it('should return false when the tree is not empty', () => {
      const tree = new BTree();
      tree.insert(3);
      expect(tree.empty).toBe(false);
    });
  });

  describe('search', () => {
    it('should return the node if found in node', () => {
      const tree = new BTree();
      const lc = new BTNode(1);
      const rc = new BTNode(3);
      const p = new BTNode(2, lc, rc);
      tree.root = p;
      expect(tree.search(3)).toEqual(rc);
      expect(tree.search(1)).toEqual(lc);
    });

    it('should return null if not found', () => {
      const tree = new BTree();
      const lc = new BTNode(1);
      const rc = new BTNode(3);
      const p = new BTNode(2, lc, rc);
      tree.root = p;
      expect(tree.search(5)).toBeNull();
    });
  });

  describe('insert', () => {
    it('insert as root if tree is empty', () => {
      const tree = new BTree();
      expect(tree.insert(3)).toBe(true);
      expect(tree.root.key.get(0)).toBe(3);
    });

    it('should return false if is exists', () => {
      const tree = new BTree();
      tree.insert(3);
      expect(tree.insert(3)).toBe(false);
    });

    it('should insert to same node while no overflow', () => {
      const tree = new BTree(4); // 4-level btree
      tree.insert(3);
      tree.insert(2);
      tree.insert(1);
      expect(tree.size).toBe(3);
      expect(tree.root.key.raw()).toEqual([1, 2, 3]);
    });

    it('should soveOverflow when child size greater than order', () => {
      const tree = new BTree(4);
      tree.insert(3);
      tree.insert(2);
      tree.insert(1);
      tree.insert(0);
      expect(tree.size).toBe(4);
      expect(tree.root.child.size()).toBeLessThanOrEqual(4);
    });
  });

  describe('remove', () => {
    it('should return false when not found', () => {
      const tree = new BTree();
      for (let i = 0; i < 5; i++) {
        tree.insert(i);
      }
      expect(tree.remove(5)).toBe(false);
    });

    it('should remove the element', () => {
      const tree = new BTree(4);
      tree.insert(0);
      tree.insert(1);
      tree.insert(2);
      expect(tree.remove(2)).toBe(true);
      expect(tree.size).toBe(2);
      expect(tree.root.key.raw()).toEqual([0, 1]);
    });

    it('should solve underflow when child size less than half of order', () => {
      const tree = new BTree();
      const lc = new BTNode(1);
      const rc = new BTNode(3);
      const p = new BTNode(2, lc, rc);
      tree.root = p;
      tree.size = 3;
      expect(tree.remove(3)).toBe(true);
      expect(tree.root.key.raw()).toEqual([1, 2]);
    });
  });

  describe('solveOverflow', () => {
    it('should lift 2 as root', () => {
      const tree = new BTree(3);
      for (let i = 1; i <= 3; i++) {
        tree.insert(i);
      }
      const { key, child } = tree.root;
      expect(key.raw()).toEqual([2]);
      expect(child.get(0).key.raw()).toEqual([1]);
      expect(child.get(1).key.raw()).toEqual([3]);
    });

    it('should insert 4 next to 3', () => {
      const tree = new BTree(3);
      for (let i = 1; i <= 4; i++) {
        tree.insert(i);
      }
      const { key, child } = tree.root;
      expect(key.raw()).toEqual([2]);
      expect(child.get(0).key.raw()).toEqual([1]);
      expect(child.get(1).key.raw()).toEqual([3, 4]);
    });

    it('should lift 4 to parent', () => {
      const tree = new BTree(3);
      for (let i = 1; i <= 5; i++) {
        tree.insert(i);
      }
      const { key, child } = tree.root;
      expect(key.raw()).toEqual([2, 4]);
      expect(child.get(0).key.raw()).toEqual([1]);
      expect(child.get(1).key.raw()).toEqual([3]);
      expect(child.get(2).key.raw()).toEqual([5]);
    });

    it('should insert 6 next 5', () => {
      const tree = new BTree(3);
      for (let i = 1; i <= 6; i++) {
        tree.insert(i);
      }
      const { key, child } = tree.root;
      expect(key.raw()).toEqual([2, 4]);
      expect(child.get(0).key.raw()).toEqual([1]);
      expect(child.get(1).key.raw()).toEqual([3]);
      expect(child.get(2).key.raw()).toEqual([5, 6]);
    });
  });

  describe('solveUnderflow', () => {
    it('should borrow from parent if left sibling is large enough', () => {
      const tree = new BTree(3);
      for (let i = 6; i > 2; i--) {
        tree.insert(i);
      }
      const { key, child } = tree.root;
      expect(key.raw()).toEqual([5]);
      expect(child.get(0).key.raw()).toEqual([3, 4]);
      expect(child.get(1).key.raw()).toEqual([6]);
      tree.remove(6);
      expect(key.raw()).toEqual([4]);
      expect(child.get(0).key.raw()).toEqual([3]);
      expect(child.get(1).key.raw()).toEqual([5]);
    });

    it('should borrow from parent if right sibling is large enough', () => {
      const tree = new BTree(3);
      for (let i = 1; i < 7; i++) {
        tree.insert(i);
      }
      const { key, child } = tree.root;
      expect(key.raw()).toEqual([2, 4]);
      expect(child.get(0).key.raw()).toEqual([1]);
      expect(child.get(1).key.raw()).toEqual([3]);
      expect(child.get(2).key.raw()).toEqual([5, 6]);
      tree.remove(3);
      expect(key.raw()).toEqual([2, 5]);
      expect(child.get(0).key.raw()).toEqual([1]);
      expect(child.get(1).key.raw()).toEqual([4]);
      expect(child.get(2).key.raw()).toEqual([6]);
    });

    it('should swap with successor if is not leaf', () => {
      const tree = new BTree(3);
      for (let i = 1; i < 4; i++) {
        tree.insert(i);
      }
      const { child } = tree.root;
      expect(tree.root.key.raw()).toEqual([2]);
      tree.remove(2);
      expect(tree.root.key.raw()).toEqual([1, 3]);
    });

    it('should merge parent and right sibling if right sibling less than half of order', () => {
      const tree = new BTree(3);
      for (let i = 1; i < 4; i++) {
        tree.insert(i);
      }
      const { child } = tree.root;
      expect(tree.root.key.raw()).toEqual([2]);
      expect(child.get(0).key.raw()).toEqual([1]);
      expect(child.get(1).key.raw()).toEqual([3]);
      tree.remove(1);
      expect(tree.root.key.raw()).toEqual([2, 3]);
    });

    it('should merge parent and left sibling if left sibling less than half of order', () => {
      const tree = new BTree();
      for (let i = 1; i < 4; i++) {
        tree.insert(i);
      }
      const { child } = tree.root;
      expect(tree.root.key.raw()).toEqual([2]);
      expect(child.get(0).key.raw()).toEqual([1]);
      expect(child.get(1).key.raw()).toEqual([3]);
      tree.remove(3);
      expect(tree.root.key.raw()).toEqual([1, 2]);
    });
  });
});

