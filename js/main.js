function getLink() {
	var paymentStr = "upi://pay?pa=" + $('#pa').val() +
			"@" + $('#psp').val() +
			"&pn=" + $('#pn').val() +
			"&tn=" + $('#tn').val() +
			"&am=" + $('#am').val();
	if ($('#am').val() !== '') {
		$('#paylink').find("span").html("Pay " + $('#pn').val() + " using UPI");
		$('#paylink').find("a").attr("href", encodeURI(paymentStr));
	} else {
		$('#paylink').find("span").html("Pay ₹" + $('#am').val() + " to " + $('#pn').val() + " using UPI");
		$('#paylink').find("a").attr("href", encodeURI(paymentStr));
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
	$.i18n().locale = $('#lang').val();
	console.log($.i18n().locale);

	$('[data-i18n = upiqrc-title]' ).i18nText( 'upiqrc-title' );
	$('[data-i18n = upiqrc-sub-title]' ).i18nText( 'upiqrc-sub-title' );
	$('[data-i18n = upiqrc-p-1]' ).i18nText( 'upiqrc-p-1' );
	$('[data-i18n = upiqrc-p-2]' ).i18nText( 'upiqrc-p-2' );
	$('[data-i18n = upiqrc-p-privacyheader]' ).i18nText( 'upiqrc-p-privacyheader' );
	$('[data-i18n = upiqrc-p-privacydesc]' ).i18nText( 'upiqrc-p-privacydesc' );
	$('[data-i18n = upiqrc-lbl-name]' ).i18nText( 'upiqrc-lbl-name' );
	$('[data-i18n = upiqrc-lbl-vpa]' ).i18nText( 'upiqrc-lbl-vpa' );
	$('[data-i18n = upiqrc-btn-create]' ).i18nText( 'upiqrc-btn-create' );
	$('[data-i18n = upiqrc-btn-download]' ).i18nText( 'upiqrc-btn-download' );
	$('[data-i18n = upiqrc-btn-print]' ).i18nText( 'upiqrc-btn-print' );
	$('[data-i18n = upiqrc-btn-pay]' ).i18nText( 'upiqrc-btn-pay', $('#pn').val() );

}

$.fn.i18nText = function ( key, params ) {
	var i18n = $.i18n(),
		$element = $( this );
	i18n.load( 'i18n/upiqrcode-' + $.i18n().locale + '.json', $('#lang').val() ).done( function () {
		if ( $element.data( 'i18n' ) ) {
			$element.i18n();
		} /*else if( $element.data('i18n','[html]'+ key)) {
			$element.i18n().html();
		}*/
		else {
			$element.text( $.i18n( key, params ) );
		}
	} );
	return $element;
}

$( document ).ready( function( $ ) {
	'use strict';
	//updateText();
	//$.i18n().load('upiqrcode.json','ta').done( function() { console.log('done!'); set_locale_to(url('?locale')); } );;
} );
