import express from 'express';
import {
  authenticateOtpEmail,
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
  '/sendOtp',
  '/verifyOtp',
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

router.post('/sendOtp', authenticateOtpEmail);

router.post('/verifyOtp', verifyOtpEmail);

router.get('/getUser', getUser);

router.post('/activate', activateUser);

router.post('/login', loginUser);

router.get('/autoReLogin', autoReLoginFunctionality);

router.get('/logout', logoutFunctionality);

router.get('/searchUser', searchUserFunctionality);

router.get('/getUserbyUserName', getUserbyUserName);

router.post('/google', googleLogin);

router.patch('/photoUpdation', photoUpdation);

router.get('/refresh', refreshTokenVerification);

export default router;
