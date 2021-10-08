var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { checkForFinnie, fetchNSFW } from "./utils";
export default class Finnie {
    constructor() {
        this.hasExtension = false;
        this.windowFinnie = {};
        this.isConnected = false;
        this.userAddress = "";
        this.isAdmin = false;
    }
    setExtension() {
        return __awaiter(this, void 0, void 0, function* () {
            const extension = yield checkForFinnie();
            if (extension) {
                this.hasExtension = true;
                this.windowFinnie = window.koiiWallet;
                return true;
            }
            else {
                window.open("https://chrome.google.com/webstore/detail/finnie/cjmkndjhnagcfbpiemnkdpomccnjblmj", "_blank");
                return false;
            }
        });
    }
    setConnected(isConnected) {
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
            const extensionPresent = yield this.setExtension();
            if (extensionPresent) {
                const permissions = yield this.windowFinnie.getPermissions();
                if (permissions.data.length) {
                    this.setConnected(true);
                }
                else {
                    this.setConnected(false);
                }
            }
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
                return true;
            }
            else {
                const isConnected = yield this.windowFinnie.connect();
                isConnected ? this.setConnected(true) : this.setConnected(false);
                return false;
            }
        });
    }
    setAddress(address) {
        this.userAddress = address;
        if (address === "admin")
            this.isAdmin = true;
    }
    getAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            const address = this.windowFinnie.getAddress();
            address ? address.then(res => this.setAddress(res.data)) : (this.userAddress = "");
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.windowFinnie.disconnect().then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        this.setConnected(false);
                        this.userAddress = "";
                        return "Succesfully disconnected.";
                    }
                    else
                        throw new Error("Not able to disconnect, no user is connected.");
                });
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
            if (this.windowFinnie !== {}) {
                try {
                    const tipStatus = yield this.windowFinnie.sendKoii(address, amount);
                    if (tipStatus)
                        return tipStatus.data;
                    return tipStatus;
                }
                catch (error) {
                    throw new Error(error);
                }
            }
        });
    }
    extensionFound() {
        if (this.hasExtension)
            return true;
        else
            return false;
    }
    voteNSFW(id, { getState }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.isAdmin) {
                    const signature = yield this.windowFinnie.signPort({ data: id });
                    const data = yield fetchNSFW("markNsfwUrl", id, signature);
                    return data.json();
                }
                else {
                    const data = yield fetchNSFW("voteNsfwUrl", id);
                    return data.json();
                }
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
