var qcIconPlanned = L.divIcon({
    className: 'qc-icon qc-planned',
    html: 'QC',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [-3, -76],
});
var qcIconPlanning = L.divIcon({
    className: 'qc-icon qc-planning',
    html: 'QC',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [-3, -76],
});

var reportIconProcessing = L.divIcon({
    className: 'report-icon report-processing',
    html: '<img src="../static/css/Vector.svg" alt="Your SVG File" class="svg-icon" />',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [-3, -76],
});
var reportIconDone = L.divIcon({
    className: 'report-icon report-done',
    html: '<img src="../static/css/Vector.svg" alt="Your SVG File" class="svg-icon" />',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [-3, -76],
});
checkModalComponents();
// Creating Map
var map = L.map('map').setView([10.762925255348815, 106.68249376487807], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors',
}).addTo(map);

var customPopup = L.DomUtil.create('div', 'custom-popup-class');

map.getContainer().appendChild(customPopup);

let qcMarkers = L.markerClusterGroup();
const transformData = (inputData) => {
    return {
      type: 'FeatureCollection',
      features: inputData.list.map((item) => {
        const feature = {
          type: 'Feature',
          properties: {
            address: item.data.address,
            typeofLocation: item.data.typeofLocation,
            AdsFormat: item.data.AdsFormat,
            isPlanned: item.data.isPlanned,
            image: item.data.image,
            qcInfo: item.data.qcInfo.map((qcItem) => ({
              id: qcItem.id,
              image: qcItem.image,
              typeofAds: qcItem.typeofAds,
              width: qcItem.width,
              height: qcItem.height,
              quantity: qcItem.quantity,
            })),
          },
          geometry: {
            coordinates: item.coordinates.reverse(), // Swap latitude and longitude
            type: 'Point',
          },
        };
        return feature;
      }),
    };
  };
  
const fetchDataAndCreateLayer = async () => {
    try {
        const apiUrl = 'http://localhost:3000/setPoints/map';
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
  
      const data = await response.json();
  
      const transformedData = transformData(data);
      const dataADS = {
        type: 'FeatureCollection',
        features: transformedData.features,
      };
  
  
      // Create the Leaflet geoJSON layer with the transformed data
    var qcMarker = L.geoJSON(dataADS, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.isPlanned) {
                return L.marker(latlng, { icon: qcIconPlanned });
            } else {
                return L.marker(latlng, { icon: qcIconPlanning });
            }
        },
        onEachFeature: function (feature, layer) {
            layer.on('mouseover', function (e) {
                var content = popupTemplate(feature);
                // e.popup.setContent(content);
                customPopup.innerHTML = content;

                // Hiển thị thẻ div và đặt vị trí
                customPopup.style.display = 'flex';

                var coords = map.latLngToContainerPoint(layer.getLatLng());
                customPopup.style.left = coords.x + 5 + 'px';
                customPopup.style.top = coords.y + 5 + 'px'; // Điều chỉnh vị trí hiển thị thẻ div
            });

            layer.on('mouseout', function (e) {
                customPopup.style.display = 'none';
            });
            layer.on('click', function (e) {
                $('.modal-content').empty();
                feature.properties.qcInfo.map((qcInfo) => {
                    console.log(qcInfo)
                    const content = QCComponent(feature.properties, qcInfo, feature.geometry);
                    $('.modal-content').append(content);
                });
        
                checkModalComponents();
                $('.modal-content').show();
                $('.component-QC-and-Img').addClass('show');
            });
        },
    
});
  
      // Add the layer to the map
      qcMarkers.addLayer(qcMarker);
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }

};
  
  // Call the async function to fetch data and create the layer
fetchDataAndCreateLayer();
  
function checkModalComponents() {
    const modalContent = $('.modal-content');
    if (modalContent.children().length === 0) {
        $('#modal').hide();
    } else {
        $('#modal').show();
        modalContent.show();
    }
}

var popupTemplate = function (feature) {
    const plannedStatus = feature.properties.isPlanned ? 'Đã quy hoạch' : 'Chưa quy hoạch';

    return `
          <h3 class="popup-title">${feature.properties.AdsFormat}</h3>
          <div class="popup-text">
              <span class = "popup-text">${feature.properties.typeofLocation}</span>
              <br></br>
              <span class = "popup-text">${feature.properties.address}</span>
          </div>
          <span class = "popup-status">${plannedStatus}</span>
          <div style = " height: 115px;">
            <img src="${feature.properties.image}" alt="" style = "object-fit: contain;width: inherit;height: inherit;">
          </div>
          

  `;
}

