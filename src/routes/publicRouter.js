import Router from 'koa-router'

import publicController from '../api/PublicController.js'
import contentController from '../api/ContentController.js'

const router = new Router();

router.prefix('/public');

//  获取验证码
router.get('/getCaptcha', publicController.captcha);

// 获取文章列表
router.get('/list', contentController.getPostList);

// 获取友情链接
router.get('/links', contentController.getLinks);

// 获取温馨提醒
router.get('/tips', contentController.getTips);

// 获取温馨提醒
router.get('/topWeek', contentController.getTopWeek);

export default router;
