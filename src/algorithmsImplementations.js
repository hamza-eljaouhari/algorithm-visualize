export const algorithms = {
  'Bubble Sort': {
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
      steps.push({ arr: [...arr], final: true }); // Capture final sorted state
      return steps;
    }`,
    execute: async function (arr, updateStep) {
      const steps = [];
      let n = arr.length;

      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          steps.push({ arr: [...arr], current: [j, j + 1], color: 'yellow' });
          updateStep(steps[steps.length - 1]);

          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            steps.push({ arr: [...arr], current: [j, j + 1], swapped: true, color: 'red' });
          }
        }
      }
      steps.push({ arr: [...arr], final: true }); // Capture final sorted state
      console.log("Steps : ", steps);
      return steps;
    },
  },
  'Selection Sort': {
    code: `function selectionSort(arr) {
      const steps = [];
      let n = arr.length;
      for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
          steps.push({ arr: [...arr], current: [j, minIndex], color: 'yellow' });
          updateStep(steps[steps.length - 1]);
          await new Promise(resolve => setTimeout(resolve, 700));

          if (arr[j] < arr[minIndex]) {
            minIndex = j;
            steps.push({ arr: [...arr], current: [j, minIndex], swapped: true, color: 'red' });
          }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        steps.push({ arr: [...arr], current: [i, minIndex] }); // Push the state after swap
      }
      steps.push({ arr: [...arr], final: true }); // Capture final sorted state
      return steps;
    }`,
    execute: async function (arr, updateStep) {
      const steps = [];
      let n = arr.length;

      for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
          steps.push({ arr: [...arr], current: [j, minIndex], color: 'yellow' });
          updateStep(steps[steps.length - 1]);

          if (arr[j] < arr[minIndex]) {
            minIndex = j;
            steps.push({ arr: [...arr], current: [j, minIndex], swapped: true, color: 'red' });
          }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        steps.push({ arr: [...arr], current: [i, minIndex] }); // Push the state after swap
      }
      steps.push({ arr: [...arr], final: true }); // Capture final sorted state
      console.log("Steps : ", steps);
      return steps;
    },
  },
};
