const getL2ToL1 = (address, transactions) => {
    let L2ToL1Tx = 0, L2ToL1Amount = 0;
    transactions.forEach((tx) => {
        if (tx.from.toLowerCase() === address.toLowerCase() && tx.txreceipt_status === "1" && tx.to.toLowerCase() === "0xa1a12158be6269d7580c63ec5e609cdc0ddd82bc".toLowerCase()) {
            L2ToL1Tx++;
            L2ToL1Amount += Number(tx.value) / 10 ** 18;
        }
    })
    return {L2ToL1Tx, L2ToL1Amount: L2ToL1Amount.toFixed(4)};
}
export default getL2ToL1;
