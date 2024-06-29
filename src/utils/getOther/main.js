import getxp from "./getxp.js";
import getsessions from "./getsessions.js";
//import getether from "./ether.js";
import getlista from "./lista.js";

const getOtherData = async (address) => {
    let data;
    try {
        const xp = await getxp(address);
		const sessions = await getsessions(address);
		const lista = await getlista(address);
        data = {
            address,
            xp,
			sessions,
			lista,
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
