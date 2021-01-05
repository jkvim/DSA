import { BinNode, BinTree } from '../src/binary_tree';
import Queue from '../src/queue';

describe('Binary Tree', () => {
  describe('max', () => {
    it('should return the max one', () => {
      expect(BinTree.max(10, 9)).toBe(10);
    });
  });

  describe('empty', () => {
    it('should return true when the tree is empty', () => {
      const s = new BinTree();
      expect(s.empty).toBe(true);
    });
  });

  describe('insertAsRoot', () => {
    it('should insert node as root', () => {
      const s = new BinTree();
      const r = s.insertAsRoot(0);
      expect(s.root === r).toBe(true);
      expect(s.size).toBe(1);
    });
  });

  describe('insertAsLC', () => {
    it('should insert node as left child of root', () => {
      const s = new BinTree();
      const r = s.insertAsRoot(0);
      const lc = s.insertAsLC(r, 1);
      expect(r.height).toBe(1);
      expect(s.size).toBe(2);
      expect(r.lc).toEqual(lc);
    });
  });

  describe('insertAsRC', () => {
    it('should insert node as right child of root', () => {
      const s = new BinTree();
      const r = s.insertAsRoot(0);
      const rc = s.insertAsRC(r, 2);
      expect(r.height).toBe(1);
      expect(s.size).toBe(2);
      expect(r.rc).toEqual(rc);
    });
  });

  describe('attachAsLC', () => {
    it('should attach tree as left child', () => {
      const t1 = new BinTree();
      const r1 = t1.insertAsRoot(0);
      for (let i = 1, node = r1; i < 4; i++) {
        node = t1.insertAsLC(node, i);
      }
      const t2 = new BinTree();
      const r2 = t2.insertAsRoot(0);
      t2.attachAsLC(r2, t1);
      expect(t2.size).toBe(5);
      expect(r2.height).toBe(4);
      expect(r2.lc).toEqual(r1);
    });
  });

  describe('attachAsRC', () => {
    it('should attach tree as right child', () => {
      const t1 = new BinTree();
      const t2 = new BinTree();
      const r1 = t1.insertAsRoot(0);
      const r2 = t2.insertAsRoot(1);
      t1.attachAsRC(r1, t2);
      expect(t1.size).toBe(2);
      expect(r1.height).toBe(1);
      expect(r1.rc).toEqual(r2);
    });
  });

  describe('remove', () => {
    it('should remove subtree(v)', () => {
      const t = new BinTree();
      const r = t.insertAsRoot(0);
      for (let i = 1, node = r; i < 5; i++) {
        node = t.insertAsLC(node, i);
      }
      expect(t.remove(r)).toBe(5);
      expect(t.size).toBe(0);
    });
  });

  describe('secede', () => {
    it('should secede the subtree(v) as a stand-alone tree', () => {
      const t = new BinTree();
      const r = t.insertAsRoot(0);
      for (let i = 1, node = r; i < 5; i++) {
        node = t.insertAsLC(node, i);
      }
      const subtree = t.secede(r.lc);
      expect(subtree.size).toBe(4);
      expect(subtree.root.data).toBe(1);
    });
  });

  describe('preorder traverse', () => {
    it('recusive traverse implement', () => {
      const tree = new BinTree();
      const root = tree.insertAsRoot('A');
      const expr = 'ABCDEFG'.split('');
      const q = new Queue([root]);
      for (let i = 1; i < expr.length; i += 2) {
        const node = q.dequeue();
        q.enqueue(tree.insertAsLC(node, expr[i]));
        q.enqueue(tree.insertAsRC(node, expr[i + 1]));
      }
      const output = [];
      tree.travPre(x => output.push(x));
      expect(output).toEqual(['A', 'B', 'D', 'E', 'C', 'F', 'G']);
    });

    it('iterative traverse implement', () => {
      const tree = new BinTree();
      const root = tree.insertAsRoot('A');
      const expr = 'ABCDEFG'.split('');
      const q = new Queue([root]);
      for (let i = 1; i < expr.length; i += 2) {
        const node = q.dequeue();
        q.enqueue(tree.insertAsLC(node, expr[i]));
        q.enqueue(tree.insertAsRC(node, expr[i + 1]));
      }
      const output = [];
      BinNode.travPreIterative(root, x => output.push(x));
      expect(output).toEqual(['A', 'B', 'D', 'E', 'C', 'F', 'G']);
    });
  });

  describe('inorder traverse', () => {
    it('recusive traverse implement', () => {
      const tree = new BinTree();
      const root = tree.insertAsRoot('A');
      const expr = 'ABCDEFG'.split('');
      const q = new Queue([root]);
      for (let i = 1; i < expr.length; i += 2) {
        const node = q.dequeue();
        q.enqueue(tree.insertAsLC(node, expr[i]));
        q.enqueue(tree.insertAsRC(node, expr[i + 1]));
      }
      const output = [];
      tree.travIn(x => output.push(x));
      expect(output).toEqual(['D', 'B', 'E', 'A', 'F', 'C', 'G']);
    });

    it('iterative traverse implement', () => {
      const tree = new BinTree();
      const root = tree.insertAsRoot('A');
      const expr = 'ABCDEFG'.split('');
      const q = new Queue([root]);
      for (let i = 1; i < expr.length; i += 2) {
        const node = q.dequeue();
        q.enqueue(tree.insertAsLC(node, expr[i]));
        q.enqueue(tree.insertAsRC(node, expr[i + 1]));
      }
      const output = [];
      BinNode.travInIterative(root, x => output.push(x));
      expect(output).toEqual(['D', 'B', 'E', 'A', 'F', 'C', 'G']);
    });
  });

  describe('postorder traverse', () => {
    it('recusive traverse implement', () => {
      const tree = new BinTree();
      const root = tree.insertAsRoot('A');
      const expr = 'ABCDEFG'.split('');
      const q = new Queue([root]);
      for (let i = 1; i < expr.length; i += 2) {
        const node = q.dequeue();
        q.enqueue(tree.insertAsLC(node, expr[i]));
        q.enqueue(tree.insertAsRC(node, expr[i + 1]));
      }
      const output = [];
      tree.travPost(x => output.push(x));
      expect(output).toEqual(['D', 'E', 'B', 'F', 'G', 'C', 'A']);
    });

    it('iterative traverse implement', () => {
      const tree = new BinTree();
      const root = tree.insertAsRoot('A');
      const expr = 'ABCDEFG'.split('');
      const q = new Queue([root]);
      for (let i = 1; i < expr.length; i += 2) {
        const node = q.dequeue();
        q.enqueue(tree.insertAsLC(node, expr[i]));
        q.enqueue(tree.insertAsRC(node, expr[i + 1]));
      }
      const output = [];
      BinNode.travPostIterative(root, x => output.push(x));
      expect(output).toEqual(['D', 'E', 'B', 'F', 'G', 'C', 'A']);
    });
  });

  describe('level traverse', () => {
    it('should traverse the tree by level', () => {
      const tree = new BinTree();
      const root = tree.insertAsRoot('A');
      const expr = 'ABCDEFG'.split('');
      const q = new Queue([root]);
      for (let i = 1; i < expr.length; i += 2) {
        const node = q.dequeue();
        q.enqueue(tree.insertAsLC(node, expr[i]));
        q.enqueue(tree.insertAsRC(node, expr[i + 1]));
      }
      const output = [];
      tree.travLevel(x => output.push(x));
      expect(output).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
    });
  });
});
