import express from 'express';
import session from 'express-session';
import cors from 'cors';
import mongoose from 'mongoose';
import { apiRoutes } from './routing/apiRoutes';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// session
app.use(
    session({
        resave: true,
        secret: 'DH-CODE-TEST-SERVER-X-SESSION',
        saveUninitialized: false
    })
);

// set api routes with version prefix
app.use('/api/v1', apiRoutes);

// handle 404
app.use((req, res, next) => {
    const err = new Error('Not Found');
    res.status(404);
    res.json(err);
});

// configure MongoDB
mongoose.Promise = global.Promise;
const mongoUri =
    process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/DH-code-test-db';
mongoose.connect(mongoUri, { useNewUrlParser: true });
const db = mongoose.connection;

db.on(
    'error',
    console.error.bind(
        console,
        'connection error - cannot connect to local mongoDB - make sure mongoDB is running on mongodb://127.0.0.1:27017/DH-code-test-db '
    )
);
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.listen(port, () =>
    console.log(`Code test server app listening on ${port}!`)
);
