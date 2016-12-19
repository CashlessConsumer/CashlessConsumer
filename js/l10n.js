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
