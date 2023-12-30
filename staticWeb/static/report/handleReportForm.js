//Get form information
const form = document.getElementById('reportForm');
var reportType = document.getElementById('reportType');
var fullName = document.getElementById('fullName');
var email = document.getElementById('email');
var phoneNumber = document.getElementById('phoneNumber');
var reportContent = document.getElementById('reportContent');
const images = document.getElementById('img');
const submitButton = document.getElementById('submitBtn');

var imagesOutput = document.getElementById('imagesOutput'); //Used to render images when uploaded
var requiredTags = document.querySelectorAll('span.report-required'); //Used to add required messages

document.getElementsByClassName('btn-close-report-form')[0].onclick = () => {
    const reportComponents = document.getElementsByClassName('report-component');
    for (let i = 0; i < reportComponents.length; i++) {
        reportComponents[i].classList.remove('show-report');
        reportComponents[i].classList.add('hide');
    }
};

var isValid = [false, false, false, false, false, false]; //Check if the form is valid to submit

submitButton.disabled = true;

//Add input-required messages
function modifyMessage(cond, message, index) {
    requiredTags[index].innerHTML = cond ? message : '';
    isValid[index] = requiredTags[index].innerHTML === '';
    checkSubmit();
}

//Check if all the information is valid and enable/disable submit button
function checkSubmit() {
    var checkValid = isValid.every((e) => e === true);
    submitButton.disabled = checkValid ? false : true;
}

//Check if the input information is valid
reportType.onchange = () => {
    modifyMessage(reportType.value === '', 'Vui lòng chọn hình thức báo cáo', 0);
};
fullName.onchange = () => {
    modifyMessage(fullName.value.trim().length === 0, 'Vui lòng nhập họ và tên', 1);
};
email.onchange = () => {
    const regex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    modifyMessage(email.value === '' || !regex.test(email.value), 'Vui lòng nhập đúng email', 2);
};
phoneNumber.onchange = () => {
    const phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    modifyMessage(phoneNumber.value === '' || !phoneNumberPattern.test(phoneNumber.value), 'Vui lòng nhập SĐT', 3);
};
reportContent.onchange = () => {
    modifyMessage(reportContent.value === '', 'Vui lòng nhập nội dung báo cáo', 4);
};

//Check image files input
if (images !== undefined) {
    images.onchange = (e) => {
        imagesOutput.innerHTML = '';
        var countFiles = images.files.length;
        modifyMessage(countFiles < 0 || countFiles > 2, 'Vui lòng chọn tối đa 2 hình', 5);
        if (isValid[5]) {
            for (let i = 0; i < countFiles; i++) {
                let fileName = images.files.item(i).name;
                imagesOutput.innerHTML += `<img src="${URL.createObjectURL(
                    e.target.files[i],
                )}" alt="${fileName}" width="50">`;
            }
        }
    };
}

//Check submission and store data to JSON file
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const captchaRes = grecaptcha.getResponse();

    if (!captchaRes.length > 0) {
        requiredTags[6].innerHTML = 'Vui lòng nhập đúng captcha';
        throw new Error('Captcha not complete');
    } else {
        requiredTags[6].innerHTML = '';
        const formData = new FormData(e.target);
        const jsonObject = Object.fromEntries(formData);
        const jsonString = JSON.stringify(jsonObject);

        console.log(jsonString);

        //TODO: SAVING DATA TO JSON FILE

        // fs.writeFile("../reportData.json", jsonString, (error) => {
        //     if(error){
        //         console.error(error);
        //         throw error;
        //     }

        //     console.log("Write successfully");
        // })
    }

    // var imageURL = "";
    // let imageFile = images.files.item(0);
    // let reader = new FileReader();
    // reader.onloadend = () => {
    //     imageURL = reader.result;
    // }
    // reader.readAsDataURL(imageFile);

    // var jsonString = `{ "reportType":"${reportType.value}",
    // "fullName":"${fullName.value}",
    // "email":"${email.value}",
    // "phoneNumber":"${phoneNumber.value}",
    // "reportContent":"${reportContent.value}",
    // "img":"${imageURL}"}`;

    // for(let i = 0; i < images.files.length; i++){
    //     let imageFile = images.files.item(i);
    //     let reader = new FileReader();
    //     reader.onloadend = () => {
    //       jsonObject['img'] = reader.result;
    //     }
    //     reader.readAsDataURL(imageFile);

    // toDataURL(`${URL.createObjectURL(images.files.item(i))}`,
    // function (dataUrl) {
    //   console.log('RESULT:', dataUrl)
    // });

    // let base64String = "";
    // let imgFile = images.files.item(i);
    // let reader = new FileReader();

    // reader.onload = () => {
    //     base64String = reader.result.replace("data:", "")
    //         .replace(/^.+,/, "");
    //     imageBase64Stringsep = base64String;
    // };
    // reader.readAsDataURL(imgFile);
    //}
});
