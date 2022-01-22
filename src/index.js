// const koa = require('koa');
// const path = require('path');
// const helmet = require('koa-helmet');   // 增加安全请求头中间件
// const koaBody = require('koa-body');    // 格式化body体中间件
// const cors = require('@koa/cors');      // 跨域中间件
// const json = require('koa-json');       // json格式话中间件
// const serve = require('koa-static');    // 静态资源中间件

// es6语法
import path from 'path';
import koa from 'koa';
import JWT  from 'koa-jwt';
import helmet from 'koa-helmet';
import statics from 'koa-static';
import router from './routes/routes';
import koaBody from 'koa-body';
import cors from '@koa/cors';
import jsonUtil from 'koa-json';
import compress from 'koa-compress';
import compose from 'koa-compose';
import config from './config';
import errorHandle from './common/ErrorHandle';

const isDevMode = process.env.NODE_ENV === 'production' ? false : true

const app = new koa();

const jwt = JWT({ secret: config.JWT_SECRET }).unless({ path: [/^\/public/, /^\/login/] })

/**
 * 使用koa-compose 集成中间件
 */
const middleware = compose([
    koaBody(),
    statics(path.join(__dirname, '../public')),
    cors(),
    jsonUtil({ pretty: false, param: 'pretty' }),
    helmet(),
    errorHandle,
    jwt
])

// koa洋葱模型先进后出
if (!isDevMode) {
    app.use(compress());
}

app.use(middleware);
app.use(router());



app.listen(9000);



