import combineRoutes from 'koa-combine-routers'   // 路由压缩中间件
import publicRouter from './publicRouter'
import loginRouter from './loginRouter'

export default combineRoutes(
    publicRouter,
    loginRouter
)