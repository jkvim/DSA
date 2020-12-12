export function TreeNode(value) {
  this.value = value
  this.children = []
  this.sibling = null
}

export function FiberNode(value) {
  this.value = value
  this.parent = null
  this.child = null
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

let current = null

function completeWork(fiber, visit) {
  let workFiber = fiber
  do {
    const sibling = workFiber.sibling
    if (sibling) {
      current = sibling
      return
    }
    workFiber = current = workFiber.parent
  } while (workFiber !== null)
}

export function dfsIterate(rootFiber, visit) {
  current = rootFiber
  while (current !== null) {
    visit(current)
    const child = current.child
    if (child) {
      current = child
    } else {
      completeWork(current)
    }
  }
}