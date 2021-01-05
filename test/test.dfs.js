import { dfs, dfsIterate, dfsRecursive, TreeNode, FiberNode } from "../src/dfs";

function buildTree() {
  const root = new TreeNode("A");
  const b = new TreeNode("B");
  const c = new TreeNode("C");
  const d = new TreeNode("D");
  const e = new TreeNode("E");
  const f = new TreeNode("F");
  const g = new TreeNode("G");

  root.children = [b, c];
  b.children = [d, e];
  c.children = [f, g];
  b.sibling = c;
  d.sibling = e;
  f.sibling = g;

  return root
}

function buildFiberRoot() {
  const root = new FiberNode("A");
  const b = new FiberNode("B");
  const c = new FiberNode("C");
  const d = new FiberNode("D");
  const e = new FiberNode("E");
  const f = new FiberNode("F");
  const g = new FiberNode("G");

  root.child = b
  b.parent = root
  c.parent = root
  b.sibling = c
  b.child = d
  d.parent = b
  e.parent = b
  d.sibling = e
  c.child = f
  f.parent = c
  g.parent = c
  f.sibling = g

  return root
}

describe("dfs", () => {
  it("should traverse in depth first sequence", () => {
    const tree = buildTree()
    
    expect(dfs(tree)).toEqual(["A", "B", "D", "E", "C", "F", "G"]);
  });

  it("should traverse in depth first sequence by recursive", () => {
    const tree = buildTree()

    expect(dfsRecursive(tree)).toEqual([
      "A",
      "B",
      "D",
      "E",
      "C",
      "F",
      "G",
    ]);
  })
});

describe("fiber dfs", () => {
  it("should traverse in depth first sequence", () => {
    const rootFiber = buildFiberRoot();
    const result = [];
    const visit = (fiber) => {
      result.push(fiber.value);
    };

    dfsIterate(rootFiber, visit);

    expect(result).toEqual(["A", "B", "D", "E", "C", "F", "G"]);
  });
});