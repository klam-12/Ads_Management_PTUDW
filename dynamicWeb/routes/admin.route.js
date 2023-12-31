import express from 'express'
import adminService from '../services/admin.service.js';

const router = express.Router();
const limit = 5;


//Pagination
function pagination(page, total){
    const nPages = Math.ceil(total / limit);
    const pageNumbers = [];
    for (let i = 1; i <= nPages; i++) {
        pageNumbers.push({
            value: i,
            isActive: i === +page
        });
    }
    return pageNumbers;
}


// Ward controller
router.get('/ward/space', async function (req, res) {
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;

    const total = await adminService.countAllSpaces();
    const spaceList = await adminService.findPageBySpaces(limit, offset);
    const surfaceList = await adminService.findAllSurfaces();

    const pageNumbers = pagination(page, total);

    res.render('vwAdmin/vwWard/spaceList', {
        spaceList: spaceList,
        surfaceList: surfaceList,
        empty: spaceList.length === 0 || surfaceList.length === 0,
        pageNumbers: pageNumbers,
        limit: limit,
        totalPages: total,
    });
})

router.get('/ward/report', async function (req, res) {
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;

    const total = await adminService.countAllReports();
    const list = await adminService.findPageByReports(limit, offset);

    const pageNumbers = pagination(page, total);

    res.render('vwAdmin/vwWard/reportList', {
        reportList: list,
        empty: list.length === 0,
        pageNumbers: pageNumbers,
        limit: limit,
        totalPages: total,
    });
})

router.get('/ward/license',async function (req, res) {
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;

    const total = await adminService.countAllLicenses();
    const list = await adminService.findPageByLicenses(limit, offset);

    const pageNumbers = pagination(page, total);
    
    res.render('vwAdmin/vwWard/licenseList', {
        licenseList: list,
        empty: list.length === 0,
        pageNumbers: pageNumbers,
        limit: limit,
        totalPages: total,
    });
})


//District controller
router.get('/district/space', async function (req, res) {
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;

    const total = await adminService.countAllSpaces();
    const spaceList = await adminService.findPageBySpaces(limit, offset);
    const surfaceList = await adminService.findAllSurfaces();

    const pageNumbers = pagination(page, total);

    res.render('vwAdmin/vwDistrict/spaceList', {
        spaceList: spaceList,
        surfaceList: surfaceList,
        empty: spaceList.length === 0 || surfaceList.length === 0,
        pageNumbers: pageNumbers,
        limit: limit,
        totalPages: total,
    });
})

router.get('/district/report', async function (req, res) {
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;

    const total = await adminService.countAllReports();
    const list = await adminService.findPageByReports(limit, offset);

    const pageNumbers = pagination(page, total);

    res.render('vwAdmin/vwDistrict/reportList', {
        reportList: list,
        empty: list.length === 0,
        pageNumbers: pageNumbers,
        limit: limit,
        totalPages: total,
    });
})

router.get('/district/license',async function (req, res) {
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;

    const total = await adminService.countAllLicenses();
    const list = await adminService.findPageByLicenses(limit, offset);

    const pageNumbers = pagination(page, total);

    res.render('vwAdmin/vwDistrict/licenseList', {
        licenseList: list,
        empty: list.length === 0,
        pageNumbers: pageNumbers,
        limit: limit,
        totalPages: total,
    });
})


//Department controller
router.get('/department/space', async function (req, res) {
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;

    const total = await adminService.countAllSpaces();
    const spaceList = await adminService.findPageBySpaces(limit, offset);
    const surfaceList = await adminService.findAllSurfaces();

    const pageNumbers = pagination(page, total);

    res.render('vwAdmin/vwDepartment/spaceList', {
        spaceList: spaceList,
        surfaceList: surfaceList,
        empty: spaceList.length === 0 || surfaceList.length === 0,
        pageNumbers: pageNumbers,
        limit: limit,
        totalPages: total,
    });
})

router.get('/department/report', async function (req, res) {
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;

    const total = await adminService.countAllReports();
    const list = await adminService.findPageByReports(limit, offset);

    const pageNumbers = pagination(page, total);

    res.render('vwAdmin/vwDepartment/reportList', {
        reportList: list,
        empty: list.length === 0,
        pageNumbers: pageNumbers,
        limit: limit,
        totalPages: total,
    });
})

router.get('/department/license',async function (req, res) {
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;

    const total = await adminService.countAllLicenses();
    const list = await adminService.findPageByLicenses(limit, offset);

    const pageNumbers = pagination(page, total);    
    
    res.render('vwAdmin/vwDepartment/licenseList', {
        licenseList: list,
        empty: list.length === 0,
        pageNumbers: pageNumbers,
        limit: limit,
        totalPages: total,
    });
})

//Notification testing
// router.get('/notification/updateNotif', function (req, res) {
//     res.render('vwNotification/updateConfirm');
// })

// router.get('/notification/deleteNotif', function (req, res) {
//     res.render('vwNotification/deleteConfirm');
// })

// router.get('/notification/createNotif', function (req, res) {
//     res.render('vwNotification/createConfirm');
// })

// router.get('/notification/error', function (req, res) {
//     res.render('vwNotification/errorNotif');
// })

  export default router;