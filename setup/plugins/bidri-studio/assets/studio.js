/* Bidri Studio — small conveniences, and the link to the Android app. No library. */
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
		if ( 'get' === ( form.getAttribute( 'method' ) || 'get' ).toLowerCase() ) return; // Search, downloads.
		if ( form.dataset.sent ) {
			e.preventDefault();
			return;
		}
		form.dataset.sent = '1';
		var btn = form.querySelector( 'button[type=submit]' );
		if ( btn ) btn.setAttribute( 'aria-busy', 'true' );
	} );
	var app = window.BidriApp; // Present only inside the Studio Android app.
	var cfg = window.bsApp || {};

	// In the app: connect this phone for notifications (once; again if the key was removed).
	if ( app && cfg.rest && ! app.hasDevice() ) {
		fetch( cfg.rest + 'device', {
			method: 'POST',
			credentials: 'same-origin',
			headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': cfg.nonce },
			body: JSON.stringify( { name: app.deviceName() } )
		} ).then( function ( r ) { return r.ok ? r.json() : null; } ).then( function ( d ) {
			if ( d && d.device ) app.connect( d.device, String( d.latest || 0 ) );
		} ).catch( function () {} );
	}

	// Share (payment links): the phone's share sheet, or copy.
	document.addEventListener( 'click', function ( e ) {
		var b = e.target.closest( '[data-share]' );
		if ( ! b ) return;
		var text = b.getAttribute( 'data-share' );
		if ( app ) { app.share( text ); return; }
		if ( navigator.share ) { navigator.share( { url: text } ).catch( function () {} ); return; }
		if ( navigator.clipboard ) navigator.clipboard.writeText( text ).then( function () { window.alert( ( cfg.text || {} ).copied || 'Copied' ); } );
	} );

	// Print (packing slip).
	document.addEventListener( 'click', function ( e ) {
		if ( ! e.target.closest( '[data-print]' ) ) return;
		if ( app ) app.print(); else window.print();
	} );

	// New order: reveal another piece line.
	document.addEventListener( 'click', function ( e ) {
		var b = e.target.closest( '[data-add-line]' );
		if ( ! b ) return;
		var next = document.querySelector( '[data-lines] [data-extra][hidden]' );
		if ( next ) { next.hidden = false; next.querySelector( 'select' ).focus(); }
		if ( ! document.querySelector( '[data-lines] [data-extra][hidden]' ) ) b.hidden = true;
	} );

	// Notifications screen: show whether this phone may show alerts.
	var status = document.querySelector( '[data-app-status]' );
	if ( status && app ) {
		var paint = function () {
			var on = app.notificationsAllowed();
			status.hidden = false;
			status.querySelector( '[data-app-status-text]' ).textContent = on ? cfg.text.on : cfg.text.off;
			status.querySelector( '[data-app-allow]' ).hidden = on;
		};
		paint();
		status.querySelector( '[data-app-allow]' ).addEventListener( 'click', function () { app.askNotifications(); } );
		document.addEventListener( 'visibilitychange', paint );
	}

	// Coming back with the browser's Back button: allow forms again.
	window.addEventListener( 'pageshow', function () {
		document.querySelectorAll( 'form[data-sent]' ).forEach( function ( f ) { delete f.dataset.sent; } );
	} );
} )();
