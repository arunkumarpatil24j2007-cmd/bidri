/**
 * Bidri Crafts — homepage banner slider. No library, no jQuery.
 * - Slides are native scroll-snap, so swiping works even without this script.
 * - Auto-advances every N seconds (class "bc-every-N" on the slider, default 6).
 * - Pauses on hover, keyboard focus, touch, hidden tab; never auto-plays with "reduce motion".
 * - Slides with classes bc-from-YYYY-MM-DD / bc-until-YYYY-MM-DD are removed outside those dates
 *   (the server does this too; this covers cached pages).
 */
( function () {
	'use strict';

	function inDateRange( el, today ) {
		var m, from, until;
		el.classList.forEach( function ( c ) {
			if ( ( m = c.match( /^bc-from-(\d{4}-\d{2}-\d{2})$/ ) ) ) from = m[ 1 ];
			if ( ( m = c.match( /^bc-until-(\d{4}-\d{2}-\d{2})$/ ) ) ) until = m[ 1 ];
		} );
		return ( ! from || today >= from ) && ( ! until || today <= until );
	}

	function init( slider ) {
		var track = slider.querySelector( '.bc-slides' );
		if ( ! track ) return;
		var d = new Date();
		var today = d.getFullYear() + '-' + String( d.getMonth() + 1 ).padStart( 2, '0' ) + '-' + String( d.getDate() ).padStart( 2, '0' );
		Array.prototype.forEach.call( track.querySelectorAll( ':scope > .bc-slide' ), function ( s ) {
			if ( ! inDateRange( s, today ) ) s.remove();
		} );
		var slides = track.querySelectorAll( ':scope > .bc-slide' );
		if ( slides.length < 2 ) return;

		var every = ( slider.className.match( /bc-every-(\d+)/ ) || [ 0, 6 ] )[ 1 ] * 1000;
		var reduce = window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;
		var current = 0, timer = null, paused = reduce, hovering = false, moving = 0;

		slider.setAttribute( 'role', 'region' );
		slider.setAttribute( 'aria-roledescription', 'carousel' );
		slider.setAttribute( 'aria-label', 'Featured' );
		slides.forEach( function ( s, i ) {
			s.setAttribute( 'role', 'group' );
			s.setAttribute( 'aria-roledescription', 'slide' );
			s.setAttribute( 'aria-label', ( i + 1 ) + ' of ' + slides.length );
		} );

		// Controls: prev · dots · next · pause.
		var nav = document.createElement( 'div' );
		nav.className = 'bc-slider__nav';
		var prev = button( 'bc-slider__arrow bc-slider__prev', 'Previous slide' );
		var next = button( 'bc-slider__arrow bc-slider__next', 'Next slide' );
		var dots = document.createElement( 'div' );
		dots.className = 'bc-slider__dots';
		var dotEls = Array.prototype.map.call( slides, function ( s, i ) {
			var b = button( 'bc-slider__dot', 'Go to slide ' + ( i + 1 ) );
			b.addEventListener( 'click', function () { stop(); go( i ); } );
			dots.appendChild( b );
			return b;
		} );
		var pause = button( 'bc-slider__pause', '' );
		nav.appendChild( prev ); nav.appendChild( dots ); nav.appendChild( next ); nav.appendChild( pause );
		slider.appendChild( nav );

		function button( cls, label ) {
			var b = document.createElement( 'button' );
			b.type = 'button';
			b.className = cls;
			if ( label ) b.setAttribute( 'aria-label', label );
			return b;
		}

		function go( i ) {
			current = ( i + slides.length ) % slides.length;
			clearTimeout( moving );
			moving = setTimeout( function () { moving = 0; }, 900 ); // ignore our own scroll events
			track.scrollTo( { left: slides[ current ].offsetLeft - track.offsetLeft, behavior: reduce ? 'auto' : 'smooth' } );
			mark();
		}
		function mark() {
			dotEls.forEach( function ( b, i ) { b.setAttribute( 'aria-current', i === current ? 'true' : 'false' ); } );
			pause.setAttribute( 'aria-label', paused ? 'Play slideshow' : 'Pause slideshow' );
			pause.classList.toggle( 'is-paused', paused );
			slides.forEach( function ( s, i ) { s.inert = i !== current; } ); // only the visible slide is focusable
		}
		function start() {
			clearInterval( timer );
			if ( ! paused && ! hovering && ! document.hidden ) timer = setInterval( function () { go( current + 1 ); }, every );
		}
		function stop() { paused = true; clearInterval( timer ); mark(); }

		prev.addEventListener( 'click', function () { stop(); go( current - 1 ); } );
		next.addEventListener( 'click', function () { stop(); go( current + 1 ); } );
		pause.addEventListener( 'click', function () { paused = ! paused; mark(); start(); } );
		slider.addEventListener( 'mouseenter', function () { hovering = true; clearInterval( timer ); } );
		slider.addEventListener( 'mouseleave', function () { hovering = false; start(); } );
		slider.addEventListener( 'focusin', function () { clearInterval( timer ); } );
		slider.addEventListener( 'focusout', start );
		track.addEventListener( 'touchstart', function () { stop(); }, { passive: true } );
		document.addEventListener( 'visibilitychange', start );

		// Keep "current" in sync when the visitor swipes.
		var t;
		track.addEventListener( 'scroll', function () {
			clearTimeout( t );
			if ( moving ) return;
			t = setTimeout( function () {
				var i = Math.round( track.scrollLeft / track.clientWidth );
				if ( i !== current ) { current = Math.max( 0, Math.min( slides.length - 1, i ) ); mark(); }
			}, 80 );
		}, { passive: true } );
		window.addEventListener( 'resize', function () { go( current ); } );

		mark();
		start();
	}

	document.querySelectorAll( '.bc-slider' ).forEach( init );
} )();