const District1 = {
    "Ben Nghe Ward": 'Phường Bến Nghé',
    "Ben Thanh Ward": 'Phường Bến Thành',
    "Cau Kho Ward": 'Phường Cầu Kho',
    "Cau Ong Lanh Ward": 'Phường Cầu Ông Lãnh',
    "Co Giang Ward": 'Phường Cô Giang',
    "Da Kao Ward": 'Phường Đa Kao',
    "Nguyen Cu Trinh Ward": 'Phường Nguyễn Cư Trinh',
    "Nguyen Thai Binh Ward": 'Phường Nguyễn Thái Bình',
    "Pham Ngu Lao Ward": 'Phường Phạm Ngũ Lão',
    "Tan Dinh Ward": 'Phường Tân Định'
}
const District5 = 
    {
        'Ward 1': 'Phường 1',
        'Ward 2': 'Phường 2',
        'Ward 3': 'Phường 3',
        'Ward 4': 'Phường 4',
        'Ward 5': 'Phường 5',
        'Ward 6': 'Phường 6',
        'Ward 7': 'Phường 7',
        'Ward 8': 'Phường 8',
        'Ward 9': 'Phường 9',
        'Ward 10': 'Phường 10',
        'Ward 11': 'Phường 11',
        'Ward 12': 'Phường 12',
        'Ward 13': 'Phường 13',
        'Ward 14': 'Phường 14',
        'Ward 15': 'Phường 15'
    }    

const district = {
    'District 5':'Quận 5',
    'District 1':'Quận 1'
};

var QCComponent = function (info, qcInfo,coordinates) {
    console.log("qcinfo",info)
    const infoData ={
        type: 'Advertisement',
        id: qcInfo.id,
        address: info.address,
        district: info.address.suburb,
        ward:  info.address.quarter,
        lat: coordinates.coordinates[1],
        lng: coordinates.coordinates[0]
    }
    const infoDataJson = JSON.stringify(infoData);
    console.log(infoData)
    return `
        <div class="component-QC-and-Img " style="gap: 20px;flex-direction: column;">
            <div class="component-QC">
                <div class="row flex-column QC-head">
                    <h3 class="qc-title">${qcInfo.typeofAds}</h3>
                    <div class="qc-adr">${info.address}</div>
                </div>
                <div class="row flex-column QC-body">
                    <div class="qc-size">Kích thước: <strong>${qcInfo.width}m x ${qcInfo.height}m</strong></div>
                    <div class="qc-number">Số lượng: <strong>${qcInfo.quantity} trụ/bảng</strong></div>
                    <div class="qc-format">Hình thức: <strong>${info.AdsFormat}</strong></div>
                    <div class="qc-type">Phân loại: <strong>${info.typeofLocation}</strong></div>
                </div>
                <div class="row d-flex align-items-center justify-content-between QC-foot">
                    <div class="col-md-auto infoBtn">
                        <button type="button" class="btn-info">
                            <i class="bi bi-info-circle-fill"></i>
                            &#8203;
                        </button>
                    </div>
                    <div class="col-md-auto d-flex qc-report">
                        <button type="button" class="btn-report" data-info='${infoDataJson}'>
                            <i class="bi bi-exclamation-octagon-fill"></i>
                            Báo cáo vi phạm
                        </button>
                    </div>
                </div>
            </div>
            <div class="component-moreInfoQC hide">
                <img src="${qcInfo.image}" alt="robot.jpg" class="moreInfoQC-imgs" height="140" style="object-fit: contain;" />
                <div class="moreInfoQC-content">Ngày hết hạn hợp đồng: 30/12/2023</div>
            </div>
        </div>
    `;
};
$('.modal-content').on('click', '.btn-info', function () {
    const moreInfoQC = $(this).closest('.component-QC-and-Img').find('.component-moreInfoQC');
    moreInfoQC.toggleClass('show hide');
});


// qcMarkers.addLayer(qcMarker);

