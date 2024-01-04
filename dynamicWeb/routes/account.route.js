import express from 'express'
import moment from 'moment';

const route = express.Router();

// SIGN IN


// FORGOT PASS
route.get('/forgotPass', function(req,res){
    res.render('vwAccount/forgotPass',{
        layout: false,
    });
});

route.post('/forgotPass', function(req,res){
    // check OTP and render setPass

    res.redirect('/account/setPass');
});


// SET PASS
route.get('/setPass', function(req,res){
    res.render('vwAccount/setPass',{
        layout: false,
    });
});

route.post('/setPass', function(req,res){
    // check pass and render Sign In
    res.redirect('/account/signIn');
});


// PROFILE
route.get('/profile', function(req,res){
    res.render('vwAccount/profile',{
        layout: false,
    });
});

route.post('/profile', function(req,res){
    // update profile and render profile
    const raw_dob = req.body.raw_dob;
    const dob = moment(raw_dob, 'DD/MM/YYYY').format('YYYY-MM-DD');

    res.render('vwAccount/profile',{
        layout: false,
    });
});

export default route;