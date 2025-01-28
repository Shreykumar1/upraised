import express from 'express';
const router = express.Router();
const { login } = require('../controllers/authController');

router.post('/login', login);

export default router;