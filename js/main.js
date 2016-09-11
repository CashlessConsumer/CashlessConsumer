function getLink() {
	var paymentStr = "upi://pay?pa=" + $('#pa').val() +
			"@" + $('#psp').val() +
			"&pn=" + $('#pn').val() +
			"&tn=" + $('#tn').val() +
			"&am=" + $('#am').val() +
			"&refUrl=" + $('#refurl').val();
	$('#paylink').html("<a href=" + encodeURI(paymentStr) + ">Pay ₹" + $('#am').val() + " to " + $('#pn').val() + "</a>");
	$('#btnCopyLink').show();
	return paymentStr;
}

function getQRCode() {
	var paymentStr = getLink(),
		encodedPaymentStr = encodeURI(paymentStr);
	$('#payQRCode').html('');
	$('#payQRCode').qrcode(encodedPaymentStr);
	$('#btnDownloadQRCode').show();
}

function copyLink() {
	$('#htmllink').val($('#paylink').html());
	$('#htmllink').show();
}

function downloadQRCode() {
	html2canvas($("#payQRCode"), {
		onrendered: function (canvas) {
			canvas.toBlob(function (blob) {
				saveAs(blob, "QRCode.png");
			});
		}
	});
}

/* TODO -- Find a way to send to WA. Custom URL Scheme sends as text
function shareWA() {
	var message = encodeURIComponent($('#paylink').html());
	var whatsapp_url = "whatsapp://send?html=" + message;
	window.location.href = whatsapp_url;
} */
