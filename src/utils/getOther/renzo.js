import axios from 'axios';

const renzo = async (address) => {
    address = address.toLowerCase();
    const url = `https://app.renzoprotocol.com/api/points/${address}`;

    try {
        const response = await axios.get(url);
        const data = response.data.data.totals;

        // 检查数据是否为对象并且包含所需的字段
        if (data && typeof data === 'object') {
            const renzoPoints = Number(data.renzoPoints);
            const eigenLayerPoints = parseInt(Number(data.eigenLayerPoints), 10);
            return { renzoPoints, eigenLayerPoints: eigenLayerPoints };
        } else {
            // 如果数据不是对象或者不包含所需字段，返回默认值
            return { renzoPoints: '-', eigenLayerPoints: '-' };
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // 重新抛出错误以便调用者处理
    }
};

export default renzo;