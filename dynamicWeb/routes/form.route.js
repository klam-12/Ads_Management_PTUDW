import express from "express"

const route = express.Router();

// Form edit điểm đặt
route.get('/location', function(req,res){
    res.render('vwForm/location');
});

// Form edit QC
route.get('/qc', function(req,res){
    res.render('vwForm/qc');
});

// Cấp phép QC
route.get('/license', function(req,res){
    res.render('vwForm/license');
});


export default route;