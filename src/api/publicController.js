import svgCaptcha from 'svg-captcha';
import { setValue } from '../config/RedisConfig'

class PublicController {
    constructor() {}

    async captcha(ctx) {
        const body = ctx.request.query
        const captcha = svgCaptcha.create({
            size: 4,
            ignoreChars: '0oO1ilLI',
            color: true,
            noise: Math.floor(Math.random() * 5),
            width: 150,
            height: 38
        })
        // 设置验证码图片超时10分钟
        setValue(body.sid, captcha.text, 10 * 60)
        ctx.body = {
            code: 200,
            data: captcha.data
        }
    }
}

export default new PublicController();