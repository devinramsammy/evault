const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const apiRouter = require('./routes');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const port = 9000;

app.listen(port, () => {
	console.log(`evault-server listening on ${port}`);
});
dotenv.config();
app.use(helmet());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const corsPolicy = {
	origin: 'http://localhost:3000',
	credentials: true,
	optionsSuccessStatus: 200,
};
app.options('*', cors(corsPolicy));
app.use(cors(corsPolicy));

app.use('/api', apiRouter);
