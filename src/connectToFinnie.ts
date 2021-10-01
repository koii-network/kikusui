import { checkForFinnie } from "./checkForFinnie";
interface Provider {
  connect?(): Promise<any>;
  getAddress?(): Promise<any>;
}
export const connectToFinnie = async () => {
  const provider: Provider = await checkForFinnie();

  const isConnected = await provider.connect();

  if (isConnected) return await provider.getAddress();
  else return isConnected.data;
};
