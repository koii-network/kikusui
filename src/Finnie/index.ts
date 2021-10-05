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
  constructor() {
    this.#isAvailable = false;
    this.hasPermissions = false;
  }
  /**
   * Initialises the Finnie Object
   *   Checks for blah blah blah
   *    Sets blah blah blah
   */
  init: () => {
    // invokes isAvailable
    // this.isAvailable()
  };

  // User calls isAvailable and gets a boolean back
  // or user does Finnie.isLoaded and reads the value of the property

  // Consider a Finnie.init()
  // Set isLoaded property to the true when loaded
  // Once that's done, init would go on to look for permissions
  // if permission (e.g. connected) we set the property isConnected to true/false

  // Asking Finnie the Fish ( are you connected) telling it go check are you connected

  // import {Finnie} from 'kikusui'
  // const FinnieWallet = new Finnie().init()
  // Finnie.isLoaded ? do something
  // Finnie.isConnected? Don't prompt user : Promp user to connect by calling Finnie.connect()

  // Finnie.connect() {
  //  window.koiiWallet.connect()
  //  }

  /**
   * Getter Methods
   */

  get availability(): boolean {
    if (this.#isAvailable) return true;
    return false;
  }

  setAvailable = (): void => {
    window.koiiWallet ? (this.#isAvailable = true) : (this.#isAvailable = false);

    window.addEventListener("finnieWalletLoaded", () => {
      this.#isAvailable = true;
      // should we also add a loaded property in case we need for other methods?
    });
  };

  //   connect: async () => {
  //     const provider: Provider = await check();

  //     const isConnected = await provider.connect();

  //     if (isConnected) return await provider.getAddress();
  //     else return isConnected.data;
  //   };
}

const isntance = new Finnie();

isntance.getAvailability;
