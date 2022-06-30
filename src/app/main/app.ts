import express from 'express';
import router from './routes';

const app = express();

app.use(express.json());

app.use('/api', router);

console.log('afasl');


export default app;