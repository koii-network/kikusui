var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Finnie_isAvailable;
class Finnie {
    constructor() {
        _Finnie_isAvailable.set(this, void 0);
        __classPrivateFieldSet(this, _Finnie_isAvailable, false, "f");
        this.hasPermissions = false;
        this.userAddress = "";
    }
    /**
     * Initialises the Finnie Object
     *   Checks for blah blah blah
     *    Sets blah blah blah
     */
    setAvailable() {
        window.koiiWallet ? (__classPrivateFieldSet(this, _Finnie_isAvailable, true, "f")) : (__classPrivateFieldSet(this, _Finnie_isAvailable, false, "f"));
        window.addEventListener("finnieWalletLoaded", () => {
            __classPrivateFieldSet(this, _Finnie_isAvailable, true, "f");
        });
    }
    set updatePermissions(hasPermissions) {
        hasPermissions
            ? (this.hasPermissions = true) && this.getAddress()
            : (this.hasPermissions = false);
    }
    /**
     * Checks to see if the extension is available
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setAvailable();
            if (this.availability) {
                const isConnected = yield window.koiiWallet.getPermissions();
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
                window.koiiWallet.connect();
        });
    }
    getAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield window.koiiWallet.getAddress().then(res => res.data);
            this.userAddress = address;
            return address;
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield window.koiiWallet.disconnect();
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
            const extension = window.koiiWallet;
            try {
                const tipStatus = yield extension.sendKoi(address, amount);
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
        if (__classPrivateFieldGet(this, _Finnie_isAvailable, "f"))
            return true;
        return false;
    }
}
_Finnie_isAvailable = new WeakMap();
// instance.getAvailability;
// Vote NSFW
// Connecting(including getAddress) & Disconnection(init)
// Send tips
// Need an adress and amount
//
// Sign transaction & upload to arweave
module.exports = {
    Finnie: Finnie
};
export {};
