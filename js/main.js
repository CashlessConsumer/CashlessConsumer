function getLink() {
	var paymentStr = "upi://pay?pa=" + $('#pa').val() +
			"@" + $('#psp').val() +
			"&pn=" + $('#pn').val() +
			"&tn=" + $('#tn').val() +
			"&am=" + $('#am').val() +
			"&refUrl=" + $('#refurl').val();
	if ($('#am').val() === "") {
		$('#paylink').html("<a href=" + encodeURI(paymentStr) + ">Pay to " + $('#pn').val() + " using UPI</a>");
	}
	else {
		$('#paylink').html("<a href=" + encodeURI(paymentStr) + ">Pay ₹" + $('#am').val() + " to " + $('#pn').val() + " using UPI</a>");
	}
	$('#HTMLSnippet').show();
	return paymentStr;
}

function getQRCode() {
	var paymentStr = getLink(),
		encodedPaymentStr = encodeURI(paymentStr);
	$('#payQRCode').html('');
	$('#payQRCode').qrcode(encodedPaymentStr);
	$('#DownloadQRCode').show();
	$('#PrintQRCode').show();
}

function getEncodedString(val) {
	$('#am').val = val;
	paymentStr = getLink();
	return encodeURI(paymentStr);

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
	/*var restorepage = document.body.innerHTML;
	var printcontent = document.getElementById('printableArea).innerHTML;
	document.body.innerHTML = printcontent;
	window.print();
	document.body.innerHTML = restorepage;*/
	//$('#printableArea').print();
	//window.print();

	var doc = new jsPDF()

	var dataUrl = qr.canvas('http://cyberair.co.uk').toDataURL('image/jpeg');
	doc.addImage(dataUrl);
		doc.save();

	var specialElementHandlers = {
		'#payQRCode': function (element, renderer) {
			return true;
		}
	};

	doc.fromHTML($('#printableArea').html(), 15, 15, {
		'width': 170,
		'elementHandlers': specialElementHandlers
	});
	doc.save('a4.pdf');

}

$(window).load(function () {
	 $("#shareIcons").jsSocials({
		url: "http://www.srik.me/UPI-PaymeLink",
		text: "UPI Payment Link Generator",
		showCount: true,
		showLabel: false,
		showCount: "inside",
		shares: [
			"email",
			{ share: "twitter", via: "logic", hashtags: "#UPIApps" },
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
