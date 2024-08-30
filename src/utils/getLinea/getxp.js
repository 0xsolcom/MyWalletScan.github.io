import axios from 'axios';

/**
 * 查询积分  根据地址
 * @param {*} address 
 * @returns 
 */
export const getxp = async ( address ) => {
    address = address.toLowerCase();
    const url = `https://kx58j6x5me.execute-api.us-east-1.amazonaws.com/linea/getUserPointsSearch?user=${ address }`;


    try {
        const response = await axios.get( url );
        const data = response.data;

        // 确保数据是数组且不为空
        if ( Array.isArray( data ) && data.length > 0 ) {
            const rank_xp = Number( data[ 0 ].rank_xp );
            const xp = Number( data[ 0 ].xp );
            return { rank_xp, lxp: xp };
        } else {
            // 如果数据为空数组，返回默认值
            return { rank_xp: '-', lxp: '-' };
        }
    } catch ( error ) {
        console.error( 'Error fetching data:', error );
        throw error; // 重新抛出错误以便调用者处理
    }
};

/**
 * 每日用户参与 
 * @returns {data} 历史数据  
 * @returns {total_xp} 总分  
 * @returns {average_total_xp} 平均积分
 * @returns {user} 每日用户参与
 * @returns {day} 信息收集时间 
 */
export const getLineaTotalPoints = async () => {
    const url = `https://kx58j6x5me.execute-api.us-east-1.amazonaws.com/linea/getLineaTotalPoints`;
    try {
        const response = await axios.get( url );
        const data = response.data;
        // 确保数据是数组且不为空
        if ( Array.isArray( data ) && data.length > 0 ) {
            return { data, ...data[ data.length ] };
        } else {
            // 如果数据为空数组，返回默认值
            return { data: [] };
        }
    } catch ( error ) {
        console.error( 'Error fetching data:', error );
        throw error; // 重新抛出错误以便调用者处理
    }
};
// 
// https://kx58j6x5me.execute-api.us-east-1.amazonaws.com/linea/getLineaTotalPoints