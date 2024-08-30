import getActivity from "./getActivity.js";
import getBalance from "./getBalance.js";
import getL1ToL2 from "./getL1ToL2.js";
import getL2ToL1 from "./getL2ToL1.js";
import getTransactions from "./getTransactions.js";
import { getLineaTotalPoints, getxp } from "./getxp.js";

export const getLineaData = async ( address ) => {
    let data;
    try {
        const transactions = await getTransactions( address );
        const balance = await getBalance( address );
        const xp = await getxp( address );
        const L1ToL2 = await getL1ToL2( address );
        const L2ToL1 = getL2ToL1( address, transactions )
        const activity = getActivity( address, transactions )
        data = {
            address,
            balance,
            xp,
            L1ToL2,
            L2ToL1,
            activity,
            result: "success"
        }
        return data
    } catch ( e ) {
        data = {
            result: "error",
            reason: e.message
        }
        return data
    }
}
export { getLineaTotalPoints };

