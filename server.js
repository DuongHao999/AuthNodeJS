import express from 'express';
import connect from './src/config/db/index.js';
import route from './src/routes/index.js';

const app = express();
const port = 3000;

app.use(express.json()); // parse req body

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

