import axios from 'axios';

const fuel = async (address) => {
    address = address.toLowerCase();
    const url = `https://airdroptool.vip/api/fuel.php?address=${address}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        // 检查数据是否为对象并且包含所需的字段
        if (data && typeof data === 'object') {
            const Rank = Number(data.user_rank);
            const Points = parseInt(Number(data.total_points), 10);
            return { Rank, Points: Points };
        } else {
            // 如果数据不是对象或者不包含所需字段，返回默认值
            return { Rank: '-', Points: '-' };
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // 重新抛出错误以便调用者处理
    }
};

export default fuel;