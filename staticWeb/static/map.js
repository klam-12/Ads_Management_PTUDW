// when the docs use an import:
var dataADS = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: {
                address: '459 Đ. Trần Hưng Đạo, Cầu Kho, Quận 1, TP Hồ Chí Minh',
                typeofLocation: 'Đất công/Công viên/Hành lang an toàn giao thông',
                AdsFormat: 'Cổ động chính trị',
                isPlanned: true,
            },
            geometry: {
                coordinates: [106.68222807113926, 10.762650746826012],
                type: 'Point',
            },
        },
        {
            type: 'Feature',
            properties: {
                address: '459 Đ. Trần Hưng Đạo, Cầu Kho, Quận 1, TP Hồ Chí Minh',
                typeofLocation: 'Trung tâm thương mại',
                AdsFormat: 'Quảng cáo thương mại',
                isPlanned: true,
            },
            geometry: {
                coordinates: [106.68225621143063, 10.761193217103099],
                type: 'Point',
            },
        },
        {
            type: 'Feature',
            properties: {
                address: '459 Đ. Trần Hưng Đạo, Cầu Kho, Quận 1, TP Hồ Chí Minh',
                typeofLocation: ' Chợ',
                AdsFormat: 'Xã hội hoá',
                isPlanned: false,
            },
            geometry: {
                coordinates: [106.68051981395382, 10.76387028778423],
                type: 'Point',
            },
        },
        {
            type: 'Feature',
            properties: {
                address: '459 Đ. Trần Hưng Đạo, Cầu Kho, Quận 1, TP Hồ Chí Minh',
                typeofLocation: ' Đất tư nhân/Nhà ở riêng lẻ',
                AdsFormat: 'Quảng cáo thương mại',
                isPlanned: true,
            },
            geometry: {
                coordinates: [106.68048211743064, 10.76130263744605],
                type: 'Point',
            },
        },
        {
            type: 'Feature',
            properties: {
                address: '459 Đ. Trần Hưng Đạo, Cầu Kho, Quận 1, TP Hồ Chí Minh',
                typeofLocation: ' Nhà chờ xe buýt',
                AdsFormat: 'Xã hội hoá',
                isPlanned: true,
            },
            geometry: {
                coordinates: [106.67946431131486, 10.761012540960436],
                type: 'Point',
            },
        },
        {
            type: 'Feature',
            properties: {
                address: '459 Đ. Trần Hưng Đạo, Cầu Kho, Quận 1, TP Hồ Chí Minh',
                typeofLocation: ' Cây xăng',
                AdsFormat: 'Quảng cáo thương mại',
                isPlanned: false,
            },
            geometry: {
                coordinates: [106.67887038240696, 10.762101450786247],
                type: 'Point',
            },
        },
    ],
};

var dataReport = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: {
                isProcess: true,
            },
            geometry: {
                coordinates: [106.68222807113926, 10.762650746826012],
                type: 'Point',
            },
        },
        {
            type: 'Feature',
            properties: {
                isProcess: false,
            },
            geometry: {
                coordinates: [106.68260580019103, 10.766612233710092],
                type: 'Point',
            },
        },
        {
            type: 'Feature',
            properties: {
                isProcess: true,
            },
            geometry: {
                coordinates: [106.67862331833987, 10.765453009157298],
                type: 'Point',
            },
        },
        {
            type: 'Feature',
            properties: {
                isProcess: true,
            },
            geometry: {
                coordinates: [106.68060964262065, 10.765443348934227],
                type: 'Point',
            },
        },
    ],
};
// Creating Icons
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
    html: '<img src="./css/Vector.svg" alt="Your SVG File" class="svg-icon" />',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [-3, -76],
});
var reportIconDone = L.divIcon({
    className: 'report-icon report-done',
    html: '<img src="./css/Vector.svg" alt="Your SVG File" class="svg-icon" />',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [-3, -76],
});

// // Initializing the Map
var map = L.map('map').setView([10.762925255348815, 106.68249376487807], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors',
}).addTo(map);

var customPopup = L.DomUtil.create('div', 'custom-popup-class');

map.getContainer().appendChild(customPopup);

var qcMarkers = L.markerClusterGroup();
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
            // Ẩn thẻ div khi di chuột ra khỏi điểm
            customPopup.style.display = 'none';
        });
    },
});
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

  `;
};

qcMarkers.addLayer(qcMarker);

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
var reportMarker = L.geoJSON(dataReport, {
    pointToLayer: function (feature, latlng) {
        if (feature.properties.isProcess) {
            return L.marker(latlng, { icon: reportIconDone });
        } else {
            return L.marker(latlng, { icon: reportIconProcessing });
        }
    },
});
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent('You clicked the map at ' + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

const searchControl = new GeoSearch.GeoSearchControl({
    provider: new GeoSearch.OpenStreetMapProvider(),
    style: 'bar',
    // showMarker: true, // optional: true|false  - default true
    // showPopup: false, // optional: true|false  - default false
    // marker: {
    //     icon: new L.Icon.Default(),
    //     draggable: false,
    // },
    // popupFormat: ({ query, result }) => result.label, // optional: function    - default returns result label,
    // resultFormat: ({ result }) => result.label,
    searchLabel: 'Nhập địa chỉ',
});

map.addControl(searchControl);
reportMarkers.addLayer(reportMarker);
map.addLayer(reportMarkers);
map.addLayer(qcMarkers);

L.control.locate().addTo(map);
