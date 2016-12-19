function updateText() {
	'use strict';
	//TODO : Detect the page, load corresponding localizer method
	updateQRCodeL10N();
}

function updateQRCodeL10N() {
	'use strict';
	var i18n = $.i18n();
	var language = $('#lang').val();
	i18n.locale = language;

	i18n.load( 'i18n/upiqrcode-' + $.i18n().locale + '.json', language ).done( function(){
		$("*[data-i18n]").each(function(){
			$(this).text($.i18n($(this).data('i18n')))
		});
		$('[data-i18n = upiqrc-btn-pay]' ).text($.i18n( 'upiqrc-btn-pay', $('#pn').val() ));
	});
}
