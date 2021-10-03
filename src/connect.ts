import { check } from "./check";

interface Provider {
  connect?(): Promise<any>;
  getAddress?(): Promise<any>;
}

export const connect = async () => {
  const provider: Provider = await check();

  const isConnected = await provider.connect();

  if (isConnected) return await provider.getAddress();
  else return isConnected.data;
};
