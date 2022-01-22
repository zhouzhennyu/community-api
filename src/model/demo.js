import User from './test'

// 增
const user = {
    name: 'haha',
    age: 18,
    email: 'haha@qq.com'
}

const addMethods = async () => {
    const data = new User(user)
    const result = await data.save()
    console.log('add', result)
}
// addMethods();


// 查

const queryMethods = async () => {
    const result = await User.find()
    console.log('query', result);
}
// queryMethods()


// 改
const updateMethods = async () => {
    const result = await User.updateOne({name: 'haha'}, {email: 'haha123@qq.com'})
    console.log('update', result);
}
// updateMethods()


// 删

const deleteMethods = async () => {
    const result = await User.deleteOne({name: 'haha'})
    console.log('deleteMethods', result)
}
// deleteMethods()

