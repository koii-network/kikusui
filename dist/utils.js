var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Waiting for these
export const markNsfwUrl = "https://koi.rocks:8888/api/v1//markNSFWModerator";
export const voteNsfwUrl = "https://koi.rocks:8888/api/v1//voteNSFWContent";
export const adminAddress = process.env.ADMIN;
export const checkForFinnie = () => {
    const extensionCall = () => window.koiiWallet;
    let counter = 0;
    const checkCondition = (resolve, reject) => {
        const result = extensionCall();
        if (result) {
            resolve(result);
        }
        else if (counter < 5) {
            counter++;
            setTimeout(checkCondition, 200, resolve, reject);
        }
        else {
            resolve(false);
        }
    };
    return new Promise(checkCondition);
};
// helper function for voteNSFW
export const fetchNSFW = (url, id, signature) => __awaiter(void 0, void 0, void 0, function* () {
    // Body with signature does not have stringify in example docs
    const body = signature ? JSON.stringify({ signature, NFTid: id }) : JSON.stringify({ NFTId: id });
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: body,
    };
    return yield fetch(url, postOptions);
});
