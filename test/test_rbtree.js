import RBTree from '../src/rbtree';
import * as BT from '../src/binary_tree';

const BinNode = BT.BinNode;
const RB_BLACK = BT.RB_BALCK;
const RB_RED = BT.RB_RED;
const attachAsRChild = BinNode.attachAsRChild;
const attachAsLChild = BinNode.attachAsLChild;

describe('RBTree', () => {
  describe('isBlack', () => {
    it('should return true if node is black', () => {
      const p = new BinNode('data', null, null, null, 0, 1, RB_BLACK);
      expect(RBTree.isBlack(p)).toBe(true);
    });

    it('should return false if node is red', () => {
      const p = new BinNode('data', null, null, null, 0, 1, RB_RED);
      expect(RBTree.isBlack(p)).toBe(false);
    });

    it('should return true if node is null(external node)', () => {
      expect(RBTree.isBlack(null)).toBe(true);
    });
  });

  describe('isRed', () => {
    it('should return true if node is red', () => {
      const p = new BinNode('data', null, null, null, 0, 1, RB_RED);
      expect(RBTree.isRed(p)).toBe(true);
    });

    it('should return false if node is balck', () => {
      const p = new BinNode('data', null, null, null, 0, 1, RB_BLACK);
      expect(RBTree.isRed(p)).toBe(false);
    });
  });

  describe('updateHeight', () => {
    it('should updateHeight if x is black', () => {
      const p = new BinNode('data', null, null, null, 0, 1, RB_BLACK);
      RBTree.updateHeight(p);
      expect(p.height).toBe(0);
    });

    it('should not update height if x is red', () => {
      const p = new BinNode('data', null, null, null, 0, 1, RB_RED);
      RBTree.updateHeight(p);
      expect(p.height).toBe(-1);
    });
  });

  describe('insert', () => {
    it('should change root to black', () => {
      const tree = new RBTree();
      tree.insert(0);
      expect(tree.root.color).toBe(RB_BLACK);
    });

    it('should insert a red node', () => {
      const tree = new RBTree();
      tree.insert(2);
      tree.insert(1);
      expect(tree.root.lc.color).toBe(RB_RED);
    });

    it('should solve double red problem', () => {
      const tree = new RBTree();
      const g = tree.insert(3);
      const p = tree.insert(2);
      const v = tree.insert(1);
      expect(g.color).toBe(RB_RED);
      expect(p.color).toBe(RB_BLACK);
      expect(v.color).toBe(RB_RED);
    });
  });

  describe('remove', () => {
    it('should return false if x not exist', () => {
      const tree = new RBTree();
      expect(tree.remove(0)).toBe(false);
    });

    it('should return true if x exist', () => {
      const tree = new RBTree();
      tree.insert(1);
      expect(tree.remove(1)).toBe(true);
    });

    it('should change successor color', () => {
      const tree = new RBTree();
      tree.insert(2);
      tree.insert(1);
      tree.insert(3);
      tree.remove(2);
      expect(tree.root.data).toBe(3);
      expect(tree.root.color).toBe(RB_BLACK);
    });
  });

  describe('solveDoubleRed', () => {
    it('should fix RR-1 when uncle is black, p and v in one side', () => {
      const tree = new RBTree();
      const g = new BinNode(3, null, null, null, 1, 0, RB_BLACK);
      const p = new BinNode(2, null, null, null, 0, 0, RB_RED);
      const v = new BinNode(1, null, null, null, 0, 0, RB_RED);
      BinNode.attachAsLChild(g, p);
      BinNode.attachAsLChild(p, v);
      tree.solveDoubleRed(v);
      expect(tree.root.data).toBe(2);
      expect(tree.root.lc.data).toBe(1);
      expect(tree.root.rc.data).toBe(3);
      expect(tree.root.color).toBe(RB_BLACK);
      expect(tree.root.lc.color).toBe(RB_RED);
      expect(tree.root.rc.color).toBe(RB_RED);
    });

    it('should fix RR-1 when uncle is black, p and v in different side', () => {
      const tree = new RBTree();
      const g = new BinNode(3, null, null, null, 1, 0, RB_BLACK);
      const p = new BinNode(1, null, null, null, 0, 0, RB_RED);
      const v = new BinNode(2, null, null, null, 0, 0, RB_RED);
      BinNode.attachAsLChild(g, p);
      BinNode.attachAsRChild(p, v);
      tree.root = g;
      tree.solveDoubleRed(v);
      expect(tree.root.data).toBe(2);
      expect(tree.root.lc.data).toBe(1);
      expect(tree.root.rc.data).toBe(3);
      expect(tree.root.color).toBe(RB_BLACK);
      expect(tree.root.lc.color).toBe(RB_RED);
      expect(tree.root.rc.color).toBe(RB_RED);
    });

    it('should fix RR-2 when uncle is red, p and v in one side', () => {
      const tree = new RBTree();
      const g = new BinNode(3, null, null, null, 1, 0, RB_BLACK);
      const p = new BinNode(2, null, null, null, 0, 0, RB_RED);
      const v = new BinNode(1, null, null, null, 0, 0, RB_RED);
      const u = new BinNode(4, null, null, null, 0, 0, RB_RED);
      BinNode.attachAsLChild(g, p);
      BinNode.attachAsLChild(p, v);
      BinNode.attachAsRChild(g, u);
      tree.root = g;
      tree.solveDoubleRed(v);
      expect(p.color).toBe(RB_BLACK);
      expect(u.color).toBe(RB_BLACK);
      expect(g.height).toBe(2);
    });

    it('should fix RR-2 when uncle is red, p and v in different side', () => {
      const tree = new RBTree();
      const gg = new BinNode(5, null, null, null, 2, 0, RB_BLACK);
      const g = new BinNode(3, null, null, null, 1, 0, RB_BLACK);
      const p = new BinNode(1, null, null, null, 0, 0, RB_RED);
      const v = new BinNode(2, null, null, null, 0, 0, RB_RED);
      const u = new BinNode(4, null, null, null, 0, 0, RB_RED);
      BinNode.attachAsLChild(gg, g);
      BinNode.attachAsLChild(g, p);
      BinNode.attachAsRChild(p, v);
      BinNode.attachAsRChild(g, u);
      tree.root = gg;
      tree.solveDoubleRed(v);
      expect(g.color).toBe(RB_RED);
      expect(p.color).toBe(RB_BLACK);
      expect(u.color).toBe(RB_BLACK);
    });
  });

  describe('solveDoubleBlack', () => {
    it('should fix BB-1', () => {
      const p = new BinNode('p', null, null, null, 0, 0, RB_BLACK);
      const r = new BinNode('r', null, null, null, 0, 0, RB_BLACK);
      const s = new BinNode('s', null, null, null, 0, 0, RB_BLACK);
      const t = new BinNode('t', null, null, null, 0, 0, RB_RED);
      BinNode.attachAsLChild(p, s);
      BinNode.attachAsLChild(s, t);
      BinNode.attachAsRChild(p, r);
      const tree = new RBTree();
      tree.root = p;
      tree.solveDoubleBlack(r);
      expect(tree.root.data).toBe('s');
      expect(t.color).toBe(RB_BLACK);
    });

    it('should fix BB-2-R', () => {
      const p = new BinNode('p', null, null, null, 0, 0, RB_RED);
      const r = new BinNode('r', null, null, null, 0, 0, RB_BLACK);
      const s = new BinNode('s', null, null, null, 0, 0, RB_BLACK);
      BinNode.attachAsLChild(p, s);
      BinNode.attachAsRChild(p, r);
      const tree = new RBTree();
      tree.root = p;
      tree.solveDoubleBlack(r);
      expect(p.color).toBe(RB_BLACK);
      expect(s.color).toBe(RB_RED);
    });

    it('should fix BB-2-B', () => {
      const p = new BinNode('p', null, null, null, 0, 0, RB_BLACK);
      const r = new BinNode('r', null, null, null, 0, 0, RB_BLACK);
      const s = new BinNode('s', null, null, null, 0, 0, RB_BLACK);
      BinNode.attachAsLChild(p, s);
      BinNode.attachAsRChild(p, r);
      const tree = new RBTree();
      tree.root = p;
      tree.solveDoubleBlack(r);
      expect(s.color).toBe(RB_RED);
    });

    it('should fix BB-3', () => {
      const p = new BinNode('p', null, null, null, 0, 0, RB_BLACK);
      const r = new BinNode('r', null, null, null, 0, 0, RB_BLACK);
      const s = new BinNode('s', null, null, null, 0, 0, RB_RED);
      const slc = new BinNode('slc', null, null, null, 0, 0, RB_BLACK);
      const src = new BinNode('src', null, null, null, 0, 0, RB_BLACK);
      BinNode.attachAsLChild(p, s);
      BinNode.attachAsRChild(p, r);
      BinNode.attachAsLChild(s, slc);
      BinNode.attachAsRChild(s, src);
      const tree = new RBTree();
      tree.root = p;
      tree.solveDoubleBlack(r);
      expect(s.color).toBe(RB_BLACK);
      expect(p.lc).toEqual(src);
    });
  });
});
