function getLink() {
	var paymentStr = "upi://pay?pa=" + $('#pa').val() +
			"@" + $('#psp').val() +
			"&pn=" + $('#pn').val() +
			"&tn=" + $('#tn').val() +
			"&am=" + $('#am').val();
	if ($('#am').val() !== '') {
		$('#paylink').html("<a href=" + encodeURI(paymentStr) + ">Pay " + $('#pn').val() + " using UPI</a>");
	} else {
		$('#paylink').html("<a href=" + encodeURI(paymentStr) + ">Pay ₹" + $('#am').val() + " to " + $('#pn').val() + " using UPI</a>");
	}
	$('#HTMLSnippet').show();
	return paymentStr;
}

function getQRCode() {

	var paymentStr = getLink(),
		encodedPaymentStr = encodeURI(paymentStr);

	var options = {
		text : encodedPaymentStr,
		mode : 4,
		minVersion : 5,
		mSize : 0.1,
		mPosX : 0.5,
		mPosY : 0.5,
		image : $('#upilogo')[0]
	};

	$('#payQRCode').html('');
	$('#payQRCode').qrcode(options);
	$('#printVPA').html('UPI : ' + $('#pa').val() + "@" + $('#psp').val())
	$('#DownloadQRCode').show();
	$('#upifulllogo').show();
	$('#PrintQRCode').show();
}

function getEncodedString(val) {
	$('#am').val = val;
	paymentStr = getLink();
	return encodeURI(paymentStr);

}

function generatePhoneQRCode() {
	getQRCode();
}

function getQRCodeList() {
	$('#payQRCodeAny').qrcode(getEncodedString(''));
	$('#payQRCode10').qrcode(getEncodedString(10));
	$('#payQRCode20').qrcode(getEncodedString(20));
	$('#payQRCode50').qrcode(getEncodedString(50));
	$('#payQRCode100').qrcode(getEncodedString(100));
	$('#payQRCode200').qrcode(getEncodedString(200));
	$('#payQRCode500').qrcode(getEncodedString(500));
	$('#payQRCode1000').qrcode(getEncodedString(1000));
	$('#QRCodesTable').show();
}

function copyHTMLSnippet() {
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

function printQRCode() {
	window.print();
}

$(window).load(function () {
	 $("#shareIcons").jsSocials({
		url: "https://srikanthlogic.github.io/CashlessConsumer/linkgen.html",
		text: "UPI QRCode Generator",
		showCount: true,
		showLabel: false,
		showCount: "inside",
		shares: [
			"email",
			{ share: "twitter", via: "logic", hashtags: "#CashlessConsumer" },
			"facebook",
			"googleplus",
			"linkedin",
			"whatsapp"
		]
	});
});

/* TODO -- Find a way to send to WA. Custom URL Scheme sends as text
function shareWA() {
	var message = encodeURIComponent($('#paylink').html());
	var whatsapp_url = "whatsapp://send?html=" + message;
	window.location.href = whatsapp_url;
} */
