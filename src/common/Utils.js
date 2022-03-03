import { getValue } from '../config/RedisConfig'
import config from '../config/index'
import jwt from 'jsonwebtoken'

const getJWTPayload = (token) => {
    return jwt.verify(token.split(' ')[1], config.JWT_SECRET )
}

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
    checkCode,
    getJWTPayload
}