var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class Finnie {
    constructor() {
        this.isAvailable = false;
        this.windowFinnie = {};
        this.hasPermissions = false;
        this.userAddress = "";
    }
    /**
     * Initialises the Finnie Object
     *   Checks for blah blah blah
     *    Sets blah blah blah
     */
    setAvailable() {
        if (window.koiiWallet) {
            this.isAvailable = true;
            this.windowFinnie = window.koiiWallet;
        }
        else {
            this.isAvailable = false;
        }
        window.addEventListener("finnieWalletLoaded", () => {
            this.isAvailable = true;
        });
    }
    updatePermissions(hasPermissions) {
        if (hasPermissions) {
            this.hasPermissions = true;
            this.getAddress();
        }
        else {
            this.hasPermissions = false;
        }
    }
    /**
     * Checks to see if the extension is available
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setAvailable();
            if (this.availability) {
                const isConnected = yield this.windowFinnie.getPermissions();
                isConnected.status === 200 && isConnected.data.length
                    ? this.updatePermissions(true)
                    : this.updatePermissions(false);
            }
            else
                window.open("https://chrome.google.com/webstore/detail/finnie/cjmkndjhnagcfbpiemnkdpomccnjblmj", "_blank");
        });
    }
    /**
     * Checks to see if a wallet has already been connected, if so updates the wallet's address
     * if not, attempts to connect
     */
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hasPermissions) {
                this.getAddress();
            }
            else
                this.windowFinnie.connect();
        });
    }
    getAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield this.windowFinnie.getAddress().then(res => res.data);
            this.userAddress = address;
            return address;
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.windowFinnie.disconnect();
                if (res.status === 200) {
                    this.updatePermissions(false);
                    this.userAddress = "";
                    return "Succesfully disconnected.";
                }
                else
                    throw new Error("Not able to disconnect, no user is connected.");
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    /**
     * @param address string representing the target recipient of the tip
     * @param amount amount of Koii sent to said target
     * @returns Promise with the result of transaction.
     */
    sendTip(address, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tipStatus = yield this.windowFinnie.sendKoii(address, amount);
                if (tipStatus)
                    return tipStatus.data;
                return tipStatus;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // import {Finnie} from 'kikusui'
    // const FinnieWallet = new Finnie().init()
    // Finnie.isLoaded ? do something
    // Finnie.isConnected? Don't prompt user : Promp user to connect by calling Finnie.connect()
    // Finnie.connect() {
    //  window.koiiWallet.connect()
    //  }
    get availability() {
        if (this.isAvailable)
            return true;
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
