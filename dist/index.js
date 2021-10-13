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
                return false;
            }
        });
    }
    installExt() {
        window.open("https://chrome.google.com/webstore/detail/finnie/cjmkndjhnagcfbpiemnkdpomccnjblmj", "_blank");
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
    // If no finnie is present => add ask to redirect to finnie download
    // Create a method => get download link || download URL (make popup optional)
    // isAdmin = private property
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const extensionPresent = yield this.setExtension();
            if (extensionPresent) {
                const permissions = yield this.windowFinnie.getPermissions();
                if (permissions.data.length) {
                    this.setConnected(true);
                    return "Successfully initialized, current user is already connected.";
                }
                else {
                    this.setConnected(false);
                    return "Successfully initialized, no user found.";
                }
            }
            else
                return {
                    error: "Extension not found, unable to succesffully initialize.",
                    extensionUrl: "https://chrome.google.com/webstore/detail/finnie/cjmkndjhnagcfbpiemnkdpomccnjblmj",
                };
        });
    }
    /**
     * Checks to see if a wallet has already been connected, if so updates the wallet's address
     * if not, attempts to connect
     */
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hasExtension && this.isConnected) {
                this.getAddress();
                return "Successfully connected the user. Use the userAddress property to access their address.";
            }
            else if (this.hasExtension) {
                const isConnected = yield this.windowFinnie.connect();
                if (isConnected && isConnected.status !== 401) {
                    this.setConnected(true);
                    return "Successfully connected the user. Use the userAddress property to access their address.";
                }
                else {
                    this.setConnected(false);
                    return "Failed to connect: User rejected connection.";
                }
            }
            else
                return "Failed to connect: Extension not present";
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
    // Revisit async/.then
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
    voteNSFW(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.isAdmin) {
                    const signature = yield this.windowFinnie.signPort({ data: id });
                    const data = yield fetchNSFW("markNSFWModerator", id, signature);
                    return data.json();
                }
                else {
                    const data = yield fetchNSFW("voteNSFWContent", id);
                    return data.json();
                }
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
