import axios from 'axios';

const karak = async (address) => {
    address = address.toLowerCase();
    const url = `https://airdroptool.vip/api/karak.php?address=${address}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        // 检查数据是否为对象并且包含所需的字段
        if (data[0].result && typeof data[0].result === 'object') {
            const xp = Number(data[0].result.data.xp).toFixed(2);
            return { xp };
        } else {
            // 如果数据不是对象或者不包含所需字段，返回默认值
            return { xp: '-' };
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // 重新抛出错误以便调用者处理
    }
};

export default karak;