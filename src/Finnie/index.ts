export {};

declare global {
  interface Window {
    koiiWallet?: any;
  }
}

export default class Finnie {
  #isAvailable: boolean;
  #windowFinnie: {
    getPermissions?(): Promise<any>;
    connect?(): Promise<any>;
    sendKoii?(address: string, amount: number): Promise<any>;
    getAddress?(): Promise<any>;
    disconnect?(): Promise<any>;
    registerData?(): Promise<any>;
    sign?(): Promise<any>;
    signPort?(): any;
  };
  hasPermissions: boolean;
  userAddress: string;
  constructor() {
    this.#isAvailable = false;
    this.#windowFinnie = {};
    this.hasPermissions = false;
    this.userAddress = "";
  }
  /**
   * Initialises the Finnie Object
   *   Checks for blah blah blah
   *    Sets blah blah blah
   */
  setAvailable(): void {
    if (window.koiiWallet) {
      this.#isAvailable = true;
      this.#windowFinnie = window.koiiWallet;
    } else {
      this.#isAvailable = false;
    }

    window.addEventListener("finnieWalletLoaded", () => {
      this.#isAvailable = true;
    });
  }

  set updatePermissions(hasPermissions) {
    if (hasPermissions) {
      this.hasPermissions = true;
      this.getAddress();
    } else {
      this.hasPermissions = false;
    }
  }
  /**
   * Checks to see if the extension is available
   */
  async init(): Promise<void> {
    this.setAvailable();
    if (this.availability) {
      const isConnected = await this.#windowFinnie.getPermissions();

      isConnected.status === 200 && isConnected.data.length
        ? this.updatePermissions(true)
        : this.updatePermissions(false);
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
    if (this.hasPermissions) {
      this.getAddress();
    } else this.#windowFinnie.connect();
  }

  private async getAddress(): Promise<void> {
    const address = await this.#windowFinnie.getAddress().then(res => res.data);
    this.userAddress = address;
    return address;
  }

  async disconnect(): Promise<string> {
    try {
      const res = await this.#windowFinnie.disconnect();
      if (res.status === 200) {
        this.updatePermissions(false);
        this.userAddress = "";
        return "Succesfully disconnected.";
      } else throw new Error("Not able to disconnect, no user is connected.");
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
      const tipStatus = await this.#windowFinnie.sendKoii(address, amount);
      if (tipStatus) return tipStatus.data;
      return tipStatus;
    } catch (error) {
      throw new Error(error);
    }
  }

  // import {Finnie} from 'kikusui'
  // const FinnieWallet = new Finnie().init()
  // Finnie.isLoaded ? do something
  // Finnie.isConnected? Don't prompt user : Promp user to connect by calling Finnie.connect()

  // Finnie.connect() {
  //  window.koiiWallet.connect()
  //  }

  get availability(): boolean {
    if (this.#isAvailable) return true;
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
