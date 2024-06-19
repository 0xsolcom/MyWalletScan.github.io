import axios from "axios";

const KeyList = [
    "DWDGGHQ33KT3DCI4VTHBIIE65EC9VFSUY3",
    "FHIJIZ9DKWKTH92AWR9181EIBR7XC6PK11",
    "6BFJSJJ4F26ABEHKBMCFXF4Z8SSC2E61SG",
    "DWDGGHQ33KT3DCI4VTHBIIE65EC9VFSUY3",
    "FHIJIZ9DKWKTH92AWR9181EIBR7XC6PK11",
    "6BFJSJJ4F26ABEHKBMCFXF4Z8SSC2E61SG"
]
const getTransactions = async (address) => {
    const key = KeyList[Math.floor(Math.random() * KeyList.length)]
    const url = "https://api.basescan.org/api?module=account&action=txlist&sort=asc&address=" + address + "&startblock=0" + "&apikey=" + key
    const response = await axios.get(url);
    return response.data.result;
}
export default getTransactions;
