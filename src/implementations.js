// src/algorithmsImplementations.js
export const implementations = {
  // Divide and Conquer Category
  'Divide and Conquer': {
    algorithms: [
      {
        name: 'Merge Sort',
        code: `function mergeSort(arr) {
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
          if (arr.length <= 1) return arr;
          const mid = Math.floor(arr.length / 2);
          const left = await this.execute(arr.slice(0, mid), updateStep);
          const right = await this.execute(arr.slice(mid), updateStep);
          const merged = merge(left, right);

          updateStep({ arr: merged, final: true }); // Update final state after merge
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
            }
            return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
          }
        },
      },
    ],
  },

  // Dynamic Programming Category
  'Dynamic Programming': {
    algorithms: [
      {
        name: 'Fibonacci Sequence',
        code: `function fibonacci(n) {
          const dp = [0, 1];
          for (let i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
          }
          return dp[n];
        }`,
        execute: async function (n, updateStep) {
          const dp = [0, 1];
          updateStep({ step: 0, value: 0 }); // Initial value
          for (let i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
            updateStep({ step: i, value: dp[i] }); // Update step
          }
          return dp[n];
        },
      },
    ],
  },

  // Greedy Category
  'Greedy': {
    algorithms: [
      {
        name: 'Coin Change Problem',
        code: `function coinChange(coins, amount) {
          coins.sort((a, b) => b - a);
          const result = [];
          for (const coin of coins) {
            while (amount >= coin) {
              amount -= coin;
              result.push(coin);
            }
          }
          return result.length > 0 ? result : null;
        }`,
        execute: async function (coins, amount, updateStep) {
          coins.sort((a, b) => b - a);
          const result = [];
          for (const coin of coins) {
            while (amount >= coin) {
              amount -= coin;
              result.push(coin);
              updateStep({ coins: result, remainingAmount: amount }); // Update after each coin is added
            }
          }
          return result.length > 0 ? result : null;
        },
      },
    ],
  },

  // Simple Recursive Category
  'Simple Recursive': {
    algorithms: [
      {
        name: 'Factorial',
        code: `function factorial(n) {
          if (n <= 1) return 1;
          return n * factorial(n - 1);
        }`,
        execute: async function (n, updateStep) {
          if (n <= 1) {
            updateStep({ step: n, value: 1 }); // Update for base case
            return 1;
          }
          updateStep({ step: n, value: n }); // Update for current value
          return n * await this.execute(n - 1, updateStep);
        },
      },
    ],
  },

  // Graph Algorithms Category
  'Graph Algorithms': {
    algorithms: [
      {
        name: 'Depth-First Search (DFS)',
        code: `function dfs(graph, start) {
          const visited = new Set();
          const result = [];

          function traverse(node) {
            if (!node) return;
            visited.add(node);
            result.push(node);
            for (const neighbor of graph[node]) {
              if (!visited.has(neighbor)) {
                traverse(neighbor);
              }
            }
          }

          traverse(start);
          return result;
        }`,
        execute: async function (graph, start, updateStep) {
          const visited = new Set();
          const result = [];

          const traverse = (node) => {
            if (!node) return;
            visited.add(node);
            result.push(node);
            updateStep({ currentNode: node }); // Update for current node
            for (const neighbor of graph[node]) {
              if (!visited.has(neighbor)) {
                traverse(neighbor);
              }
            }
          };

          traverse(start);
          return result;
        },
      },
    ],
  },

  // Searching Algorithms Category
  'Searching Algorithms': {
    algorithms: [
      {
        name: 'Binary Search',
        code: `function binarySearch(arr, target) {
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
          let left = 0;
          let right = arr.length - 1;

          while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            updateStep({ mid: mid, value: arr[mid] }); // Update for current mid
            if (arr[mid] === target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
          }
          return -1;
        },
      },
    ],
  },

  // Sorting Algorithms Category
  'Sorting Algorithms': {
    algorithms: [
      {
        name: 'Bubble Sort',
        code: `function bubbleSort(arr) {
          const steps = [];
          let n = arr.length;
          for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
              if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
              }
              steps.push({ arr: [...arr], current: [j, j + 1] });
            }
          }
          return steps;
        }`,
        execute: async function (arr, updateStep) {
          const steps = [];
          let n = arr.length;

          for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
              steps.push({ arr: [...arr], current: [j, j + 1], color: 'yellow' });
              updateStep(steps[steps.length - 1]); // Update for each step

              if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                steps.push({ arr: [...arr], current: [j, j + 1], swapped: true, color: 'red' });
              }
            }
          }
          steps.push({ arr: [...arr], final: true });
          return steps;
        },
      },
      {
        name: 'Selection Sort',
        code: `function selectionSort(arr) {
          const steps = [];
          let n = arr.length;
          for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < n; j++) {
              steps.push({ arr: [...arr], current: [j, minIndex], color: 'yellow' });
              updateStep(steps[steps.length - 1]); // Update for each step

              if (arr[j] < arr[minIndex]) {
                minIndex = j;
              }
            }
            if (minIndex !== i) {
              [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
              steps.push({ arr: [...arr], current: [i, minIndex], swapped: true, color: 'red' });
            }
          }
          steps.push({ arr: [...arr], final: true });
          return steps;
        }`,
        execute: async function (arr, updateStep) {
          const steps = [];
          let n = arr.length;

          for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < n; j++) {
              steps.push({ arr: [...arr], current: [j, minIndex], color: 'yellow' });
              updateStep(steps[steps.length - 1]); // Update for each step

              if (arr[j] < arr[minIndex]) {
                minIndex = j;
              }
            }
            if (minIndex !== i) {
              [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
              steps.push({ arr: [...arr], current: [i, minIndex], swapped: true, color: 'red' });
            }
          }
          steps.push({ arr: [...arr], final: true });
          return steps;
        },
      },
    ],
  },
};
