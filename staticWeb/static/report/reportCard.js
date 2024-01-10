tinymce.init({
    selector: 'textarea',
    noneditable_class: 'uneditable',
    // theme : "advanced",
    // readonly : 1
  });

//tinymce.activeEditor.mode.set("readonly");
//tinymce.EditorMode.set("readonly");

var reportData = document.querySelectorAll('.report-data-loaded');
var reportStatus = document.querySelector('.report-status');
var currentStatus = true;

//TODO: LOADING DATA FROM JSON FILE

//Example
const loadedData = {
    reportType : "Quảng cáo thương mại",
    address : "227 Nguyễn Văn Cừ, phường 4, quận 5, TPHCM",
    fullName :"Tran Minh Anh",
    email : "tranminhanh1912@gmail.com",
    phoneNumber : "0387400741",
    reportContent : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
};

const dataValues = Object.values(loadedData);
for(let i = 0; i < reportData.length; i++){
    reportData[i].value = dataValues[i];
};

reportStatus.innerHTML = currentStatus ? "Tình trạng xử lý: Đã xử lý" : "Tình trạng xử lý: Đang xử lý";
reportStatus.style.color = currentStatus ? '#008000' : '#FF9162';