declare global {
  interface Window {
    koiiWallet?: any;
  }
}

/**
 * Utility method to Check if the finnie extension has been installed
 *
 * @returns {Promise}
 */

export const checkForFinnie = (fn = () => window.koiiWallet) => {
  const interval = 200;
  const endTime = Number(new Date()) + 5000;

  const checkCondition = (resolve, reject) => {
    // If the condition is met, we're done!
    const result = fn();
    if (result) {
      resolve(result);
    }
    // If the condition isn't met but the timeout hasn't elapsed, go again
    else if (Number(new Date()) < endTime) {
      setTimeout(checkCondition, interval, resolve, reject);
    }
    // Didn't match and too much time, reject!
    else {
      reject(new Error("timed out for " + fn));
    }
  };
  return new Promise(checkCondition);
};
