import express from 'express'

const route = express.Router();

route.get('/signIn', function(req,res){
    res.render('vwAccount/signIn',{
        layout: false,
    });
});

route.get('/forgotPass', function(req,res){
    res.render('vwAccount/forgotPass',{
        layout: false,
    });
});

route.get('/setPass', function(req,res){
    res.render('vwAccount/setPass',{
        layout: false,
    });
});

export default route;