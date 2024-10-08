export const implementations = {
  'Divide and Conquer': {
    algorithms: [
      {
        name: 'Bucket Sort',
        parameters: [
          { name: 'arr', type: 'array', length: 10, min: 1, max: 100 },
        ],
        outputType: 'array',
        visualization: {
          stepType: 'array',
          finalType: 'array',
        },
        code: `
        function bucketSort(arr, bucketSize = 5) {
          if (arr.length === 0) return arr;
          let min = Math.min(...arr);
          let max = Math.max(...arr);
          let bucketCount = Math.floor((max - min) / bucketSize) + 1;
          let buckets = Array.from({ length: bucketCount }, () => []);

          for (let i = 0; i < arr.length; i++) {
            buckets[Math.floor((arr[i] - min) / bucketSize)].push(arr[i]);
          }

          arr = [];
          for (let i = 0; i < buckets.length; i++) {
            if (buckets[i] != null) {
              buckets[i].sort((a, b) => a - b);
              arr = arr.concat(buckets[i]);
            }
          }
          return arr;
        }`,
        execute: async function (arr, updateStep) {
          if (arr.length === 0) return arr;
          let min = Math.min(...arr);
          let max = Math.max(...arr);
          let bucketSize = 5;
          let bucketCount = Math.floor((max - min) / bucketSize) + 1;
          let buckets = Array.from({ length: bucketCount }, () => []);

          console.log("It is executing !")
          updateStep({ arr: [...arr], current: [], operation: 'initialize', final: false });

          for (let i = 0; i < arr.length; i++) {
            let bucketIndex = Math.floor((arr[i] - min) / bucketSize);
            buckets[bucketIndex].push(arr[i]);
            updateStep({ arr: [...arr], current: [i], operation: 'assignment', final: false });
          }

          arr = [];
          for (let i = 0; i < buckets.length; i++) {
            if (buckets[i] != null) {
              buckets[i].sort((a, b) => a - b);
              arr = arr.concat(buckets[i]);
              updateStep({ arr: [...arr], current: [], operation: 'sorting', final: false });
            }
          }

          updateStep({ arr: [...arr], current: [], operation: 'final', final: true });
          return arr;
        },
      },
      {
        name: 'Counting Sort',
        parameters: [
          { name: 'arr', type: 'array', length: 10, min: 1, max: 50 },
        ],
        outputType: 'array',
        visualization: {
          stepType: 'array',
          finalType: 'array',
        },
        code: `
        function countingSort(arr) {
          let min = Math.min(...arr);
          let max = Math.max(...arr);
          let count = Array(max - min + 1).fill(0);

          for (let num of arr) {
            count[num - min]++;
          }

          let sortedArr = [];
          for (let i = 0; i < count.length; i++) {
            while (count[i] > 0) {
              sortedArr.push(i + min);
              count[i]--;
            }
          }
          return sortedArr;
        }`,
        execute: async function (arr, updateStep) {
          let min = Math.min(...arr);
          let max = Math.max(...arr);
          let count = Array(max - min + 1).fill(0);
          updateStep({ arr: [...arr], current: [], operation: 'initialize', final: false });

          for (let num of arr) {
            count[num - min]++;
            updateStep({ arr: [...arr], current: [arr.indexOf(num)], operation: 'increment', final: false });
          }

          let sortedArr = [];
          for (let i = 0; i < count.length; i++) {
            while (count[i] > 0) {
              sortedArr.push(i + min);
              count[i]--;
              updateStep({ arr: [...sortedArr], current: [], operation: 'assignment', final: false });
            }
          }

          updateStep({ arr: [...sortedArr], current: [], operation: 'final', final: true });
          return sortedArr;
        },
      },
      {
        name: 'Merge Sort',
        parameters: [
          { name: 'arr', type: 'array', length: 6, min: 1, max: 100 },
        ],
        outputType: 'array',
        visualization: {
          stepType: 'array',
          finalType: 'array',
        },
        code: `
        function mergeSort(arr) {
          if (arr.length <= 1) return arr;
          const mid = Math.floor(arr.length / 2);
          const left = mergeSort(arr.slice(0, mid));
          const right = mergeSort(arr.slice(mid));
          return merge(left, right);
        }

        function merge(left, right) {
          const result = [];
          let leftIndex = 0;
          let rightIndex = 0;

          while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
              result.push(left[leftIndex]);
              leftIndex++;
            } else {
              result.push(right[rightIndex]);
              rightIndex++;
            }
          }
          return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
        }`,
        execute: async function (arr, updateStep) {
          if (arr.length <= 1) {
            updateStep({ arr: [...arr], current: [], operation: 'final', final: true });
            return arr;
          }

          const mid = Math.floor(arr.length / 2);
          const left = await this.execute(arr.slice(0, mid), updateStep);
          const right = await this.execute(arr.slice(mid), updateStep);
          const merged = merge(left, right);

          updateStep({ arr: merged, current: [], operation: 'merge', final: false });
          return merged;

          function merge(left, right) {
            const result = [];
            let leftIndex = 0;
            let rightIndex = 0;

            while (leftIndex < left.length && rightIndex < right.length) {
              if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
              } else {
                result.push(right[rightIndex]);
                rightIndex++;
              }
              updateStep({ arr: [...result, ...left.slice(leftIndex), ...right.slice(rightIndex)], current: [], operation: 'merge', final: false });
            }
            return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
          }
        },
      },
      {
        name: 'Pigeonhole Sort',
        parameters: [
          { name: 'arr', type: 'array', length: 10, min: 1, max: 50 },
        ],
        outputType: 'array',
        visualization: {
          stepType: 'array',
          finalType: 'array',
        },
        code: `
        function pigeonholeSort(arr) {
          let min = Math.min(...arr);
          let max = Math.max(...arr);
          let size = max - min + 1;
          let holes = Array(size).fill(0);

          for (let i = 0; i < arr.length; i++) {
            holes[arr[i] - min]++;
          }

          let sortedArr = [];
          for (let i = 0; i < size; i++) {
            while (holes[i]-- > 0) {
              sortedArr.push(i + min);
            }
          }
          return sortedArr;
        }`,
        execute: async function (arr, updateStep) {
          let min = Math.min(...arr);
          let max = Math.max(...arr);
          let size = max - min + 1;
          let holes = Array(size).fill(0);
          updateStep({ arr: [...arr], current: [], operation: 'initialize', final: false });

          for (let i = 0; i < arr.length; i++) {
            holes[arr[i] - min]++;
            updateStep({ arr: [...arr], current: [i], operation: 'increment', final: false });
          }

          let sortedArr = [];
          for (let i = 0; i < size; i++) {
            while (holes[i]-- > 0) {
              sortedArr.push(i + min);
              updateStep({ arr: [...sortedArr], current: [], operation: 'assignment', final: false });
            }
          }

          updateStep({ arr: [...sortedArr], current: [], operation: 'final', final: true });
          return sortedArr;
        },
      },
      {
        name: 'Quicksort',
        parameters: [
          { name: 'arr', type: 'array', length: 6, min: 1, max: 100 },
        ],
        outputType: 'array',
        visualization: {
          stepType: 'array',
          finalType: 'array',
        },
        code: `
        function quicksort(arr) {
          if (arr.length <= 1) return arr;
          const pivot = arr[arr.length - 1];
          const left = [];
          const right = [];

          for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] < pivot) {
              left.push(arr[i]);
            } else {
              right.push(arr[i]);
            }
          }
          return [...quicksort(left), pivot, ...quicksort(right)];
        }`,
        execute: async function (arr, updateStep) {
          if (arr.length <= 1) {
            updateStep({ arr: [...arr], current: [], operation: 'final', final: true });
            return arr;
          }

          const pivot = arr[arr.length - 1];
          const left = [];
          const right = [];
          updateStep({ arr: [...arr], current: [arr.length - 1], operation: 'initializePivot', final: false });

          for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] < pivot) {
              left.push(arr[i]);
              updateStep({ arr: [...arr], current: [i], operation: 'pushLeft', final: false });
            } else {
              right.push(arr[i]);
              updateStep({ arr: [...arr], current: [i], operation: 'pushRight', final: false });
            }
          }

          const sortedLeft = await this.execute(left, updateStep);
          const sortedRight = await this.execute(right, updateStep);
          const sortedArray = [...sortedLeft, pivot, ...sortedRight];

          updateStep({ arr: sortedArray, current: [], operation: 'merge', final: true });
          return sortedArray;
        },
      },
      {
        name: 'Radix Sort',
        parameters: [
          { name: 'arr', type: 'array', length: 10, min: 1, max: 1000 },
        ],
        outputType: 'array',
        visualization: {
          stepType: 'array',
          finalType: 'array',
        },
        code: `
        function radixSort(arr) {
          const maxNum = Math.max(...arr) * 10;
          let divisor = 10;
          while (divisor < maxNum) {
            let buckets = [...Array(10)].map(() => []);
            for (let num of arr) {
              buckets[Math.floor((num % divisor) / (divisor / 10))].push(num);
            }
            arr = [].concat(...buckets);
            divisor *= 10;
          }
          return arr;
        }`,
        execute: async function (arr, updateStep) {
          const maxNum = Math.max(...arr) * 10;
          let divisor = 10;
          updateStep({ arr: [...arr], current: [], operation: 'initialize', final: false });

          while (divisor < maxNum) {
            let buckets = [...Array(10)].map(() => []);
            for (let i = 0; i < arr.length; i++) {
              const bucketIndex = Math.floor((arr[i] % divisor) / (divisor / 10));
              buckets[bucketIndex].push(arr[i]);
              updateStep({ arr: [...arr], current: [i], operation: 'assignment', final: false });
            }
            arr = [].concat(...buckets);
            divisor *= 10;
            updateStep({ arr: [...arr], current: [], operation: 'sort', final: false });
          }

          updateStep({ arr: [...arr], current: [], operation: 'final', final: true });
          return arr;
        },
      },
      {
        name: 'Binary Search',
        parameters: [
          { name: 'arr', type: 'sortedArray', length: 10, min: 1, max: 100 },
          { name: 'target', type: 'number', min: 1, max: 100 },
        ],
        outputType: 'array',
        visualization: {
          stepType: 'array',
          finalType: 'array',
        },
        code: `
        function binarySearch(arr, target) {
          if (!Array.isArray(arr) || arr.length === 0) {
            console.error("Invalid array provided.");
            return -1;
          }
      
          let left = 0;
          let right = arr.length - 1;
          
          while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (arr[mid] === target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
          }
          
          return -1;
        }`,
        execute: async function (arr, target, updateStep) {
          if (!Array.isArray(arr) || arr.length === 0) {
            console.error("Invalid array provided to binary search.");
            updateStep({ arr: [], current: [], operation: 'error', final: true });
            return -1;
          }

          let left = 0;
          let right = arr.length - 1;

          while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            updateStep({ arr: [...arr], current: [mid], operation: 'conditionCheck', final: false });

            if (arr[mid] === target) {
              updateStep({ arr: [...arr], current: [mid], operation: 'final', final: true });
              return mid;
            }

            if (arr[mid] < target) {
              left = mid + 1;
              updateStep({ arr: [...arr], current: [mid], operation: 'increment', final: false });
            } else {
              right = mid - 1;
              updateStep({ arr: [...arr], current: [mid], operation: 'decrement', final: false });
            }
          }

          updateStep({ arr: [...arr], current: [], operation: 'notFound', final: true });
          return -1;
        }
      },
      {
        name: "Strassen's Matrix Multiplication",
        parameters: [
          { name: 'A', type: 'matrix', size: [2, 5], min: 1, max: 100, depth: 0, numCols: 5 },
          { name: 'B', type: 'matrix', size: [2, 5], min: 1, max: 100, depth: 0, numCols: 5 },
        ],
        outputType: 'matrix',
        visualization: {
          stepType: 'matrix',
          finalType: 'matrix',
        },
        code: `
          function strassenMultiply(A, B) {
              const n = A.length;
              const m = B.length;

              // Base case for 1x1 matrices
              if (n === 1 && m === 1) {
                  return [[A[0][0] * B[0][0]]];
              }

              // Ensure both matrices are square and have the same size
              if (n !== m) {
                  throw new Error("Matrices must be of the same dimensions");
              }

              // Ensure matrix size is even; if not, pad with zeros
              if (n % 2 !== 0) {
                  A = padMatrix(A);
                  B = padMatrix(B);
              }

              const { topLeft: A11, topRight: A12, bottomLeft: A21, bottomRight: A22 } = splitMatrix(A);
              const { topLeft: B11, topRight: B12, bottomLeft: B21, bottomRight: B22 } = splitMatrix(B);

              const M1 = strassenMultiply(addMatrix(A11, A22), addMatrix(B11, B22));
              const M2 = strassenMultiply(addMatrix(A21, A22), B11);
              const M3 = strassenMultiply(A11, subMatrix(B12, B22));
              const M4 = strassenMultiply(A22, subMatrix(B21, B11));
              const M5 = strassenMultiply(addMatrix(A11, A12), B22);
              const M6 = strassenMultiply(subMatrix(A21, A11), addMatrix(B11, B12));
              const M7 = strassenMultiply(subMatrix(A12, A22), addMatrix(B21, B22));

              const C11 = addMatrix(subMatrix(addMatrix(M1, M4), M5), M7);
              const C12 = addMatrix(M3, M5);
              const C21 = addMatrix(M2, M4);
              const C22 = addMatrix(subMatrix(addMatrix(M1, M3), M2), M6);

              return joinMatrices(C11, C12, C21, C22);
          }

          function splitMatrix(matrix) {
              const mid = Math.floor(matrix.length / 2);
              const topLeft = matrix.slice(0, mid).map(row => row.slice(0, mid));
              const topRight = matrix.slice(0, mid).map(row => row.slice(mid));
              const bottomLeft = matrix.slice(mid).map(row => row.slice(0, mid));
              const bottomRight = matrix.slice(mid).map(row => row.slice(mid));
              return { topLeft, topRight, bottomLeft, bottomRight };
          }

          function padMatrix(matrix) {
              const newSize = matrix.length + 1; // Increase size to make it even
              const newMatrix = Array.from({ length: newSize }, () => Array(newSize).fill(0));
              for (let i = 0; i < matrix.length; i++) {
                  for (let j = 0; j < matrix[i].length; j++) {
                      newMatrix[i][j] = matrix[i][j];
                  }
              }
              return newMatrix;
          }

          function addMatrix(A, B) {
              return A.map((row, i) => row.map((val, j) => val + B[i][j]));
          }

          function subMatrix(A, B) {
              return A.map((row, i) => row.map((val, j) => val - B[i][j]));
          }

          function joinMatrices(C11, C12, C21, C22) {
              const top = C11.map((row, i) => row.concat(C12[i]));
              return top.concat(C21.map((row, i) => row.concat(C22[i])));
          }
        `,
        execute: async function (A, B, updateStep) {
          console.log("A ", A);
          console.log("B ", B);

          function addMatrices(A, B) {
            const result = [];
            for (let i = 0; i < A.length; i++) {
              result[i] = [];
              for (let j = 0; j < A[i].length; j++) {
                result[i][j] = A[i][j] + B[i][j];
              }
            }
            updateStep({ operation: 'add', matrices: [A, B], result });
            return result;
          }

          function subtractMatrices(A, B) {
            const result = [];
            for (let i = 0; i < A.length; i++) {
              result[i] = [];
              for (let j = 0; j < A[i].length; j++) {
                result[i][j] = A[i][j] - B[i][j];
              }
            }
            updateStep({ operation: 'subtract', matrices: [A, B], result });
            return result;
          }

          function strassen(A, B) {
            const n = A.length;

            // Base case
            if (n === 1) {
              const result = [[A[0][0] * B[0][0]]];
              updateStep({ operation: 'baseMultiply', matrices: [A, B], result });
              return result;
            }

            const mid = Math.floor(n / 2);

            // Divide the matrices into quadrants
            const A11 = A.slice(0, mid).map(row => row.slice(0, mid));
            const A12 = A.slice(0, mid).map(row => row.slice(mid));
            const A21 = A.slice(mid).map(row => row.slice(0, mid));
            const A22 = A.slice(mid).map(row => row.slice(mid));

            const B11 = B.slice(0, mid).map(row => row.slice(0, mid));
            const B12 = B.slice(0, mid).map(row => row.slice(mid));
            const B21 = B.slice(mid).map(row => row.slice(0, mid));
            const B22 = B.slice(mid).map(row => row.slice(mid));

            updateStep({
              operation: 'split',
              matrices: { A, B },
              quadrants: { A11, A12, A21, A22, B11, B12, B21, B22 }
            });

            // Calculate the 7 products using the Strassen algorithm
            const M1 = strassen(addMatrices(A11, A22), addMatrices(B11, B22));
            const M2 = strassen(addMatrices(A21, A22), B11);
            const M3 = strassen(A11, subtractMatrices(B12, B22));
            const M4 = strassen(A22, subtractMatrices(B21, B11));
            const M5 = strassen(addMatrices(A11, A12), B22);
            const M6 = strassen(subtractMatrices(A21, A11), addMatrices(B11, B12));
            const M7 = strassen(subtractMatrices(A12, A22), addMatrices(B21, B22));

            updateStep({
              operation: 'intermediateProducts',
              products: { M1, M2, M3, M4, M5, M6, M7 }
            });

            // Combine the results into a single matrix
            const C11 = addMatrices(subtractMatrices(addMatrices(M1, M4), M5), M7);
            const C12 = addMatrices(M3, M5);
            const C21 = addMatrices(M2, M4);
            const C22 = addMatrices(addMatrices(subtractMatrices(M1, M2), M3), M6);

            const C = [];
            for (let i = 0; i < mid; i++) {
              C[i] = C11[i].concat(C12[i]);
            }
            for (let i = 0; i < mid; i++) {
              C.push(C21[i].concat(C22[i]));
            }

            updateStep({
              operation: 'combine',
              submatrices: { C11, C12, C21, C22 },
              result: C
            });

            return C;
          }

          // Call the strassen function and start recording steps
          const result = strassen(A, B);
          updateStep({ operation: 'finalResult', result });
          return result;
        }
      },
      {
        name: 'Closest Pair of Points',
        parameters: [
          { name: 'points', type: 'points', length: 10, min: 1, max: 50 },
        ],
        outputType: 'array',
        visualization: {
          stepType: 'array',
          finalType: 'points',
        },
        code: `
        function closestPair(points) {
          points.sort((a, b) => a[0] - b[0]);
          function distance(p1, p2) {
            return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
          }
          function closestPairRecursive(pts) {
            const n = pts.length;
            if (n <= 3) {
              let minDist = Infinity;
              for (let i = 0; i < n; i++) {
                for (let j = i + 1; j < n; j++) {
                  const dist = distance(pts[i], pts[j]);
                  if (dist < minDist) {
                    minDist = dist;
                  }
                }
              }
              return minDist;
            }
            const mid = Math.floor(n / 2);
            const left = pts.slice(0, mid);
            const right = pts.slice(mid);
            const minLeft = closestPairRecursive(left);
            const minRight = closestPairRecursive(right);
            return Math.min(minLeft, minRight);
          }
          return closestPairRecursive(points);
        }`,
        execute: async function (points, updateStep) {
          function distance(p1, p2) {
            return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
          }
          function closestPairRecursive(pts) {
            const n = pts.length;
            if (n <= 3) {
              let minDist = Infinity;
              for (let i = 0; i < n; i++) {
                for (let j = i + 1; j < n; j++) {
                  const dist = distance(pts[i], pts[j]);
                  updateStep({ arr: pts, current: [i, j], operation: 'distanceCheck', final: false });
                  if (dist < minDist) {
                    minDist = dist;
                  }
                }
              }
              return minDist;
            }
            const mid = Math.floor(n / 2);
            const left = pts.slice(0, mid);
            const right = pts.slice(mid);
            const minLeft = closestPairRecursive(left);
            const minRight = closestPairRecursive(right);
            return Math.min(minLeft, minRight);
          }
          const result = closestPairRecursive(points);
          updateStep({ arr: points, current: [], operation: 'final', final: true });
          return result;
        },
      },
      {
        name: 'Convex Hull',
        parameters: [
          { name: 'points', type: 'points', length: 10, min: 1, max: 50 },
        ],
        outputType: 'array',
        visualization: {
          stepType: 'array',
          finalType: 'points',
        },
        code: `
        function convexHull(points) {
          points.sort((a, b) => a[0] - b[0]);
          function cross(o, a, b) {
            return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
          }
          const lower = [];
          for (let point of points) {
            while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0) {
              lower.pop();
            }
            lower.push(point);
          }
          const upper = [];
          for (let i = points.length - 1; i >= 0; i--) {
            const point = points[i];
            while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], point) <= 0) {
              upper.pop();
            }
            upper.push(point);
          }
          upper.pop();
          lower.pop();
          return lower.concat(upper);
        }`,
        execute: async function (points, updateStep) {
          function cross(o, a, b) {
            return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
          }
          const lower = [];
          for (let i = 0; i < points.length; i++) {
            const point = points[i];
            while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0) {
              lower.pop();
              updateStep({ arr: [...lower], current: [i], operation: 'remove', final: false });
            }
            lower.push(point);
            updateStep({ arr: [...lower], current: [i], operation: 'add', final: false });
          }
          const upper = [];
          for (let i = points.length - 1; i >= 0; i--) {
            const point = points[i];
            while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], point) <= 0) {
              upper.pop();
              updateStep({ arr: [...upper], current: [i], operation: 'remove', final: false });
            }
            upper.push(point);
            updateStep({ arr: [...upper], current: [i], operation: 'add', final: false });
          }
          upper.pop();
          lower.pop();
          const hull = lower.concat(upper);
          updateStep({ arr: hull, current: [], operation: 'final', final: true });
          return hull;
        },
      },
    ],
  },
  'Dynamic Programming': {
    algorithms: [
      {
        name: 'Fibonacci Sequence',
        parameters: [
          { name: 'n', type: 'integer', min: 1, max: 20 },
        ],
        outputType: 'number',
        visualization: {
          stepType: 'tree',
          finalType: 'number',
        },
        code: `
        function fibonacci(n) {
          if (n <= 1) return n;
          let a = 0, b = 1;
          for (let i = 2; i <= n; i++) {
            const temp = a + b;
            a = b;
            b = temp;
          }
          return b;
        }
        `,
        execute: async function (n, updateStep) {
          // Initialize for n = 0
          if (n === 0) {
            updateStep({ arr: [0], current: [0], operation: 'final', final: true });
            return 0;
          }

          // Initialize for n = 1
          if (n === 1) {
            updateStep({ arr: [1], current: [1], operation: 'final', final: true });
            return 1;
          }

          // Start with initial Fibonacci numbers
          let a = 0, b = 1;
          updateStep({ arr: [0, 1], current: [1], operation: 'initialize', final: false });

          // Process Fibonacci sequence
          for (let i = 2; i <= n; i++) {
            const temp = a + b;
            a = b;
            b = temp;

            // Update visualization with current Fibonacci numbers
            updateStep({ arr: [a, b], current: [i], operation: 'iteration', final: false });
          }

          return b;
        },
      },
      {
        name: 'Knapsack Problem',
        parameters: [
          { name: 'weights', type: 'array', length: 5, min: 1, max: 10 },
          { name: 'values', type: 'array', length: 5, min: 10, max: 100 },
          { name: 'capacity', type: 'integer', min: 1, max: 50 },
        ],
        outputType: 'number',
        visualization: {
          stepType: 'matrix',
          finalType: 'number',
        },
        code: `
          function knapsack(values, weights, capacity) {
            const n = values.length;
            const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
            for (let i = 1; i <= n; i++) {
              for (let w = 1; w <= capacity; w++) {
                if (weights[i - 1] <= w) {
                  dp[i][w] = Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
                } else {
                  dp[i][w] = dp[i - 1][w];
                }
              }
            }
            return dp[n][capacity];
          }
          `,
        execute: async function (values, weights, capacity, updateStep) {
          const n = values.length;
          const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
          updateStep({ arr: dp, current: [], operation: 'initialize', final: false });

          for (let i = 1; i <= n; i++) {
            for (let w = 1; w <= capacity; w++) {
              if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
                updateStep({ arr: dp, current: [i, w], operation: 'assignment', final: false });
              } else {
                dp[i][w] = dp[i - 1][w];
                updateStep({ arr: dp, current: [i, w], operation: 'noAssignment', final: false });
              }
            }
          }
          updateStep({ arr: dp, current: [], operation: 'final', final: true });
          console.log("Result : ", dp[n][capacity]);
          return dp[n][capacity];
        },
      },
      {
        name: 'Longest Common Subsequence',
        parameters: [
          { name: 'str1', type: 'string', minLength: 1, maxLength: 20 },
          { name: 'str2', type: 'string', minLength: 1, maxLength: 20 },
        ],
        outputType: 'number',
        visualization: {
          stepType: 'matrix',
          finalType: 'number',
        },
        code: `
          function longestCommonSubsequence(str1, str2) {
            const m = str1.length, n = str2.length;
            const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
      
            for (let i = 1; i <= m; i++) {
              for (let j = 1; j <= n; j++) {
                if (str1[i - 1] === str2[j - 1]) {
                  dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                  dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
              }
            }
            return dp[m][n];
          }
        `,
        execute: async function (str1, str2, updateStep) {
          const m = str1.length;
          const n = str2.length;
          const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

          // Initial step with the matrix as a 2D array
          updateStep({ arr: dp, current: [], operation: 'initialize', final: false });

          for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
              if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                updateStep({ arr: dp, current: [i, j], operation: 'match', final: false });
              } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                updateStep({ arr: dp, current: [i, j], operation: 'noMatch', final: false });
              }
            }
          }

          // Final step to mark completion
          updateStep({ arr: dp, current: [], operation: 'final', final: true });
          return dp[m][n];
        },
      },
      {
        name: 'Coin Change Problem',
        parameters: [
          { name: 'coins', type: 'array', length: 5, min: 1, max: 20 },
          { name: 'amount', type: 'integer', min: 1, max: 50 },
        ],
        outputType: 'number',
        visualization: {
          stepType: 'array',
          finalType: 'number',
        },
        code: `
          function coinChange(coins, amount) {
            const dp = Array(amount + 1).fill(Infinity);
            dp[0] = 0;
            for (let coin of coins) {
              for (let i = coin; i <= amount; i++) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
              }
            }
            return dp[amount] === Infinity ? -1 : dp[amount];
          }
          `,
        execute: async function (coins, amount, updateStep) {
          const dp = Array(amount + 1).fill(Infinity);
          dp[0] = 0;
          updateStep({ arr: [...dp], current: [], operation: 'initialize', final: false });

          for (let coin of coins) {
            for (let i = coin; i <= amount; i++) {
              dp[i] = Math.min(dp[i], dp[i - coin] + 1);
              updateStep({ arr: [...dp], current: [i], operation: 'update', final: false });
            }
          }
          updateStep({ arr: [...dp], current: [], operation: 'final', final: true });
          return dp[amount] === Infinity ? -1 : dp[amount];
        },
      },
      {
        name: 'Maximum Sum Path',
        parameters: [
          { name: 'matrix', type: 'matrix', numRows: 5, numCols: 5, min: 10, max: 50 },
        ],
        outputType: 'number',
        visualization: {
          stepType: 'matrix',
          finalType: 'number',
        },
        code: `
          function maximumSumPath(matrix) {
            const m = matrix.length;
            const n = matrix[0].length;
            const dp = Array.from({ length: m }, () => Array(n).fill(0));
            
            dp[0][0] = matrix[0][0];
            for (let i = 1; i < m; i++) dp[i][0] = dp[i - 1][0] + matrix[i][0];
            for (let j = 1; j < n; j++) dp[0][j] = dp[0][j - 1] + matrix[0][j];
            
            for (let i = 1; i < m; i++) {
              for (let j = 1; j < n; j++) {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) + matrix[i][j];
              }
            }
            return dp[m - 1][n - 1];
          }
        `,
        execute: async function (matrix, updateStep) {
          const m = matrix.length;
          const n = matrix[0].length;
          const dp = Array.from({ length: m }, () => Array(n).fill(0));

          dp[0][0] = matrix[0][0];
          updateStep({ arr: dp, current: [], operation: 'initialize', final: false });

          for (let i = 1; i < m; i++) {
            dp[i][0] = dp[i - 1][0] + matrix[i][0];
            updateStep({ arr: dp, current: [i, 0], operation: 'update', final: false });
          }

          for (let j = 1; j < n; j++) {
            dp[0][j] = dp[0][j - 1] + matrix[0][j];
            updateStep({ arr: dp, current: [0, j], operation: 'update', final: false });
          }

          for (let i = 1; i < m; i++) {
            for (let j = 1; j < n; j++) {
              dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) + matrix[i][j];
              updateStep({ arr: dp, current: [i, j], operation: 'update', final: false });
            }
          }

          updateStep({ arr: dp, current: [], operation: 'final', final: true });
          return dp[m - 1][n - 1];
        },
      },
      {
        name: 'Edit Distance',
        parameters: [
          { name: 'str1', type: 'string', minLength: 1, maxLength: 20 },
          { name: 'str2', type: 'string', minLength: 1, maxLength: 20 },
        ],
        outputType: 'number',
        visualization: {
          stepType: 'matrix',
          finalType: 'number',
        },
        code: `
        function editDistance(str1, str2) {
            const m = str1.length, n = str2.length;
            const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
            for (let i = 0; i <= m; i++) dp[i][0] = i;
            for (let j = 0; j <= n; j++) dp[0][j] = j;
            for (let i = 1; i <= m; i++) {
                for (let j = 1; j <= n; j++) {
                    if (str1[i - 1] === str2[j - 1]) {
                        dp[i][j] = dp[i - 1][j - 1];
                    } else {
                        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
                    }
                }
            }
            return dp[m][n];
        }
        `,
        execute: async function (str1, str2, updateStep) {
          if (!str1 || !str2) {
            throw new Error('Both strings must be provided.');
          }

          const m = str1.length, n = str2.length;
          const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

          // Initialize base cases
          for (let i = 0; i <= m; i++) dp[i][0] = i;
          for (let j = 0; j <= n; j++) dp[0][j] = j;

          updateStep({ arr: dp, current: [], operation: 'initialize', final: false });

          // Fill dp table
          for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
              if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
              } else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
              }
              updateStep({ arr: dp, current: [i, j], operation: 'update', final: false });
            }
          }

          updateStep({ arr: dp, current: [], operation: 'final', final: true });
          return dp[m][n];
        }
      },
      {
        name: 'Maximum Subarray',
        parameters: [
          { name: 'arr', type: 'array', length: 10, min: -50, max: 50 },
        ],
        outputType: 'number',
        visualization: {
          stepType: 'array',
          finalType: 'number',
        },
        code: `
          function maximumSubarray(arr) {
            let maxSoFar = arr[0];
            let maxEndingHere = arr[0];
            for (let i = 1; i < arr.length; i++) {
              maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
              maxSoFar = Math.max(maxSoFar, maxEndingHere);
            }
            return maxSoFar;
          }
          `,
        execute: async function (arr, updateStep) {
          let maxSoFar = arr[0];
          let maxEndingHere = arr[0];
          updateStep({ arr: [...arr], current: [0], operation: 'initialize', final: false });

          for (let i = 1; i < arr.length; i++) {
            maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
            maxSoFar = Math.max(maxSoFar, maxEndingHere);
            updateStep({ arr: [...arr], current: [i], operation: 'update', final: false });
          }

          updateStep({ arr: [maxSoFar], current: [], operation: 'final', final: true });
          return maxSoFar;
        },
      },
      {
        name: 'Longest Increasing Subsequence',
        parameters: [
          { name: 'arr', type: 'array', length: 10, min: 1, max: 50 },
        ],
        outputType: 'number',
        visualization: {
          stepType: 'array',
          finalType: 'number',
        },
        code: `
          function longestIncreasingSubsequence(arr) {
            const n = arr.length;
            const dp = Array(n).fill(1);
      
            for (let i = 1; i < n; i++) {
              for (let j = 0; j < i; j++) {
                if (arr[i] > arr[j]) {
                  dp[i] = Math.max(dp[i], dp[j] + 1);
                }
              }
            }
            return Math.max(...dp);
          }
        `,
        execute: async function (arr, updateStep) {
          const n = arr.length;
          const dp = Array(n).fill(1);
          updateStep({ arr: [...dp], current: [], operation: 'initialize', final: false });

          for (let i = 1; i < n; i++) {
            for (let j = 0; j < i; j++) {
              if (arr[i] > arr[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
              }
              updateStep({ arr: [...dp], current: [i, j], operation: 'update', final: false });
            }
          }
          updateStep({ arr: [...dp], current: [], operation: 'final', final: true });
          return Math.max(...dp);
        },
      },
      {
        name: 'Longest Palindromic Subsequence',
        parameters: [
          { name: 'str', type: 'string', minLength: 1, maxLength: 20 },
        ],
        outputType: 'number',
        visualization: {
          stepType: 'matrix',
          finalType: 'number',
        },
        code: `
        function longestPalindromicSubsequence(str) {
            const n = str.length;
            const dp = Array.from({ length: n }, () => Array(n).fill(0));
    
            for (let i = 0; i < n; i++) {
                dp[i][i] = 1; // Single character palindromes
            }
    
            for (let length = 2; length <= n; length++) {
                for (let i = 0; i < n - length + 1; i++) {
                    const j = i + length - 1;
                    if (str[i] === str[j]) {
                        dp[i][j] = dp[i + 1][j - 1] + 2;
                    } else {
                        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
                    }
                }
            }
            return dp[0][n - 1];
        }
        `,
        execute: async function (str, updateStep) {
          if (!str) {
            throw new Error('String must be provided.');
          }

          const n = str.length;
          const dp = Array.from({ length: n }, () => Array(n).fill(0));

          for (let i = 0; i < n; i++) {
            dp[i][i] = 1; // Single character palindromes
            updateStep({ arr: dp, current: [i, i], operation: 'initialize', final: false });
          }

          for (let length = 2; length <= n; length++) {
            for (let i = 0; i < n - length + 1; i++) {
              const j = i + length - 1;
              if (str[i] === str[j]) {
                dp[i][j] = dp[i + 1][j - 1] + 2;
                updateStep({ arr: dp, current: [i, j], operation: 'match', final: false });
              } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
                updateStep({ arr: dp, current: [i, j], operation: 'noMatch', final: false });
              }
            }
          }

          updateStep({ arr: dp, current: [], operation: 'final', final: true });
          return dp[0][n - 1];
        }
      },
      {
        name: 'Catalan Number',
        parameters: [
          { name: 'n', type: 'integer', min: 1, max: 10 },
        ],
        outputType: 'number',
        visualization: {
          stepType: 'array',
          finalType: 'number',
        },
        code: `
          function catalanNumber(n) {
            const dp = Array(n + 1).fill(0);
            dp[0] = dp[1] = 1;
            for (let i = 2; i <= n; i++) {
              for (let j = 0; j < i; j++) {
                dp[i] += dp[j] * dp[i - j - 1];
              }
            }
            return dp[n];
          }
          `,
        execute: async function (n, updateStep) {
          const dp = Array(n + 1).fill(0);
          dp[0] = dp[1] = 1;
          updateStep({ arr: [...dp], current: [], operation: 'initialize', final: false });

          for (let i = 2; i <= n; i++) {
            for (let j = 0; j < i; j++) {
              dp[i] += dp[j] * dp[i - j - 1];
              updateStep({ arr: [...dp], current: [i, j], operation: 'update', final: false });
            }
          }
          updateStep({ arr: [...dp], current: [], operation: 'final', final: true });
          return dp[n];
        },
      },
      {
        name: 'Longest Palindromic Subsequence',
        parameters: [
          { name: 'str', type: 'string', minLength: 1, maxLength: 20 },
        ],
        outputType: 'number',
        visualization: {
          stepType: 'matrix',
          finalType: 'number',
        },
        code: `
        function longestPalindromicSubsequence(str) {
            const n = str.length;
            const dp = Array.from({ length: n }, () => Array(n).fill(0));
      
            for (let i = 0; i < n; i++) {
                dp[i][i] = 1; // Single character palindromes
            }
      
            for (let length = 2; length <= n; length++) {
                for (let i = 0; i < n - length + 1; i++) {
                    const j = i + length - 1;
                    if (str[i] === str[j]) {
                        dp[i][j] = dp[i + 1][j - 1] + 2;
                    } else {
                        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
                    }
                }
            }
            return dp[0][n - 1];
        }
        `,
        execute: async function (str, updateStep) {
          if (!str) {
            throw new Error('String must be provided.');
          }

          const n = str.length;
          const dp = Array.from({ length: n }, () => Array(n).fill(0));

          for (let i = 0; i < n; i++) {
            dp[i][i] = 1; // Single character palindromes
            updateStep({ arr: dp.flat(), current: [i, i], operation: 'initialize', final: false });
          }

          for (let length = 2; length <= n; length++) {
            for (let i = 0; i < n - length + 1; i++) {
              const j = i + length - 1;
              if (str[i] === str[j]) {
                dp[i][j] = dp[i + 1][j - 1] + 2;
                updateStep({ arr: dp.flat(), current: [i, j], operation: 'match', final: false });
              } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
                updateStep({ arr: dp.flat(), current: [i, j], operation: 'noMatch', final: false });
              }
            }
          }
          updateStep({ arr: dp.flat(), current: [], operation: 'final', final: true });
          return dp[0][n - 1];
        },
      },
      {
        name: 'Matrix Chain Multiplication',
        parameters: [
          { name: 'dimensions', type: 'array', length: 5, min: 1, max: 100 },
        ],
        outputType: 'number',
        visualization: {
          stepType: 'matrix',
          finalType: 'number',
        },
        code: `
          function matrixChainOrder(dimensions) {
            const n = dimensions.length - 1;
            const dp = Array.from({ length: n }, () => Array(n).fill(0));
      
            for (let length = 2; length <= n; length++) {
              for (let i = 0; i < n - length + 1; i++) {
                const j = i + length - 1;
                dp[i][j] = Infinity;
                for (let k = i; k < j; k++) {
                  const cost = dp[i][k] + dp[k + 1][j] + dimensions[i] * dimensions[k + 1] * dimensions[j + 1];
                  if (cost < dp[i][j]) dp[i][j] = cost;
                }
              }
            }
            return dp[0][n - 1];
          }
        `,
        execute: async function (dimensions, updateStep) {
          const n = dimensions.length - 1;
          const dp = Array.from({ length: n }, () => Array(n).fill(0));

          // Update step with the initial state of dp
          updateStep({ arr: dp, current: [], operation: 'initialize', final: false });

          for (let length = 2; length <= n; length++) {
            for (let i = 0; i < n - length + 1; i++) {
              const j = i + length - 1;
              dp[i][j] = Infinity;

              // Update step when initializing cell (i, j)
              updateStep({ arr: dp, current: [i, j], operation: 'initializeCell', final: false });

              for (let k = i; k < j; k++) {
                const cost = dp[i][k] + dp[k + 1][j] + dimensions[i] * dimensions[k + 1] * dimensions[j + 1];
                if (cost < dp[i][j]) dp[i][j] = cost;

                // Update step when calculating cost with k
                updateStep({ arr: dp, current: [i, j, k], operation: 'calculateCost', final: false });
              }
            }
          }

          // Final step to mark completion
          updateStep({ arr: dp, current: [], operation: 'final', final: true });
          return dp[0][n - 1];
        }
      },
      {
        name: 'Partition Problem',
        parameters: [
          { name: 'arr', type: 'array', length: 6, min: 1, max: 50 },
        ],
        outputType: 'boolean',
        visualization: {
          stepType: 'array',
          finalType: 'boolean',
        },
        code: `
          function partitionProblem(arr) {
            const sum = arr.reduce((acc, num) => acc + num, 0);
            if (sum % 2 !== 0) return false;
            const target = sum / 2;
            const dp = Array(target + 1).fill(false);
            dp[0] = true;
            for (const num of arr) {
              for (let j = target; j >= num; j--) {
                dp[j] = dp[j] || dp[j - num];
              }
            }
            return dp[target];
          }
          `,
        execute: async function (arr, updateStep) {
          const sum = arr.reduce((acc, num) => acc + num, 0);
          if (sum % 2 !== 0) {
            updateStep({ arr: [], current: [], operation: 'final', final: true });
            return false;
          }

          const target = sum / 2;
          const dp = Array(target + 1).fill(false);
          dp[0] = true;
          updateStep({ arr: [...dp], current: [], operation: 'initialize', final: false });

          for (const num of arr) {
            for (let j = target; j >= num; j--) {
              dp[j] = dp[j] || dp[j - num];
              updateStep({ arr: [...dp], current: [j], operation: 'update', final: false });
            }
          }
          updateStep({ arr: [...dp], current: [], operation: 'final', final: true });
          return dp[target];
        },
      },
      {
        name: 'Ugly Numbers',
        parameters: [
          { name: 'n', type: 'integer', min: 1, max: 50 },
        ],
        outputType: 'number',
        visualization: {
          stepType: 'array',
          finalType: 'number',
        },
        code: `
          function uglyNumber(n) {
            const uglyNumbers = Array(n).fill(1);
            let i2 = 0, i3 = 0, i5 = 0;
            let nextMultipleOf2 = 2, nextMultipleOf3 = 3, nextMultipleOf5 = 5;
            for (let i = 1; i < n; i++) {
              const nextUgly = Math.min(nextMultipleOf2, nextMultipleOf3, nextMultipleOf5);
              uglyNumbers[i] = nextUgly;
              if (nextUgly === nextMultipleOf2) nextMultipleOf2 = uglyNumbers[++i2] * 2;
              if (nextUgly === nextMultipleOf3) nextMultipleOf3 = uglyNumbers[++i3] * 3;
              if (nextUgly === nextMultipleOf5) nextMultipleOf5 = uglyNumbers[++i5] * 5;
            }
            return uglyNumbers[n - 1];
          }
          `,
        execute: async function (n, updateStep) {
          const uglyNumbers = Array(n).fill(1);
          let i2 = 0, i3 = 0, i5 = 0;
          let nextMultipleOf2 = 2, nextMultipleOf3 = 3, nextMultipleOf5 = 5;
          updateStep({ arr: [...uglyNumbers], current: [], operation: 'initialize', final: false });

          for (let i = 1; i < n; i++) {
            const nextUgly = Math.min(nextMultipleOf2, nextMultipleOf3, nextMultipleOf5);
            uglyNumbers[i] = nextUgly;
            updateStep({ arr: [...uglyNumbers], current: [i], operation: 'update', final: false });

            if (nextUgly === nextMultipleOf2) nextMultipleOf2 = uglyNumbers[++i2] * 2;
            if (nextUgly === nextMultipleOf3) nextMultipleOf3 = uglyNumbers[++i3] * 3;
            if (nextUgly === nextMultipleOf5) nextMultipleOf5 = uglyNumbers[++i5] * 5;
          }
          updateStep({ arr: [...uglyNumbers], current: [], operation: 'final', final: true });
          return uglyNumbers[n - 1];
        },
      },
      {
        name: 'Bellman-Ford\'s Shortest Path',
        parameters: [
          { name: 'edges', type: 'array', length: 10, min: 1, max: 50 }, // [ [src, dest, weight], ... ]
          { name: 'vertices', type: 'integer', min: 2, max: 10 },
          { name: 'source', type: 'integer', min: 0, max: 9 },
        ],
        outputType: 'array',
        visualization: {
          stepType: 'array',
          finalType: 'array',
        },
        code: `
          function bellmanFord(edges, vertices, source) {
            const dist = Array(vertices).fill(Infinity);
            dist[source] = 0;
            for (let i = 1; i < vertices; i++) {
              for (const [u, v, w] of edges) {
                if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
                  dist[v] = dist[u] + w;
                }
              }
            }
            return dist;
          }
          `,
        execute: async function (edges, vertices, source, updateStep) {
          const dist = Array(vertices).fill(Infinity);
          dist[source] = 0;
          updateStep({ arr: [...dist], current: [source], operation: 'initialize', final: false });

          for (let i = 1; i < vertices; i++) {
            for (let j = 0; j < edges.length; j++) {
              const edge = edges[j];
              const u = edge[0], v = edge[1], w = edge[2];

              if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                updateStep({ arr: [...dist], current: [u, v], operation: 'update', final: false });
              }
            }
          }

          updateStep({ arr: [...dist], current: [], operation: 'final', final: true });
          return dist;
        },
      },
      {
        name: 'Floyd-Warshall\'s Shortest Path',
        parameters: [
          { name: 'graph', type: 'floydWarshallGraph' }, // Expecting an adjacency matrix
        ],
        outputType: 'array',
        visualization: {
          stepType: 'array',
          finalType: 'array',
        },
        code: `
        function floydWarshall(graph) {
            const dist = graph.map(row => row.slice());
            const n = graph.length;
    
            for (let k = 0; k < n; k++) {
                for (let i = 0; i < n; i++) {
                    for (let j = 0; j < n; j++) {
                        if (dist[i][j] > dist[i][k] + dist[k][j]) {
                            dist[i][j] = dist[i][k] + dist[k][j];
                        }
                    }
                }
            }
            return dist;
        }
        `,
        execute: async function (graph, updateStep) {
          if (!Array.isArray(graph) || !graph.every(row => Array.isArray(row))) {
            throw new Error('Invalid graph format.');
          }

          const dist = graph.map(row => row.slice());
          updateStep({ arr: dist.flat(), current: [], operation: 'initialize', final: false });
          const n = graph.length;

          for (let k = 0; k < n; k++) {
            for (let i = 0; i < n; i++) {
              for (let j = 0; j < n; j++) {
                if (dist[i][j] > dist[i][k] + dist[k][j]) {
                  dist[i][j] = dist[i][k] + dist[k][j];
                  updateStep({ arr: dist.flat(), current: [i, j], operation: 'update', final: false });
                }
              }
            }
          }
          updateStep({ arr: dist.flat(), current: [], operation: 'final', final: true });
          return dist;
        },
      },
      {
        name: 'Integer Partition',
        parameters: [
          { name: 'n', type: 'integer', min: 1, max: 50 },
        ],
        outputType: 'number',
        visualization: {
          stepType: 'array',
          finalType: 'number',
        },
        code: `
        function integerPartition(n) {
          const partitions = Array(n + 1).fill(0);
          partitions[0] = 1;
  
          for (let i = 1; i <= n; i++) {
            for (let j = i; j <= n; j++) {
              partitions[j] += partitions[j - i];
            }
          }
          return partitions[n];
        }
        `,
        execute: async function (n, updateStep) {
          const partitions = Array(n + 1).fill(0);
          partitions[0] = 1;
          updateStep({ arr: [...partitions], current: [], operation: 'initialize', final: false });

          for (let i = 1; i <= n; i++) {
            for (let j = i; j <= n; j++) {
              partitions[j] += partitions[j - i];
              updateStep({ arr: [...partitions], current: [j], operation: 'update', final: false });
            }
          }
          updateStep({ arr: [...partitions], current: [], operation: 'final', final: true });
          return partitions[n];
        },
      },
      {
        name: 'Knuth-Morris-Pratt\'s String Search',
        parameters: [
          { name: 'text', type: 'string', minLength: 10, maxLength: 100 },
          { name: 'pattern', type: 'string', minLength: 1, maxLength: 30 },
        ],
        outputType: 'number',
        visualization: {
          stepType: 'array',
          finalType: 'number',
        },
        code: `
        function KMP(text, pattern) {
            const lps = computeLPSArray(pattern);
            let i = 0, j = 0, count = 0;
    
            while (i < text.length) {
                if (pattern[j] === text[i]) {
                    i++;
                    j++;
                }
    
                if (j === pattern.length) {
                    count++;
                    j = lps[j - 1];
                } else if (i < text.length && pattern[j] !== text[i]) {
                    if (j !== 0) {
                        j = lps[j - 1];
                    } else {
                        i++;
                    }
                }
            }
            return count;
        }
    
        function computeLPSArray(pattern) {
            const lps = Array(pattern.length).fill(0);
            let length = 0;
            let i = 1;
    
            while (i < pattern.length) {
                if (pattern[i] === pattern[length]) {
                    length++;
                    lps[i] = length;
                    i++;
                } else {
                    if (length !== 0) {
                        length = lps[length - 1];
                    } else {
                        lps[i] = 0;
                        i++;
                    }
                }
            }
            return lps;
        }
        `,
        execute: async function (str1, str2, updateStep) {
          if (!str1 || !str2) {
            throw new Error('Both strings must be provided.');
          }

          const dp = Array.from({ length: str1.length + 1 }, () => Array(str2.length + 1).fill(0));

          // Initialize the dp array for base cases
          for (let i = 0; i <= str1.length; i++) dp[i][0] = i;
          for (let j = 0; j <= str2.length; j++) dp[0][j] = j;

          // Update visualization after initialization
          updateStep({ arr: dp, current: [], operation: 'initialize', final: false });

          for (let i = 1; i <= str1.length; i++) {
            for (let j = 1; j <= str2.length; j++) {
              if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
              } else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
              }

              // Update visualization at each step with the current 2D dp matrix
              updateStep({ arr: dp, current: [i, j], operation: 'update', final: false });
            }
          }

          // Final step to mark completion
          updateStep({ arr: dp, current: [], operation: 'final', final: true });

          // Return the result
          return dp[str1.length][str2.length];
        },
      },
      {
        name: 'Levenshtein\'s Edit Distance',
        parameters: [
          { name: 'str1', type: 'string', minLength: 1, maxLength: 20 },
          { name: 'str2', type: 'string', minLength: 1, maxLength: 20 },
        ],
        outputType: 'number',
        visualization: {
          stepType: 'matrix',
          finalType: 'number',
        },
        code: `
        function levenshteinDistance(str1, str2) {
            const dp = Array.from({ length: str1.length + 1 }, () => Array(str2.length + 1).fill(0));
            
            for (let i = 0; i <= str1.length; i++) dp[i][0] = i;
            for (let j = 0; j <= str2.length; j++) dp[0][j] = j;
    
            for (let i = 1; i <= str1.length; i++) {
                for (let j = 1; j <= str2.length; j++) {
                    if (str1[i - 1] === str2[j - 1]) {
                        dp[i][j] = dp[i - 1][j - 1];
                    } else {
                        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
                    }
                }
            }
            return dp[str1.length][str2.length];
        }
        `,
        execute: async function (str1, str2, updateStep) {
          if (!str1 || !str2) {
            throw new Error('Both strings must be provided.');
          }

          const dp = Array.from({ length: str1.length + 1 }, () => Array(str2.length + 1).fill(0));

          // Initialize the base cases
          for (let i = 0; i <= str1.length; i++) dp[i][0] = i;
          for (let j = 0; j <= str2.length; j++) dp[0][j] = j;

          // Update step for initialization
          await updateStep({ arr: dp, current: [], operation: 'initialize', final: false });

          for (let i = 1; i <= str1.length; i++) {
            for (let j = 1; j <= str2.length; j++) {
              if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
              } else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
              }

              // Update the visualization for each step
              await updateStep({ arr: dp, current: [i, j], operation: 'update', final: false });
            }
          }

          // Final step to mark completion
          await updateStep({ arr: dp, current: [], operation: 'final', final: true });

          return dp[str1.length][str2.length];
        },
      },
      {
        name: 'Shortest Common Supersequence',
        parameters: [
          { name: 'str1', type: 'string', minLength: 1, maxLength: 5 },
          { name: 'str2', type: 'string', minLength: 1, maxLength: 5 },
        ],
        outputType: 'number',
        visualization: {
          stepType: 'matrix',
          finalType: 'number',
        },
        code: `
        function shortestCommonSupersequence(str1, str2) {
            const lcsLength = longestCommonSubsequence(str1, str2);
            return str1.length + str2.length - lcsLength;
        }
        
        function longestCommonSubsequence(str1, str2) {
            const m = str1.length, n = str2.length;
            const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
            for (let i = 1; i <= m; i++) {
                for (let j = 1; j <= n; j++) {
                    if (str1[i - 1] === str2[j - 1]) {
                        dp[i][j] = dp[i - 1][j - 1] + 1;
                    } else {
                        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                    }
                }
            }
            return dp[m][n];
        }
        `,
        execute: async function (str1, str2, updateStep) {
          if (!str1 || !str2) {
            throw new Error('Both strings must be provided.');
          }

          const m = str1.length;
          const n = str2.length;
          const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

          for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
              if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
              } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
              }
              updateStep({ arr: dp, current: [i, j], operation: 'update', final: false });
            }
          }
          updateStep({ arr: dp, current: [], operation: 'final', final: true });
          return dp[m][n];
        },
      },
      {
        name: 'Nth Factorial',
        parameters: [
          { name: 'n', type: 'integer', min: 0, max: 20 },
        ],
        outputType: 'number',
        visualization: {
          stepType: 'array',
          finalType: 'number',
        },
        code: `
        function factorial(n) {
            if (n === 0) return 1;
            let result = 1;
            for (let i = 1; i <= n; i++) {
                result *= i;
            }
            return result;
        }
        `,
        execute: async function (n, updateStep) {
          if (n === 0) {
            updateStep({ arr: [1], current: [], operation: 'final', final: true });
            return 1;
          }

          let result = 1;
          updateStep({ arr: [], current: [], operation: 'initialize', final: false });

          for (let i = 1; i <= n; i++) {
            result *= i;
            updateStep({ arr: Array.from({ length: n }, (_, idx) => (idx < i ? idx + 1 : '')), current: [i], operation: 'update', final: false });
          }

          updateStep({ arr: [result], current: [], operation: 'final', final: true });
          return result;
        },
      },
      {
        name: 'Pascal\'s Triangle',
        parameters: [
          { name: 'numRows', type: 'integer', min: 1, max: 15 },
        ],
        outputType: 'array',
        visualization: {
          stepType: 'matrix',
          finalType: 'array',
        },
        code: `
        function generatePascal(numRows) {
            const triangle = [];
            for (let i = 0; i < numRows; i++) {
                triangle[i] = [];
                for (let j = 0; j <= i; j++) {
                    if (j === 0 || j === i) {
                        triangle[i][j] = 1;
                    } else {
                        triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
                    }
                }
            }
            return triangle;
        }
        `,
        execute: async function (numRows, updateStep) {
          const triangle = [];
          updateStep({ arr: triangle, current: [], operation: 'initialize', final: false });

          for (let i = 0; i < numRows; i++) {
            triangle[i] = [];
            for (let j = 0; j <= i; j++) {
              if (j === 0 || j === i) {
                triangle[i][j] = 1;
              } else {
                triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
              }
            }
            updateStep({ arr: triangle.flat(), current: [], operation: 'update', final: false });
          }
          updateStep({ arr: triangle.flat(), current: [], operation: 'final', final: true });
          return triangle;
        },
      },
      {
        name: 'Maximum Sum Path',
        parameters: [
          { name: 'matrix', type: 'matrix', length: 5, min: 10, max: 50 },
        ],
        outputType: 'number',
        visualization: {
          stepType: 'matrix',
          finalType: 'number',
        },
        code: `
        function maximumSumPath(matrix) {
            const m = matrix.length;
            const n = matrix[0].length;
            const dp = Array.from({ length: m }, () => Array(n).fill(0));
            
            dp[0][0] = matrix[0][0];
    
            for (let i = 1; i < m; i++) {
                dp[i][0] = dp[i - 1][0] + matrix[i][0];
            }
            for (let j = 1; j < n; j++) {
                dp[0][j] = dp[0][j - 1] + matrix[0][j];
            }
    
            for (let i = 1; i < m; i++) {
                for (let j = 1; j < n; j++) {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) + matrix[i][j];
                }
            }
            return dp[m - 1][n - 1];
        }
        `,
        execute: async function (matrix, updateStep) {
          if (!matrix || !matrix.length || !matrix[0].length) {
            throw new Error('Matrix must be a non-empty array.');
          }

          const m = matrix.length;
          const n = matrix[0].length;
          const dp = Array.from({ length: m }, () => Array(n).fill(0));

          dp[0][0] = matrix[0][0];
          updateStep({ arr: dp.flat(), current: [], operation: 'initialize', final: false });

          for (let i = 1; i < m; i++) {
            dp[i][0] = dp[i - 1][0] + matrix[i][0];
            updateStep({ arr: dp.flat(), current: [i, 0], operation: 'update', final: false });
          }
          for (let j = 1; j < n; j++) {
            dp[0][j] = dp[0][j - 1] + matrix[0][j];
            updateStep({ arr: dp.flat(), current: [0, j], operation: 'update', final: false });
          }

          for (let i = 1; i < m; i++) {
            for (let j = 1; j < n; j++) {
              dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) + matrix[i][j];
              updateStep({ arr: dp.flat(), current: [i, j], operation: 'update', final: false });
            }
          }
          updateStep({ arr: dp.flat(), current: [], operation: 'final', final: true });
          return dp[m - 1][n - 1];
        },
      },
      {
        name: 'Sieve of Eratosthenes',
        parameters: [
          { name: 'n', type: 'integer', min: 2, max: 100 },
        ],
        outputType: 'array',
        visualization: {
          stepType: 'array',
          finalType: 'array',
        },
        code: `
        function sieveOfEratosthenes(n) {
          const primes = [];
          const isPrime = Array(n + 1).fill(true);
          isPrime[0] = isPrime[1] = false;
  
          for (let i = 2; i <= n; i++) {
            if (isPrime[i]) {
              primes.push(i);
              for (let j = i * 2; j <= n; j += i) {
                isPrime[j] = false;
              }
            }
          }
          return primes;
        }
        `,
        execute: async function (n, updateStep) {
          const isPrime = Array(n + 1).fill(true);
          isPrime[0] = isPrime[1] = false;
          const primes = [];
          updateStep({ arr: [], current: [], operation: 'initialize', final: false });

          for (let i = 2; i <= n; i++) {
            if (isPrime[i]) {
              primes.push(i);
              updateStep({ arr: [...primes], current: [i], operation: 'foundPrime', final: false });
              for (let j = i * 2; j <= n; j += i) {
                isPrime[j] = false;
              }
            }
          }
          updateStep({ arr: [...primes], current: [], operation: 'final', final: true });
          return primes;
        },
      },
      {
        name: 'Sliding Window',
        parameters: [
          { name: 'arr', type: 'array', length: 10, min: 1, max: 100 },
          { name: 'k', type: 'integer', min: 1, max: 10 },
        ],
        outputType: 'number',
        visualization: {
          stepType: 'array',
          finalType: 'number',
        },
        code: `
        function slidingWindow(arr, k) {
          let maxSum = 0, windowSum = 0;
  
          for (let i = 0; i < k; i++) {
            windowSum += arr[i];
          }
          maxSum = windowSum;
  
          for (let i = k; i < arr.length; i++) {
            windowSum += arr[i] - arr[i - k];
            maxSum = Math.max(maxSum, windowSum);
          }
  
          return maxSum;
        }
        `,
        execute: async function (arr, k, updateStep) {
          let maxSum = 0, windowSum = 0;

          for (let i = 0; i < k; i++) {
            windowSum += arr[i];
          }
          maxSum = windowSum;
          updateStep({ arr: [...arr], current: [], operation: 'initialize', final: false });

          for (let i = k; i < arr.length; i++) {
            windowSum += arr[i] - arr[i - k];
            maxSum = Math.max(maxSum, windowSum);
            updateStep({ arr: [...arr], current: [i], operation: 'update', final: false });
          }

          updateStep({ arr: [maxSum], current: [], operation: 'final', final: true });
          return maxSum;
        },
      },
      {
        name: 'Subset Sum Problem',
        parameters: [
          { name: 'set', type: 'array', length: 10, min: 1, max: 50 },
          { name: 'target', type: 'integer', min: 1, max: 250 },
        ],
        outputType: 'boolean',
        visualization: {
          stepType: 'matrix',
          finalType: 'boolean',
        },
        code: `
          function subsetSum(set, target) {
            const n = set.length;
            const dp = Array.from({ length: n + 1 }, () => Array(target + 1).fill(false));
            
            for (let i = 0; i <= n; i++) {
              dp[i][0] = true;
            }
      
            for (let i = 1; i <= n; i++) {
              for (let j = 1; j <= target; j++) {
                if (set[i - 1] <= j) {
                  dp[i][j] = dp[i - 1][j] || dp[i - 1][j - set[i - 1]];
                } else {
                  dp[i][j] = dp[i - 1][j];
                }
              }
            }
      
            return dp[n][target];
          }
        `,
        execute: async function (set, target, updateStep) {
          const n = set.length;
          const dp = Array.from({ length: n + 1 }, () => Array(target + 1).fill(false));

          // Initialize the dp table for the base case
          for (let i = 0; i <= n; i++) dp[i][0] = true;
          updateStep({ arr: dp, current: [], operation: 'initialize', final: false });

          for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= target; j++) {
              if (set[i - 1] <= j) {
                dp[i][j] = dp[i - 1][j] || dp[i - 1][j - set[i - 1]];
              } else {
                dp[i][j] = dp[i - 1][j];
              }
              // Update step with the current state of dp without flattening
              updateStep({ arr: dp, current: [i, j], operation: 'update', final: false });
            }
          }
          updateStep({ arr: dp, current: [], operation: 'final', final: true });
          return dp[n][target];
        }
      },
      {
        name: 'Z String Search',
        parameters: [
          { name: 'text', type: 'string', minLength: 10, maxLength: 100 },
          { name: 'pattern', type: 'string', minLength: 1, maxLength: 30 },
        ],
        outputType: 'number',
        visualization: {
          stepType: 'array',
          finalType: 'number',
        },
        code: `
        function ZAlgorithm(text, pattern) {
            const concat = pattern + "$" + text;
            const Z = new Array(concat.length).fill(0);
            let L = 0, R = 0;
    
            for (let i = 1; i < concat.length; i++) {
                if (i > R) {
                    L = R = i;
                    while (R < concat.length && concat[R] === concat[R - L]) {
                        R++;
                    }
                    Z[i] = R - L;
                    R--;
                } else {
                    const k = i - L;
                    if (Z[k] < R - i + 1) {
                        Z[i] = Z[k];
                    } else {
                        L = i;
                        while (R < concat.length && concat[R] === concat[R - L]) {
                            R++;
                        }
                        Z[i] = R - L;
                        R--;
                    }
                }
            }
            return Z;
        }
        `,
        execute: async function (text, pattern, updateStep) {
          if (!pattern || pattern.length === 0) {
            throw new Error('Pattern must be a non-empty string.');
          }

          const concat = pattern + "$" + text;
          const Z = new Array(concat.length).fill(0);
          let L = 0, R = 0;

          for (let i = 1; i < concat.length; i++) {
            if (i > R) {
              L = R = i;
              while (R < concat.length && concat[R] === concat[R - L]) {
                R++;
              }
              Z[i] = R - L;
              R--;
            } else {
              const k = i - L;
              if (Z[k] < R - i + 1) {
                Z[i] = Z[k];
              } else {
                L = i;
                while (R < concat.length && concat[R] === concat[R - L]) {
                  R++;
                }
                Z[i] = R - L;
                R--;
              }
            }
          }
          updateStep({ arr: Z, current: [], operation: 'final', final: true });
          return Z.filter((val, idx) => val > 0 && idx > pattern.length + 1).length; // Returns count of matches
        },
      },
      {
        name: 'Game Theory (Nim Game, Grundy Numbers)',
        parameters: [
          { name: 'piles', type: 'array', length: 10, min: 1, max: 50 },
        ],
        outputType: 'string',
        visualization: {
          stepType: 'array',
          finalType: 'string',
        },
        code: `
        function nimGame(piles) {
          let xorSum = 0;
          for (const pile of piles) {
            xorSum ^= pile;
          }
          return xorSum === 0 ? 'Lose' : 'Win';
        }
        `,
        execute: async function (piles, updateStep) {
          let xorSum = 0;
          updateStep({ arr: [...piles], current: [], operation: 'initialize', final: false });

          for (const pile of piles) {
            xorSum ^= pile;
            updateStep({ arr: [...piles], current: [], operation: 'update', final: false });
          }

          const result = xorSum === 0 ? 'Lose' : 'Win';
          updateStep({ arr: [...piles], current: [], operation: 'final', final: true });
          return result;
        },
      },
    ],
  },
  'Greedy': {
    algorithms: [
      {
        name: 'Boyer–Moore\'s Majority Vote',
        parameters: [
          { name: 'array', type: 'array', length: 10, min: 1, max: 50 },
        ],
        outputType: 'number',
        visualization: {
          stepType: 'array',
          finalType: 'number',
        },
        code: `
          function majorityVote(array) {
            let candidate = null;
            let count = 0;

            for (let i = 0; i < array.length; i++) {
              if (count === 0) {
                candidate = array[i];
                count = 1;
              } else if (candidate === array[i]) {
                count++;
              } else {
                count--;
              }
            }

            return candidate;
          }
        `,
        execute: async function (array, updateStep) {
          let candidate = null;
          let count = 0;
          updateStep({ arr: [...array], current: [], operation: 'initialize', final: false });

          for (let i = 0; i < array.length; i++) {
            const num = array[i];
            if (count === 0) {
              candidate = num;
              count = 1;
              updateStep({ arr: [...array], current: [i], operation: 'setCandidate', final: false });
            } else if (candidate === num) {
              count++;
              updateStep({ arr: [...array], current: [i], operation: 'increment', final: false });
            } else {
              count--;
              updateStep({ arr: [...array], current: [], operation: 'decrement', final: false });
            }
          }
          updateStep({ arr: [...array], current: [], operation: 'final', final: true });
          return candidate;
        },
      },
      {
        name: 'Dijkstra\'s Shortest Path',
        parameters: [
          { name: 'graph', type: 'array', length: 10, min: 1, max: 100 }, // Adjacency list representation
          { name: 'source', type: 'integer', min: 0, max: 9 },
        ],
        outputType: 'array',
        visualization: {
          stepType: 'array',
          finalType: 'array',
        },
        code: `
          function dijkstra(graph, source) {
            if (!Array.isArray(graph) || graph.length === 0) {
              throw new Error('Graph must be a non-empty array.');
            }
            const dist = Array(graph.length).fill(Infinity);
            dist[source] = 0;
            const visited = new Set();

            while (visited.size < graph.length) {
              let minDistance = Infinity;
              let minNode = null;

              for (let i = 0; i < dist.length; i++) {
                if (!visited.has(i) && dist[i] < minDistance) {
                  minDistance = dist[i];
                  minNode = i;
                }
              }

              if (minNode === null) break; // Break if no unvisited nodes are left

              visited.add(minNode);

              for (let i = 0; i < graph[minNode].length; i++) {
                const [neighbor, weight] = graph[minNode][i];
                if (!visited.has(neighbor)) {
                  dist[neighbor] = Math.min(dist[neighbor], dist[minNode] + weight);
                }
              }
            }

            return dist;
          }
        `,
        execute: async function (graph, source, updateStep) {
          if (!Array.isArray(graph) || graph.length === 0) {
            throw new Error('Graph must be a non-empty array.');
          }
          if (source < 0 || source >= graph.length) {
            throw new Error('Source must be a valid index within the graph.');
          }

          const dist = Array(graph.length).fill(Infinity);
          dist[source] = 0;
          const visited = new Set();
          updateStep({ arr: dist, current: [], operation: 'initialize', final: false });

          while (visited.size < graph.length) {
            let minDistance = Infinity;
            let minNode = null;

            for (let i = 0; i < dist.length; i++) {
              if (!visited.has(i) && dist[i] < minDistance) {
                minDistance = dist[i];
                minNode = i;
              }
            }

            if (minNode === null) break; // Break if no unvisited nodes are left

            visited.add(minNode);

            for (let i = 0; i < graph[minNode].length; i++) {
              const neighbor = graph[minNode][i][0]; // Access the neighbor index
              const weight = graph[minNode][i][1]; // Access the edge weight
              if (!visited.has(neighbor)) {
                dist[neighbor] = Math.min(dist[neighbor], dist[minNode] + weight);
                updateStep({ arr: [...dist], current: [neighbor], operation: 'update', final: false });
              }
            }
          }

          updateStep({ arr: [...dist], current: [], operation: 'final', final: true });
          return dist;
        },
      },
      {
        name: 'Job Scheduling Problem',
        parameters: [
          { name: 'jobs', type: 'matrix', min: 1, max: 10, numRows: 10, numCols: 2 } // Example of specifying rows and columns
        ],
        outputType: 'number',
        visualization: {
          stepType: 'array',
          finalType: 'number',
        },
        code: `
          function jobScheduling(jobs) {
            jobs.sort((a, b) => b[0] - a[0]); // Sort jobs by profit
            const result = Array(jobs.length).fill(false);
            const jobOrder = Array(jobs.length).fill(-1);

            for (let i = 0; i < jobs.length; i++) {
              for (let j = Math.min(jobs.length, jobs[i][1]) - 1; j >= 0; j--) {
                if (result[j] === false) {
                  result[j] = true;
                  jobOrder[j] = i;
                  break;
                }
              }
            }

            return jobOrder.reduce((total, idx) => total + (idx !== -1 ? jobs[idx][0] : 0), 0);
          }
        `,
        execute: async function (jobs, updateStep) {
          jobs.sort((a, b) => b[0] - a[0]); // Sort jobs by profit
          const result = Array(jobs.length).fill(false);
          const jobOrder = Array(jobs.length).fill(-1);
          updateStep({ arr: [...jobs], current: [], operation: 'initialize', final: false });

          for (let i = 0; i < jobs.length; i++) {
            for (let j = Math.min(jobs.length, jobs[i][1]) - 1; j >= 0; j--) {
              if (result[j] === false) {
                result[j] = true;
                jobOrder[j] = i;
                updateStep({ arr: [...jobs], current: [i], operation: 'assignJob', final: false });
                break;
              }
            }
          }
          const totalProfit = jobOrder.reduce((total, idx) => total + (idx !== -1 ? jobs[idx][0] : 0), 0);
          updateStep({ arr: [...jobs], current: [], operation: 'final', final: true });
          return totalProfit;
        },
      },
      {
        name: 'Kruskal\'s Minimum Spanning Tree',
        parameters: [
          { name: 'edges', type: 'matrix', min: 1, max: 5, numRows: 50, numCols: 3 }, // Example of specifying rows and columns
          { name: 'vertices', type: 'integer', min: 2, max: 60 },
        ],
        outputType: 'array',
        visualization: {
          stepType: 'array',
          finalType: 'array',
        },
        code: `
          function kruskal(vertices, edges) {
            if (!Array.isArray(edges) || edges.length === 0) {
              throw new Error('Edges must be a non-empty array.');
            }

            edges.sort((a, b) => a[2] - b[2]);

            const parent = Array(vertices).fill(0).map((_, index) => index);
            const rank = Array(vertices).fill(0);
            const mst = [];

            const find = (v) => {
              if (parent[v] !== v) {
                parent[v] = find(parent[v]);
              }
              return parent[v];
            };

            const union = (u, v) => {
              const rootU = find(u);
              const rootV = find(v);
              if (rootU !== rootV) {
                if (rank[rootU] > rank[rootV]) {
                  parent[rootV] = rootU;
                } else if (rank[rootU] < rank[rootV]) {
                  parent[rootU] = rootV;
                } else {
                  parent[rootV] = rootU;
                  rank[rootU]++;
                }
              }
            };

            for (let i = 0; i < edges.length; i++) {
              const edge = edges[i];
              const u = edge[0];
              const v = edge[1];
              const weight = edge[2];

              if (find(u) !== find(v)) {
                union(u, v);
                mst.push([u, v, weight]);
              }
            }

            return mst;
          }
        `,
        execute: async function (edges, vertices, updateStep) {
          if (!Array.isArray(edges) || edges.length === 0) {
            throw new Error('Edges must be a non-empty array.');
          }

          edges.sort((a, b) => a[2] - b[2]);

          const parent = Array(vertices).fill(0).map((_, index) => index);
          const rank = Array(vertices).fill(0);
          const mst = [];
          updateStep({ arr: edges, current: [], operation: 'initialize', final: false });

          const find = (v) => {
            if (parent[v] !== v) {
              parent[v] = find(parent[v]);
            }
            return parent[v];
          };

          const union = (u, v) => {
            const rootU = find(u);
            const rootV = find(v);
            if (rootU !== rootV) {
              if (rank[rootU] > rank[rootV]) {
                parent[rootV] = rootU;
              } else if (rank[rootU] < rank[rootV]) {
                parent[rootU] = rootV;
              } else {
                parent[rootV] = rootU;
                rank[rootU]++;
              }
            }
          };

          for (let i = 0; i < edges.length; i++) {
            const edge = edges[i];
            const u = edge[0];
            const v = edge[1];
            const weight = edge[2];

            if (find(u) !== find(v)) {
              union(u, v);
              mst.push([u, v, weight]);
              updateStep({ arr: mst, current: [u, v, weight], operation: 'addEdge', final: false });
            }
          }

          updateStep({ arr: mst, current: [], operation: 'final', final: true });
          return mst;
        },
      },
      {
        name: 'Prim\'s Minimum Spanning Tree',
        parameters: [
          { name: 'graph', type: 'adjacencyList', numVertices: 5 }, // Generates a graph with 5 vertices
          { name: 'source', type: 'integer', min: 1, max: 3 }
        ],
        outputType: 'array',
        visualization: {
          stepType: 'array',
          finalType: 'array',
        },
        code: `
          function prim(graph, source) {
            if (!Array.isArray(graph) || graph.length === 0) {
              throw new Error('Graph must be a non-empty array.');
            }
            if (source < 0 || source >= graph.length) {
              throw new Error('Source must be a valid index within the graph.');
            }

            const mstSet = new Set();
            const key = Array(graph.length).fill(Infinity);
            key[source] = 0;

            for (let count = 0; count < graph.length - 1; count++) {
              let minKey = Infinity;
              let minIndex = -1;

              for (let v = 0; v < graph.length; v++) {
                if (!mstSet.has(v) && key[v] < minKey) {
                  minKey = key[v];
                  minIndex = v;
                }
              }

              if (minIndex === -1) break; // Break if no more vertices are left

              mstSet.add(minIndex);

              for (let i = 0; i < graph[minIndex].length; i++) {
                const [neighbor, weight] = graph[minIndex][i]; // Access neighbor and weight
                if (!mstSet.has(neighbor) && weight < key[neighbor]) {
                  key[neighbor] = weight;
                }
              }
            }

            return key; // Return the total weight of the MST
          }
        `,
        execute: async function (graph, source, updateStep) {
          if (!Array.isArray(graph) || graph.length === 0) {
            throw new Error('Graph must be a non-empty array.');
          }
          if (source < 0 || source >= graph.length) {
            throw new Error('Source must be a valid index within the graph.');
          }

          const mstSet = new Set();
          const key = Array(graph.length).fill(Infinity);
          key[source] = 0;
          updateStep({ arr: key, current: [], operation: 'initialize', final: false });

          for (let count = 0; count < graph.length - 1; count++) {
            let minKey = Infinity;
            let minIndex = -1;

            for (let v = 0; v < graph.length; v++) {
              if (!mstSet.has(v) && key[v] < minKey) {
                minKey = key[v];
                minIndex = v;
              }
            }

            if (minIndex === -1) break; // Break if no more vertices are left

            mstSet.add(minIndex);

            for (let i = 0; i < graph[minIndex].length; i++) {
              const neighbor = graph[minIndex][i][0]; // Access the neighbor index
              const weight = graph[minIndex][i][1]; // Access the edge weight
              if (!mstSet.has(neighbor) && weight < key[neighbor]) {
                key[neighbor] = weight;
                updateStep({ arr: key, current: [neighbor], operation: 'update', final: false });
              }
            }
          }

          updateStep({ arr: key, current: [], operation: 'final', final: true });
          return key; // Return the total weight of the MST
        },
      },
      {
        name: 'Stable Matching',
        parameters: [
          { name: 'menPreferences', type: 'matrix', min: 1, max: 5, numRows: 20, numCols: 3 }, // Example of specifying rows and columns
          { name: 'womenPreferences', type: 'matrix', min: 1, max: 5, numRows: 20, numCols: 3 } // Example of specifying rows and columns
        ],
        outputType: 'array',
        visualization: {
          stepType: 'array',
          finalType: 'array',
        },
        code: `
          function stableMatching(menPreferences, womenPreferences) {
            const men = Array(menPreferences.length).fill(null);
            const women = Array(womenPreferences.length).fill(null);
            const freeMen = Array.from({ length: menPreferences.length }, (_, i) => i);
            const proposals = Array(menPreferences.length).fill(0);

            while (freeMen.length) {
              const man = freeMen.pop();
              const womanIndex = proposals[man]++;
              const woman = menPreferences[man][womanIndex];

              if (woman === undefined) {
                continue; // Ensure valid woman index
              }

              if (women[woman] === null) {
                women[woman] = man;
                men[man] = woman;
              } else {
                const currentMan = women[woman];
                if (womenPreferences[woman].indexOf(man) < womenPreferences[woman].indexOf(currentMan)) {
                  men[currentMan] = null;
                  freeMen.push(currentMan);
                  women[woman] = man;
                  men[man] = woman;
                } else {
                  freeMen.push(man);
                }
              }
            }

            return men;
          }
        `,
        execute: async function (menPreferences, womenPreferences, updateStep) {
          const men = Array(menPreferences.length).fill(null);
          const women = Array(womenPreferences.length).fill(null);
          const freeMen = Array.from({ length: menPreferences.length }, (_, i) => i);
          const proposals = Array(menPreferences.length).fill(0);

          updateStep({ arr: [...men], current: [], operation: 'initialize', final: false });

          while (freeMen.length) {
            const man = freeMen.pop();
            const womanIndex = proposals[man]++;
            const woman = menPreferences[man][womanIndex];

            if (woman === undefined) {
              continue; // Prevents undefined woman
            }

            if (women[woman] === null) {
              women[woman] = man;
              men[man] = woman;
            } else {
              const currentMan = women[woman];
              if (womenPreferences[woman].indexOf(man) < womenPreferences[woman].indexOf(currentMan)) {
                men[currentMan] = null;
                freeMen.push(currentMan);
                women[woman] = man;
                men[man] = woman;
              } else {
                freeMen.push(man);
              }
            }
            updateStep({ arr: [...men], current: [], operation: 'update', final: false });
          }

          updateStep({ arr: [...men], current: [], operation: 'final', final: true });
          return men;
        },
      },
      {
        name: 'Huffman Coding',
        parameters: [
          { name: 'data', type: 'charFreqArray', arrayLength: 2, length: 5, minFreq: 1, maxFreq: 5 }, // Array of characters and their frequencies
        ],
        outputType: 'object',
        visualization: {
          stepType: 'array',
          finalType: 'object',
        },
        code: `
          function huffmanCoding(data) {
            if (!Array.isArray(data) || data.length === 0) {
              throw new Error('Input must be a non-empty array of character-frequency pairs.');
            }

            const freqMap = new Map();
            for (let i = 0; i < data.length; i++) {
              const [char, freq] = data[i];
              freqMap.set(char, freq);
            }

            const heap = [...freqMap.entries()].sort((a, b) => a[1] - b[1]);

            while (heap.length > 1) {
              const [leftChar, leftFreq] = heap.shift();
              const [rightChar, rightFreq] = heap.shift();
              const newNode = [leftChar + rightChar, leftFreq + rightFreq];
              heap.push(newNode);
              heap.sort((a, b) => a[1] - b[1]);
            }

            return heap[0][0]; // Return the combined character string
          }
        `,
        execute: async function (data, updateStep) {
          if (!Array.isArray(data) || data.length === 0) {
            throw new Error('Input must be a non-empty array of character-frequency pairs.');
          }

          const freqMap = new Map();
          for (let i = 0; i < data.length; i++) {
            freqMap.set(data[i].char, data[i].freq);
          }

          const heap = [...freqMap.entries()].sort((a, b) => a[1] - b[1]);

          updateStep({ arr: [...heap], current: [], operation: 'initialize', final: false });

          while (heap.length > 1) {
            const [leftChar, leftFreq] = heap.shift();
            const [rightChar, rightFreq] = heap.shift();
            const newNode = [leftChar + rightChar, leftFreq + rightFreq];
            heap.push(newNode);
            heap.sort((a, b) => a[1] - b[1]);

            updateStep({ arr: [...heap], current: [], operation: 'combine', final: false });
          }

          updateStep({ arr: [...heap], current: [], operation: 'final', final: true });
          return heap[0][0]; // Return the combined character string
        },
      },
      {
        name: 'Activity Selection Problem',
        parameters: [
          { name: 'activities', type: 'array', length: 5, min: 1, max: 50 }, // Array of [start, finish]
        ],
        outputType: 'array',
        visualization: {
          stepType: 'array',
          finalType: 'array',
        },
        code: `
          function activitySelection(activities) {
            activities.sort((a, b) => a[1] - b[1]); // Sort by finish time
            const selectedActivities = [activities[0]];

            let lastFinishTime = activities[0][1];

            for (let i = 1; i < activities.length; i++) {
              if (activities[i][0] >= lastFinishTime) {
                selectedActivities.push(activities[i]);
                lastFinishTime = activities[i][1];
              }
            }

            return selectedActivities;
          }
        `,
        execute: async function (activities, updateStep) {
          activities.sort((a, b) => a[1] - b[1]); // Sort by finish time
          const selectedActivities = [activities[0]];
          updateStep({ arr: [...activities], current: [], operation: 'initialize', final: false });

          let lastFinishTime = activities[0][1];

          for (let i = 1; i < activities.length; i++) {
            if (activities[i][0] >= lastFinishTime) {
              selectedActivities.push(activities[i]);
              lastFinishTime = activities[i][1];
              updateStep({ arr: [...activities], current: [...selectedActivities], operation: 'select', final: false });
            }
          }
          updateStep({ arr: [...activities], current: [], operation: 'final', final: true });
          return selectedActivities;
        },
      },
      {
        name: 'Fractional Knapsack Problem',
        parameters: [
          { name: 'items', type: 'matrix', min: 1, max: 5, numRows: 5, numCols: 3 }, // Example of specifying rows and columns
          { name: 'capacity', type: 'integer', min: 1, max: 50 },
        ],
        outputType: 'number',
        visualization: {
          stepType: 'array',
          finalType: 'number',
        },
        code: `
          function fractionalKnapsack(items, capacity) {
            items.sort((a, b) => (b[0] / b[1]) - (a[0] / a[1])); // Sort by value-to-weight ratio
            let totalValue = 0;

            for (let i = 0; i < items.length; i++) {
              const value = items[i][0];
              const weight = items[i][1];

              if (capacity >= weight) {
                totalValue += value;
                capacity -= weight;
              } else {
                totalValue += value * (capacity / weight);
                break;
              }
            }

            return totalValue;
          }
        `,
        execute: async function (items, capacity, updateStep) {
          items.sort((a, b) => (b[0] / b[1]) - (a[0] / a[1])); // Sort by value-to-weight ratio
          let totalValue = 0;
          updateStep({ arr: [...items], current: [], operation: 'initialize', final: false });

          for (let i = 0; i < items.length; i++) {
            const value = items[i][0];
            const weight = items[i][1];

            if (capacity >= weight) {
              totalValue += value;
              capacity -= weight;
              updateStep({ arr: [...items], current: [value], operation: 'addFull', final: false });
            } else {
              totalValue += value * (capacity / weight);
              updateStep({ arr: [...items], current: [value], operation: 'addPartial', final: false });
              break;
            }
          }
          updateStep({ arr: [...items], current: [], operation: 'final', final: true });
          return totalValue;
        },
      },
      {
        name: 'Change-Making Problem',
        parameters: [
          { name: 'coins', type: 'array', length: 5, min: 1, max: 50 },
          { name: 'amount', type: 'integer', min: 1, max: 100 },
        ],
        outputType: 'array',
        visualization: {
          stepType: 'array',
          finalType: 'array',
        },
        code: `
          function changeMaking(coins, amount) {
            const dp = Array(amount + 1).fill(Infinity);
            dp[0] = 0;

            for (let i = 0; i < coins.length; i++) {
              for (let j = coins[i]; j <= amount; j++) {
                dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
              }
            }

            return dp[amount] === Infinity ? -1 : dp[amount];
          }
        `,
        execute: async function (coins, amount, updateStep) {
          const dp = Array(amount + 1).fill(Infinity);
          dp[0] = 0;
          updateStep({ arr: [...dp], current: [], operation: 'initialize', final: false });

          for (let i = 0; i < coins.length; i++) {
            for (let j = coins[i]; j <= amount; j++) {
              dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
              updateStep({ arr: [...dp], current: [j], operation: 'update', final: false });
            }
          }

          updateStep({ arr: [...dp], current: [], operation: 'final', final: true });
          return dp[amount] === Infinity ? -1 : dp[amount];
        },
      },
    ],
  },
  'Simple Recursive': {
    algorithms: [
      {
        name: 'Cellular Automata',
        description: 'Simulates cellular automata, consisting of a grid of cells evolving through iterations.',
        parameters: [
          { name: 'numRows', type: 'integer', min: 5, max: 20, default: 10 },
          { name: 'numCols', type: 'integer', min: 5, max: 20, default: 10 },
          { name: 'initialValue', type: 'integer', min: 0, max: 1, default: 0 },
          { name: 'numSteps', type: 'integer', min: 1, max: 100, default: 10 }
        ],
        execute: function (numRows = 10, numCols = 10, initialValue = 0, numSteps = 10, updateStep) {
          function updateGrid(grid) {
            const newGrid = JSON.parse(JSON.stringify(grid));
            for (let row = 0; row < grid.length; row++) {
              for (let col = 0; col < grid[row].length; col++) {
                const neighbors = [
                  [row - 1, col - 1], [row - 1, col], [row - 1, col + 1],
                  [row, col - 1], [row, col + 1],
                  [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]
                ];
                let liveNeighbors = 0;
                for (let i = 0; i < neighbors.length; i++) {
                  const nRow = neighbors[i][0];
                  const nCol = neighbors[i][1];

                  if (nRow >= 0 && nRow < grid.length && nCol >= 0 && nCol < grid[row].length) {
                    liveNeighbors += grid[nRow][nCol] === 1 ? 1 : 0;
                  }
                }
                newGrid[row][col] = (grid[row][col] === 1 && (liveNeighbors === 2 || liveNeighbors === 3)) ? 1 : (liveNeighbors === 3 ? 1 : 0);
              }
            }
            return newGrid;
          }

          function initializeGrid(rows, cols, initialValue = 0) {
            const grid = Array.from({ length: rows }, () => Array(cols).fill(initialValue));
            return grid;
          }

          // Initialize the grid based on parameters or defaults
          let grid = initializeGrid(numRows, numCols, initialValue);

          const result = [];

          // Execute steps with updateStep
          for (let step = 0; step < numSteps; step++) {
            grid = updateGrid(grid);
            updateStep({ arr: grid, step });
            result.push(JSON.parse(JSON.stringify(grid)));
          }

          return result;
        },
        code: `
          function updateGrid(grid) {
            const newGrid = JSON.parse(JSON.stringify(grid));
            for (let row = 0; row < grid.length; row++) {
              for (let col = 0; col < grid[row].length; col++) {
                const neighbors = [
                  [row - 1, col - 1], [row - 1, col], [row - 1, col + 1],
                  [row, col - 1], [row, col + 1],
                  [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]
                ];
                let liveNeighbors = 0;
                for (const [nRow, nCol] of neighbors) {
                  if (nRow >= 0 && nRow < grid.length && nCol >= 0 && nCol < grid[row].length) {
                    liveNeighbors += grid[nRow][nCol] === 1 ? 1 : 0;
                  }
                }
                newGrid[row][col] = (grid[row][col] === 1 && (liveNeighbors === 2 || liveNeighbors === 3)) ? 1 : (liveNeighbors === 3 ? 1 : 0);
              }
            }
            return newGrid;
          }
        `,
        visualization: {
          stepType: 'matrix',
          details: { numRows: 10, numCols: 10 }
        },
        outputType: 'array'
      },
      {
        name: 'Cycle Detection',
        description: 'Detects cycles in a directed graph using DFS.',
        parameters: [
          { name: 'graph', type: 'adjacencyList', numVertices: 5, minEdges: 5, maxEdges: 20 }
        ],
        execute: (graph, updateStep) => {
          const visited = new Set();
          const recursionStack = new Set();
          const detectCycle = (node) => {
            if (!visited.has(node)) {
              visited.add(node);
              recursionStack.add(node);
              updateStep({ node, action: 'Visiting' });
              const neighbors = graph[node] || [];
              for (const neighbor of neighbors) {
                if (!visited.has(neighbor) && detectCycle(neighbor)) return true;
                else if (recursionStack.has(neighbor)) return true;
              }
            }
            recursionStack.delete(node);
            updateStep({ node, action: 'Backtracking' });
            return false;
          };
          const nodes = Object.keys(graph);
          for (const node of nodes) {
            if (detectCycle(node)) {
              updateStep({ cycleDetected: true });
              return;
            }
          }
          updateStep({ cycleDetected: false });
        },
        code: `
          function detectCycle(graph, updateStep) {
            const visited = new Set();
            const recursionStack = new Set();
            const detectCycle = (node) => {
              if (!visited.has(node)) {
                visited.add(node);
                recursionStack.add(node);
                updateStep({ node, action: 'Visiting' });
                const neighbors = graph[node] || [];
                for (const neighbor of neighbors) {
                  if (!visited.has(neighbor) && detectCycle(neighbor)) return true;
                  else if (recursionStack.has(neighbor)) return true;
                }
              }
              recursionStack.delete(node);
              updateStep({ node, action: 'Backtracking' });
              return false;
            };
            const nodes = Object.keys(graph);
            for (const node of nodes) {
              if (detectCycle(node)) {
                updateStep({ cycleDetected: true });
                return;
              }
            }
            updateStep({ cycleDetected: false });
          }
        `,
        visualization: {
          stepType: 'graph',
          details: { directed: true }
        },
        outputType: 'graph'
      },
      {
        name: 'Euclidean Greatest Common Divisor',
        description: 'Computes the GCD of two numbers using the Euclidean algorithm.',
        parameters: [
          { name: 'a', type: 'integer', min: 1, max: 100 },
          { name: 'b', type: 'integer', min: 1, max: 100 }
        ],
        execute: (a, b, updateStep) => {
          while (b) {
            updateStep({ a, b });
            [a, b] = [b, a % b];
          }
          return a;
        },
        code: `
          function gcd(a, b, updateStep) {
            while (b) {
              updateStep({ a, b });
              [a, b] = [b, a % b];
            }
            return a;
          }
        `,
        visualization: {
          stepType: 'stepwise',
          details: { description: 'Shows each calculation step' }
        },
        outputType: 'integer'
      },
      {
        name: 'Nth Factorial',
        description: 'Calculates the factorial of a number recursively.',
        parameters: [
          { name: 'n', type: 'integer', min: 1, max: 20, default: 5 }
        ],
        execute: (n, updateStep) => {
          const factorial = (num) => {
            if (num <= 1) return 1;
            const result = num * factorial(num - 1);
            updateStep({ a: num, b: result });
            return result;
          };
          return factorial(n);
        },
        code: `
          function factorial(n, updateStep) {
            const factorial = (num) => {
              if (num <= 1) return 1;
              const result = num * factorial(num - 1);
              updateStep({ num, result });
              return result;
            };
            return factorial(n);
          }
        `,
        visualization: {
          stepType: 'stepwise',
          details: { description: 'Recursion tree visualization' }
        },
        outputType: 'integer'
      },
      {
        name: 'Suffix Array',
        description: 'Constructs a suffix array for a given string.',
        parameters: [
          { name: 'string', type: 'string', minLength: 1, maxLength: 100, default: 'example' }
        ],
        execute: (str, updateStep) => {
          const suffixes = Array.from({ length: str.length }, (_, i) => str.slice(i));
          const sortedSuffixes = suffixes.sort();
          sortedSuffixes.forEach((suffix, index) => updateStep({ a: index, b: suffix }));
          return sortedSuffixes.map((suffix) => str.length - suffix.length);
        },
        code: `
          function buildSuffixArray(str, updateStep) {
            const suffixes = Array.from({ length: str.length }, (_, i) => str.slice(i));
            const sortedSuffixes = suffixes.sort();
            sortedSuffixes.forEach((suffix, index) => updateStep({ index, suffix }));
            return sortedSuffixes.map((suffix) => str.length - suffix.length);
          }
        `,
        visualization: {
          stepType: 'stepwise',
          details: { description: 'Displays sorted suffixes and their indices' }
        },
        outputType: 'string'
      },
      {
        name: 'Recursive Backtracking (e.g., N-Queens Problem, Sudoku Solver)',
        description: 'Solves the N-Queens problem using recursive backtracking.',
        parameters: [
          { name: 'n', type: 'integer', min: 1, max: 20, default: 8 }
        ],
        execute: (n, updateStep) => {
          const board = Array.from({ length: n }, () => Array(n).fill(0));
          const isSafe = (row, col) => {
            for (let i = 0; i < row; i++) {
              if (board[i][col] === 1) return false;
              if (col - (row - i) >= 0 && board[i][col - (row - i)] === 1) return false;
              if (col + (row - i) < n && board[i][col + (row - i)] === 1) return false;
            }
            return true;
          };
          const solveNQueens = (row) => {
            if (row === n) {
              updateStep({ board: JSON.parse(JSON.stringify(board)) });
              return true;
            }
            for (let col = 0; col < n; col++) {
              if (isSafe(row, col)) {
                board[row][col] = 1;
                if (solveNQueens(row + 1)) return true;
                board[row][col] = 0;
              }
            }
            return false;
          };
          return solveNQueens(0);
        },

        code: `
          function solveNQueens(n, updateStep) {
            const board = Array.from({ length: n }, () => Array(n).fill(0));
            const isSafe = (row, col) => {
              for (let i = 0; i < row; i++) {
                if (board[i][col] === 1) return false;
                if (col - (row - i) >= 0 && board[i][col - (row - i)] === 1) return false;
                if (col + (row - i) < n && board[i][col + (row - i)] === 1) return false;
              }
              return true;
            };
            const solveNQueens = (row) => {
              if (row === n) {
                updateStep({ board: JSON.parse(JSON.stringify(board)) });
                return true;
              }
              for (let col = 0; col < n; col++) {
                if (isSafe(row, col)) {
                  board[row][col] = 1;
                  if (solveNQueens(row + 1)) return true;
                  board[row][col] = 0;
                }
              }
              return false;
            };
            solveNQueens(0);
          }
        `,
        visualization: {
          stepType: 'grid',
          details: { description: 'Displays queens on an n x n chessboard' }
        },
        outputType: 'boolean'
      }
    ]
  },
  'Graph Algorithms': {
    algorithms: [
      {
        name: 'Depth-First Search (DFS)',
        description: 'Performs a depth-first traversal of a graph.',
        parameters: [
          { name: 'graph', type: 'adjacencyList' },
          { name: 'start', type: 'integer', max: 5, min: 0 },
        ],
        execute: (graph, start, updateStep) => {
          const visited = new Set();

          const dfs = (node) => {
            if (node < 0 || node >= graph.length) {
              console.error(`Node index ${node} is out of bounds.`);
              return;
            }

            visited.add(node);
            updateStep({ node, action: 'Visiting' });

            for (let i = 0; i < graph[node].length; i++) {
              const neighbor = graph[node][i];
              if (!visited.has(neighbor)) {
                dfs(neighbor);
              }
            }
          };

          // Start DFS traversal from the specified start node
          dfs(start);
        },
        code: `
  function dfs(graph, start, updateStep) {
    const visited = new Set();

    const dfs = (node) => {
      visited.add(node);
      updateStep({ node, action: 'Visiting' });
      for (const neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
    };
    dfs(start);
  }
        `,
        visualization: {
          stepType: 'graph',
          details: { traversalType: 'DFS' }
        },
        outputType: 'path'  // Path of visited nodes
      },
      {
        name: 'Breadth-First Search (BFS)',
        description: 'Performs a breadth-first traversal of a graph.',
        parameters: [
          { name: 'graph', type: 'adjacencyList' },
          { name: 'start', type: 'integer' },
        ],
        execute: (graph, start, updateStep) => {
          const visited = new Set();
          const queue = [start];

          while (queue.length) {
            const node = queue.shift();
            if (!visited.has(node)) {
              visited.add(node);
              updateStep({ node, action: 'Visiting' });
              queue.push(...graph[node].filter((neighbor) => !visited.has(neighbor)));
            }
          }
        },
        code: `
  function bfs(graph, start, updateStep) {
    const visited = new Set();
    const queue = [start];

    while (queue.length) {
      const node = queue.shift();
      if (!visited.has(node)) {
        visited.add(node);
        updateStep({ node, action: 'Visiting' });
        queue.push(...graph[node].filter((neighbor) => !visited.has(neighbor)));
      }
    }
  }
        `,
        visualization: {
          stepType: 'graph',
          details: { traversalType: 'BFS' }
        },
        outputType: 'path'  // Path of visited nodes
      },
      {
        name: 'A* Search Algorithm',
        description: 'Finds the shortest path from a start node to a goal node in a weighted graph.',
        parameters: [
          { name: 'graph', type: 'adjacencyList' },
          { name: 'start', type: 'integer' },
          { name: 'goal', type: 'integer' },
        ],
        execute: (graph, start, goal, updateStep) => {
          const openSet = new Set([start]);
          const cameFrom = new Map();
          const gScore = new Map();
          const fScore = new Map();

          gScore.set(start, 0);
          fScore.set(start, heuristicCostEstimate(start, goal));

          while (openSet.size > 0) {
            const current = getLowestFScore(openSet, fScore);
            if (current === goal) {
              updateStep({ path: reconstructPath(cameFrom, current) });
              return;
            }
            openSet.delete(current);

            for (const neighbor of graph[current]) {
              const tentativeGScore = (gScore.get(current) || Infinity) + distance(current, neighbor);
              if (tentativeGScore < (gScore.get(neighbor) || Infinity)) {
                cameFrom.set(neighbor, current);
                gScore.set(neighbor, tentativeGScore);
                fScore.set(neighbor, (gScore.get(neighbor) || Infinity) + heuristicCostEstimate(neighbor, goal));
                openSet.add(neighbor);
                updateStep({ current, neighbor });
              }
            }
          }
        },
        code: `
  function aStar(graph, start, goal, updateStep) {
    const openSet = new Set([start]);
    const cameFrom = new Map();
    const gScore = new Map();
    const fScore = new Map();

    gScore.set(start, 0);
    fScore.set(start, heuristicCostEstimate(start, goal));

    while (openSet.size > 0) {
      const current = getLowestFScore(openSet, fScore);
      if (current === goal) {
        updateStep({ path: reconstructPath(cameFrom, current) });
        return;
      }
      openSet.delete(current);

      for (const neighbor of graph[current]) {
        const tentativeGScore = (gScore.get(current) || Infinity) + distance(current, neighbor);
        if (tentativeGScore < (gScore.get(neighbor) || Infinity)) {
          cameFrom.set(neighbor, current);
          gScore.set(neighbor, tentativeGScore);
          fScore.set(neighbor, (gScore.get(neighbor) || Infinity) + heuristicCostEstimate(neighbor, goal));
          openSet.add(neighbor);
          updateStep({ current, neighbor });
        }
      }
    }
  }
        `,
        visualization: {
          stepType: 'graph',
          details: { pathType: 'A*', showHeuristic: true }
        },
        outputType: 'path'  // Path from start to goal
      },
      {
        name: 'Topological Sorting',
        description: 'Returns a topological ordering of a directed acyclic graph (DAG).',
        parameters: [
          { name: 'graph', type: 'adjacencyList' },
        ],
        execute: (graph, updateStep) => {
          const visited = new Set();
          const stack = [];

          const topologicalSortUtil = (node) => {
            visited.add(node);
            for (const neighbor of graph[node]) {
              if (!visited.has(neighbor)) {
                topologicalSortUtil(neighbor);
              }
            }
            stack.push(node);
            updateStep({ node, action: 'Adding to stack' });
          };

          for (const node in graph) {
            if (!visited.has(node)) {
              topologicalSortUtil(node);
            }
          }

          return stack.reverse(); // Return reversed stack as the topological order
        },
        code: `
  function topologicalSort(graph, updateStep) {
    const visited = new Set();
    const stack = [];

    const topologicalSortUtil = (node) => {
      visited.add(node);
      for (const neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          topologicalSortUtil(neighbor);
        }
      }
      stack.push(node);
      updateStep({ node, action: 'Adding to stack' });
    };

    for (const node in graph) {
      if (!visited.has(node)) {
        topologicalSortUtil(node);
      }
    }

    return stack.reverse(); // Return reversed stack as the topological order
  }
        `,
        visualization: {
          stepType: 'array',
          details: { ordering: 'topological' }
        },
        outputType: 'order'  // Array representing topological order
      },
      {
        name: 'Tarjan\'s Algorithm (Strongly Connected Components)',
        description: 'Finds strongly connected components in a directed graph.',
        parameters: [
          { name: 'graph', type: 'adjacencyList' },
        ],
        execute: (graph, updateStep) => {
          const index = new Map();
          const lowlink = new Map();
          const onStack = new Set();
          const stack = [];
          let currentIndex = 0;

          const strongconnect = (node) => {
            index.set(node, currentIndex);
            lowlink.set(node, currentIndex);
            currentIndex++;
            stack.push(node);
            onStack.add(node);

            for (const neighbor of graph[node]) {
              if (!index.has(neighbor)) {
                strongconnect(neighbor);
                lowlink.set(node, Math.min(lowlink.get(node), lowlink.get(neighbor)));
              } else if (onStack.has(neighbor)) {
                lowlink.set(node, Math.min(lowlink.get(node), index.get(neighbor)));
              }
            }

            if (lowlink.get(node) === index.get(node)) {
              const scc = [];
              let w;
              do {
                w = stack.pop();
                onStack.delete(w);
                scc.push(w);
                updateStep({ scc });
              } while (w !== node);
            }
          };

          for (const node in graph) {
            if (!index.has(node)) {
              strongconnect(node);
            }
          }
        },
        code: `
  function tarjan(graph, updateStep) {
    const index = new Map();
    const lowlink = new Map();
    const onStack = new Set();
    const stack = [];
    let currentIndex = 0;

    const strongconnect = (node) => {
      index.set(node, currentIndex);
      lowlink.set(node, currentIndex);
      currentIndex++;
      stack.push(node);
      onStack.add(node);

      for (const neighbor of graph[node]) {
        if (!index.has(neighbor)) {
          strongconnect(neighbor);
          lowlink.set(node, Math.min(lowlink.get(node), lowlink.get(neighbor)));
        } else if (onStack.has(neighbor)) {
          lowlink.set(node, Math.min(lowlink.get(node), index.get(neighbor)));
        }
      }

      if (lowlink.get(node) === index.get(node)) {
        const scc = [];
        let w;
        do {
          w = stack.pop();
          onStack.delete(w);
          scc.push(w);
          updateStep({ scc });
        } while (w !== node);
      }
    };

    for (const node in graph) {
      if (!index.has(node)) {
        strongconnect(node);
      }
    }
  }
        `,
        visualization: {
          stepType: 'graph',
          details: { connectedComponents: 'strongly connected' }
        },
        outputType: 'components'  // Array of strongly connected components
      },
      {
        name: 'Bellman-Ford Algorithm',
        description: 'Finds the shortest path from a single source to all vertices in a weighted graph.',
        parameters: [
          { name: 'graph', type: 'adjacencyList' },
          { name: 'source', type: 'integer' },
        ],
        execute: (graph, source, updateStep) => {
          const distances = new Map();
          const predecessors = new Map();

          for (const node in graph) {
            distances.set(node, Infinity);
            predecessors.set(node, null);
          }
          distances.set(source, 0);
          updateStep({ node: source, distance: 0 });

          for (let i = 0; i < graph.size - 1; i++) {
            for (const [node, edges] of graph.entries()) {
              for (const [neighbor, weight] of edges) {
                if (distances.get(node) + weight < distances.get(neighbor)) {
                  distances.set(neighbor, distances.get(node) + weight);
                  predecessors.set(neighbor, node);
                  updateStep({ node, neighbor, weight, distance: distances.get(neighbor) });
                }
              }
            }
          }

          return { distances, predecessors };
        },
        code: `
  function bellmanFord(graph, source, updateStep) {
    const distances = new Map();
    const predecessors = new Map();

    for (const node in graph) {
      distances.set(node, Infinity);
      predecessors.set(node, null);
    }
    distances.set(source, 0);
    updateStep({ node: source, distance: 0 });

    for (let i = 0; i < graph.size - 1; i++) {
      for (const [node, edges] of graph.entries()) {
        for (const [neighbor, weight] of edges) {
          if (distances.get(node) + weight < distances.get(neighbor)) {
            distances.set(neighbor, distances.get(node) + weight);
            predecessors.set(neighbor, node);
            updateStep({ node, neighbor, weight, distance: distances.get(neighbor) });
          }
        }
      }
    }

    return { distances, predecessors };
  }
        `,
        visualization: {
          stepType: 'graph',
          details: { distance: 'single source' }
        },
        outputType: 'distances'  // Object with shortest path distances from source
      },
      {
        name: 'Johnson\'s Algorithm',
        description: 'Finds shortest paths between all pairs of vertices in a sparse graph using a combination of Bellman-Ford and Dijkstra\'s algorithms.',
        parameters: [
          { name: 'graph', type: 'adjacencyList', numVertices: 5 }
        ],
        execute: (graph, updateStep) => {
          const numVertices = graph.length;
          const distances = Array(numVertices).fill(Infinity).map(() => Array(numVertices).fill(Infinity));

          // Step 1: Add a new vertex connected to all others with weight 0
          const newGraph = { ...graph, newVertex: [] };
          for (let i = 0; i < numVertices; i++) {
            newGraph.newVertex.push([i, 0]);
          }

          // Step 2: Run Bellman-Ford from the new vertex to find shortest paths
          const bellmanFord = (graph, start) => {
            const distance = Array(numVertices + 1).fill(Infinity);
            distance[start] = 0;

            for (let i = 0; i < numVertices; i++) {
              for (const [src, edges] of Object.entries(graph)) {
                for (const [dest, weight] of edges) {
                  if (distance[src] !== Infinity && distance[src] + weight < distance[dest]) {
                    distance[dest] = distance[src] + weight;
                    updateStep({ vertex: src, distance: [...distance], action: 'Relax edge' });
                  }
                }
              }
            }

            // Check for negative-weight cycles
            for (const [src, edges] of Object.entries(graph)) {
              for (const [dest, weight] of edges) {
                if (distance[src] !== Infinity && distance[src] + weight < distance[dest]) {
                  updateStep({ action: 'Negative cycle detected' });
                  return null;
                }
              }
            }

            return distance;
          };

          const h = bellmanFord(newGraph, 'newVertex');
          if (!h) {
            return 'Negative cycle detected';
          }

          // Step 3: Reweight edges using the results from Bellman-Ford
          const reweightedGraph = {};
          for (const [src, edges] of Object.entries(graph)) {
            reweightedGraph[src] = edges.map(([dest, weight]) => [dest, weight + h[src] - h[dest]]);
          }

          // Step 4: Run Dijkstra's algorithm from each vertex
          const dijkstra = (graph, start) => {
            const distance = Array(numVertices).fill(Infinity);
            distance[start] = 0;
            const visited = new Set();

            while (visited.size < numVertices) {
              const u = distance
                .map((dist, idx) => (!visited.has(idx) ? { dist, idx } : null))
                .filter(Boolean)
                .reduce((min, node) => (node.dist < min.dist ? node : min), { dist: Infinity }).idx;

              visited.add(u);

              for (const [v, weight] of graph[u]) {
                if (!visited.has(v) && distance[u] + weight < distance[v]) {
                  distance[v] = distance[u] + weight;
                  updateStep({ vertex: u, target: v, distance: [...distance], action: 'Update distance' });
                }
              }
            }

            return distance;
          };

          for (let u = 0; u < numVertices; u++) {
            distances[u] = dijkstra(reweightedGraph, u).map((dist, v) => dist + h[v] - h[u]);
          }

          updateStep({ distances, action: 'All pairs shortest paths computed' });
          return distances;
        },
        code: `
  function johnson(graph, updateStep) {
    const numVertices = graph.length;
    const distances = Array(numVertices).fill(Infinity).map(() => Array(numVertices).fill(Infinity));
    
    const newGraph = { ...graph, newVertex: [] };
    for (let i = 0; i < numVertices; i++) {
      newGraph.newVertex.push([i, 0]);
    }
  
    const bellmanFord = (graph, start) => {
      const distance = Array(numVertices + 1).fill(Infinity);
      distance[start] = 0;
      
      for (let i = 0; i < numVertices; i++) {
        for (const [src, edges] of Object.entries(graph)) {
          for (const [dest, weight] of edges) {
            if (distance[src] !== Infinity && distance[src] + weight < distance[dest]) {
              distance[dest] = distance[src] + weight;
              updateStep({ vertex: src, distance: [...distance], action: 'Relax edge' });
            }
          }
        }
      }
  
      for (const [src, edges] of Object.entries(graph)) {
        for (const [dest, weight] of edges) {
          if (distance[src] !== Infinity && distance[src] + weight < distance[dest]) {
            updateStep({ action: 'Negative cycle detected' });
            return null;
          }
        }
      }
  
      return distance;
    };
  
    const h = bellmanFord(newGraph, 'newVertex');
    if (!h) {
      return 'Negative cycle detected';
    }
  
    const reweightedGraph = {};
    for (const [src, edges] of Object.entries(graph)) {
      reweightedGraph[src] = edges.map(([dest, weight]) => [dest, weight + h[src] - h[dest]]);
    }
  
    const dijkstra = (graph, start) => {
      const distance = Array(numVertices).fill(Infinity);
      distance[start] = 0;
      const visited = new Set();
  
      while (visited.size < numVertices) {
        const u = distance
          .map((dist, idx) => (!visited.has(idx) ? { dist, idx } : null))
          .filter(Boolean)
          .reduce((min, node) => (node.dist < min.dist ? node : min), { dist: Infinity }).idx;
  
        visited.add(u);
  
        for (const [v, weight] of graph[u]) {
          if (!visited.has(v) && distance[u] + weight < distance[v]) {
            distance[v] = distance[u] + weight;
            updateStep({ vertex: u, target: v, distance: [...distance], action: 'Update distance' });
          }
        }
      }
  
      return distance;
    };
  
    for (let u = 0; u < numVertices; u++) {
      distances[u] = dijkstra(reweightedGraph, u).map((dist, v) => dist + h[v] - h[u]);
    }
  
    updateStep({ distances, action: 'All pairs shortest paths computed' });
    return distances;
  }
        `,
      },
      {
        name: 'Minimum Spanning Tree (Kruskal and Prim)',
        description: 'Finds the minimum spanning tree of a graph.',
        parameters: [
          { name: 'graph', type: 'adjacencyList' },
        ],
        execute: (graph, updateStep) => {
          // Placeholder for Minimum Spanning Tree implementation (Kruskal's or Prim's)
        },
        code: `
  function minimumSpanningTree(graph, updateStep) {
    // Placeholder for Minimum Spanning Tree implementation (Kruskal's or Prim's)
  }
        `,
      },
      {
        name: 'Floyd-Warshall Algorithm',
        description: 'Finds shortest paths between all pairs of vertices in a weighted graph.',
        parameters: [
          { name: 'graph', type: 'adjacencyList' },
        ],
        execute: (graph, updateStep) => {
          // Choose a random graph from the list
          const dist = {};
          for (const node in graph) {
            dist[node] = {};
            for (const neighbor in graph) {
              dist[node][neighbor] = Infinity;
            }
            dist[node][node] = 0;
          }

          for (const node in graph) {
            for (const [neighbor, weight] of graph[node]) {
              dist[node][neighbor] = weight;
              updateStep({ operation: 'initializeWeight', node, neighbor, weight });
            }
          }

          for (const k in graph) {
            for (const i in graph) {
              for (const j in graph) {
                if (dist[i][j] > dist[i][k] + dist[k][j]) {
                  dist[i][j] = dist[i][k] + dist[k][j];
                  updateStep({ operation: 'updateDistance', i, j, k, newDistance: dist[i][j] });
                }
              }
            }
          }

          return dist;
        },
        code: `
          function floydWarshall(graph, updateStep) {
      
            const dist = {};
            for (const node in graph) {
              dist[node] = {};
              for (const neighbor in graph) {
                dist[node][neighbor] = Infinity;
              }
              dist[node][node] = 0;
            }
      
            for (const node in graph) {
              for (const [neighbor, weight] of graph[node]) {
                dist[node][neighbor] = weight;
                updateStep({ operation: 'initializeWeight', node, neighbor, weight });
              }
            }
      
            for (const k in graph) {
              for (const i in graph) {
                for (const j in graph) {
                  if (dist[i][j] > dist[i][k] + dist[k][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                    updateStep({ operation: 'updateDistance', i, j, k, newDistance: dist[i][j] });
                  }
                }
              }
            }
      
            return dist;
          }
        `,
      }
    ]
  },
  'Searching Algorithms': {
    algorithms: [
      {
        name: 'Linear Search',
        description: 'Searches for an element in an array by checking each element.',
        outputType: 'integer',
        visualization: {
          stepType: 'array',
          details: {
            type: 'array',
            description: 'Linear search visualization steps.',
          },
        },
        parameters: [
          { name: 'array', type: 'array' },
          { name: 'target', type: 'integer' },
        ],
        execute: (array, target, updateStep) => {
          for (let i = 0; i < array.length; i++) {
            updateStep({ arr: array, index: i, action: 'visiting' });
            if (array[i] === target) return i; // Return the index if the target is found
          }
          return -1; // Return -1 if the target is not found
        },
        code: `
  function linearSearch(array, target, updateStep) {
    for (let i = 0; i < array.length; i++) {
      updateStep({ arr: array, index: i, action: 'visiting' });
      if (array[i] === target) return i;
    }
    return -1;
  }
      `,
      },
      {
        name: 'Binary Search',
        description: 'Searches for an element in a sorted array using the binary search algorithm.',
        outputType: 'integer',
        visualization: {
          stepType: 'array',
          details: {
            type: 'searching',
            description: 'Binary search visualization steps.',
          },
        },
        parameters: [
          { name: 'array', type: 'sortedArray' },
          { name: 'target', type: 'integer' },
        ],
        execute: (array, target, updateStep) => {
          let left = 0;
          let right = array.length - 1;

          while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            updateStep({ arr: array, index: mid, action: 'visiting' });
            if (array[mid] === target) return mid;
            if (array[mid] < target) left = mid + 1;
            else right = mid - 1;
          }
          return -1;
        },
        code: `
  function binarySearch(array, target, updateStep) {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      updateStep({ arr: array, index: mid, action: 'visiting' });
      if (array[mid] === target) return mid;
      if (array[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
    return -1;
  }
      `,
      },
      {
        name: 'Interpolation Search',
        description: 'Searches for an element in a sorted array using interpolation.',
        outputType: 'integer',
        visualization: {
          stepType: 'array',
          details: {
            type: 'searching',
            description: 'Interpolation search visualization steps.',
          },
        },
        parameters: [
          { name: 'array', type: 'sortedArray' },
          { name: 'target', type: 'integer' },
        ],
        execute: (array, target, updateStep) => {
          let low = 0;
          let high = array.length - 1;

          while (low <= high && target >= array[low] && target <= array[high]) {
            const mid = low + Math.floor((high - low) / (array[high] - array[low]) * (target - array[low]));
            updateStep({ arr: array, index: mid, action: 'visiting' });

            if (array[mid] === target) return mid;
            if (array[mid] < target) low = mid + 1;
            else high = mid - 1;
          }
          return -1;
        },
        code: `
  function interpolationSearch(array, target, updateStep) {
    let low = 0;
    let high = array.length - 1;

    while (low <= high && target >= array[low] && target <= array[high]) {
      const mid = low + Math.floor((high - low) / (array[high] - array[low]) * (target - array[low]));
      updateStep({ arr: array, index: mid, action: 'visiting' });

      if (array[mid] === target) return mid;
      if (array[mid] < target) low = mid + 1;
      else high = mid - 1;
    }
    return -1;
  }
      `,
      },
      {
        name: 'Exponential Search',
        description: 'Searches for an element in a sorted array using exponential growth.',
        outputType: 'integer',
        visualization: {
          stepType: 'array',
          details: {
            type: 'searching',
            description: 'Exponential search visualization steps.',
          },
        },
        parameters: [
          { name: 'array', type: 'sortedArray' },
          { name: 'target', type: 'integer' },
        ],
        execute: (array, target, updateStep) => {
          if (array[0] === target) return 0; // Check if the first element is the target
          let i = 1;

          // Find the range for binary search
          while (i < array.length && array[i] <= target) {
            updateStep({ arr: array, index: i, action: 'visiting' });
            i *= 2; // Double the index
          }

          // Perform binary search in the found range
          const resultIndex = binarySearch(array.slice(Math.floor(i / 2), Math.min(i, array.length)), target, updateStep);

          // Adjust the result index based on the starting index of the slice
          return resultIndex !== -1 ? Math.floor(i / 2) + resultIndex : -1;
        },
        code: `
  function exponentialSearch(array, target, updateStep) {
    if (array[0] === target) return 0; // Check if the first element is the target
    let i = 1;

    // Find the range for binary search
    while (i < array.length && array[i] <= target) {
      updateStep({ arr: array, index: i, action: 'visiting' });
      i *= 2; // Double the index
    }

    // Perform binary search in the found range
    const resultIndex = binarySearch(array.slice(Math.floor(i / 2), Math.min(i, array.length)), target, updateStep);
    
    // Adjust the result index based on the starting index of the slice
    return resultIndex !== -1 ? Math.floor(i / 2) + resultIndex : -1;
  }
      `,
      },
      {
        name: 'Fibonacci Search',
        description: 'Searches for an element in a sorted array using Fibonacci numbers.',
        outputType: 'integer',
        visualization: {
          stepType: 'array',
          details: {
            type: 'searching',
            description: 'Fibonacci search visualization steps.',
          },
        },
        parameters: [
          { name: 'array', type: 'sortedArray' },
          { name: 'target', type: 'integer' },
        ],
        execute: (array, target, updateStep) => {
          let fibM2 = 0;  // (n-2)'th Fibonacci number
          let fibM1 = 1;  // (n-1)'th Fibonacci number
          let fibM = fibM2 + fibM1; // nth Fibonacci number

          // Find the largest Fibonacci number less than or equal to the length of the array
          while (fibM < array.length) {
            fibM2 = fibM1;
            fibM1 = fibM;
            fibM = fibM1 + fibM2;
          }

          let offset = -1; // Marks the eliminated range from the front

          // While there are elements to be inspected
          while (fibM > 1) {
            // Calculate the index to be compared
            const i = Math.min(offset + fibM2, array.length - 1);
            updateStep({ arr: array, index: i, action: 'visiting' });

            // If target is greater than the value at index i, cut the subarray after i
            if (array[i] < target) {
              fibM = fibM1;
              fibM1 = fibM2;
              fibM2 = fibM - fibM1;
              offset = i; // Mark the index as the new offset
            }
            // If target is smaller than the value at index i, cut the subarray before i
            else if (array[i] > target) {
              fibM = fibM2;
              fibM1 -= fibM2;
              fibM2 = fibM - fibM1;
            }
            // Element found
            else return i;
          }

          // Comparing the last element with target
          if (fibM1 && array[offset + 1] === target) return offset + 1;

          // Element not found
          return -1;
        },
        code: `
      function fibonacciSearch(array, target, updateStep) {
        let fibM2 = 0;  // (n-2)'th Fibonacci number
        let fibM1 = 1;  // (n-1)'th Fibonacci number
        let fibM = fibM2 + fibM1; // nth Fibonacci number
      
        while (fibM < array.length) {
          fibM2 = fibM1;
          fibM1 = fibM;
          fibM = fibM1 + fibM2;
        }
      
        let offset = -1;
      
        while (fibM > 1) {
          const i = Math.min(offset + fibM2, array.length - 1);
          updateStep({ arr: array, index: i, action: 'visiting' });
      
          if (array[i] < target) {
            fibM = fibM1;
            fibM1 = fibM2;
            fibM2 = fibM - fibM1;
            offset = i;
          } else if (array[i] > target) {
            fibM = fibM2;
            fibM1 -= fibM1;
            fibM2 = fibM - fibM1;
          } else return i;
        }
      
        if (fibM1 && array[offset + 1] === target) return offset + 1;
        return -1;
      }
        `,
      }
    ],
  },
  'Sorting Algorithms': {
    algorithms: [
      {
        name: 'Bubble Sort',
        description: 'Sorts an array using the bubble sort algorithm.',
        outputType: 'array',
        visualization: {
          description: 'Visualization of the Bubble Sort algorithm.',
          details: {
            type: 'sorting',
            additionalInfo: 'Each step shows the current state of the array as elements are compared and swapped.',
          },
          stepType: 'array',
        },
        parameters: [
          { name: 'array', type: 'array' },
        ],
        execute: (array, updateStep) => {
          const n = array.length;
          for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
              updateStep({ arr: [...array], currentIndex: j, action: 'comparing' });
              if (array[j] > array[j + 1]) {
                updateStep({ arr: [...array], currentIndex: j, action: 'swapping' });
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
              }
            }
          }
          return array;
        },
        code: `
function bubbleSort(array, updateStep) {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      updateStep({ arr: [...array], currentIndex: j, action: 'comparing' });
      if (array[j] > array[j + 1]) {
        updateStep({ arr: [...array], currentIndex: j, action: 'swapping' });
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return array;
}
      `,
      },
      {
        name: 'Insertion Sort',
        description: 'Sorts an array using the insertion sort algorithm.',
        outputType: 'array',
        visualization: {
          description: 'Visualization of the Insertion Sort algorithm.',
          details: {
            type: 'sorting',
            additionalInfo: 'Each step shows the current state of the array as elements are inserted into the sorted portion.',
          },
          stepType: 'array',
        },
        parameters: [
          { name: 'array', type: 'array' },
        ],
        execute: (array, updateStep) => {
          const n = array.length;
          for (let i = 1; i < n; i++) {
            let key = array[i];
            let j = i - 1;
            while (j >= 0 && array[j] > key) {
              updateStep({ arr: [...array], currentIndex: j, action: 'shifting' });
              array[j + 1] = array[j];
              j--;
            }
            array[j + 1] = key;
            updateStep({ arr: [...array], currentIndex: j + 1, action: 'inserting' });
          }
          return array;
        },
        code: `
function insertionSort(array, updateStep) {
  const n = array.length;
  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      updateStep({ arr: [...array], currentIndex: j, action: 'shifting' });
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = key;
    updateStep({ arr: [...array], currentIndex: j + 1, action: 'inserting' });
  }
  return array;
}
      `,
      },
      {
        name: 'Selection Sort',
        description: 'Sorts an array using the selection sort algorithm.',
        outputType: 'array',
        visualization: {
          description: 'Visualization of the Selection Sort algorithm.',
          details: {
            type: 'sorting',
            additionalInfo: 'Each step shows the current state of the array as elements are selected and swapped.',
          },
          stepType: 'array',
        },
        parameters: [
          { name: 'array', type: 'array' },
        ],
        execute: (array, updateStep) => {
          const n = array.length;
          for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < n; j++) {
              updateStep({ arr: [...array], currentIndex: j, action: 'checking' });
              if (array[j] < array[minIndex]) {
                minIndex = j;
              }
            }
            if (minIndex !== i) {
              updateStep({ arr: [...array], currentIndex: i, action: 'swapping' });
              [array[i], array[minIndex]] = [array[minIndex], array[i]];
            }
          }
          return array;
        },
        code: `
function selectionSort(array, updateStep) {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      updateStep({ arr: [...array], currentIndex: j, action: 'checking' });
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      updateStep({ arr: [...array], currentIndex: i, action: 'swapping' });
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }
  return array;
}
      `,
      },
      {
        name: 'Shell Sort',
        description: 'Sorts an array using the shell sort algorithm.',
        outputType: 'array',
        visualization: {
          description: 'Visualization of the Shell Sort algorithm.',
          details: {
            type: 'sorting',
            additionalInfo: 'Each step shows the current state of the array as elements are sorted based on gaps.',
          },
          stepType: 'array',
        },
        parameters: [
          { name: 'array', type: 'array' },
        ],
        execute: (array, updateStep) => {
          const n = array.length;
          let gap = Math.floor(n / 2);
          while (gap > 0) {
            for (let i = gap; i < n; i++) {
              const temp = array[i];
              let j;
              for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                updateStep({ arr: [...array], currentIndex: j, action: 'shifting' });
                array[j] = array[j - gap];
              }
              array[j] = temp;
              updateStep({ arr: [...array], currentIndex: j, action: 'inserting' });
            }
            gap = Math.floor(gap / 2);
          }
          return array;
        },
        code: `
function shellSort(array, updateStep) {
  const n = array.length;
  let gap = Math.floor(n / 2);
  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      const temp = array[i];
      let j;
      for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
        updateStep({ arr: [...array], currentIndex: j, action: 'shifting' });
        array[j] = array[j - gap];
      }
      array[j] = temp;
      updateStep({ arr: [...array], currentIndex: j, action: 'inserting' });
    }
    gap = Math.floor(gap / 2);
  }
  return array;
}
      `,
      },
      {
        name: 'Heap Sort',
        description: 'Sorts an array using the heap sort algorithm.',
        outputType: 'array',
        visualization: {
          description: 'Visualization of the Heap Sort algorithm.',
          details: {
            type: 'sorting',
            additionalInfo: 'Each step shows the current state of the array as elements are heapified and sorted.',
          },
          stepType: 'array',
        },
        parameters: [
          { name: 'array', type: 'array' },
        ],
        execute: (array, updateStep) => {
          const n = array.length;

          const heapify = (arr, n, i) => {
            let largest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;

            if (left < n && arr[left] > arr[largest]) largest = left;
            if (right < n && arr[right] > arr[largest]) largest = right;

            if (largest !== i) {
              [arr[i], arr[largest]] = [arr[largest], arr[i]];
              updateStep({ arr: [...arr], currentIndex: i, action: 'heapifying' });
              heapify(arr, n, largest);
            }
          };

          for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(array, n, i);
          for (let i = n - 1; i > 0; i--) {
            updateStep({ arr: [...array], currentIndex: 0, action: 'swapping' });
            [array[0], array[i]] = [array[i], array[0]];
            heapify(array, i, 0);
          }
          return array;
        },
        code: `
function heapSort(array, updateStep) {
  const n = array.length;

  const heapify = (arr, n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      updateStep({ arr: [...arr], currentIndex: i, action: 'heapifying' });
      heapify(arr, n, largest);
    }
  };

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(array, n, i);
  for (let i = n - 1; i > 0; i--) {
    updateStep({ arr: [...array], currentIndex: 0, action: 'swapping' });
    [array[0], array[i]] = [array[i], array[0]];
    heapify(array, i, 0);
  }
  return array;
}
      `,
      },

      {
        name: 'Bubble Sort',
        description: 'Sorts an array using the bubble sort algorithm.',
        outputType: 'array',
        visualization: {
          description: 'Visualization of the Bubble Sort algorithm.',
          details: {
            type: 'sorting',
            additionalInfo: 'Each step shows the current state of the array and highlights the indices being compared.',
          },
          stepType: 'array',
        },
        parameters: [
          { name: 'array', type: 'array' },
        ],
        execute: (array, updateStep) => {
          const n = array.length;
          for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
              updateStep({ arr: [...array], j, swapped: array[j] > array[j + 1] });
              if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
              }
            }
          }
          return array;
        },
        code: `
  function bubbleSort(array, updateStep) {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        updateStep({ array: [...array], j, swapped: array[j] > array[j + 1] });
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
        }
      }
    }
    return array;
  }
        `,
      },
      {
        name: 'Comb Sort',
        description: 'Sorts an array using the Comb Sort algorithm, an improvement over bubble sort.',
        outputType: 'array',
        visualization: {
          description: 'Visualization of the Comb Sort algorithm.',
          details: {
            type: 'sorting',
            additionalInfo: 'Each step shows the current state of the array and highlights the indices being compared.',
          },
          stepType: 'array',
        },
        parameters: [
          { name: 'array', type: 'array' },
        ],
        execute: (array, updateStep) => {
          const n = array.length;
          let gap = n;
          let swapped = true;

          while (gap > 1 || swapped) {
            gap = Math.max(1, Math.floor(gap / 1.3)); // Shrink the gap
            swapped = false;

            for (let i = 0; i + gap < n; i++) {
              updateStep({ arr: [...array], i, gap });
              if (array[i] > array[i + gap]) {
                [array[i], array[i + gap]] = [array[i + gap], array[i]];
                swapped = true;
                updateStep({ arr: [...array], i, swapped: true });
              }
            }
          }
          return array;
        },
        code: `
  function combSort(array, updateStep) {
    const n = array.length;
    let gap = n;
    let swapped = true;
  
    while (gap > 1 || swapped) {
      gap = Math.max(1, Math.floor(gap / 1.3)); // Shrink the gap
      swapped = false;
  
      for (let i = 0; i + gap < n; i++) {
        updateStep({ array: [...array], i, gap });
        if (array[i] > array[i + gap]) {
          [array[i], array[i + gap]] = [array[i + gap], array[i]];
          swapped = true;
          updateStep({ array: [...array], i, swapped: true });
        }
      }
    }
    return array;
  }
        `,
      },
      {
        name: 'Tim Sort',
        description: 'Sorts an array using Tim Sort, a hybrid sorting algorithm derived from merge sort and insertion sort.',
        outputType: 'array',
        visualization: {
          description: 'Visualization of the Tim Sort algorithm.',
          details: {
            type: 'sorting',
            additionalInfo: 'Each step shows the current state of the array and highlights the merged sections.',
          },
          stepType: 'array',
        },
        parameters: [
          { name: 'array', type: 'array' },
        ],
        execute: (array, updateStep) => {
          const minRun = 32;

          const insertionSort = (arr, left, right) => {
            for (let i = left + 1; i <= right; i++) {
              const temp = arr[i];
              let j = i - 1;
              while (j >= left && arr[j] > temp) {
                arr[j + 1] = arr[j];
                j--;
              }
              arr[j + 1] = temp;
              updateStep({ arr: [...arr], action: 'Insertion Sort' });
            }
          };

          const merge = (arr, left, mid, right) => {
            const leftArray = arr.slice(left, mid + 1);
            const rightArray = arr.slice(mid + 1, right + 1);
            let i = 0, j = 0, k = left;

            while (i < leftArray.length && j < rightArray.length) {
              if (leftArray[i] <= rightArray[j]) {
                arr[k++] = leftArray[i++];
              } else {
                arr[k++] = rightArray[j++];
              }
              updateStep({ arr: [...arr], action: 'Merging' });
            }

            while (i < leftArray.length) arr[k++] = leftArray[i++];
            while (j < rightArray.length) arr[k++] = rightArray[j++];
            updateStep({ arr: [...arr], action: 'Final Merging' });
          };

          const timSort = (arr) => {
            for (let start = 0; start < arr.length; start += minRun) {
              const end = Math.min(start + minRun - 1, arr.length - 1);
              insertionSort(arr, start, end);
            }

            for (let size = minRun; size < arr.length; size *= 2) {
              for (let left = 0; left < arr.length; left += size * 2) {
                const mid = Math.min(left + size - 1, arr.length - 1);
                const right = Math.min((left + 2 * size - 1), (arr.length - 1));
                if (mid < right) merge(arr, left, mid, right);
              }
            }
          };

          timSort(array);
          return array;
        },
        code: `
  function timSort(array, updateStep) {
    const minRun = 32;
  
    const insertionSort = (arr, left, right) => {
      for (let i = left + 1; i <= right; i++) {
        const temp = arr[i];
        let j = i - 1;
        while (j >= left && arr[j] > temp) {
          arr[j + 1] = arr[j];
          j--;
        }
        arr[j + 1] = temp;
        updateStep({ array: [...arr], action: 'Insertion Sort' });
      }
    };
  
    const merge = (arr, left, mid, right) => {
      const leftArray = arr.slice(left, mid + 1);
      const rightArray = arr.slice(mid + 1, right + 1);
      let i = 0, j = 0, k = left;
  
      while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] <= rightArray[j]) {
          arr[k++] = leftArray[i++];
        } else {
          arr[k++] = rightArray[j++];
        }
        updateStep({ array: [...arr], action: 'Merging' });
      }
  
      while (i < leftArray.length) arr[k++] = leftArray[i++];
      while (j < rightArray.length) arr[k++] = rightArray[j++];
      updateStep({ array: [...arr], action: 'Final Merging' });
    };
  
    const timSort = (arr) => {
      for (let start = 0; start < arr.length; start += minRun) {
        const end = Math.min(start + minRun - 1, arr.length - 1);
        insertionSort(arr, start, end);
      }
  
      for (let size = minRun; size < arr.length; size *= 2) {
        for (let left = 0; left < arr.length; left += size * 2) {
          const mid = Math.min(left + size - 1, arr.length - 1);
          const right = Math.min((left + 2 * size - 1), (arr.length - 1));
          if (mid < right) merge(arr, left, mid, right);
        }
      }
    };
  
    timSort(array);
    return array;
  }
        `,
      },
    ],
  },
  'String Algorithms': {
    algorithms: [
      {
        name: 'Rabin-Karp Algorithm',
        description: 'Searches for a pattern in a text using hashing.',
        outputType: 'integer',
        visualization: {
          description: 'Visualization of the Rabin-Karp algorithm.',
          details: {
            type: 'searching',
            additionalInfo: 'Each step shows the current hash values and indexes being compared.',
          },
          stepType: 'array',
        },
        parameters: [
          { name: 'text', type: 'string' },
          { name: 'pattern', type: 'string' },
        ],
        execute: (text, pattern, updateStep) => {
          const m = pattern.length;
          const n = text.length;
          const prime = 101;
          let p = 0;
          let t = 0;
          const h = Math.pow(256, m - 1) % prime;

          for (let i = 0; i < m; i++) {
            p = (256 * p + pattern.charCodeAt(i)) % prime;
            t = (256 * t + text.charCodeAt(i)) % prime;
          }

          for (let i = 0; i <= n - m; i++) {
            if (p === t) {
              let j;
              for (j = 0; j < m; j++) {
                if (text[i + j] !== pattern[j]) break;
              }
              if (j === m) updateStep({ index: i, found: true, action: 'Pattern found' });
            }
            if (i < n - m) {
              t = (256 * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % prime;
              if (t < 0) t += prime;
            }
            updateStep({ index: i, action: 'Hash updated', currentHash: t });
          }
        },
        code: `
function rabinKarp(text, pattern, updateStep) {
  const m = pattern.length;
  const n = text.length;
  const prime = 101;
  let p = 0;
  let t = 0;
  const h = Math.pow(256, m - 1) % prime;

  for (let i = 0; i < m; i++) {
    p = (256 * p + pattern.charCodeAt(i)) % prime;
    t = (256 * t + text.charCodeAt(i)) % prime;
  }

  for (let i = 0; i <= n - m; i++) {
    if (p === t) {
      let j;
      for (j = 0; j < m; j++) {
        if (text[i + j] !== pattern[j]) break;
      }
      if (j === m) updateStep({ index: i, found: true });
    }
    if (i < n - m) {
      t = (256 * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % prime;
      if (t < 0) t += prime;
    }
    updateStep({ index: i, action: 'Hash updated', currentHash: t });
  }
}
      `,
      },
      {
        name: 'KMP Algorithm',
        description: 'Searches for a pattern in a text using the Knuth-Morris-Pratt algorithm.',
        outputType: 'integer',
        visualization: {
          description: 'Visualization of the KMP algorithm.',
          details: {
            type: 'searching',
            additionalInfo: 'Each step shows the current state of the pattern and text indexes being compared.',
          },
          stepType: 'array',
        },
        parameters: [
          { name: 'text', type: 'string' },
          { name: 'pattern', type: 'string' },
        ],
        execute: (text, pattern, updateStep) => {
          const lps = (pattern) => {
            const lpsArray = Array(pattern.length).fill(0);
            let len = 0;
            let i = 1;

            while (i < pattern.length) {
              if (pattern[i] === pattern[len]) {
                len++;
                lpsArray[i] = len;
                i++;
              } else {
                if (len !== 0) {
                  len = lpsArray[len - 1];
                } else {
                  lpsArray[i] = 0;
                  i++;
                }
              }
            }
            return lpsArray;
          };

          const lpsArray = lps(pattern);
          let i = 0;
          let j = 0;

          while (i < text.length) {
            updateStep({ currentTextIndex: i, currentPatternIndex: j });
            if (pattern[j] === text[i]) {
              i++;
              j++;
            }

            if (j === pattern.length) {
              updateStep({ index: i - j, found: true, action: 'Pattern found' });
              j = lpsArray[j - 1];
            } else if (i < text.length && pattern[j] !== text[i]) {
              if (j !== 0) {
                j = lpsArray[j - 1];
              } else {
                i++;
              }
            }
          }
        },
        code: `
function kmp(text, pattern, updateStep) {
  const lps = (pattern) => {
    const lpsArray = Array(pattern.length).fill(0);
    let len = 0;
    let i = 1;

    while (i < pattern.length) {
      if (pattern[i] === pattern[len]) {
        len++;
        lpsArray[i] = len;
        i++;
      } else {
        if (len !== 0) {
          len = lpsArray[len - 1];
        } else {
          lpsArray[i] = 0;
          i++;
        }
      }
    }
    return lpsArray;
  };

  const lpsArray = lps(pattern);
  let i = 0;
  let j = 0;

  while (i < text.length) {
    updateStep({ currentTextIndex: i, currentPatternIndex: j });
    if (pattern[j] === text[i]) {
      i++;
      j++;
    }

    if (j === pattern.length) {
      updateStep({ index: i - j, found: true });
      j = lpsArray[j - 1];
    } else if (i < text.length && pattern[j] !== text[i]) {
      if (j !== 0) {
        j = lpsArray[j - 1];
      } else {
        i++;
      }
    }
  }
}
      `,
      },
    ],
  },
  'Miscellaneous Algorithms': {
    algorithms: [
      {
        name: 'Backtracking (e.g., Hamiltonian Cycle)',
        description: 'Finds Hamiltonian cycles in a graph using a backtracking approach.',
        outputType: 'array',
        visualization: {
          description: 'Visualization of the Hamiltonian Cycle algorithm.',
          details: {
            type: 'backtracking',
            additionalInfo: 'Each step shows the current state of the path and the current vertex being explored.',
          },
          stepType: 'array',
        },
        parameters: [
          { name: 'graph', type: 'adjacencyList', numVertices: 5 }
        ],
        execute: (graph, updateStep) => {
          const numVertices = graph.length;
          const path = Array(numVertices).fill(-1);
          path[0] = 0;

          const isSafe = (v, pos) => {
            if (!graph[path[pos - 1]].some(edge => edge[0] === v)) return false;
            return !path.includes(v);
          };

          const hamiltonianCycleUtil = (pos) => {
            if (pos === numVertices) {
              if (graph[path[pos - 1]].some(edge => edge[0] === path[0])) {
                updateStep({ path: [...path], cycleComplete: true });
                return true;
              } else {
                return false;
              }
            }

            for (let v = 1; v < numVertices; v++) {
              if (isSafe(v, pos)) {
                path[pos] = v;
                updateStep({ path: [...path], currentVertex: v, step: pos });

                if (hamiltonianCycleUtil(pos + 1)) return true;

                path[pos] = -1;
                updateStep({ path: [...path], backtracking: true, step: pos });
              }
            }

            return false;
          };

          if (!hamiltonianCycleUtil(1)) {
            updateStep({ path: null, cycleComplete: false });
            return false;
          }

          return path;
        },
        code: `
    function hamiltonianCycle(graph, updateStep) {
      const numVertices = graph.length;
      const path = Array(numVertices).fill(-1);
      path[0] = 0;

      const isSafe = (v, pos) => {
        if (!graph[path[pos - 1]].some(edge => edge[0] === v)) return false;
        return !path.includes(v);
      };

      const hamiltonianCycleUtil = (pos) => {
        if (pos === numVertices) {
          if (graph[path[pos - 1]].some(edge => edge[0] === path[0])) {
            updateStep({ path: [...path], cycleComplete: true });
            return true;
          } else {
            return false;
          }
        }

        for (let v = 1; v < numVertices; v++) {
          if (isSafe(v, pos)) {
            path[pos] = v;
            updateStep({ path: [...path], currentVertex: v, step: pos });

            if (hamiltonianCycleUtil(pos + 1)) return true;

            path[pos] = -1;
            updateStep({ path: [...path], backtracking: true, step: pos });
          }
        }

        return false;
      };

      if (!hamiltonianCycleUtil(1)) {
        updateStep({ path: null, cycleComplete: false });
        return false;
      }

      return path;
    }
        `,
      },
      {
        name: 'Randomized Algorithms (e.g., Randomized QuickSort)',
        description: 'Sorts an array using randomized quicksort, where the pivot is chosen randomly in each partition step.',
        outputType: 'array',
        visualization: {
          description: 'Visualization of the Randomized QuickSort algorithm.',
          details: {
            type: 'sorting',
            additionalInfo: 'Each step shows the array state and highlights the pivot index and the indices being compared.',
          },
          stepType: 'array',
        },
        parameters: [
          { name: 'array', type: 'array', length: 10, min: 1, max: 100 }
        ],
        execute: (array, updateStep) => {
          const randomizedQuickSort = (arr, low, high) => {
            if (low < high) {
              const pivotIndex = partition(arr, low, high);
              updateStep({ arr: [...arr], pivotIndex, low, high, action: 'Partition complete' });

              randomizedQuickSort(arr, low, pivotIndex - 1);
              randomizedQuickSort(arr, pivotIndex + 1, high);
            }
          };

          const partition = (arr, low, high) => {
            const pivotIndex = Math.floor(Math.random() * (high - low + 1)) + low;
            const pivotValue = arr[pivotIndex];
            [arr[pivotIndex], arr[high]] = [arr[high], arr[pivotIndex]];
            updateStep({ arr: [...arr], pivotValue, pivotIndex, action: 'Pivot chosen and moved to end' });

            let storeIndex = low;
            for (let i = low; i < high; i++) {
              if (arr[i] < pivotValue) {
                [arr[storeIndex], arr[i]] = [arr[i], arr[storeIndex]];
                updateStep({ arr: [...arr], i, storeIndex, action: 'Swapping elements' });
                storeIndex++;
              }
            }

            [arr[storeIndex], arr[high]] = [arr[high], arr[storeIndex]];
            updateStep({ arr: [...arr], pivotFinalIndex: storeIndex, action: 'Placing pivot in final position' });

            return storeIndex;
          };

          randomizedQuickSort(array, 0, array.length - 1);
          return array;
        },
        code: `
    function randomizedQuickSort(array, updateStep) {
      const randomizedQuickSort = (arr, low, high) => {
        if (low < high) {
          const pivotIndex = partition(arr, low, high);
          updateStep({ array: [...arr], pivotIndex, low, high, action: 'Partition complete' });

          randomizedQuickSort(arr, low, pivotIndex - 1);
          randomizedQuickSort(arr, pivotIndex + 1, high);
        }
      };

      const partition = (arr, low, high) => {
        const pivotIndex = Math.floor(Math.random() * (high - low + 1)) + low;
        const pivotValue = arr[pivotIndex];
        [arr[pivotIndex], arr[high]] = [arr[high], arr[pivotIndex]];
        updateStep({ array: [...arr], pivotValue, pivotIndex, action: 'Pivot chosen and moved to end' });

        let storeIndex = low;
        for (let i = low; i < high; i++) {
          if (arr[i] < pivotValue) {
            [arr[storeIndex], arr[i]] = [arr[i], arr[storeIndex]];
            updateStep({ array: [...arr], i, storeIndex, action: 'Swapping elements' });
            storeIndex++;
          }
        }

        [arr[storeIndex], arr[high]] = [arr[high], arr[storeIndex]];
        updateStep({ array: [...arr], pivotFinalIndex: storeIndex, action: 'Placing pivot in final position' });

        return storeIndex;
      };

      randomizedQuickSort(array, 0, array.length - 1);
      return array;
    }
        `,
      },
      {
        name: 'Monte Carlo Algorithms',
        description: 'Uses random sampling to estimate the value of π by calculating points inside a unit circle.',
        outputType: 'float',
        visualization: {
          description: 'Visualization of the Monte Carlo estimation of π.',
          details: {
            type: 'sampling',
            additionalInfo: 'Each step shows the coordinates sampled and the estimated value of π.',
          },
          stepType: 'stepwise',
        },
        parameters: [
          { name: 'numPoints', type: 'integer', min: 100, max: 100000 }
        ],
        execute: (numPoints, updateStep) => {
          let insideCircle = 0;

          for (let i = 0; i < numPoints; i++) {
            const x = Math.random();
            const y = Math.random();
            const distance = Math.sqrt(x * x + y * y);
            if (distance <= 1) insideCircle++;

            // Only update every 100 iterations to reduce UI calls
            if (i % 100 === 0) {
              updateStep({
                x,
                y,
                insideCircle,
                totalPoints: i + 1,
                estimatedPi: (4 * insideCircle) / (i + 1),
                action: 'Sampling',
              });
            }
          }

          const piEstimate = (4 * insideCircle) / numPoints;
          updateStep({
            estimatedPi: piEstimate,
            action: 'Final Estimate',
          });

          return piEstimate;
        },
        code: `
          function monteCarlo(numPoints, updateStep) {
            let insideCircle = 0;
      
            for (let i = 0; i < numPoints; i++) {
              const x = Math.random();
              const y = Math.random();
              const distance = Math.sqrt(x * x + y * y);
              if (distance <= 1) insideCircle++;
      
              // Only update every 100 iterations to reduce UI calls
              if (i % 100 === 0) {
                updateStep({
                  x,
                  y,
                  insideCircle,
                  totalPoints: i + 1,
                  estimatedPi: (4 * insideCircle) / (i + 1),
                  action: 'Sampling',
                });
              }
            }
      
            const piEstimate = (4 * insideCircle) / numPoints;
            updateStep({
              estimatedPi: piEstimate,
              action: 'Final Estimate',
            });
      
            return piEstimate;
          }
        `,
      },
      {
        name: 'Simulated Annealing',
        description: 'An optimization technique inspired by the annealing process in metallurgy, used to find an approximate solution to optimization problems.',
        outputType: 'float',
        visualization: {
          description: 'Visualization of the Simulated Annealing algorithm.',
          details: {
            type: 'optimization',
            additionalInfo: 'Each step shows the current state of the solution and the temperature decay.',
          },
          stepType: 'stepwise',
        },
        parameters: [
          { name: 'initialState', type: 'object' },
          { name: 'temperature', type: 'float', min: 0.01, max: 100 },
          { name: 'coolingRate', type: 'float', min: 0.01, max: 1 },
        ],
        execute: (initialState, temperature, coolingRate, updateStep) => {
          if (!initialState || !Array.isArray(initialState) || initialState.length === 0) {
            console.error('Initial state must be a non-empty array.');
            return null; // or handle as appropriate
          }

          const calculateCost = (solution) => {
            if (!solution) {
              console.error('Received null or undefined solution');
              return Infinity; // Return a high cost if the solution is invalid
            }
            return solution.reduce((acc, val) => acc + val, 0);
          };

          const generateNeighbor = (solution) => {
            const neighbor = [...solution];
            const index = Math.floor(Math.random() * solution.length);
            neighbor[index] = Math.random(); // Random value
            return neighbor;
          };

          let currentSolution = initialState;
          let bestSolution = initialState;
          let bestCost = calculateCost(initialState); // Calculate initial cost

          while (temperature > 1) {
            let newSolution = generateNeighbor(currentSolution); // Generate new solution
            let newCost = calculateCost(newSolution);

            if (newCost < bestCost) {
              bestSolution = newSolution;
              bestCost = newCost;
            } else {
              const acceptanceProbability = Math.exp((bestCost - newCost) / temperature);
              if (Math.random() < acceptanceProbability) {
                currentSolution = newSolution;
              }
            }

            updateStep({
              currentSolution: currentSolution,
              temperature: temperature,
              bestCost: bestCost,
            });

            temperature *= coolingRate; // Cool down
          }

          return bestSolution; // Return the best solution found
        },
        code: `
      function simulatedAnnealing(initialState, temperature, coolingRate, updateStep) {
        if (!initialState || !Array.isArray(initialState) || initialState.length === 0) {
          console.error('Initial state must be a non-empty array.');
          return null; // or handle as appropriate
        }
      
        const calculateCost = (solution) => {
          if (!solution) {
            console.error('Received null or undefined solution');
            return Infinity; // Return a high cost if the solution is invalid
          }
          return solution.reduce((acc, val) => acc + val, 0);
        };
      
        const generateNeighbor = (solution) => {
          const neighbor = [...solution];
          const index = Math.floor(Math.random() * solution.length);
          neighbor[index] = Math.random(); // Random value
          return neighbor;
        };
      
        let currentSolution = initialState;
        let bestSolution = initialState;
        let bestCost = calculateCost(initialState); // Calculate initial cost
      
        while (temperature > 1) {
          let newSolution = generateNeighbor(currentSolution); // Generate new solution
          let newCost = calculateCost(newSolution);
      
          if (newCost < bestCost) {
            bestSolution = newSolution;
            bestCost = newCost;
          } else {
            const acceptanceProbability = Math.exp((bestCost - newCost) / temperature);
            if (Math.random() < acceptanceProbability) {
              currentSolution = newSolution;
            }
          }
      
          updateStep({
            currentSolution: currentSolution,
            temperature: temperature,
            bestCost: bestCost,
          });
      
          temperature *= coolingRate; // Cool down
        }
      
        return bestSolution; // Return the best solution found
      }
        `,
      },
      {
        name: 'Genetic Algorithms',
        description: 'An optimization algorithm inspired by the process of natural selection that is used to find approximate solutions to optimization and search problems.',
        outputType: 'object',
        visualization: {
          description: 'Visualization of the Genetic Algorithm.',
          details: {
            type: 'optimization',
            additionalInfo: 'Each step shows the current generation, fitness levels, and selected parents for crossover.',
          },
          stepType: 'stepwise',
        },
        parameters: [
          { name: 'population', type: 'array', length: 10 }, // Array of individuals
          { name: 'generations', type: 'integer', min: 1, max: 100 },
          { name: 'mutationRate', type: 'float', min: 0, max: 1 },
        ],
        execute: (population, generations, mutationRate, updateStep) => {
          const calculateFitness = (individual) => {
            if (!Array.isArray(individual)) {
              console.error('Invalid individual for fitness calculation');
              return 0;
            }
            return 1 / (calculateCost(individual) + 1); // Assuming a cost function exists
          };

          const selectParents = (population, fitness) => {
            const parents = [];
            for (let i = 0; i < population.length; i++) {
              const tournament = [];
              for (let j = 0; j < 3; j++) { // Size of tournament
                const randomIndex = Math.floor(Math.random() * population.length);
                tournament.push({ individual: population[randomIndex], fitness: fitness[randomIndex] });
              }
              const best = tournament.reduce((prev, curr) => (prev.fitness > curr.fitness ? prev : curr));
              parents.push(best.individual);
            }
            return parents;
          };

          const crossover = (parents) => {
            if (parents.length < 2) {
              console.error('Not enough parents for crossover');
              return []; // Return an empty array if not enough parents
            }
            const parent1 = parents[Math.floor(Math.random() * parents.length)];
            const parent2 = parents[Math.floor(Math.random() * parents.length)];

            // Ensure parents are arrays
            if (!Array.isArray(parent1) || !Array.isArray(parent2)) {
              console.error('Parents must be arrays');
              return []; // Return an empty array if parents are invalid
            }

            const crossoverPoint = Math.floor(Math.random() * parent1.length);
            return [
              ...parent1.slice(0, crossoverPoint),
              ...parent2.slice(crossoverPoint)
            ];
          };

          const mutate = (offspring, mutationRate) => {
            offspring.forEach((gene, index) => {
              if (Math.random() < mutationRate) {
                offspring[index] = Math.random(); // Mutate the gene
              }
            });
          };

          for (let generation = 0; generation < generations; generation++) {
            const fitness = population.map(individual => calculateFitness(individual)); // Calculate fitness
            const parents = selectParents(population, fitness); // Select parents based on fitness

            const newPopulation = [];
            for (let i = 0; i < population.length; i++) {
              const offspring = crossover(parents); // Perform crossover
              if (offspring.length === 0) {
                console.error('Crossover failed, skipping to next iteration');
                continue; // Skip if crossover failed
              }
              mutate(offspring, mutationRate); // Mutate offspring
              newPopulation.push(offspring);
            }

            population = newPopulation;

            updateStep({
              generation: generation,
              population: population,
              fitness: fitness,
            });
          }

          return population; // Return the final population
        },
        code: `
        function geneticAlgorithm(population, generations, mutationRate, updateStep) {
          const calculateFitness = (individual) => {
            if (!Array.isArray(individual)) {
              console.error('Invalid individual for fitness calculation');
              return 0;
            }
            return 1 / (calculateCost(individual) + 1);
          };
      
          const selectParents = (population, fitness) => {
            const parents = [];
            for (let i = 0; i < population.length; i++) {
              const tournament = [];
              for (let j = 0; j < 3; j++) {
                const randomIndex = Math.floor(Math.random() * population.length);
                tournament.push({ individual: population[randomIndex], fitness: fitness[randomIndex] });
              }
              const best = tournament.reduce((prev, curr) => (prev.fitness > curr.fitness ? prev : curr));
              parents.push(best.individual);
            }
            return parents;
          };
      
          const crossover = (parents) => {
            if (parents.length < 2) {
              console.error('Not enough parents for crossover');
              return [];
            }
            const parent1 = parents[Math.floor(Math.random() * parents.length)];
            const parent2 = parents[Math.floor(Math.random() * parents.length)];
            
            if (!Array.isArray(parent1) || !Array.isArray(parent2)) {
              console.error('Parents must be arrays');
              return [];
            }
      
            const crossoverPoint = Math.floor(Math.random() * parent1.length);
            return [
              ...parent1.slice(0, crossoverPoint),
              ...parent2.slice(crossoverPoint)
            ];
          };
      
          const mutate = (offspring, mutationRate) => {
            offspring.forEach((gene, index) => {
              if (Math.random() < mutationRate) {
                offspring[index] = Math.random();
              }
            });
          };
      
          for (let generation = 0; generation < generations; generation++) {
            const fitness = population.map(individual => calculateFitness(individual));
            const parents = selectParents(population, fitness);
      
            const newPopulation = [];
            for (let i = 0; i < population.length; i++) {
              const offspring = crossover(parents);
              if (offspring.length === 0) {
                console.error('Crossover failed, skipping to next iteration');
                continue;
              }
              mutate(offspring, mutationRate);
              newPopulation.push(offspring);
            }
      
            population = newPopulation;
      
            updateStep({
              generation: generation,
              population: population,
              fitness: fitness,
            });
          }
      
          return population;
        }
        `,
      }
    ],
  },
  'Uncategorised': {
    algorithms: [
      {
        name: 'Affine Cipher',
        description: 'An encryption algorithm that uses a simple mathematical function.',
        parameters: [
          { name: 'text', type: 'string' },
          { name: 'a', type: 'integer' },
          { name: 'b', type: 'integer' },
        ],
        outputType: 'string',
        visualization: {
          description: 'Visualization of the Affine Cipher algorithm.',
          details: {
            type: 'encryption',
            additionalInfo: 'Each step shows the character being encrypted.',
          },
          stepType: 'stepwise',
        },
        execute: (text, a, b, updateStep) => {
          let result = '';
          for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i);
            if (char >= 65 && char <= 90) {
              result += String.fromCharCode(((a * (char - 65) + b) % 26) + 65);
            } else if (char >= 97 && char <= 122) {
              result += String.fromCharCode(((a * (char - 97) + b) % 26) + 97);
            } else {
              result += text[i];
            }
            updateStep({ char: text[i], encrypted: result[i] });
          }
          return result;
        },
        code: `
          function affineCipher(text, a, b, updateStep) {
            let result = '';
            for (let i = 0; i < text.length; i++) {
              const char = text.charCodeAt(i);
              if (char >= 65 && char <= 90) {
                result += String.fromCharCode(((a * (char - 65) + b) % 26) + 65);
              } else if (char >= 97 && char <= 122) {
                result += String.fromCharCode(((a * (char - 97) + b) % 26) + 97);
              } else {
                result += text[i];
              }
              updateStep({ char: text[i], encrypted: result[i] });
            }
            return result;
          }
        `
      },
      {
        name: 'Caesar Cipher',
        description: 'A simple encryption technique that shifts characters by a fixed number.',
        parameters: [
          { name: 'text', type: 'string' },
          { name: 'shift', type: 'integer' },
        ],
        outputType: 'string',
        visualization: {
          description: 'Visualization of the Caesar Cipher algorithm.',
          details: {
            type: 'encryption',
            additionalInfo: 'Each step shows the character being shifted.',
          },
          stepType: 'stepwise',
        },
        execute: (text, shift, updateStep) => {
          let result = '';
          for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i);
            if (char >= 65 && char <= 90) {
              result += String.fromCharCode(((char - 65 + shift) % 26) + 65);
            } else if (char >= 97 && char <= 122) {
              result += String.fromCharCode(((char - 97 + shift) % 26) + 97);
            } else {
              result += text[i];
            }
            updateStep({ char: text[i], encrypted: result[i] });
          }
          return result;
        },
        code: `
          function caesarCipher(text, shift, updateStep) {
            let result = '';
            for (let i = 0; i < text.length; i++) {
              const char = text.charCodeAt(i);
              if (char >= 65 && char <= 90) {
                result += String.fromCharCode(((char - 65 + shift) % 26) + 65);
              } else if (char >= 97 && char <= 122) {
                result += String.fromCharCode(((char - 97 + shift) % 26) + 97);
              } else {
                result += text[i];
              }
              updateStep({ char: text[i], encrypted: result[i] });
            }
            return result;
          }
        `
      },
      {
        name: 'Freivalds\' Matrix-Multiplication Verification',
        description: 'Verifies the product of two matrices using randomization.',
        parameters: [
          { name: 'matrixA', type: 'matrix', numRows: 3, numCols: 3 },
          { name: 'matrixB', type: 'matrix', numRows: 3, numCols: 3 },
          { name: 'resultMatrix', type: 'matrix', numRows: 3, numCols: 3 },
        ],
        outputType: 'boolean',
        visualization: {
          description: 'Visualization of Freivalds\' verification algorithm.',
          details: {
            type: 'verification',
            additionalInfo: 'Each step shows the verification of the matrix multiplication.',
          },
          stepType: 'stepwise',
        },
        execute: (matrixA, matrixB, resultMatrix, updateStep) => {
          const rows = matrixA.length;
          const cols = matrixB[0].length;
      
          const randomVector = Array.from({ length: cols }, () => Math.round(Math.random()));
      
          const matrixAxB = matrixA.map(row => row.reduce((sum, value, idx) => sum + value * randomVector[idx], 0));
          const matrixResult = resultMatrix.map(row => row.reduce((sum, value, idx) => sum + value * randomVector[idx], 0));
      
          for (let i = 0; i < rows; i++) {
            const verificationStep = matrixAxB[i] === matrixResult[i];
            updateStep({ row: i, verificationStep });
          }
      
          return matrixAxB.every((val, idx) => val === matrixResult[idx]);
        },
        code: `
          function freivaldsVerification(matrixA, matrixB, resultMatrix, updateStep) {
            const rows = matrixA.length;
            const cols = matrixB[0].length;
      
            const randomVector = Array.from({ length: cols }, () => Math.round(Math.random()));
      
            const matrixAxB = matrixA.map(row => row.reduce((sum, value, idx) => sum + value * randomVector[idx], 0));
            const matrixResult = resultMatrix.map(row => row.reduce((sum, value, idx) => sum + value * randomVector[idx], 0));
      
            for (let i = 0; i < rows; i++) {
              const verificationStep = matrixAxB[i] === matrixResult[i];
              updateStep({ row: i, verificationStep });
            }
      
            return matrixAxB.every((val, idx) => val === matrixResult[idx]);
          }
        `
      },      
      {
        name: 'K-Means Clustering',
        description: 'Partitions n observations into k clusters in which each observation belongs to the cluster with the nearest mean.',
        parameters: [
          { name: 'data', type: 'array', length: 10, min: 1, max: 100 }, // Array of numbers for clustering
          { name: 'k', type: 'integer', min: 1, max: 10 } // Number of clusters
        ],
        outputType: 'object',
        visualization: {
          description: 'Visualization of the K-Means Clustering algorithm.',
          details: {
            type: 'clustering',
            additionalInfo: 'Each step shows the current centroids and clusters.',
          },
          stepType: 'stepwise',
        },
        execute: (data, k, updateStep) => {
          let centroids = data.slice(0, k);
          let clusters = Array.from({ length: k }, () => []);
          let changed = true; // Track if any points moved clusters

          const maxIterations = 10;
          let iteration = 0;

          while (changed && iteration < maxIterations) {
            clusters = Array.from({ length: k }, () => []);
            data.forEach(point => {
              const distances = centroids.map(centroid => Math.abs(point - centroid));
              const nearestCentroidIdx = distances.indexOf(Math.min(...distances));

              clusters[nearestCentroidIdx].push(point);

              updateStep({
                point,
                nearestCentroid: centroids[nearestCentroidIdx],
                clusterIndex: nearestCentroidIdx,
                clusters: clusters.map(cluster => [...cluster]), // Snapshot of clusters
                centroids: [...centroids] // Snapshot of centroids
              });
            });

            const newCentroids = clusters.map(cluster => {
              if (cluster.length === 0) return null;
              return cluster.reduce((sum, point) => sum + point, 0) / cluster.length;
            });

            changed = newCentroids.some((newCentroid, i) => newCentroid !== centroids[i]);
            centroids = newCentroids.map((centroid, i) => (centroid !== null ? centroid : centroids[i]));

            iteration++;
          }

          return { clusters, centroids };
        },
        code: `
      function kMeansClustering(data, k, updateStep) {
        let centroids = data.slice(0, k);
      
        let clusters = Array.from({ length: k }, () => []);
        let changed = true;
        const maxIterations = 10;
        let iteration = 0;
      
        while (changed && iteration < maxIterations) {
          clusters = Array.from({ length: k }, () => []);
      
          data.forEach(point => {
            const distances = centroids.map(centroid => Math.abs(point - centroid));
            const nearestCentroidIdx = distances.indexOf(Math.min(...distances));
      
            clusters[nearestCentroidIdx].push(point);
      
            updateStep({
              point,
              nearestCentroid: centroids[nearestCentroidIdx],
              clusterIndex: nearestCentroidIdx,
              clusters: clusters.map(cluster => [...cluster]),
              centroids: [...centroids]
            });
          });
      
          const newCentroids = clusters.map(cluster => {
            if (cluster.length === 0) return null;
            return cluster.reduce((sum, point) => sum + point, 0) / cluster.length;
          });
      
          changed = newCentroids.some((newCentroid, i) => newCentroid !== centroids[i]);
      
          centroids = newCentroids.map((centroid, i) => (centroid !== null ? centroid : centroids[i]));
      
          iteration++;
        }
      
        return { clusters, centroids };
      }
      `
      },
      {
        name: 'Magic Square',
        description: 'Generates a magic square of a given size, where the sum of each row, column, and diagonal is the same.',
        parameters: [
          { name: 'n', type: 'integer', min: 3, max: 15 } // Typically, n is an odd integer for this method
        ],
        outputType: 'matrix',
        visualization: {
          description: 'Visualization of the Magic Square generation algorithm.',
          details: {
            type: 'generation',
            additionalInfo: 'Each step shows the current number being placed in the magic square.',
          },
          stepType: 'stepwise',
        },
        execute: (n, updateStep) => {
          if (n % 2 === 0 || n < 3) throw new Error("n must be an odd integer greater than or equal to 3");
          const magicSquare = Array.from({ length: n }, () => Array(n).fill(0));

          let num = 1;
          let i = 0;
          let j = Math.floor(n / 2);

          while (num <= n * n) {
            magicSquare[i][j] = num;
            updateStep({
              currentNumber: num,
              position: { row: i, col: j },
              magicSquare: magicSquare.map(row => [...row])
            });

            num++;
            i--;
            j++;

            if (num % n === 1) {
              i += 2;
              j--;
            } else {
              if (j === n) j -= n;
              if (i < 0) i += n;
            }
          }

          return magicSquare;
        },
        code: `
      function generateMagicSquare(n, updateStep) {
        if (n % 2 === 0 || n < 3) throw new Error("n must be an odd integer greater than or equal to 3");
        const magicSquare = Array.from({ length: n }, () => Array(n).fill(0));
      
        let num = 1;
        let i = 0;
        let j = Math.floor(n / 2);
      
        while (num <= n * n) {
          magicSquare[i][j] = num;
      
          updateStep({
            currentNumber: num,
            position: { row: i, col: j },
            magicSquare: magicSquare.map(row => [...row])
          });
      
          num++;
          i--;
          j++;
      
          if (num % n === 1) {
            i += 2;
            j--;
          } else {
            if (j === n) j -= n; 
            if (i < 0) i += n;   
          }
        }
      
        return magicSquare;
      }
      `
      },
      {
        name: 'Maze Generation',
        description: 'Generates a maze using Prim\'s Algorithm. The maze is carved out from an initially fully walled grid.',
        parameters: [
          { name: 'width', type: 'integer', min: 5, max: 50 },
          { name: 'height', type: 'integer', min: 5, max: 50 }
        ],
        outputType: 'matrix',
        visualization: {
          description: 'Visualization of the Maze Generation algorithm.',
          details: {
            type: 'generation',
            additionalInfo: 'Each step shows the current state of the maze.',
          },
          stepType: 'stepwise',
        },
        execute: (width, height, updateStep) => {
          if (width % 2 === 0) width += 1;
          if (height % 2 === 0) height += 1;

          const maze = Array.from({ length: height }, () => Array(width).fill(1));
          const startRow = Math.floor(Math.random() * (height / 2)) * 2 + 1;
          const startCol = Math.floor(Math.random() * (width / 2)) * 2 + 1;
          maze[startRow][startCol] = 0;

          const walls = [];
          const directions = [
            [-2, 0], [2, 0], [0, -2], [0, 2]
          ];

          directions.forEach(([dr, dc]) => {
            const newRow = startRow + dr;
            const newCol = startCol + dc;
            if (newRow > 0 && newRow < height && newCol > 0 && newCol < width) {
              walls.push([newRow, newCol, startRow + dr / 2, startCol + dc / 2]);
            }
          });

          while (walls.length > 0) {
            const randomIndex = Math.floor(Math.random() * walls.length);
            const [wallRow, wallCol, passageRow, passageCol] = walls.splice(randomIndex, 1)[0];

            if (maze[wallRow][wallCol] === 1) {
              maze[wallRow][wallCol] = 0;
              maze[passageRow][passageCol] = 0;

              updateStep({
                wallRemoved: { row: wallRow, col: wallCol },
                passageCreated: { row: passageRow, col: passageCol },
                maze: maze.map(row => [...row])
              });

              directions.forEach(([dr, dc]) => {
                const newRow = wallRow + dr;
                const newCol = wallCol + dc;
                if (newRow > 0 && newRow < height && newCol > 0 && newCol < width) {
                  if (maze[newRow][newCol] === 1) {
                    walls.push([newRow, newCol, wallRow + dr / 2, wallCol + dc / 2]);
                  }
                }
              });
            }
          }

          return maze;
        },
        code: `
      function generateMaze(width, height, updateStep) {
        if (width % 2 === 0) width += 1;
        if (height % 2 === 0) height += 1;
      
        const maze = Array.from({ length: height }, () => Array(width).fill(1));
        const startRow = Math.floor(Math.random() * (height / 2)) * 2 + 1;
        const startCol = Math.floor(Math.random() * (width / 2)) * 2 + 1;
        maze[startRow][startCol] = 0;
      
        const walls = [];
        const directions = [
          [-2, 0], [2, 0], [0, -2], [0, 2]
        ];
      
        directions.forEach(([dr, dc]) => {
          const newRow = startRow + dr;
          const newCol = startCol + dc;
          if (newRow > 0 && newRow < height && newCol > 0 && newCol < width) {
            walls.push([newRow, newCol, startRow + dr / 2, startCol + dc / 2]);
          }
        });
      
        while (walls.length > 0) {
          const randomIndex = Math.floor(Math.random() * walls.length);
          const [wallRow, wallCol, passageRow, passageCol] = walls.splice(randomIndex, 1)[0];
      
          if (maze[wallRow][wallCol] === 1) {
            maze[wallRow][wallCol] = 0;
            maze[passageRow][passageCol] = 0;
      
            updateStep({
              wallRemoved: { row: wallRow, col: wallCol },
              passageCreated: { row: passageRow, col: passageCol },
              maze: maze.map(row => [...row])
            });
      
            directions.forEach(([dr, dc]) => {
              const newRow = wallRow + dr;
              const newCol = wallCol + dc;
              if (newRow > 0 && newRow < height && newCol > 0 && newCol < width) {
                if (maze[newRow][newCol] === 1) {
                  walls.push([newRow, newCol, wallRow + dr / 2, wallCol + dc / 2]);
                }
              }
            });
          }
        }
      
        return maze;
      }
      `
      },
      {
        name: 'Miller-Rabin\'s Primality Test',
        description: 'Tests whether a number is a prime using probabilistic methods. It uses k rounds to minimize the probability of a false positive.',
        parameters: [
          { name: 'n', type: 'integer', min: 2 },
          { name: 'k', type: 'integer', min: 1, max: 10 } // Number of rounds for accuracy
        ],
        outputType: 'boolean',
        visualization: {
          description: 'Visualization of Miller-Rabin\'s Primality Test.',
          details: {
            type: 'primality test',
            additionalInfo: 'Each step shows the current base, exponent, and result.',
          },
          stepType: 'stepwise',
        },
        execute: (n, k, updateStep) => {
          if (n <= 1 || n === 4) return false;
          if (n <= 3) return true;

          const powerMod = (base, exp, mod) => {
            let result = 1;
            base = base % mod;
            while (exp > 0) {
              if (exp % 2 === 1) {
                result = (result * base) % mod;
              }
              exp = Math.floor(exp / 2);
              base = (base * base) % mod;
            }
            return result;
          };

          let d = n - 1;
          let r = 0;
          while (d % 2 === 0) {
            d /= 2;
            r += 1;
          }

          const millerTest = (d, n) => {
            const a = 2 + Math.floor(Math.random() * (n - 4));
            let x = powerMod(a, d, n);

            updateStep({
              base: a,
              exponent: d,
              modulus: n,
              result: x,
              type: 'initial',
              n,
              r,
              d
            });

            if (x === 1 || x === n - 1) return true;

            for (let i = 1; i < r; i++) {
              x = (x * x) % n;

              updateStep({
                base: a,
                exponent: d * Math.pow(2, i),
                modulus: n,
                result: x,
                type: 'squaring',
                step: i
              });

              if (x === n - 1) return true;
            }

            return false;
          };

          for (let i = 0; i < k; i++) {
            if (!millerTest(d, n)) {
              updateStep({ round: i + 1, result: 'composite' });
              return false;
            }
            updateStep({ round: i + 1, result: 'probably prime' });
          }

          return true;
        },
        code: `
      function millerRabin(n, k, updateStep) {
        if (n <= 1 || n === 4) return false;
        if (n <= 3) return true;
      
        const powerMod = (base, exp, mod) => {
          let result = 1;
          base = base % mod;
          while (exp > 0) {
            if (exp % 2 === 1) result = (result * base) % mod;
            exp = Math.floor(exp / 2);
            base = (base * base) % mod;
          }
          return result;
        };
      
        let d = n - 1;
        let r = 0;
        while (d % 2 === 0) {
          d /= 2;
          r += 1;
        }
      
        const millerTest = (d, n) => {
          const a = 2 + Math.floor(Math.random() * (n - 4));
          let x = powerMod(a, d, n);
          
          updateStep({
            base: a,
            exponent: d,
            modulus: n,
            result: x,
            type: 'initial',
            n,
            r,
            d
          });
      
          if (x === 1 || x === n - 1) return true;
      
          for (let i = 1; i < r; i++) {
            x = (x * x) % n;
      
            updateStep({
              base: a,
              exponent: d * Math.pow(2, i),
              modulus: n,
              result: x,
              type: 'squaring',
              step: i
            });
      
            if (x === n - 1) return true;
          }
      
          return false;
        };
      
        for (let i = 0; i < k; i++) {
          if (!millerTest(d, n)) {
            updateStep({ round: i + 1, result: 'composite' });
            return false;
          }
          updateStep({ round: i + 1, result: 'probably prime' });
        }
      
        return true;
      }
      `
      },
      {
        name: 'Shortest Unsorted Continuous Subarray',
        description: 'Finds the length of the shortest unsorted continuous subarray that, if sorted, results in the entire array being sorted.',
        parameters: [
          { name: 'array', type: 'array', length: 10, min: 1, max: 100 }
        ],
        outputType: 'integer',
        visualization: {
          description: 'Visualization of the Shortest Unsorted Continuous Subarray algorithm.',
          details: {
            type: 'sorting',
            additionalInfo: 'Each step shows the current state of the array and the identified indices.',
          },
          stepType: 'stepwise',
        },
        execute: (array, updateStep) => {
          let start = -1, end = -1;
          let maxSeen = -Infinity, minSeen = Infinity;

          for (let i = 0; i < array.length; i++) {
            maxSeen = Math.max(maxSeen, array[i]);
            if (array[i] < maxSeen) {
              end = i;
            }

            updateStep({
              index: i,
              maxSeen,
              current: array[i],
              endIndex: end,
              type: 'find_end',
              array: [...array]
            });
          }

          for (let i = array.length - 1; i >= 0; i--) {
            minSeen = Math.min(minSeen, array[i]);
            if (array[i] > minSeen) {
              start = i;
            }

            updateStep({
              index: i,
              minSeen,
              current: array[i],
              startIndex: start,
              type: 'find_start',
              array: [...array]
            });
          }

          const length = end - start + 1;

          updateStep({
            startIndex: start,
            endIndex: end,
            length: length > 0 ? length : 0,
            type: 'result',
            array: [...array]
          });

          return length > 0 ? length : 0;
        },
        code: `
      function shortestUnsortedSubarray(array, updateStep) {
        let start = -1, end = -1;
        let maxSeen = -Infinity, minSeen = Infinity;

        for (let i = 0; i < array.length; i++) {
          maxSeen = Math.max(maxSeen, array[i]);
          if (array[i] < maxSeen) {
            end = i;
          }

          updateStep({
            index: i,
            maxSeen,
            current: array[i],
            endIndex: end,
            type: 'find_end',
            array: [...array]
          });
        }

        for (let i = array.length - 1; i >= 0; i--) {
          minSeen = Math.min(minSeen, array[i]);
          if (array[i] > minSeen) {
            start = i;
          }

          updateStep({
            index: i,
            minSeen,
            current: array[i],
            startIndex: start,
            type: 'find_start',
            array: [...array]
          });
        }

        const length = end - start + 1;

        updateStep({
          startIndex: start,
          endIndex: end,
          length: length > 0 ? length : 0,
          type: 'result',
          array: [...array]
        });

        return length > 0 ? length : 0;
      }
      `
      },
      {
        name: 'Conway\'s Game of Life',
        description: 'Simulates Conway\'s Game of Life, where each cell lives, dies, or is born based on its neighbors in a grid.',
        parameters: [
          { name: 'grid', type: 'matrix', numRows: 10, numCols: 10 }, // Default 10x10 grid size for simulation
          { name: 'steps', type: 'integer', min: 1, max: 100 } // Number of steps to simulate
        ],
        outputType: 'matrix',
        visualization: {
          description: 'Visualization of Conway\'s Game of Life simulation.',
          details: {
            type: 'simulation',
            additionalInfo: 'Each step shows the current state of the grid.',
          },
          stepType: 'stepwise',
        },
        execute: (grid, steps, updateStep) => {
          const numRows = grid.length;
          const numCols = grid[0].length;

          const countLiveNeighbors = (row, col) => {
            let liveNeighbors = 0;
            const directions = [
              [-1, -1], [-1, 0], [-1, 1],
              [0, -1], [0, 1],
              [1, -1], [1, 0], [1, 1]
            ];

            directions.forEach(([dr, dc]) => {
              const newRow = row + dr;
              const newCol = col + dc;
              if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
                liveNeighbors += grid[newRow][newCol];
              }
            });

            return liveNeighbors;
          };

          for (let step = 0; step < steps; step++) {
            const nextGrid = grid.map(row => [...row]);

            for (let row = 0; row < numRows; row++) {
              for (let col = 0; col < numCols; col++) {
                const liveNeighbors = countLiveNeighbors(row, col);
                const cellState = grid[row][col];

                if (cellState === 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
                  nextGrid[row][col] = 0;
                } else if (cellState === 0 && liveNeighbors === 3) {
                  nextGrid[row][col] = 1;
                } else {
                  nextGrid[row][col] = cellState;
                }
              }
            }

            updateStep({
              step,
              grid: nextGrid.map(row => [...row])
            });

            grid = nextGrid;
          }

          return grid;
        },
        code: `
      function gameOfLife(grid, steps, updateStep) {
        const numRows = grid.length;
        const numCols = grid[0].length;
      
        const countLiveNeighbors = (row, col) => {
          let liveNeighbors = 0;
          const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1], [1, 0], [1, 1]
          ];
      
          directions.forEach(([dr, dc]) => {
            const newRow = row + dr;
            const newCol = col + dc;
            if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
              liveNeighbors += grid[newRow][newCol];
            }
          });
      
          return liveNeighbors;
        };
      
        for (let step = 0; step < steps; step++) {
          const nextGrid = grid.map(row => [...row]);
      
          for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
              const liveNeighbors = countLiveNeighbors(row, col);
              const cellState = grid[row][col];
      
              if (cellState === 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
                nextGrid[row][col] = 0;
              } else if (cellState === 0 && liveNeighbors === 3) {
                nextGrid[row][col] = 1;
              } else {
                nextGrid[row][col] = cellState;
              }
            }
          }
      
          updateStep({
            step,
            grid: nextGrid.map(row => [...row])
          });
      
          grid = nextGrid;
        }
      
        return grid;
      }
      `
      }
    ],
  },
};

