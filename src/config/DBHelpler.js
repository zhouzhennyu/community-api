import mongoose from 'mongoose'
import config from './index';

// 创建连接
mongoose.connect(config.DB_URL)

// 连接成功
mongoose.connection.on('connected', () => {
    console.log('Mongoose connection open to ' + config.DB_URL);
})

// 连接异常
mongoose.connection.on('error', (error) => {
    console.log('Mongoose connection error: ' + error);
})

// 断开连接
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnectied');
})


export default mongoose