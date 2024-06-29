import axios from 'axios';

const kelpdao = async (address) => {
    address = address.toLowerCase();
    const url = `https://common.kelpdao.xyz/km-el-points/user/${address}`;

    try {
        const response = await axios.get(url);
        const data = response.data.value;

        // 检查数据是否为对象并且包含所需的字段
        if (data && typeof data === 'object') {
            const kelpMiles = (Number(data.kelpMiles) / 10 ** 3).toFixed(2);
            //const elPoints = parseInt(Number(data.elPoints), 10);
            const elPoints = (Number(data.elPoints)).toFixed(2);
            return { kelpMiles, elPoints: elPoints };
        } else {
            // 如果数据不是对象或者不包含所需字段，返回默认值
            return { kelpMiles: '-', elPoints: '-' };
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // 重新抛出错误以便调用者处理
    }
};

export default kelpdao;