// Heuristic function for pathfinding (example using Manhattan distance)
function heuristicCostEstimate(start, goal) {
  return Math.abs(start[0] - goal[0]) + Math.abs(start[1] - goal[1]);
}

// Function to get the node with the lowest fScore in the open set
function getLowestFScore(openSet, fScore) {
  let lowestNode = null;
  let lowestScore = Infinity;

  for (const node of openSet) {
    const score = fScore.get(node) || Infinity;
    if (score < lowestScore) {
      lowestScore = score;
      lowestNode = node;
    }
  }

  return lowestNode;
}

// Function to calculate the distance between two nodes (example using Euclidean distance)
function distance(current, neighbor) {
  return Math.sqrt(Math.pow(current[0] - neighbor[0], 2) + Math.pow(current[1] - neighbor[1], 2));
}

// Function to reconstruct the path from the start to the goal
function reconstructPath(cameFrom, current) {
  const path = [current];
  while (cameFrom.has(current)) {
    current = cameFrom.get(current);
    path.unshift(current);
  }
  return path; // Path from start to goal
}

// Example safety check function for graph traversal
function isSafe(graph, node, visited) {
  return !visited.has(node); // True if the node hasn't been visited
}

// Binary Search implementation
function binarySearch(array, target, updateStep) {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    updateStep({ mid, value: array[mid] });

    if (array[mid] === target) return mid;
    if (array[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1; // Target not found
}

// Simulated Annealing Helper Functions
const calculateCost = (solution) => {
  // Example: A simple cost function (to be replaced with actual logic)
  return solution.reduce((sum, value) => sum + value, 0);
};

const generateNeighbor = (currentSolution) => {
  // Example: Modify one element in the solution to create a neighbor
  const neighbor = [...currentSolution];
  const index = Math.floor(Math.random() * neighbor.length);
  neighbor[index] = Math.random() * 100; // Randomly change one element
  return neighbor;
};

// Genetic Algorithms Helper Functions
const calculateFitness = (individual) => {
  // Example: Fitness function (to be replaced with actual logic)
  return 1 / (1 + calculateCost(individual)); // Minimize cost
};

const selectParents = (population, fitness) => {
  // Example: Select parents using roulette wheel selection
  const totalFitness = fitness.reduce((a, b) => a + b, 0);
  const pick = Math.random() * totalFitness;
  let current = 0;

  for (let i = 0; i < population.length; i++) {
    current += fitness[i];
    if (current > pick) return population[i]; // Return selected parent
  }
};

const crossover = (parents) => {
  // Example: Simple one-point crossover
  const parent1 = parents[0];
  const parent2 = parents[1];
  const crossoverPoint = Math.floor(Math.random() * parent1.length);

  return [...parent1.slice(0, crossoverPoint), ...parent2.slice(crossoverPoint)];
};

const mutate = (individual, mutationRate) => {
  // Example: Random mutation
  for (let i = 0; i < individual.length; i++) {
    if (Math.random() < mutationRate) {
      individual[i] = Math.random() * 100; // Mutate the individual
    }
  }
};
