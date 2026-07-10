( function () {
	'use strict';

	const HEADER_SELECTOR = '.wp-block-mk-header.mk-header';

	const closeHeaderMenu = ( header ) => {
		header.classList.remove( 'is-active' );
		const toggle = header.querySelector( '.mk-header__hamburger' );
		const nav = header.querySelector( '.mk-header__nav' );
		if ( toggle ) {
			toggle.setAttribute( 'aria-expanded', 'false' );
		}
		if ( nav ) {
			nav.setAttribute( 'aria-hidden', 'true' );
		}
		document.body.classList.remove( 'mk-header-menu-open' );
		document.body.style.removeProperty( 'overflow' );
	};

	const openHeaderMenu = ( header ) => {
		header.classList.add( 'is-active' );
		const toggle = header.querySelector( '.mk-header__hamburger' );
		const nav = header.querySelector( '.mk-header__nav' );
		if ( toggle ) {
			toggle.setAttribute( 'aria-expanded', 'true' );
		}
		if ( nav ) {
			nav.setAttribute( 'aria-hidden', 'false' );
		}
		document.body.classList.add( 'mk-header-menu-open' );
		document.body.style.overflow = 'hidden';
	};

	const initHeader = ( header ) => {
		if ( header.dataset.mkHeaderInit === 'true' ) {
			return;
		}

		const toggle = header.querySelector( '.mk-header__hamburger' );
		if ( ! toggle ) {
			return;
		}

		header.dataset.mkHeaderInit = 'true';

		toggle.addEventListener( 'click', () => {
			if ( header.classList.contains( 'is-active' ) ) {
				closeHeaderMenu( header );
			} else {
				openHeaderMenu( header );
			}
		} );

		window.addEventListener( 'resize', () => {
			if ( window.innerWidth > 991 && header.classList.contains( 'is-active' ) ) {
				closeHeaderMenu( header );
			}
		} );

		const links = header.querySelectorAll( '.mk-header__nav a' );
		links.forEach( ( link ) => {
			link.addEventListener( 'click', () => closeHeaderMenu( header ) );
		} );
	};

	const initAllHeaders = () => {
		const headers = document.querySelectorAll( HEADER_SELECTOR );
		headers.forEach( ( header ) => initHeader( header ) );
	};

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAllHeaders );
	} else {
		initAllHeaders();
	}
} )();