const reportInfo = (info) => {
    const content = info.properties;
    console.log(56789,content)
    return `<div class="component-report-sm component-report">
    <form class="report-form">
        <h4 class="report-form-title">
            <i class="bi bi-exclamation-octagon-fill"></i> BÁO CÁO VI PHẠM
        </h4>
        <h6 class="report-status"></h6>

        <div class="container">
            <div class="row">
                <div class="container report-info">
                    <div class="row">
                        <div class="col-xs-6 col-sm-5 col-md-4">
                            <label class="align-middle" for="reportType">Hình thức báo cáo</label>
                        </div>
                        <div class="col-xs-6 col-sm-7 col-md-8">
                            <input
                                class="report-data-loaded"
                                type="text"
                                name="reportType"
                                id="reportType"
                                value="${content.reportType}"
                                readonly
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="report-info">
                    <label class="mb-1" for="fullName">Họ và tên</label>
                    <input
                        class="report-data-loaded"
                        type="text"
                        name="fullName"
                        id="fullName"
                        value="${content.fullName}"
                        readonly
                    />
                </div>
            </div>

            <div class="row">
                <div class="report-info">
                    <label class="mb-1" for="email">Email</label>
                    <input
                        class="report-data-loaded"
                        type="email"
                        name="email"
                        id="email"
                        value="${content.email}"
                        readonly
                    />
                </div>
            </div>

            <div class="row">
                <div class="report-info">
                    <label class="mb-1" for="phoneNumber">Số điện thoại</label>
                    <input
                        class="report-data-loaded"
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        value="${content.phoneNumber}"
                        readonly
                    />
                </div>
            </div>

            <div class="row">
                <div class="report-info">
                    <label class="mb-1" for="reportContent">Nội dung báo cáo</label>
                    <textarea
                        class="report-data-loaded"
                        name="reportContent"
                        id="reportContent"
                        cols="30"
                        rows="10"
                        style="resize: none"
                        readonly
                    >${content.reportContent}</textarea>
                </div>
            </div>

            <div class="row">
                <div class="report-image-upload">
                    <label for="reportImage">Hình ảnh minh hoạ </label> <br />
                    <div class="report-img" style = "display: flex; flex-direction: row;"> 
                        <img src="${content.image1}" alt="Hình biển quảng cáo" style="width: 50%;"/> 
                        <img src="${content.image2}" alt="Hình biển quảng cáo" style="width: 50%;"/>
                    </div>
                </div>
            </div>
        </div>
    </form>
    </div>`;
};
var reportMarkers = L.markerClusterGroup({
    iconCreateFunction: function (cluster) {
        var childCount = cluster.getChildCount();

        return L.divIcon({
            html: '<span>' + childCount + '</span>',
            className: 'report-icon report-icon-report',
            iconSize: L.point(30, 30, true),
        });
    },
});

