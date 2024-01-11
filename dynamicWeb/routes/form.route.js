import express from "express"
import moment from "moment";

const router = express.Router();

// Form edit điểm đặt
router.get('/location', function(req,res){
    res.render('vwForm/location');
});

router.post('/location', function(req,res){
    // Nếu Có lỗi -> is_err: true + msg: Lỗi gì đó
    // Nếu thành công -> is_err: false + msg : Thành công
    // Các form khác tương tự
    const raw_dateReport = req.body.dateReport;
    const reportDate = moment(raw_dateReport, 'DD/MM/YYYY').format('YYYY-MM-DD');

    res.render('vwForm/location', {
        msg: "Có lỗi xảy ra. Hãy kiểm tra lại",
        is_err: true,
    });
});

// Form edit QC
router.get('/qc', function(req,res){
    res.render('vwForm/qc');
});

router.post('/qc', function(req,res){
    const raw_dateReport = req.body.dateReport;
    const reportDate = moment(raw_dateReport, 'DD/MM/YYYY').format('YYYY-MM-DD');
    
    res.render('vwForm/qc', {
        msg: "Có lỗi xảy ra. Hãy kiểm tra lại",
        is_err: true,
    });
});

// Cấp phép QC
router.get('/license', function(req,res){
    res.render('vwForm/license');
});


router.post('/license', function(req,res){
    res.render('vwForm/license', {
        msg: "Có lỗi xảy ra. Hãy kiểm tra lại",
        is_err: true,
    });
});


// Báo cáo
router.get('/report', function(req,res){
    res.render('vwForm/report');
});

// Tạo tài khoản cán bộ
// router.get('/createAcc', function(req,res){
//     res.render('vwForm/createAcc');
// });


export default router;