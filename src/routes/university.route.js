import Router from "@koa/router";
import controller from "../controllers/university.controller.js";

const router = new Router({ prefix: '/universities' });

router
    .post('/', controller.create)
    .get('/', controller.getAll)
    .get('/:id', controller.getById)
    .patch('/:id', controller.update)
    .delete('/:id', controller.delete);

export default router;