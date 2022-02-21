import Router from 'koa-router'

import publicController from '../api/PublicController.js'
import contentController from '../api/ContentController.js'

const router = new Router();

router.prefix('/public');

//  获取验证码
router.get('/getCaptcha', publicController.captcha);

// 获取文章列表
router.get('/list', contentController.getPostList);


export default router;
