import { Router } from 'express';
import asyncHandler from '../middlewares/asyncHandler.js';
import { signIn ,createAccount,logout,resetPasswordAuth,changePassword,sendOTP} from '../controllers/auth.controller.js';
import { authentication,checkRoles } from '../middlewares/authorization.js';

const router = Router();

router.post('/signIn', asyncHandler(signIn));
router.get('/signIn', function(req,res){
  res.render('vwAccount/signIn',{
      layout: false,
  });
});

router.post('/logout',asyncHandler(authentication), asyncHandler(logout))
router.post('/create-account', asyncHandler(authentication),asyncHandler(checkRoles('Cán bộ Sở')),asyncHandler(createAccount));
router.get('/create-account',function(req,res){
  res.render('vwAdmin/vwDepartment/createAccount',{
      // layout: false,
  });
});
router.get('/verify-email',function(req,res){
  res.render('vwAccount/forgotPass',{
      layout: false,
  });
})

router.get('/reset-password',function(req,res){
  res.render('vwAccount/setPass',{
    layout: true,
  });
})
router.get('/change-password', function(req,res){
  res.render('vwAccount/inputOTP',{
    layout: true,
  });
})
router.post('/reset-password',asyncHandler(authentication), asyncHandler(resetPasswordAuth))
router.post('/send-otp',asyncHandler(sendOTP))
router.post('/change-password', asyncHandler(changePassword))


export default router;
