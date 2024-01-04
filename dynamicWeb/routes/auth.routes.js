import { Router } from 'express';
import asyncHandler from '../middlewares/asyncHandler.js';
import { signIn ,createAccount,logout} from '../controllers/auth.controller.js';
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

export default router;
