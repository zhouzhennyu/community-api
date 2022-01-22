import Router from 'koa-router';

import publicController from '../api/publicController.js';

const router = new Router();

router.prefix('/public');
router.get('/getCaptcha', publicController.captcha);


export default router;
