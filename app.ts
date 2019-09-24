import express from 'express';
import session from 'express-session';
const app = express();
const port = 3000;

const login = require('./login');

app.use(express.json());

app.post('/login', login);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
