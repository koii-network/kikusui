interface Provider {
  connect?(): Promise<any>;
  getAddress?(): Promise<any>;
}

declare global {
  interface Window {
    koiiWallet?: any;
  }
}

export class Finnie {
  #isAvailable: boolean;
  hasPermissions: boolean;
  userAddress: string;
  constructor() {
    this.#isAvailable = false;
    this.hasPermissions = false;
    this.userAddress = "";
  }
  /**
   * Initialises the Finnie Object
   *   Checks for blah blah blah
   *    Sets blah blah blah
   */
  setAvailable(): void {
    window.koiiWallet ? (this.#isAvailable = true) : (this.#isAvailable = false);

    window.addEventListener("finnieWalletLoaded", () => {
      this.#isAvailable = true;
    });
  }

  set updatePermissions(hasPermissions) {
    hasPermissions ? (this.hasPermissions = true) : (this.hasPermissions = false);
  }
  /**
   * Checks to see if the extension is available
   */
  async init(): Promise<void> {
    this.setAvailable();
    const isConnected = await window.koiiWallet.getPermissions();

    isConnected.status === 200 && isConnected.data.length
      ? this.updatePermissions(true)
      : this.updatePermissions(false);
  }
  /**
   * Checks to see if a wallet has already been connected, if so updates the wallet's address
   * if not, attempts to connect
   */
  async connect(): Promise<void> {
    if (this.hasPermissions) {
      const address = await window.koiiWallet.getAddress().then(res => res.data);
      this.userAddress = address;
    } else window.koiiWallet.connect();
  }

  async disconnect(): Promise<string> {
    try {
      const res = await window.koiiWallet.disconnect();
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
    const extension = window.koiiWallet;
    try {
      const tipStatus = await extension.sendKoi(address, amount);
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

const instance = new Finnie();

// instance.getAvailability;

// Vote NSFW

// Connecting(including getAddress) & Disconnection(init)

// Send tips
// Need an adress and amount
//
// Sign transaction & upload to arweave
