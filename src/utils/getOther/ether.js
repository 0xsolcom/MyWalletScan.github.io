import axios from 'axios';

const ether = async (address) => {
    //address = address.toLowerCase();
    const url = `https://airdroptool.vip/api/ether.php?address=${address}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        // 检查数据是否为对象并且包含所需的字段
        if (data && typeof data === 'object') {
            const totalIntegrationEigenLayerPoints = (Number(data.totalIntegrationEigenLayerPoints)).toFixed(2);
            const totalIntegrationLoyaltyPoints = (Number(data.totalIntegrationLoyaltyPoints)).toFixed(2);
            return { totalIntegrationEigenLayerPoints, totalIntegrationLoyaltyPoints: totalIntegrationLoyaltyPoints };
        } else {
            // 如果数据不是对象或者不包含所需字段，返回默认值
            return { totalIntegrationEigenLayerPoints: '-', totalIntegrationLoyaltyPoints: '-' };
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // 重新抛出错误以便调用者处理
    }
};

export default ether;