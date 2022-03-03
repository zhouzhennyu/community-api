import SignRecord from '../model/SignRecord'
import { getJWTPayload } from '../common/Utils'
import user from '../model/User'
import dayjs from 'dayjs'

class UserController {
    constructor() {}

    // 用户签到接口
    async userSign(ctx) {
        // 获取用户的id
        const obj = await getJWTPayload(ctx.header.authorization)
        // 查询用户上一次的签到记录
        const record = await SignRecord.findByUid(obj._id)
        const userInfo = await user.findByID(obj._id)
        let newRecord = {}
        let result = null
        // 判断签到逻辑
        if (record !== null) {
            //有历史签到数据 
           // 判断用户上一次签到记录的created时间是否与今天相同，如果当前时间的日期与用户上一次的签到日期相同，说明用户已经签到
            if (dayjs(record.created).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')) {
                ctx.body = {
                    code: 500,
                    data: {
                        favs: userInfo.favs,
                        count: userInfo.count
                    },
                    message: '用户已经签到'
                }
            } else {
                let count = userInfo.count
                let fav = 0
                // 有上一次的签到记录，并且不与今天相同，进行连续签到的判断
                if (dayjs(record.created).format('YYYY-MM-DD') === dayjs().subtract(1, 'days').format('YYYY-MM-DD')) {
                    // 用户上一次签到的时间等于当前时间的前一天，说明是连续签到
                    if (count < 5) {
                        fav = 5
                    } else if (count >= 5 && count < 15) {
                        fav = 10
                    } else if (count >= 15 && count < 30) {
                        fav = 15
                    } else if (count >= 30 && count < 100) {
                        fav = 20
                    } else if (count >= 100 && count < 365) {
                        fav = 30
                    } else if (count >= 365) {
                        fav = 50
                    }
                    await user.updateOne({ id: obj._id }, { $inc: { favs: fav, count: 1 } })
                    result = {
                        favs: userInfo.favs + fav,
                        count: userInfo.count + 1
                    }
                } else {
                    // 中断签到
                    fav = 5
                    await user.updateOne({ id: obj._id }, { $inc: { favs: fav, count: 1 }})
                    result = {
                        favs: userInfo.favs + fav,
                        count: 1
                    }
                }
                // 更新签到记录
                newRecord = new SignRecord({
                    uid: obj._id,
                    favs: fav,
                    lastSign: record.created
                })
                await newRecord.save()
            }
        } else {
            // 无签到数据
            // 保存用户的签到数据， 签到数据 + 积分数据
            await user.updateOne({
                _id: obj._id
            }, {
                $set: { count: 1 },
                $inc: { favs: 5 }
            })
            // 保存用户的签到记录
            newRecord = new SignRecord({
                uid: obj._id,
                favs: 5,
                lastSign: dayjs().format('YYYY-MM-DD HH:mm:ss')
            })
            await newRecord.save()
            result = {
                count: 1,
                favs: 5
            }
        }
        ctx.body = {
            code: 200,
            data: result,
            message: '签到成功'
        }
    }
}

export default new UserController()