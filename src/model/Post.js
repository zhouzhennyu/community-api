import mongoose from '../config/DBHelpler'
import dayjs from 'dayjs'

const Schema = mongoose.Schema

const PostSchema = new Schema({
    uid: { type: String, ref: 'users' },
    title: { type: String },
    content: { type: String },
    created: { type: Date}, 
    catalog: { type: String },
    fav: { type: String },
    isEnd: { type: String },
    reads: { type: Number },
    answer: { type: Number },
    status: { type: String },	
    isTop: { type: String },	
    sort: { type: String },
    tags: { type: Array, default: [] },		
})

/* 
 * 获取文章列表数据
 * @param {Object} options 筛选条件
 * @param {String} sort 排序规则
 * @param {Number} page 分页页数
 * @param {Number} limit 分页条数
 */
PostSchema.statics = {
    // 获取文章列表
    getList: function(options, sort, page, limit) {
        return this.find(options)
            .sort({[sort]: -1})
            .skip(page * limit)
            .limit(limit)
            .populate({
                path: 'uid',
                select: 'nickname pic isVip'
            })
    },

    // 获取本周热议
    getTopWeek: function() {
        return this.find({
            created: {
                $gte: dayjs().subtract(7, 'days')
            }
        }, {
            answer: 1,
            title: 1
        }).sort({ answer: -1 })
          .limit(15)
    }
}

PostSchema.pre('save', function(next) {
    this.created = dayjs().format('YYYY-MM-DD HH:mm:ss')
    next()
})

const PostMOdel = mongoose.model('post', PostSchema)


export default PostMOdel