import axios from 'axios';

const getsessions = async (address) => {
    const url = `https://kx58j6x5me.execute-api.us-east-1.amazonaws.com/scroll/wallet-points?walletAddress=${address}`;
    
    try {
        const response = await axios.get(url);
        const data = response.data;

        // 确保数据是数组且不为空
        if (Array.isArray(data) && data.length > 0) {
            const points = Number(data[0].points);
            return points.toFixed(2);
        } else {
            throw new Error('Invalid data format or empty array');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // 重新抛出错误以便调用者处理
    }
};

export default getsessions;