import express from 'express'
import moment from 'moment';

const router = express.Router();

// SIGN IN
<<<<<<< HEAD
=======
router.get('/signIn', function(req,res){
    res.render('vwAccount/signIn',{
        layout: false,
    });
});

router.post('/signIn', function(req,res){
    // check account

    res.render('vwAccount/signIn',{
        layout: false,
    });
});
>>>>>>> origin/dynamic/update-form-UI


// FORGOT PASS
router.get('/forgotPass', function(req,res){
    res.render('vwAccount/forgotPass',{
        layout: false,
    });
});

router.post('/forgotPass', function(req,res){
    // send OTP to email and render input OTP

    res.render('vwAccount/forgotPass',{
        layout: false,
        msg: "Email chưa được đăng ký",
    });

    // res.redirect('/account/verify');
});

// INPUT OTP
router.get('/verify', function(req,res){
    res.render('vwAccount/inputOTP',{
        layout: false,
    });
})

router.post('/verify', function(req,res){
    // Check otp and render setPass
    res.render('vwAccount/inputOTP',{
        layout: false,
        msg: "OTP không đúng",
    });

    // res.redirect('/account/setPass');
})


// SET PASS
router.get('/setPass', function(req,res){
    res.render('vwAccount/setPass',{
        layout: false,
    });
});

router.post('/setPass', function(req,res){
    // check pass and render Sign In

    res.render('vwAccount/setPass',{
        layout: false,
        msg: "Mật khẩu phải tối thiểu 8 kí tự",
    });

    // res.redirect('/account/signIn');
});


// PROFILE
router.get('/profile', function(req,res){
    res.render('vwAccount/profile',{
        layout: false,
    });
});

router.post('/profile', function(req,res){
    // update profile and render profile
    const raw_dob = req.body.raw_dob;
    const dob = moment(raw_dob, 'DD/MM/YYYY').format('YYYY-MM-DD');

    // Nếu Có lỗi -> is_err: true + msg: Lỗi gì đó
    // Nếu thành công -> is_err: false + msg : Thành công
    res.render('vwAccount/profile',{
        layout: false,
        msg: "Có lỗi xảy ra. Hãy kiểm tra lại",
        is_err: false,
    });
});

export default router;