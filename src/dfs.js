export function TreeNode(value) {
  this.value = value
  this.children = []
  this.sibling = null
}


function isEmpty(arr) {
  return arr && arr.length === 0
}


// 利用栈先进后出的特点
export function dfs(tree) {
  const stack = [tree] 
  const result = []

  while (!isEmpty(stack)) {
    const top = stack.pop()
    result.push(top.value)
    const children = top.children
    children.reverse().forEach(child => {
      stack.push(child) 
    });
  }

  return result
}

export function dfsRecursive(node, result = []) {
  if (!node) {
    return result
  }
  result.push(node.value) 

  for (let child of node.children) {
    dfsRecursive(child, result)
  }

  return result
}