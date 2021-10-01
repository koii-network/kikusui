// getPermissions() => if user is connected will return an arr of strings || empty arr
// window.koiWallet.connect() => res == {data: "Connected."} || {data: error}
// poll => if user has finnie
declare global {
  interface Window {
  koiiWallet?: any
  }

}

// let extensionObj = await poll(() => window.koiiWallet, 5000, 200);
  /**
 * Utility method to Check if the finnie extension has been installed
 * 
 * @returns {Promise} 
 */

  
   export const checkForFinnie = () => {
    const fn = () => window.koiiWallet; 
    const interval = 200;
    const endTime = Number(new Date()) + (5000);
  
    const checkCondition = function (resolve, reject) {
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
        reject(new Error("timed out for " + fn + ": " + arguments));
      }
    };
    return new Promise(checkCondition);
  };
