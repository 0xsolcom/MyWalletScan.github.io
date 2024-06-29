import getxp from "./getxp.js";
import getsessions from "./getsessions.js";
//import getether from "./ether.js";

const getOtherData = async (address) => {
    let data;
    try {
        const xp = await getxp(address);
		const sessions = await getsessions(address);
		//const ether = await getether(address);
        data = {
            address,
            xp,
			sessions,
			//ether,
            result: "success"
        }
        return data
    } catch (e) {
        data = {
            result: "error",
            reason: e.message
        }
        return data
    }
}
export default getOtherData;
