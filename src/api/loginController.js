import send from '../config/MailConfig'
import moment from 'moment'
import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import config from '../config'
import { checkCode } from '../common/Utils'
import User from '../model/User'


class LoginController {
    constructor() {}

    async forget(ctx) {
        const { body } = ctx.request
        try {
            // body.username -> database -> email
            let result = await send({
                code: '1234',
                expire: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
                email: body.username,
                user: 'zzy'
            })
            ctx.body = {
                code: 200,
                data: result,
                message: '邮件发送成功'
            }
        } catch (error) {
            console.log(error)
        }
    }
    async login(ctx) {
        // 返回token

        // 接受用户传递的数据
        const { body } = ctx.request
        let code = body.code
        let sid = body.sid
        let checkCodeResult = await checkCode(sid, code)
        if (checkCodeResult) {
            // 验证用户账户密码是否正确
            let checkUserPassword = false
            let user = await User.findOne({ username: body.username })
            if (await bcrypt.compare(body.password, user.password)) {
                checkUserPassword = true
            }
            if (checkUserPassword) {
                // 验证通通过，返回token
                let token = jsonwebtoken.sign({ _id: 'zzy' }, config.JWT_SECRET, { expiresIn: '1d'})
                ctx.body = {
                    code: 200,
                    token: token
                }
            } else {
                ctx.body = {
                    code: 400,
                    msg: '用户名或者密码错误'
                }
            }
        } else {
            ctx.body = {
                code: 400,
                msg: '图片验证码错误'
            }
        }
        console.log('hello login')
    }
    async register(ctx) {
        // 获取客户端数据
        const { body } = ctx.request
        // 校验验证码时效性
        let checkCodeResult = await checkCode(body.sid, body.code)
        let message = ''
        if (checkCodeResult) {
            let userStatus = true
            // 查库，看username是否被注册过
            const user1 = await User.findOne({ username: body.username })
            if (user1 !== null && typeof user1.username !== 'undefined') {
                userStatus = false
                message = '此用户名已被注册，换一个吧'
            }
            // 查库，看nickname是否被注册过
            const user2 = await User.findOne({ nickname: body.nickname })
            if (user2 !== null && typeof user2.nickname !== 'undefined') {
                userStatus = false
                message = '此昵称已被注册，换一个吧'
            }
            // 写入数据库
            if (userStatus) {
                body.password = await bcrypt.hash(body.password, 5)
                const user = new User({
                    username: body.username,
                    nickname: body.nickname,
                    password: body.password
                })
                const result = await user.save()
                ctx.body = {
                    code: 200,
                    data: result,
                    msg: '注册成功'
                }
                return
            }
        } else {
            message = '图片验证码已失效，请重新获取'
        }
        ctx.body = {
            code: 500,
            msg: message
        }
    }
}

export default new LoginController()