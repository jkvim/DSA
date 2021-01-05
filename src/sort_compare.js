import { insertSort, selectionSort, shellSort } from "./sort_algorithms.js"

function time(alg, a) {
  const startTime = new Date() 
  if (alg === "Insertion") insertSort(a)
  if (alg === "Selection") selectionSort(a)
  if (alg === "Shell") shellSort(a)
  const endTime = new Date()
  return endTime - startTime
}

function timeRandomInput(alg, N, T) {
  let total = 0
  let a = new Array(N)
  for (let t = 0; t < T; t++) {
    for (let i = 0; i < N; i++) {
      a[i] = Math.floor(Math.random() * 100)
    }
    const spend = time(alg, a)
    total += spend
  }
  return total
}

export function sortCompare() {
  const argv = process.argv.slice(2)
  const N = parseInt(argv[0])
  const T = parseInt(argv[1])
  const algs = ["Insertion", "Selection", "Shell"]
  algs.forEach((alg) => {
    const timeCount = timeRandomInput(alg, N, T)
    console.log(`${alg} spent ${timeCount} millseconds`);
  })

}

sortCompare()