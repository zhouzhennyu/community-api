import { getValue } from '../config/RedisConfig'

// 校验验证码图片时效性
const checkCode = async (key, value) => {
    const redisData = await getValue(key)
    console.log('checkCode', redisData, value);
    if (redisData !== null) {
        if (redisData.toLowerCase() === value.toLowerCase()) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

export {
    checkCode
}