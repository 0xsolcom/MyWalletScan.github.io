import axios from "axios";

const getEthTx = async (address) => {
    const url = "https://eth.blockscout.com/api?module=account&action=txlist&sort=asc&address=" + address + "&start_block=0"
    const response = await axios.get(url);
    return response.data.result;
}


const getL1ToL2 = async (address) => {
    const response = await getEthTx(address);
    let L1ToL2Tx = 0, L1ToL2Amount = 0;
    response.forEach((tx) => {
        if (tx.to.toLowerCase() === "0x5bcfd99c34cf7e06fc756f6f5ae7400504852bc4".toLowerCase() && tx.from.toLowerCase() === address.toLowerCase() && tx.txreceipt_status === "1") {
            L1ToL2Tx++;
            L1ToL2Amount += Number(tx.value) / 10 ** 18;
        }
    })
    return {L1ToL2Tx, L1ToL2Amount: L1ToL2Amount.toFixed(4)};
}


export default getL1ToL2;
