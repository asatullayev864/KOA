import Router from "@koa/router";
import userRouter from './users.route.js';
import studentRouter from './students.route.js';
import universityRouter from './university.route.js';

const router = new Router({ prefix: '/api' });

router
    .use(userRouter.routes()).use(userRouter.allowedMethods())
    .use(studentRouter.routes()).use(studentRouter.allowedMethods())
    .use(universityRouter.routes()).use(universityRouter.allowedMethods())

export default router;