const fetchDataReport = async () => {
    try {
        const response = await fetch('http://localhost:3000/reports/map');
        if (!response.ok) {
            // Handle error if needed
        }
        const data = await response.json();
        console.log(data);
        const dataReport = {
            type: 'FeatureCollection',
            features: data.map((item) => ({

                type: 'Feature',
                properties: {
                    isProcess: item.isProcess,
                    reportType: item.reportType,
                    fullName: item.fullName,
                    email: item.email,
                    phoneNumber: item.phoneNumber,
                    reportContent: item.reportContent,
                    image1: item.image1,
                    image2: item.image2,
                },
                geometry: {
                    coordinates: item.coordinates,
                    type: 'Point',
                },
            })),
        };
        console.log(dataReport);
        var reportMarker = L.geoJSON(dataReport, {
            pointToLayer: function (feature, latlng) {
                if (feature.properties.isProcess) {
                    return L.marker(latlng, { icon: reportIconDone });
                } else {
                    return L.marker(latlng, { icon: reportIconProcessing });
                }
            },
            onEachFeature: function (feature, layer) {
                layer.on('click', function (e) {
                    $('.modal-content').empty();
                    const content = reportInfo(feature);
                    $('.modal-content').append(content);
                    checkModalComponents();
                    $('.component-report').addClass('show');
                });
            },
        });
        reportMarkers.clearLayers();
        // Add the layer to the marker cluster group
        reportMarkers.addLayer(reportMarker);

        // Add the marker cluster group to the map
        map.addLayer(reportMarkers);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Call the function to fetch data and create report markers
fetchDataReport();
const handleReportBtn = (info) => {
    const infoData = {
        type: "SetPoint",
        name: info.name,
        address: info.display_name,
        district: info.address.suburb,
        ward:  info.address.quarter,
        lat: info.lat,
        lng: info.lon
    };

    // Convert infoData to a JSON string
    const infoDataJson = JSON.stringify(infoData);

    const content = `
        <div class="qc-report d-flex flex-row-reverse">
            <button type="button" class="btn-report" data-info='${infoDataJson}'>
                <i class="bi bi-exclamation-octagon-fill"></i>
                Báo cáo vi phạm
            </button>
        </div>`;

    return content;
};

$('.modal-content').on('click', '.btn-report', function () {
    const infoData = $(this).data('info');
    console.log(infoData)
    $('.report-component').removeClass('hide');
    // console.log('infoData:', JSON.stringify(infoData));
    $('.report-component').addClass('show-report');
   
    $('#submitBtn').data('infoData', infoData);
});

const addReportToMap = (reportData) => {
    const dataReport = {
        type: 'FeatureCollection',
        features: reportData.map((item) => ({
            type: 'Feature',
            properties: {
                isProcess: item.isProcess,
                reportType: item.reportType,
                fullName: item.fullName,
                email: item.email,
                phoneNumber: item.phoneNumber,
                reportContent: item.reportContent,
                image1: item.image1,
                image2: item.image2,
            },
            geometry: {
                coordinates: item.coordinates,
                type: 'Point',
            },
        })),
    };
    
    var reportMarker = L.geoJSON(dataReport, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.isProcess) {
                return L.marker(latlng, { icon: reportIconDone });
            } else {
                return L.marker(latlng, { icon: reportIconProcessing });
            }
        },
        onEachFeature: function (feature, layer) {
            layer.on('click', function (e) {
                $('.modal-content').empty();
                const content = reportInfo(feature);
                $('.modal-content').append(content);
                checkModalComponents();
                $('.component-report').addClass('show');
            });
        },
    });

    // Clear existing report markers before adding new ones
    reportMarkers.clearLayers()

    // Add the new report markers to the marker cluster group
    reportMarkers.addLayer(reportMarker);
    console.log("clear")
    map.addLayer(reportMarkers);
};

