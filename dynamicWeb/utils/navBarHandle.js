$(document).ready(function () {
    $('nav-menu').click(function (e) {
        $('nav-menu').removeClass('selected');
        $(this).addClass('selected');
    });
});