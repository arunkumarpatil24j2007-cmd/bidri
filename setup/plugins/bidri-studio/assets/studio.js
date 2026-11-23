/* Bidri Studio — two small conveniences. No library. */
( function () {
	'use strict';

	// "Are you sure?" on buttons that change something important.
	document.addEventListener( 'click', function ( e ) {
		var b = e.target.closest( '[data-confirm]' );
		if ( b && ! window.confirm( b.getAttribute( 'data-confirm' ) ) ) {
			e.preventDefault();
		}
	} );

	// Show the chosen photo straight away, before saving.
	var input = document.querySelector( '.bs-photo input[type=file]' );
	var frame = document.querySelector( '[data-photo-preview]' );
	if ( input && frame ) {
		input.addEventListener( 'change', function () {
			var f = input.files && input.files[ 0 ];
			if ( ! f ) return;
			var img = document.createElement( 'img' );
			img.alt = '';
			img.src = URL.createObjectURL( f );
			frame.replaceChildren( img );
		} );
	}

	// Prevent double-submits (e.g. tapping "Mark as shipped" twice).
	document.addEventListener( 'submit', function ( e ) {
		var form = e.target;
		if ( form.dataset.sent ) {
			e.preventDefault();
			return;
		}
		form.dataset.sent = '1';
		var btn = form.querySelector( 'button[type=submit]' );
		if ( btn ) btn.setAttribute( 'aria-busy', 'true' );
	} );
	// Coming back with the browser's Back button: allow forms again.
	window.addEventListener( 'pageshow', function () {
		document.querySelectorAll( 'form[data-sent]' ).forEach( function ( f ) { delete f.dataset.sent; } );
	} );
} )();
