interface Provider {
  connect?(): Promise<any>;
  getAddress?(): Promise<any>;
}
export const connectToFinnieMock = async (provider: Provider) => {
  const isConnected = await provider.connect();

  if (isConnected) return await provider.getAddress();
  else return isConnected.data;
};
