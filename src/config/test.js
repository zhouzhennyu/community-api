import { getValue, setValue, getHValue, delValue } from './RedisConfig.js'

setValue('imooc', 'imooc message from redis client')

getValue('imooc').then(res => {
    console.log('getValue: ' + res);
})

delValue('imooc')

setValue('imoocobj', {
    name: 'zzy',
    age: 18,
    email: '991710786@qq.com'
})

getHValue('imoocobj').then(res => {
    console.log('getHValue: ' + res);
})

