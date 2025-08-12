import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

const app = new Koa();
const PORT = 3000;

app.use(bodyParser);

app.use(async (ctx) => {
    ctx.body = 'Hello world'
});

app.on('error', err => {
    log.error('server error', err);
});

app.listen(PORT, () => console.log(`Server running on port`, PORT));
