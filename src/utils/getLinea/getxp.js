import axios from 'axios';

const getxp = async (address) => {
	address = address.toLowerCase();
    const url = `https://kx58j6x5me.execute-api.us-east-1.amazonaws.com/linea/getUserPointsSearch?user=${address}`;

    
    try {
        const response = await axios.get(url);
        const data = response.data;
		let L1ToL2Tx = 0, L1ToL2Amount = 0;
        // 确保数据是数组且不为空
        if (Array.isArray(data) && data.length > 0) {
            const rank_xp = Number(data[0].rank_xp);
            const xp = Number(data[0].xp);
			return {rank_xp, lxp: xp};
        } else {
            // 如果数据为空数组，返回默认值
            return { 0, lxp: 0 };
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // 重新抛出错误以便调用者处理
    }
};

export default getxp;