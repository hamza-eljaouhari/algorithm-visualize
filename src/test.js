const updateStep = (step) => {
    console.log(step);
  };
  
  const rabinKarp = (text, pattern, updateStep) => {
    const m = pattern.length;
    const n = text.length;
    const prime = 101;
    let p = 0; // Hash value for pattern
    let t = 0; // Hash value for text
    const h = Math.pow(256, m - 1) % prime; // Hash multiplier
    const arr = Array.from(text); // Create an array from the text for visualization
    const foundIndices = []; // Array to store all found indices
  
    // Calculate the hash value for pattern and first window of text
    for (let i = 0; i < m; i++) {
      p = (256 * p + pattern.charCodeAt(i)) % prime;
      t = (256 * t + text.charCodeAt(i)) % prime;
    }
  
    // Slide the pattern over text one by one
    for (let i = 0; i <= n - m; i++) {
      // Check for hash match
      if (p === t) {
        // Check for characters one by one
        let j;
        for (j = 0; j < m; j++) {
          if (text[i + j] !== pattern[j]) break;
        }
        if (j === m) {
          foundIndices.push(i); // Store the index where pattern is found
          updateStep({ arr, index: i, action: 'Pattern found' });
        }
      }
  
      // Calculate hash for next window of text
      if (i < n - m) {
        t = (256 * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % prime;
        // Ensure t is non-negative
        if (t < 0) t += prime;
  
        // Update step for the current window hash
        updateStep({ arr, index: i + 1, action: 'Hash updated', currentHash: t });
      }
    }
  
    // Final result display
    updateStep({ arr, found: foundIndices.length > 0, action: 'Search complete' });
    return foundIndices; // Return an array of indices where the pattern was found
  };
  
  // Example input
  const text = "BBBBBBBBBBBAACCCCCCCCCCCCCCCCCCAA";
  const pattern = "AA";
  const results = rabinKarp(text, pattern, updateStep);
  console.log("Pattern found at indices:", results);
  