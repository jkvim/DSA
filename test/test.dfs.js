import { expect } from "chai";
import { dfs, dfsRecursive, TreeNode } from "../src/dfs";

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

describe("dfs", () => {
  it("should traverse in depth first sequence", () => {
    const tree = buildTree()
    
    expect(dfs(tree)).to.deep.equal(["A", "B", "D", "E", "C", "F", "G"]);
  });

  it("should traverse in depth first sequence by recursive", () => {
    const tree = buildTree()

    expect(dfsRecursive(tree)).to.deep.equal([
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

