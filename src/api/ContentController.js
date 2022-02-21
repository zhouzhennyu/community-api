import Post from '../model/Post'

class ContentController {
    constructor() {}

    async getPostList(ctx) {
        const body = ctx.query

        /* // 测试数据
        const post = new Post({
            title: 'test title1',
            content: 'test content1',
            catalog:'ask',
            fav: '0',
            isEnd: '0',
            reads: '0',
            answer: '0',
            status: '0',
            isTop: '0',
            sort: '0',
            tags: [
                {
                    name: '精华',
                    class: ''
                }
            ]
        })
        const data = await post.save()
        console.log('1111111111', data) */

        const sort = body.sort ? body.sort : 'created'
        const page = body.page ? parseInt(body.page) : 0
        const limit = body.limit ? parseInt(body.limit) : 20

        let options = {}
        if (typeof body.catalog !== 'undefined' && body.catalog !== '') {
            options.catalog = body.catalog
        }
        if (typeof body.isTop !== 'undefined' && body.isTop !== '') {
            options.isTop = body.isTop
        }
        if (typeof body.isEnd !== 'undefined' && body.isEnd !== '') {
            options.isEnd = body.isEnd
        }
        if (typeof body.status !== 'undefined' && body.status !== '') {
            options.status = body.status
        }
        if (typeof body.tag !== 'undefined' && body.tag !== '') {
            options.tags = { $elemMatch: { name: body.tag } }
        }
        
        const result = await Post.getList(options, sort, page, limit)

        ctx.body = {
            code: 200,
            data: result,
            message: '获取文章列表成功'
        }
    }

}

export default new ContentController()