export {};

declare global {
  interface Window {
    koiiWallet?: any;
  }
}

interface WindowFinnie {
  getPermissions?(): Promise<any>;
  connect?(): Promise<any>;
  sendKoii?(address: string, amount: number): Promise<any>;
  getAddress?(): Promise<any>;
  disconnect?(): Promise<any>;
  registerData?(): Promise<any>;
  sign?(): Promise<any>;
  signPort?(): any;
}

export default class Finnie {
  hasExtension: boolean;
  windowFinnie: WindowFinnie;
  isConnected: boolean;
  userAddress: string;
  constructor() {
    this.hasExtension = false;
    this.windowFinnie = {};
    this.isConnected = false;
    this.userAddress = "";
  }

  async setAvailable(): Promise<WindowFinnie> {
    // if (window.koiiWallet) {
    //   this.hasExtension = true;
    //   console.log("set available happy conditional")
    //   return window.koiiWallet;
    // } else {
    //   console.log("set available sad conditional")
    //   this.hasExtension = false;
    //   return null;
    // }
    const extension = this.checkForFinnie();
    console.log(extension);
    return extension;
    // if (res.status === 200) this.setConnected(true);
    // window.addEventListener("finnieWalletLoaded", () => {
    //   this.hasExtension = true;
    //   console.log("event listener happy");
    //   return window.koiiWallet;
    // });
  }

  checkForFinnie(): Promise<any> {
    const fn = () => window.koiiWallet;
    const interval = 200;
    const endTime = Number(new Date()) + 5000;

    const checkCondition = (resolve, reject) => {
      const result = fn();
      if (result) {
        resolve(result);
      } else if (Number(new Date()) < endTime) {
        setTimeout(checkCondition, interval, resolve, reject);
      } else {
        reject(new Error("timed out for " + fn));
      }
    };
    return new Promise(checkCondition);
  }

  setConnected(isConnected) {
    if (isConnected) {
      console.log("set connected happy");
      this.isConnected = true;
      this.getAddress();
    } else {
      this.isConnected = false;
    }
  }
  /**
   * Checks to see if the extension is available
   */
  async init(): Promise<void> {
    this.setAvailable();
    if (this.windowFinnie !== null) {
      await this.windowFinnie.getPermissions().then(res => {
        res.status === 200 && res.data.length ? this.setConnected(true) : this.setConnected(false);
      });
    } else {
      this.setAvailable();
      window.open(
        "https://chrome.google.com/webstore/detail/finnie/cjmkndjhnagcfbpiemnkdpomccnjblmj",
        "_blank"
      );
    }
  }
  /**
   * Checks to see if a wallet has already been connected, if so updates the wallet's address
   * if not, attempts to connect
   */
  async connect(): Promise<void> {
    if (this.isConnected) {
      this.getAddress();
    } else if (this.windowFinnie !== null) this.windowFinnie.connect();
  }

  private async getAddress(): Promise<void> {
    if (this.windowFinnie !== null) {
      return await this.windowFinnie.getAddress().then(res => {
        this.userAddress = res.data;
        return res.data;
      });
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.windowFinnie.disconnect().then(res => {
        console.log(res);
        if (res.status === 200) {
          this.setConnected(false);
          this.userAddress = "";
          return "Succesfully disconnected.";
        } else throw new Error("Not able to disconnect, no user is connected.");
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  /**
   * @param address string representing the target recipient of the tip
   * @param amount amount of Koii sent to said target
   * @returns Promise with the result of transaction.
   */
  async sendTip(address: string, amount: number): Promise<any> {
    if (this.windowFinnie !== null) {
      try {
        const tipStatus = await this.windowFinnie.sendKoii(address, amount);
        if (tipStatus) return tipStatus.data;
        return tipStatus;
      } catch (error) {
        throw new Error(error);
      }
    }
  }

  extensionFound(): boolean {
    if (this.hasExtension) return true;
    else return false;
  }
}

// instance.getAvailability;

// Vote NSFW

// Connecting(including getAddress) & Disconnection(init)

// Send tips
// Need an adress and amount
//
// Sign transaction & upload to arweave
