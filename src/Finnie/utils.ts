declare global {
  interface Window {
    koiiWallet?: WindowFinnie;
  }
}

export const baseURL = "https://koi.rocks:8888/api/v1/";
export const adminAddress = process.env.ADMIN;

export interface ResponseObject {
  data: any[];
  status: string;
}
export interface WindowFinnie {
  getPermissions?(): Promise<any> | ResponseObject;
  connect?(): Promise<any>;
  sendKoii?(address: string, amount: number): Promise<any>;
  getAddress?(): Promise<any>;
  disconnect?(): Promise<any>;
  registerData?(): Promise<any>;
  sign?(): Promise<any>;
  signPort?({ data: string }): any;
}

export const checkForFinnie = (): Promise<any> => {
  const extensionCall = () => window.koiiWallet;
  let counter = 0;
  const checkCondition = (resolve, reject) => {
    const result = extensionCall();
    if (result) {
      resolve(result);
    } else if (counter < 5) {
      counter++;
      setTimeout(checkCondition, 200, resolve, reject);
    } else {
      resolve(false);
    }
  };
  return new Promise(checkCondition);
};

// helper function for voteNSFW
export const fetchNSFW = async (queryString, id, signature?): Promise<any> => {
  // Body with signature does not have stringify in example docs
  const body = signature ? JSON.stringify({ signature, NFTid: id }) : JSON.stringify({ NFTId: id });
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  };
  return await fetch(baseURL + queryString, postOptions);
};

export {};
