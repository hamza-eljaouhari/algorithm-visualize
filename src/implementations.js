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
          { name: 'A', type: 'matrix', size: [2, 2], min: 1, max: 100 },
          { name: 'B', type: 'matrix', size: [2, 2], min: 1, max: 100 },
        ],
        outputType: 'matrix',
        visualization: {
          stepType: 'matrix',
          finalType: 'matrix',
        },
        code: `
        function strassenMultiply(A, B) {
          const n = A.length;
          if (n === 1) return [[A[0][0] * B[0][0]]];
          const half = Math.floor(n / 2);
          const [A11, A12, A21, A22] = splitMatrix(A);
          const [B11, B12, B21, B22] = splitMatrix(B);
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
        }`,
        execute: async function (A, B, updateStep) {
          function splitMatrix(M) {
            const half = Math.floor(M.length / 2);
            const A11 = M.slice(0, half).map(row => row.slice(0, half));
            const A12 = M.slice(0, half).map(row => row.slice(half));
            const A21 = M.slice(half).map(row => row.slice(0, half));
            const A22 = M.slice(half).map(row => row.slice(half));
            return [A11, A12, A21, A22];
          }

          function addMatrix(M1, M2) {
            return M1.map((row, i) => row.map((val, j) => val + M2[i][j]));
          }

          function subMatrix(M1, M2) {
            return M1.map((row, i) => row.map((val, j) => val - M2[i][j]));
          }

          function joinMatrices(C11, C12, C21, C22) {
            const half = C11.length;
            return [...C11.map((row, i) => [...row, ...C12[i]]), ...C21.map((row, i) => [...row, ...C22[i]])];
          }

          function strassenMultiply(A, B) {
            const n = A.length;
            if (n === 1) return [[A[0][0] * B[0][0]]];
            const [A11, A12, A21, A22] = splitMatrix(A);
            const [B11, B12, B21, B22] = splitMatrix(B);
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

          const result = strassenMultiply(A, B);
          updateStep({ arr: result.flat(), current: [], operation: 'final', final: true });
          return result;
        },
      },
      {
        name: 'Closest Pair of Points',
        parameters: [
          { name: 'points', type: 'points', length: 10, min: 1, max: 50 },
        ],
        outputType: 'array',
        visualization: {
          stepType: 'points',
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
          stepType: 'points',
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
            return fibonacci(n - 1) + fibonacci(n - 2);
          }
          `,
          execute: async function (n, updateStep) {
            const fibonacci = (n) => {
              if (n <= 1) {
                updateStep({ arr: [], current: [n], operation: 'final', final: true });
                return n;
              }
              updateStep({ arr: [], current: [n], operation: 'recursion', final: false });
              return fibonacci(n - 1) + fibonacci(n - 2);
            };
            return fibonacci(n);
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
            updateStep({ arr: dp.flat(), current: [], operation: 'initialize', final: false });
  
            for (let i = 1; i <= n; i++) {
              for (let w = 1; w <= capacity; w++) {
                if (weights[i - 1] <= w) {
                  dp[i][w] = Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
                  updateStep({ arr: dp.flat(), current: [i, w], operation: 'assignment', final: false });
                } else {
                  dp[i][w] = dp[i - 1][w];
                  updateStep({ arr: dp.flat(), current: [i, w], operation: 'noAssignment', final: false });
                }
              }
            }
            updateStep({ arr: dp.flat(), current: [], operation: 'final', final: true });
            return dp[n][capacity];
          },
        },
        {
          name: 'Longest Common Subsequence',
          parameters: [
            { name: 'str1', type: 'string', minLength: 1, maxLength: 10 },
            { name: 'str2', type: 'string', minLength: 1, maxLength: 10 },
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
            const m = str1.length, n = str2.length;
            const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
            updateStep({ arr: dp.flat(), current: [], operation: 'initialize', final: false });
  
            for (let i = 1; i <= m; i++) {
              for (let j = 1; j <= n; j++) {
                if (str1[i - 1] === str2[j - 1]) {
                  dp[i][j] = dp[i - 1][j - 1] + 1;
                  updateStep({ arr: dp.flat(), current: [i, j], operation: 'match', final: false });
                } else {
                  dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                  updateStep({ arr: dp.flat(), current: [i, j], operation: 'noMatch', final: false });
                }
              }
            }
            updateStep({ arr: dp.flat(), current: [], operation: 'final', final: true });
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
          name: 'Edit Distance',
          parameters: [
            { name: 'str1', type: 'string', minLength: 1, maxLength: 10 },
            { name: 'str2', type: 'string', minLength: 1, maxLength: 10 },
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
            const m = str1.length, n = str2.length;
            const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
            for (let i = 0; i <= m; i++) dp[i][0] = i;
            for (let j = 0; j <= n; j++) dp[0][j] = j;
            updateStep({ arr: dp.flat(), current: [], operation: 'initialize', final: false });
  
            for (let i = 1; i <= m; i++) {
              for (let j = 1; j <= n; j++) {
                if (str1[i - 1] === str2[j - 1]) {
                  dp[i][j] = dp[i - 1][j - 1];
                } else {
                  dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
                }
                updateStep({ arr: dp.flat(), current: [i, j], operation: 'assignment', final: false });
              }
            }
            updateStep({ arr: dp.flat(), current: [], operation: 'final', final: true });
            return dp[m][n];
          },
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
            const dp = Array(arr.length).fill(1);
            for (let i = 1; i < arr.length; i++) {
              for (let j = 0; j < i; j++) {
                if (arr[i] > arr[j] && dp[i] < dp[j] + 1) {
                  dp[i] = dp[j] + 1;
                }
              }
            }
            return Math.max(...dp);
          }
          `,
          execute: async function (arr, updateStep) {
            const dp = Array(arr.length).fill(1);
            updateStep({ arr: [...dp], current: [], operation: 'initialize', final: false });
  
            for (let i = 1; i < arr.length; i++) {
              for (let j = 0; j < i; j++) {
                if (arr[i] > arr[j] && dp[i] < dp[j] + 1) {
                  dp[i] = dp[j] + 1;
                  updateStep({ arr: [...dp], current: [i, j], operation: 'update', final: false });
                }
              }
            }
            updateStep({ arr: [...dp], current: [], operation: 'final', final: true });
            return Math.max(...dp);
          },
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
              dp[i][i] = 1;
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
            updateStep({ arr: dp.flat(), current: [], operation: 'initialize', final: false });
  
            for (let length = 2; length <= n; length++) {
              for (let i = 0; i < n - length + 1; i++) {
                const j = i + length - 1;
                dp[i][j] = Infinity;
                updateStep({ arr: dp.flat(), current: [i, j], operation: 'initializeCell', final: false });
  
                for (let k = i; k < j; k++) {
                  const cost = dp[i][k] + dp[k + 1][j] + dimensions[i] * dimensions[k + 1] * dimensions[j + 1];
                  if (cost < dp[i][j]) dp[i][j] = cost;
                  updateStep({ arr: dp.flat(), current: [i, j, k], operation: 'calculateCost', final: false });
                }
              }
            }
            updateStep({ arr: dp.flat(), current: [], operation: 'final', final: true });
            return dp[0][n - 1];
          },
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
      ],
    },
  };
  