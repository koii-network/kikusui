export {};
import { ResponseObject, WindowFinnie, checkForFinnie, fetchNSFW } from "./utils";

export default class Finnie {
  hasExtension: boolean;
  windowFinnie: WindowFinnie;
  isConnected: boolean;
  userAddress: string | Promise<any>;
  isAdmin: boolean;
  constructor() {
    this.hasExtension = false;
    this.windowFinnie = {};
    this.isConnected = false;
    this.userAddress = "";
    this.isAdmin = false;
  }

  async setExtension(): Promise<boolean> {
    const extension = await checkForFinnie();
    if (extension) {
      this.hasExtension = true;
      this.windowFinnie = window.koiiWallet;
      return true;
    } else {
      return false;
    }
  }

  installExt(): void {
    window.open(
      "https://chrome.google.com/webstore/detail/finnie/cjmkndjhnagcfbpiemnkdpomccnjblmj",
      "_blank"
    );
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

  // If no finnie is present => add ask to redirect to finnie download
  // Create a method => get download link || download URL (make popup optional)
  // isAdmin = private property

  async init(): Promise<string | { error: string; extensionUrl: string }> {
    const extensionPresent = await this.setExtension();

    if (extensionPresent) {
      const permissions = await this.windowFinnie.getPermissions();

      if (permissions.data.length) {
        this.setConnected(true);
        return "Successfully initialized, current user is already connected.";
      } else {
        this.setConnected(false);
        return "Successfully initialized, no user found.";
      }
    } else
      return {
        error: "Extension not found, unable to succesffully initialize.",
        extensionUrl:
          "https://chrome.google.com/webstore/detail/finnie/cjmkndjhnagcfbpiemnkdpomccnjblmj",
      };
  }
  /**
   * Checks to see if a wallet has already been connected, if so updates the wallet's address
   * if not, attempts to connect
   */
  async connect(): Promise<string> {
    if (this.hasExtension && this.isConnected) {
      this.getAddress();
      return "Successfully connected the user. Use the userAddress property to access their address.";
    } else if (this.hasExtension) {
      const isConnected = await this.windowFinnie.connect();
      if (isConnected && isConnected.status !== 401) {
        this.setConnected(true);
        return "Successfully connected the user. Use the userAddress property to access their address.";
      } else {
        this.setConnected(false);
        return "Failed to connect: User rejected connection.";
      }
    } else return "Failed to connect: Extension not present";
  }

  private setAddress(address) {
    this.userAddress = address;
    if (address === "admin") this.isAdmin = true;
  }

  private async getAddress(): Promise<void> {
    const address = this.windowFinnie.getAddress();
    address ? address.then(res => this.setAddress(res.data)) : (this.userAddress = "");
  }

  // Revisit async/.then
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

  async voteNSFW(id: string | number): Promise<any> {
    try {
      if (this.isAdmin) {
        const signature = await this.windowFinnie.signPort({ data: id });
        const data = await fetchNSFW("markNSFWModerator", id, signature);
        return data.json();
      } else {
        const data = await fetchNSFW("voteNSFWContent", id);
        return data.json();
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
