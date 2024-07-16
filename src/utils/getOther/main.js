import getxp from "./getxp.js";
import getsessions from "./getsessions.js";
import getether from "./ether.js";
import getlista from "./lista.js";
import getrenzo from "./renzo.js";
import getkelpdao from "./kelpdao.js";
import getfuel from "./fuel.js";
import getkarak from "./karak.js";

const getOtherData = async (address) => {
    let data;
    try {
        const xp = await getxp(address);
		const sessions = await getsessions(address);
		const lista = await getlista(address);
		const ether = await getether(address);
		const renzo = await getrenzo(address);
		const kelpdao = await getkelpdao(address);
		const fuel = await getfuel(address);
		const karak = await getkarak(address);
        data = {
            address,
            xp,
			sessions,
			lista,
			ether,
			renzo,
			kelpdao,
			fuel,
			karak,
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
