function getLink() {
	var paymentStr = "upi://pay?pa=" + $('#pa').val() +
			"@" + $('#psp').val() +
			"&pn=" + $('#pn').val() +
			"&tn=" + $('#tn').val() +
			"&am=" + $('#am').val();
	if ($('#am').val() !== '') {
		$('#paylink').find("span").html("Pay " + $('#pn').val() + " using UPI");
		$('#paylink').attr("href", encodeURI(paymentStr));
		$('[data-i18n = upiqrc-btn-pay]' ).text($.i18n( 'upiqrc-btn-pay', $('#pn').val() ));
	} else {
		$('#paylink').find("span").html("Pay ₹" + $('#am').val() + " to " + $('#pn').val() + " using UPI");
		$('#paylink').attr("href", encodeURI(paymentStr));
		$('[data-i18n = upiqrc-btn-pay]' ).text($.i18n( 'upiqrc-btn-pay-am', $('#pn').val(), $('#am').val() ));
	}
	$('#paylink').show();
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
	html2canvas($("#printableArea"), {
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

/* TODO -- Find a way to send to WA. Custom URL Scheme sends as text
function shareWA() {
	var message = encodeURIComponent($('#paylink').html());
	var whatsapp_url = "whatsapp://send?html=" + message;
	window.location.href = whatsapp_url;
} */

function postToGoogle() {
	var upiquestion = $('#upiquestion').val();
	var upiemail = $('#upiemail').val();

	if(upiquestion == ""){
		$('#upiresponse').html("<div class='alert alert-danger'>Don't you want to ask anything? Please enter your question.</div>");
	} else {
		$.ajax({
			url: "https://docs.google.com/forms/d/e/1FAIpQLSfMSIpXd6-_pPXLEssRhXvT8P2ZHab6s8RQRDaquvpAiVAOpg/formResponse",
			data: {"entry.998474377": upiquestion,"entry.1996686773": upiemail},
			type: "POST",
			dataType: "xml",
			statusCode: {
				0: function() {
					$('#upiresponse').html("<div class='alert alert-success'>Your question is sent. We will get back soon.</div>");
					$('#upiquestion').val("");
					$('#upiemail').val("");
				},
				200: function() {
					$('#upiresponse').html("<div class='alert alert-success'>Your question is sent. We will get back soon.</div>");
					$('#upiquestion').val("");
					$('#upiemail').val("");
				}
			}
		});
	}

}

function updateText() {
	'use strict';
	$.i18n.debug = true;
	var i18n = $.i18n();
	var language = $('#lang').val();
	i18n.locale = language;
	console.log(language);

	i18n.load( 'i18n/upiqrcode-' + $.i18n().locale + '.json', $('#lang').val() ).done( function () {
		$('[data-i18n = upiqrc-title]' ).text($.i18n( 'upiqrc-title' ));
		$('[data-i18n = upiqrc-sub-title]' ).text($.i18n( 'upiqrc-sub-title' ));
		$('[data-i18n = upiqrc-p-1]' ).text($.i18n( 'upiqrc-p-1' ));
		$('[data-i18n = upiqrc-p-2]' ).text($.i18n( 'upiqrc-p-2' ));
		$('[data-i18n = upiqrc-p-privacyheader]' ).text($.i18n( 'upiqrc-p-privacyheader' ));
		$('[data-i18n = upiqrc-p-privacydesc]' ).text($.i18n( 'upiqrc-p-privacydesc' ));
		$('[data-i18n = upiqrc-lbl-name]' ).text($.i18n( 'upiqrc-lbl-name' ));
		$('[data-i18n = upiqrc-lbl-vpa]' ).text($.i18n( 'upiqrc-lbl-vpa' ));
		$('[data-i18n = upiqrc-btn-create]' ).text($.i18n( 'upiqrc-btn-create' ));
		$('[data-i18n = upiqrc-btn-download]' ).text($.i18n( 'upiqrc-btn-download' ));
		$('[data-i18n = upiqrc-btn-print]' ).text($.i18n( 'upiqrc-btn-print' ));
		$('[data-i18n = upiqrc-btn-pay]' ).text($.i18n( 'upiqrc-btn-pay', $('#pn').val() ));
		$('[data-i18n = upiqrc-footer]' ).text($.i18n( 'upiqrc-footer' ));
		$('[data-i18n = upiqrc-license]' ).text($.i18n( 'upiqrc-license' ));
		$('[data-i18n = upiqrc-codelink]' ).text($.i18n( 'upiqrc-codelink' ));
	});

}


$( document ).ready( function( $ ) {
	'use strict';
	updateText();
	//$.i18n().load('upiqrcode.json','ta').done( function() { console.log('done!'); set_locale_to(url('?locale')); } );;
} );
