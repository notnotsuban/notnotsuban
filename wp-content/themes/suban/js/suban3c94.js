/*global jQuery:false */

jQuery( document ).ready(function( $ ) {
	"use strict";
	
	
	/* #Site Menu
	 ================================================== */
	if ( jQuery().superfish ) {
			
		// Init the menu and submenu
		$( '.menu-list' ).superfish({
			popUpSelector: '.sub-menu',
			animation: {
				opacity: 'show',
			},
			speed: 'fast',
			speedOut: 'normal',
			delay: 600	// milliseconds delay on mouseout
		});
		
	} else {
		console.log( 'superfish JS is disabled or missing.' );
	}
	
	
	
	/* #Mobile Menu
	 ================================================== */
	createMobileMenuItems();
	
	if ( jQuery().mmenu ) {
			
		// Initialize the mobile menu
		$( '#mobile-menu-entity' ).mmenu({
			// Options
			extensions 	: [ 'pagedim-black' ],
			slidingSubmenus : false,
			offCanvas : {
				position : 'right',
			},
			navbars	: {
				content : [ 'close' ],
			}
		});
		
	} else {
		console.log( 'mmenu JS is disabled or missing.' );
	}
	
	function createMobileMenuItems() {
		
		var mobileMenuList = $( '<ul />' ).appendTo( $( '#mobile-menu-entity' ) );
		
		var clonedList = $( '.menu-list > li' ).clone();
		clonedList = getGeneratedSubmenu( clonedList );
		clonedList.appendTo( mobileMenuList );
		
	}
	
	// Recursive function for generating submenus
	function getGeneratedSubmenu( list ) {
		
		$( list ).each( function() {
			
			if ( $( this ).find( 'ul' ).length > 0 ) {
				
				var submenu = $( this ).find( 'ul' ).removeAttr( 'style' ).removeAttr( 'class' ); // To remove styles that prevents mobile menu to display properly
				getGeneratedSubmenu( submenu.find( 'li' ) );
				
			}
			
		});
		
		return list;
		
	}
	
	
	
	/* #Search 
	 ================================================== */
	showSearchButton();
	
	function showSearchButton() {
		
		var showSearchButton = ThemeOptions.show_search_button,
			$searchButton = $( '.search-button' );
		
		// If the search button is enabled
		if ( '' !== showSearchButton && '0' !== showSearchButton ) {
			
			$searchButton.css( 'display', 'inline' );
			
			if ( Modernizr.mq('(max-width: 768px)') ) {
				
				$( '#mobile-menu' ).append( $searchButton );
				
			} else {
				
				$( '.menu-list' ).append( $searchButton );
				
			}
			
		}
		
		$( '.site-menu' ).css( 'opacity', 1 );
		
	}
	
	
	var isSearchOpened = false;
	
	$( '.search-button' ).on( 'click', function() {
		
		$( '#search-panel-wrapper' ).css( 'display', 'block' ).stop().animate({
			opacity: 1,
		}, 300, function() {
			
			$( '#search-panel-wrapper .search-field' ).focus();
			isSearchOpened = true;
			
		});
		
	});
	
	$( '#search-close-button' ).on( 'click', function() {
		closeSearchPanel();
	});
	
	$( document ).on( 'keyup', function( e ) {
		
		// Escape key
		if ( 27 === e.keyCode ) {
			closeSearchPanel();
		}
		
	});
	
	function closeSearchPanel() {
		
		if ( isSearchOpened ) {
			
			$( '#search-panel-wrapper' ).stop().animate({
				opacity: 0,
			}, 300, function() {
				
				$( this ).css( 'display', 'none' );
				isSearchOpened = false;
				
			});
	
		}
		
	}
	
	
	
	/* #Fancybox 
	 ================================================== */
	 
	var enableLightbox = ThemeOptions.enable_lightbox_wp_gallery;
	
	if ( enableLightbox === '0' ) {
		enableLightbox = false;
	} else {
		enableLightbox = true;
	}
	
	// Add FancyBox feature to WP gallery and WP images
	if ( enableLightbox ) {
		
		// For the classic gallery
		registerFancyBoxToWPGallery( $( '.gallery' ), '.gallery-item' );
		// For the Gutenberg's Gallery block
		registerFancyBoxToWPGallery( $( '.wp-block-gallery' ), '.blocks-gallery-item' );
		registerFancyBoxToWPImage();
		
	}
	 
	function registerFancyBoxToWPGallery( $gallery, itemSelector ) {
		
		var $wpGallery = $gallery;

		$wpGallery.each( function() {
			
			var mainId = randomizeNumberFromRange( 10000, 90000 );
			var items = $( this ).find( itemSelector ).find( 'a' );

			items.each( function() {

				var href = $( this ).attr( 'href' );
				
				if ( typeof href !== typeof undefined && href !== false ) {
						
					// Check the target file extension, if it is one of the image extension then add Fancybox class
					if ( href.toLowerCase().indexOf( '.jpg' ) >= 0 || href.toLowerCase().indexOf( '.jpeg' ) >= 0 || href.toLowerCase().indexOf( '.png' ) >= 0 || href.toLowerCase().indexOf( '.gif' ) >= 0) {

						$( this ).addClass( 'image-box' );
						
						var attr = 'data-fancybox-group';
						if ( 'fancybox3' === ThemeOptions.lightbox_script ) {
							attr = 'data-fancybox';
						}
						
						$( this ).attr( attr, mainId );

					}
					
				}

			});

		});
		
	}
	
	function registerFancyBoxToWPImage() {
		
		// Run through WP images on the page
		$( 'img[class*="wp-image-"]' ).each( function() {
			
			// If the image has an anchor tag
			var $parentAnchor = $( this ).closest( 'a' );
			
			if ( $parentAnchor.length > 0 ) {
				
				var href = $parentAnchor.attr( 'href' );
				
				if ( typeof href !== typeof undefined && href !== false ) {
						
					// Check the target file extension, if it is one of the image extension then add Fancybox class
					if (href.toLowerCase().indexOf( '.jpg' ) >= 0 || href.toLowerCase().indexOf( '.jpeg' ) >= 0 || href.toLowerCase().indexOf( '.png' ) >= 0 || href.toLowerCase().indexOf( '.gif' ) >= 0) {

						$parentAnchor.addClass( 'image-box no-slideshow' );

					}
					
				}
				
			}
			
		});
		
	}
	
	
	callFancyBoxScript();
	
	function callFancyBoxScript() {
		
		if ( jQuery().fancybox ) {
			
			if ( 'fancybox3' === ThemeOptions.lightbox_script ) {
				
				// FANCYBOX 3
				$( '.image-box' ).fancybox({
					
					buttons: [
						'zoom',
						'slideShow',
						'fullScreen',
						'thumbs',
						'close',
					],
					
					animationEffect: 'fade',
					animationDuration: 700,
					loop: true,
					
					caption: function( instance, item ) {
						return getImageCaptionText( $( this ) );
					},
					
					afterLoad: function( instance, current ) {
						
						var pixelRatio = window.devicePixelRatio || 1;

						if ( pixelRatio > 1.5 ) {
							current.width  = current.width  / pixelRatio;
							current.height = current.height / pixelRatio;
						}
						
					},
					
					lang: 'en',
					
					i18n: {
						en: {
							CLOSE: ThemeOptions.lightbox_close_text,
							NEXT: ThemeOptions.lightbox_next_text,
							PREV: ThemeOptions.lightbox_prev_text,
							ERROR: ThemeOptions.lightbox_error_text,
							PLAY_START: ThemeOptions.lightbox_start_slide_text,
							PLAY_STOP: ThemeOptions.lightbox_pause_slide_text,
							FULL_SCREEN: ThemeOptions.lightbox_fullscreen_text,
							THUMBS: ThemeOptions.lightbox_thumbnails_text,
							DOWNLOAD: ThemeOptions.lightbox_download_text,
							SHARE: ThemeOptions.lightbox_share_text,
							ZOOM: ThemeOptions.lightbox_zoom_text,
						},
					},
					
				});
				
			} else {
				
				// FANCYBOX 2
				var enableLightboxMouseScrolling = ThemeOptions.enable_lightbox_mouse_scrolling;
				
				if ( enableLightboxMouseScrolling === '0' ) {
					enableLightboxMouseScrolling = false;
				} else {
					enableLightboxMouseScrolling = true;
				}
		
				// For portfolio and WP gallery
				$( '.image-box' ).fancybox({
					mouseWheel: enableLightboxMouseScrolling,
					padding: 0,
					closeBtn: false,
					tpl: {
						error: '<p class="fancybox-error">' + ThemeOptions.lightbox_error_text + '</p>',
						closeBtn: '<a title="' + ThemeOptions.lightbox_close_text + '" class="fancybox-item fancybox-close" href="javascript:;"></a>',
						next: '<a title="' + ThemeOptions.lightbox_next_text + '" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
						prev: '<a title="' + ThemeOptions.lightbox_prev_text + '" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>',	
					},
					helpers : {
						thumbs : {
							width : 40,
							height : 40,
						},
						overlay: {
							locked: true, // to prevent page jumping to the top when clicking on the object
							css: { 'background': 'rgba(255,255,255,0.9)' },
						},
						title: {
							type : 'outside',
						},
						buttons: {
							tpl: '<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="' + ThemeOptions.lightbox_prev_text + '" href="javascript:;"></a></li><li><a class="btnPlay" title="' + ThemeOptions.lightbox_start_slide_text + '" href="javascript:;"></a></li><li><a class="btnNext" title="' + ThemeOptions.lightbox_next_text + '" href="javascript:;"></a></li><li><a class="btnToggle" title="' + ThemeOptions.lightbox_toggle_size_text + '" href="javascript:;"></a></li><li><a class="btnClose" title="' + ThemeOptions.lightbox_close_text + '" href="javascript:;"></a></li></ul></div>',
						},
					},
					beforeLoad: function() {
						this.title = getImageCaptionText( $( this.element ) );
					},
				});
				
				
				
				// For WP images
				$( '.image-box.no-slideshow' ).fancybox({
					mouseWheel: enableLightboxMouseScrolling,
					padding: 0,
					helpers : {
						overlay: {
							locked: true, // to prevent page jumping to the top when clicking on the object
							css: { 'background': 'rgba(255,255,255,0.9)' },
						},
						title: {
							type : 'outside',
						},
					},
					beforeLoad: function() {
						this.title = getImageCaptionText( $( this.element ) );
					},
				});
				
			}
			
		} else {
			console.log( 'Fancybox JS is disabled or missing.' );
		}
		
	}
	
	function getImageCaptionText( $element ) {
		
		// For WP gallery
		if ( $element.closest( '.gallery-item' ).length > 0 ) {
			return $element.closest( '.gallery-item' ).find( '.wp-caption-text' ).html();
		
		// For Gutenberg's Gallery
		} else if ( $element.closest( '.blocks-gallery-item' ).length > 0 ) {
			return $element .closest( '.blocks-gallery-item' ).find( 'figcaption' ).html();
			
		// For theme image
		} else if ( $element.closest( '.image-wrapper' ).length > 0 ) {
			return $element.closest( '.image-wrapper' ).find( '.image-caption' ).html();
			
		// For any other cases... it can be normal WP media file (image)
		} else {
			return $element.closest( '.wp-caption' ).find( '.wp-caption-text' ).html();
		}
		
	}
	
	
	
	/* #Misc
	 ================================================== */
	 
	// Hide the underline of the link that wraps around img
	var $wpImages = $( 'img[class*="wp-image-"], img[class*="attachment-"], .widget-item img' );
	if ( $wpImages.closest( 'a' ).length > 0 ) {
		$wpImages.closest( 'a' ).addClass( 'no-border' );
	}
	
	function randomizeNumberFromRange( min, max ) {
		return Math.floor( Math.random() * ( max - min + 1 ) + min );
	}
	
	function log( x ) {
		console.log( x );
	}
	
	function checkModernizr() {
	
		if ( 'undefined' !== typeof Modernizr ) {
			return true;
		} else {
			console.log( 'Modernizr JS is missing.' );
			return false;
		}
		
	}
	
	function getIntValurFromCSSAttribute( $attr ) {
		return parseInt( $attr.replace( 'px', '' ), 10 );
	}
	
	
	
	/* #Responsive Related
	 ================================================== */
	moveBlogMeta();
	
	function moveBlogMeta() {
		
		if ( 'undefined' !== typeof Modernizr ) {
				
			if ( Modernizr.mq('(max-width: 950px)') ) {
				
				$( '.blog-list .post-content-container' ).each( function() {
					$( this ).find( '.post-title-excerpt-wrapper' ).after( $( this ).find( '.post-meta-wrapper' ) );
				});
				
			} else {
				
				$( '.blog-list .post-content-container' ).each( function() {
					
					if ( $( this ).hasClass( 'no-image' ) ) {
						$( this ).find( '.post-title-excerpt-wrapper' ).after( $( this ).find( '.post-meta-wrapper' ) );
					} else {
						$( this ).find( '.post-meta-wrapper' ).after( $( this ).find( '.post-title-excerpt-wrapper' ) );
					}
					
				});
				
			}
			
			$( '.post-meta-wrapper' ).css( 'display', 'block' );
			
		}
		
	}
	
	$( window ).on( 'resize', function() {
		
		moveBlogMeta();
		showSearchButton();
		
	});
		
});