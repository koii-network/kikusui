export {};

declare global {
  interface Window {
    koiiWallet?: WindowFinnie;
  }
}

interface ResponseObject {
  data: any[];
  status: string;
}
interface WindowFinnie {
  getPermissions?(): Promise<any> | ResponseObject;
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
  userAddress: string | Promise<any>;
  constructor() {
    this.hasExtension = false;
    this.windowFinnie = {};
    this.isConnected = false;
    this.userAddress = "";
  }

  async setExtension(): Promise<boolean> {
    const extension = await this.checkForFinnie();
    if (extension) {
      this.hasExtension = true;
      this.windowFinnie = window.koiiWallet;
      return true;
    } else {
      window.open(
        "https://chrome.google.com/webstore/detail/finnie/cjmkndjhnagcfbpiemnkdpomccnjblmj",
        "_blank"
      );
      return false;
    }
  }

  checkForFinnie(): Promise<any> {
    const extensionCall = () => window.koiiWallet;
    let counter = 0;
    const checkCondition = (resolve, reject) => {
      const result = extensionCall();
      if (result) {
        resolve(result);
      } else if (counter < 5) {
        counter++;
        setTimeout(checkCondition, 200, resolve, reject);
      } else {
        resolve(false);
      }
    };
    return new Promise(checkCondition);
  }

  setConnected(isConnected) {
    if (isConnected) {
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
    const extensionPresent = await this.setExtension();

    if (extensionPresent) {
      console.log("choo choo");
      const permissions = this.windowFinnie.getPermissions();

      if (permissions.data.length) {
        this.setConnected(true);
      } else {
        this.setConnected(false);
      }
    }
  }
  /**
   * Checks to see if a wallet has already been connected, if so updates the wallet's address
   * if not, attempts to connect
   */
  async connect(): Promise<boolean> {
    if (this.isConnected) {
      this.getAddress();
      return true;
    } else {
      const isConnected = await this.windowFinnie.connect();
      isConnected ? this.setConnected(true) : this.setConnected(false);
      return false;
    }
  }

  private async getAddress(): Promise<void> {
    const address = this.windowFinnie.getAddress();
    address ? (this.userAddress = address) : (this.userAddress = "");
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
    if (this.windowFinnie !== {}) {
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
