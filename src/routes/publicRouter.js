import Router from 'koa-router'

import publicController from '../api/PublicController.js'
import contentController from '../api/ContentController.js'

const router = new Router();

router.prefix('/public');
router.get('/getCaptcha', publicController.captcha);
router.get('/getList', contentController.getPostList);


export default router;
