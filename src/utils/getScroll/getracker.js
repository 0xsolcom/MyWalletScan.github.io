import axios from 'axios';

const getracker = async (address) => {
    address = address.toLowerCase();
    const url = `https://airdroptool.vip/api/racker.php?address=${address}&chain_id=534352`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        // 确保数据是数组且不为空
        if (data && typeof data === 'object') {
            const counts = Number(data.msg.counts);
            const contract_counts = Number(data.msg.contract_counts);
            const total_value = Number(data.msg.total_value);
            const gas_cost = Number(data.msg.gas_cost);
            const dayGap = Number(data.msg.dayGap);
            const lenDates = Number(data.msg.lenDates);
            const lenWeeks = Number(data.msg.lenWeeks);
            const lenMonths = Number(data.msg.lenMonths);
            return { counts, contract_counts: contract_counts , total_value: total_value , gas_cost: gas_cost , dayGap: dayGap , lenDates: lenDates , lenWeeks: lenWeeks , lenMonths: lenMonths };
        } else {
            // 如果数据为空数组，返回默认值
            return { counts: '-', contract_counts: '-' , total_value: '-' , gas_cost: '-' , dayGap: '-' , lenDates: '-' , lenWeeks: '-' , lenMonths: '-' };
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // 重新抛出错误以便调用者处理
    }
};

export default getracker;
