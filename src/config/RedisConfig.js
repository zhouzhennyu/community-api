import redis from 'redis'
// import bluebird from 'bluebird'
import { promisifyAll } from 'bluebird'
import config from './index'


const options = {
    host: config.REDIS.host,
    port: config.REDIS.port,
    password: config.REDIS.password,
    detect_buffers: true,
    retry_strategy: function(options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
          return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
          return new Error('Retry time exhausted')
        }
        if (options.attempt > 10) {
          return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000)
      },
}


// const client = redis.createClient(options);
const client = promisifyAll(redis.createClient(options))

client.on('error', (err) => {
    console.log('Redis Client Error: ' + err)
})

const setValue = (key, value, time) => {
    if (typeof value === 'undefined' || value === null || value === '') {
        return
    }
    if (typeof value === 'string') {
        if (typeof time !== 'undefined') {
            client.set(key, value, 'EX', time)
        } else {
            client.set(key, value)
        }
        
    } else if (typeof value === 'object') {
        Object.keys(value).forEach(item => {
            return client.hset(key, item, value[item], redis.print)
        })
    }
}

const getValue = (key) => {
    return client.getAsync(key)
}

const getHValue = (key) => {
    return client.hgetallAsync(key)
}

const delValue = (key) => {
    client.del(key, (err, res) => {
        if (res === 1) {
            console.log('delete successfully')
        } else {
            console.log('delete redis key error: ' + err)
        }
    })
}

export {
    client,
    setValue,
    getValue,
    getHValue,
    delValue
}