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
    setAvailable() {
        if (window.koiiWallet) {
            this.hasExtension = true;
            this.windowFinnie = window.koiiWallet;
        }
        else {
            this.hasExtension = false;
        }
        window.addEventListener("finnieWalletLoaded", () => {
            this.hasExtension = true;
            this.windowFinnie = window.koiiWallet;
        });
    }
    set setConnected(isConnected) {
        if (isConnected) {
            this.isConnected = true;
            this.getAddress();
        }
        else {
            this.isConnected = false;
        }
    }
    /**
     * Checks to see if the extension is available
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setAvailable();
            if (this.extensionFound) {
                const isConnected = yield this.windowFinnie.getPermissions().then(res => {
                    res.status === 200 && res.data.length ? this.setConnected(true) : this.setConnected(false);
                });
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
            if (this.isConnected) {
                this.getAddress();
            }
            else
                this.windowFinnie.connect();
        });
    }
    getAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.windowFinnie.getAddress().then(res => this.userAddress = res.data);
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.windowFinnie.disconnect();
                if (res.status === 200) {
                    this.setConnected(false);
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
    get extensionFound() {
        if (this.hasExtension)
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
