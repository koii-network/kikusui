export {};

declare global {
  interface Window {
    koiiWallet?: any;
  }
}

export default class Finnie {
  hasExtension: boolean;
  windowFinnie: {
    getPermissions?(): Promise<any>;
    connect?(): Promise<any>;
    sendKoii?(address: string, amount: number): Promise<any>;
    getAddress?(): Promise<any>;
    disconnect?(): Promise<any>;
    registerData?(): Promise<any>;
    sign?(): Promise<any>;
    signPort?(): any;
  };
  isConnected: boolean;
  userAddress: string;
  constructor() {
    this.hasExtension = false;
    this.windowFinnie = {};
    this.isConnected = false;
    this.userAddress = "";
  }
  /**
   * Initialises the Finnie Object
   *   Checks for blah blah blah
   *    Sets blah blah blah
   */
  setAvailable(): void {
    if (window.koiiWallet) {
      this.hasExtension = true;
      this.windowFinnie = window.koiiWallet;
    } else {
      this.hasExtension = false;
    }

    window.addEventListener("finnieWalletLoaded", () => {
      this.hasExtension = true;
      this.windowFinnie = window.koiiWallet;
    });
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
    this.setAvailable();
    if (this.extensionFound) {
      const isConnected = await this.windowFinnie.getPermissions().then(res => {
        res.status === 200 && res.data.length ? this.setConnected(true) : this.setConnected(false);
      });
    } else
      window.open(
        "https://chrome.google.com/webstore/detail/finnie/cjmkndjhnagcfbpiemnkdpomccnjblmj",
        "_blank"
      );
  }
  /**
   * Checks to see if a wallet has already been connected, if so updates the wallet's address
   * if not, attempts to connect
   */
  async connect(): Promise<void> {
    let address;
    if (this.isConnected) {
      this.getAddress();
    } else this.windowFinnie.connect();
  }

  private async getAddress(): Promise<void> {
    return await this.windowFinnie.getAddress().then(res => {
      this.userAddress = res.data;
      return res.data;
    });
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
    try {
      const tipStatus = await this.windowFinnie.sendKoii(address, amount);
      if (tipStatus) return tipStatus.data;
      return tipStatus;
    } catch (error) {
      throw new Error(error);
    }
  }

  extensionFound(): boolean {
    if (this.hasExtension) return true;
    return false;
  }
}

// instance.getAvailability;

// Vote NSFW

// Connecting(including getAddress) & Disconnection(init)

// Send tips
// Need an adress and amount
//
// Sign transaction & upload to arweave
