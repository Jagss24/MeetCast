import express from 'express';
import {
  registerUser,
  verifyOtpEmail,
  activateUser,
  autoReLoginFunctionality,
  loginUser,
  logoutFunctionality,
  googleLogin,
  refreshTokenVerification,
} from '../controllers/auth-controller.js';
import { authMiddleWarefunc } from '../middlewares/authMiddleWare.js';
import { photoUpdation } from '../services/userService.js';
import {
  getUser,
  getUserbyUserName,
  searchUserFunctionality,
} from '../controllers/user-controller.js';

const router = express.Router();

const openRoutes = [
  '/register',
  '/verify-otp',
  '/login',
  '/logout',
  '/google',
  '/refresh',
];

router.use((req, res, next) => {
  if (openRoutes.includes(req.path)) {
    return next();
  }
  return authMiddleWarefunc(req, res, next);
});

router.post('/register', registerUser);

router.post('/verify-otp', verifyOtpEmail);

router.get('/user', getUser);

router.post('/activate', activateUser);

router.post('/login', loginUser);

router.get('/auto-relogin', autoReLoginFunctionality);

router.post('/logout', logoutFunctionality);

router.get('/searchUser', searchUserFunctionality);

router.get('/getUserbyUserName', getUserbyUserName);

router.post('/google', googleLogin);

router.patch('/photoUpdation', photoUpdation);

router.get('/refresh', refreshTokenVerification);

export default router;
