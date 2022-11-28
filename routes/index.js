const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const addressRouter = require('./addresses');

router.use('/auth', authRouter);
router.use('/addresses', addressRouter);

module.exports = router;