$('#reportForm').submit(function (e) {
    e.preventDefault();

    // Gather form data
    const formData = $(this).serializeArray();
    // Assuming you have 'reportType', 'fullName', etc. fields in your form

    // Gather infoData from the submit button
    const infoData = $('#submitBtn').data('infoData');
    console.log(formData)
    console.log(infoData)
    const imageFiles = $('#img')[0].files;
    
    
    const combinedData = { 
        fullName: formData[1].value,
        email:formData[2].value,
        phoneNumber:formData[3].value,
        reportType:formData[0].value,
        reportContent: formData[4].value,
        type: infoData.type,
        lat: infoData.lat,
        lng: infoData.lng,
        isHandled: false,
        image1: imageFiles[0],
        image2: imageFiles[1],
        district: infoData.district,
        ward: infoData.ward,
        address: infoData.address
    };
    console.log(combinedData)
    const form = new FormData();
    form.append('fullName', combinedData.fullName);
    form.append('email', combinedData.email);
    form.append('phoneNumber', combinedData.phoneNumber);
    form.append('reportType', combinedData.reportType);
    form.append('reportContent', combinedData.reportContent);
    form.append('type', combinedData.type);
    form.append('lat', combinedData.lat);
    form.append('lng', combinedData.lng);
    form.append('isHandled', combinedData.isHandled);
    form.append('image1', combinedData.image1);
    form.append('image2', combinedData.image2);
    form.append('district', combinedData.district);
    form.append('ward', combinedData.ward);
    form.append('address', combinedData.address);
    console.log(form)
    fetch('http://localhost:3000/reports/', {
        method: 'POST',
        body: form,
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server as needed
        console.log(data);
        fetchDataReport()
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
const locationInfo = (info) => {
    const type = info.addresstype;
    let name = '';
    let address = '';

    if (type !== 'road') {
        name = info.address[type] || ''; // Extract the type-specific name
        address = info.display_name.replace(name + ', ', ''); // Remove the type-specific name from the display nam
    } else {
        address = info.display_name; // If it's a road, keep the entire display name as the address
    }
    console.log(124312,info)
    const reportBtn = handleReportBtn(info);

    return `
    
            <div class="hide component-location-qc">
                        <div class="row">
                            <i class="bi bi-info-circle"></i>
                        </div>
                        <div class="row loc-qc-content">
                            <h4 class="title">Thông tin bảng quảng cáo</h4>
                            <h5 class="qc">Chưa có dữ liệu</h5>
                            <div class="note">Vui lòng chọn điểm trên bản đồ để xem</div>
                        </div>
                    </div>

                    <div class="component-location-info">
                        <div class="row">
                            <i class="bi bi-check2-circle"></i>
                        </div>
                        <div class="row loc-location-content">
                            <h4 class="title">Thông tin địa điểm</h4>
                            <h5 class="location-name">${name}</h5>
                            <div class="location-geo">
                            ${address}
                            </div>
                            ${reportBtn}
                        </div>
                    </div>
`;
};
// map.js

const authUserRole = $('script[src="/static/js/map.js"]').data('authuserrole');
const authUserDistrict = $('script[src="/static/js/map.js"]').data('authuserdistrict');
const authUserWard = $('script[src="/static/js/map.js"]').data('authuserward');
function initializeMap(authUser,districtInput, wardInput, lat, lng) {
    console.log(districtInput)
    console.log(12323, districtInput,authUserDistrict)
    if (authUserRole === "Cán bộ Quận"){
       if (authUserDistrict === districtInput){
        $('button#licenseRequest').removeClass('d-none').data('lat', lat).data('lng', lng);

       }
    }
    else if (authUserRole === "Cán bộ Phường"){
        if (authUserDistrict === 'Quận 1' && authUserWard === wardInput){
            $('button#licenseRequest').removeClass('d-none').data('lat', lat).data('lng', lng);
        }
        else if (authUserDistrict === 'Quận 5' && authUserWard === wardInput){
            $('button#licenseRequest').removeClass('d-none').data('lat', lat).data('lng', lng);
        }
       
    }
}
// Sử dụng các giá trị
console.log(authUserRole, authUserDistrict, authUserWard);


map.on('click', function (e) {
    const { lat, lng } = e.latlng;

    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            console.log(data.address.suburb, data.address.quarter)
            const dataInfo = {
                address: data.display_name,
                lat: lat,
                lng: lng,
                district: data.address.suburb,
                ward: data.address.quarter
            }
            $('button#addSetPoint').data('info', dataInfo);
            console.log($('button#addSetPoint').data())
            initializeMap(authUserRole, data.address.suburb, data.address.quarter, lat, lng);
            $('.modal-content').empty();

            $('.modal-content').append(locationInfo(data));
            checkModalComponents();
            $('.component-location-qc').addClass('show');
            $('.component-location-info').addClass('show');
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
});

const searchControl = new GeoSearch.GeoSearchControl({
    provider: new GeoSearch.OpenStreetMapProvider(),
    style: 'bar',
    searchLabel: 'Nhập địa chỉ',
});

map.addControl(searchControl);
map.addLayer(reportMarkers);
map.addLayer(qcMarkers);

L.control.locate().addTo(map);

const showMarker = async (whichLayer) => {
    let marker;
    let text;
    if (whichLayer === 'showQC') {
        marker = qcMarkers;
        text = 'Bảng QC';
    } else if (whichLayer === 'showBC') {
        marker = reportMarkers;
        text = 'Báo cáo vi phạm';
    }
    if (map.hasLayer(marker)) {
        map.removeLayer(marker);
        document.getElementById(whichLayer).innerHTML = `<i class="bi bi-eye-slash"></i> ${text}`;
    } else {
        map.addLayer(marker);
        document.getElementById(whichLayer).innerHTML = `<i class="bi bi-eye"></i> ${text}`;
    }
};

document.getElementById('showQC').addEventListener('click', () => showMarker('showQC'));
document.getElementById('showBC').addEventListener('click', () => showMarker('showBC'));

// Btn close
const modal = document.getElementById('modal');
document.getElementById('closeBtn').addEventListener('click', () => {
    modal.style.display = 'none';
    // $('.modal-content').remove();
});

// Report Btn close
// const report = document.getElementById('report');
// document.getElementById('reportCloseBtn').addEventListener('click', () => {
//     report.style.display = 'none';
// });