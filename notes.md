```js
// interface EthereumProvider {
//   isMetaMask?: boolean;
// }

// declare global {
//   interface Window {
//     koiiWallet?: EthereumProvider;
//   }
// }

// export = detectEthereumProvider;

// /**
//  * Returns a Promise that resolves to the value of window.ethereum if it is
//  * set within the given timeout, or null.
//  * The Promise will not reject, but an error will be thrown if invalid options
//  * are provided.
//  *
//  * @param options - Options bag.
//  * @param options.mustBeMetaMask - Whether to only look for MetaMask providers.
//  * Default: false
//  * @param options.silent - Whether to silence console errors. Does not affect
//  * thrown errors. Default: false
//  * @param options.timeout - Milliseconds to wait for 'ethereum#initialized' to
//  * be dispatched. Default: 3000
//  * @returns A Promise that resolves with the Provider if it is detected within
//  * given timeout, otherwise null.
//  */
  /**
 *
 * @param {Function} fn Function to poll for result
 * @param {Number} timeout How long to poll for
 * @param {Number} interval Polling interval
 * @returns {Promise}
 */
   const checkForFinnie = (fn, timeout = 5000, interval = 200) => {
    const endTime = Number(new Date()) + (timeout || 2000);
    interval = interval || 100;
  
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

```