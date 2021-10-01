// getPermissions() => if user is connected will return an arr of strings || empty arr
// window.koiWallet.connect() => res == {data: "Connected."} || {data: error}
// poll => if user has finnie

import { checkForFinnie } from "./checkForFinnie";
import { connectToFinnie } from "./connectToFinnie";

export default { checkForFinnie, connectToFinnie };
// let extensionObj = await poll(() => window.koiiWallet, 5000, 200);
