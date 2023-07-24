import express from 'express';
import connect from './src/config/db/index.js';
import route from './src/routes/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const port = 8000;

app.use(express.json()); // parse req body
app.use(cookieParser()); // fix error when can not get value from cookie
app.use(cors());
connect();

const user = {
    _id: 1323,
    roles: ['user']
};

route(app);

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
// generateToken(user);



//https://www.youtube.com/watch?v=NQMBEfTIO1Y&list=PL_quDQWsnn-rUriK6nhoVaKzAk-Z1e6mi&index=2