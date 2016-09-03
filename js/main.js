function getLink() {
    var paymentStr = "upi://pay?pa=" + $('#pa').val() +
            "&pn=" + $('#pn').val() +
            "&tn=" + $('#tn').val() +
            "&am=" + $('#am').val();
    $('#paylink').html("<a href=" + encodeURI(paymentStr) + ">" + paymentStr + "</a>");
    $('#btnCopyLink').show();
    $('#btnWA').show();
    return paymentStr;
}

function getQRCode() {
    var paymentStr = getLink(),
        encodedPaymentStr = encodeURI(paymentStr);
    $('#payQRCode').qrcode(encodedPaymentStr);
}

function copyLink() {
    $('#htmllink').val($('#paylink').html());
    $('#htmllink').show();
}

function shareWA() {
    var message = encodeURIComponent($('#paylink').html());
    var whatsapp_url = "whatsapp://send?html=" + message;
    window.location.href = whatsapp_url;


}