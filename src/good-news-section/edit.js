import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@mk-builder/editor-utils';
import {
	InspectorControls,
	PanelColorSettings,
	RichText,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	TextControl,
	BaseControl,
	Button,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		layoutDirection,
		contentWidth,
		imageWidth,
		contentWidthTablet,
		imageWidthTablet,
		contentWidthMobile,
		imageWidthMobile,
		backgroundImage,
		backgroundImageId,
		backgroundImageTablet,
		backgroundImageTabletId,
		backgroundImageMobile,
		backgroundImageMobileId,
		useResponsiveImages,
		backgroundImagePosition,
		backgroundImageSize,
		backgroundImageSizeTablet,
		backgroundImageSizeMobile,
		backgroundImagePositionTablet,
		backgroundImagePositionMobile,
		backgroundImageCustomSize,
		backgroundImageCustomSizeTablet,
		backgroundImageCustomSizeMobile,
		showBackgroundOverlay,
		backgroundOverlayColor,
		backgroundOverlayOpacity,
		contentBackgroundColor,
		contentPadding,
		contentPaddingTablet,
		contentPaddingMobile,
		contentMaxWidth,
		contentMarginRight,
		contentMarginRightTablet,
		contentMarginRightMobile,
		contentAlignment,
		contentAlignmentTablet,
		contentAlignmentMobile,
		imageMinHeight,
		imageMinHeightTablet,
		imageMinHeightMobile,
		imageObjectFit,
		imageObjectPosition,
		imageMaxWidth,
		imageMaxWidthTablet,
		imageMaxWidthMobile,
		imageMaxHeight,
		imageMaxHeightTablet,
		imageMaxHeightMobile,
		imageAspectRatio,
		imageOverflow,
		imageMarginTop,
		imageMarginTopTablet,
		imageMarginTopMobile,
		imageMarginRight,
		imageMarginRightTablet,
		imageMarginRightMobile,
		imageMarginBottom,
		imageMarginBottomTablet,
		imageMarginBottomMobile,
		imageMarginLeft,
		imageMarginLeftTablet,
		imageMarginLeftMobile,
		imagePaddingTop,
		imagePaddingTopTablet,
		imagePaddingTopMobile,
		imagePaddingRight,
		imagePaddingRightTablet,
		imagePaddingRightMobile,
		imagePaddingBottom,
		imagePaddingBottomTablet,
		imagePaddingBottomMobile,
		imagePaddingLeft,
		imagePaddingLeftTablet,
		imagePaddingLeftMobile,
		paddingTopTablet,
		paddingTopMobile,
		paddingBottomTablet,
		paddingBottomMobile,
		showMetaTitle,
		metaTitle,
		metaTitleColor,
		metaTitleColorTablet,
		metaTitleColorMobile,
		metaTitleFontSize,
		metaTitleFontSizeTablet,
		metaTitleFontSizeMobile,
		metaTitleFontWeight,
		metaTitleFontWeightTablet,
		metaTitleFontWeightMobile,
		metaTitleTextTransform,
		metaTitleTextTransformTablet,
		metaTitleTextTransformMobile,
		metaTitleLetterSpacing,
		metaTitleLetterSpacingTablet,
		metaTitleLetterSpacingMobile,
		metaTitleMarginTop,
		metaTitleMarginTopTablet,
		metaTitleMarginTopMobile,
		metaTitleMarginBottom,
		metaTitleMarginBottomTablet,
		metaTitleMarginBottomMobile,
		metaTitleMarginLeft,
		metaTitleMarginLeftTablet,
		metaTitleMarginLeftMobile,
		metaTitleMarginRight,
		metaTitleMarginRightTablet,
		metaTitleMarginRightMobile,
		metaTitlePaddingTop,
		metaTitlePaddingTopTablet,
		metaTitlePaddingTopMobile,
		metaTitlePaddingBottom,
		metaTitlePaddingBottomTablet,
		metaTitlePaddingBottomMobile,
		metaTitlePaddingLeft,
		metaTitlePaddingLeftTablet,
		metaTitlePaddingLeftMobile,
		metaTitlePaddingRight,
		metaTitlePaddingRightTablet,
		metaTitlePaddingRightMobile,
		metaTitleAlignment,
		metaTitleAlignmentTablet,
		metaTitleAlignmentMobile,
		showHeading,
		heading,
		headingColor,
		headingColorTablet,
		headingColorMobile,
		headingFontSize,
		headingFontSizeTablet,
		headingFontSizeMobile,
		headingFontWeight,
		headingFontWeightTablet,
		headingFontWeightMobile,
		headingLineHeight,
		headingLineHeightTablet,
		headingLineHeightMobile,
		headingLetterSpacing,
		headingLetterSpacingTablet,
		headingLetterSpacingMobile,
		headingMarginTop,
		headingMarginTopTablet,
		headingMarginTopMobile,
		headingMarginBottom,
		headingMarginBottomTablet,
		headingMarginBottomMobile,
		headingMarginLeft,
		headingMarginLeftTablet,
		headingMarginLeftMobile,
		headingMarginRight,
		headingMarginRightTablet,
		headingMarginRightMobile,
		headingPaddingTop,
		headingPaddingTopTablet,
		headingPaddingTopMobile,
		headingPaddingBottom,
		headingPaddingBottomTablet,
		headingPaddingBottomMobile,
		headingPaddingLeft,
		headingPaddingLeftTablet,
		headingPaddingLeftMobile,
		headingPaddingRight,
		headingPaddingRightTablet,
		headingPaddingRightMobile,
		headingAlignment,
		headingAlignmentTablet,
		headingAlignmentMobile,
		showHighlight,
		highlightText,
		highlightColor,
		highlightColorTablet,
		highlightColorMobile,
		highlightFontWeight,
		highlightFontWeightTablet,
		highlightFontWeightMobile,
		highlightFontSize,
		highlightFontSizeTablet,
		highlightFontSizeMobile,
		showDescription,
		description,
		descriptionColor,
		descriptionColorTablet,
		descriptionColorMobile,
		descriptionFontSize,
		descriptionFontSizeTablet,
		descriptionFontSizeMobile,
		descriptionLineHeight,
		descriptionLineHeightTablet,
		descriptionLineHeightMobile,
		descriptionMarginTop,
		descriptionMarginTopTablet,
		descriptionMarginTopMobile,
		descriptionMarginBottom,
		descriptionMarginBottomTablet,
		descriptionMarginBottomMobile,
		descriptionMarginLeft,
		descriptionMarginLeftTablet,
		descriptionMarginLeftMobile,
		descriptionMarginRight,
		descriptionMarginRightTablet,
		descriptionMarginRightMobile,
		descriptionPaddingTop,
		descriptionPaddingTopTablet,
		descriptionPaddingTopMobile,
		descriptionPaddingBottom,
		descriptionPaddingBottomTablet,
		descriptionPaddingBottomMobile,
		descriptionPaddingLeft,
		descriptionPaddingLeftTablet,
		descriptionPaddingLeftMobile,
		descriptionPaddingRight,
		descriptionPaddingRightTablet,
		descriptionPaddingRightMobile,
		descriptionAlignment,
		descriptionAlignmentTablet,
		descriptionAlignmentMobile,
		showNewsletterForm,
		formMarginTop,
		formMarginTopTablet,
		formMarginTopMobile,
		formMarginBottom,
		formMarginBottomTablet,
		formMarginBottomMobile,
		formMarginLeft,
		formMarginLeftTablet,
		formMarginLeftMobile,
		formMarginRight,
		formMarginRightTablet,
		formMarginRightMobile,
		formPaddingTop,
		formPaddingTopTablet,
		formPaddingTopMobile,
		formPaddingBottom,
		formPaddingBottomTablet,
		formPaddingBottomMobile,
		formPaddingLeft,
		formPaddingLeftTablet,
		formPaddingLeftMobile,
		formPaddingRight,
		formPaddingRightTablet,
		formPaddingRightMobile,
		formMaxWidth,
		formMaxWidthTablet,
		formMaxWidthMobile,
		formBorderRadius,
		formBorderRadiusTablet,
		formBorderRadiusMobile,
		formAlignment,
		formAlignmentTablet,
		formAlignmentMobile,
		formBoxShadow,
		formBoxShadowColor,
		formBoxShadowBlur,
		formBoxShadowSpread,
		formBoxShadowOffsetX,
		formBoxShadowOffsetY,
		formFocusShadowColor,
		formFocusShadowBlur,
		emailPlaceholder,
		emailBgColor,
		emailBgColorTablet,
		emailBgColorMobile,
		emailBorderColor,
		emailBorderColorTablet,
		emailBorderColorMobile,
		emailFocusBgColor,
		emailFocusBgColorTablet,
		emailFocusBgColorMobile,
		emailFocusBorderColor,
		emailFocusBorderColorTablet,
		emailFocusBorderColorMobile,
		emailTextColor,
		emailTextColorTablet,
		emailTextColorMobile,
		emailPlaceholderColor,
		emailPlaceholderColorTablet,
		emailPlaceholderColorMobile,
		emailFontSize,
		emailFontSizeTablet,
		emailFontSizeMobile,
		emailPaddingVertical,
		emailPaddingVerticalTablet,
		emailPaddingVerticalMobile,
		emailPaddingHorizontal,
		emailPaddingHorizontalTablet,
		emailPaddingHorizontalMobile,
		buttonText,
		buttonBgColor,
		buttonBgColorTablet,
		buttonBgColorMobile,
		buttonHoverBgColor,
		buttonHoverBgColorTablet,
		buttonHoverBgColorMobile,
		buttonTextColor,
		buttonTextColorTablet,
		buttonTextColorMobile,
		buttonFontSize,
		buttonFontSizeTablet,
		buttonFontSizeMobile,
		buttonFontWeight,
		buttonFontWeightTablet,
		buttonFontWeightMobile,
		buttonTextTransform,
		buttonTextTransformTablet,
		buttonTextTransformMobile,
		buttonLetterSpacing,
		buttonLetterSpacingTablet,
		buttonLetterSpacingMobile,
		buttonPaddingVertical,
		buttonPaddingVerticalTablet,
		buttonPaddingVerticalMobile,
		buttonPaddingHorizontal,
		buttonPaddingHorizontalTablet,
		buttonPaddingHorizontalMobile,
		buttonBoxShadow,
		buttonBoxShadowColor,
		buttonBoxShadowBlur,
		buttonBoxShadowSpread,
		buttonBoxShadowOffsetX,
		buttonBoxShadowOffsetY,
		buttonHoverShadowBlur,
		buttonHoverShadowOffsetY,
		buttonHoverTranslateY,
		animationOnScroll,
		animationType,
		animationDelay,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-good-news-section-editor',
			style: {
				backgroundColor: backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				position: 'relative',
				overflow: 'hidden',
				'--padding-top': `${ paddingTop }px`,
				'--padding-bottom': `${ paddingBottom }px`,
				'--padding-top-tablet': `${ paddingTopTablet }px`,
				'--padding-top-mobile': `${ paddingTopMobile }px`,
				'--padding-bottom-tablet': `${ paddingBottomTablet }px`,
				'--padding-bottom-mobile': `${ paddingBottomMobile }px`,
			},
		} ),
		[
			backgroundColor,
			paddingBottom,
			paddingBottomMobile,
			paddingBottomTablet,
			paddingTop,
			paddingTopMobile,
			paddingTopTablet,
		]
	);

	const gridStyle = {
		display: 'flex',
		alignItems: 'stretch',
		minHeight: `${ imageMinHeight }px`,
		flexDirection:
			layoutDirection === 'content-right' ? 'row-reverse' : 'row',
		flexWrap: 'nowrap',
		width: '100%',
		'--content-width': `${ contentWidth }%`,
		'--image-width': `${ imageWidth }%`,
		'--content-width-tablet': `${ contentWidthTablet }%`,
		'--image-width-tablet': `${ imageWidthTablet }%`,
		'--content-width-mobile': `${ contentWidthMobile }%`,
		'--image-width-mobile': `${ imageWidthMobile }%`,
		'--grid-flex-direction-desktop':
			layoutDirection === 'content-right' ? 'row-reverse' : 'row',
		'--grid-flex-direction-tablet': 'column-reverse',
		'--grid-flex-direction-mobile': 'column',
	};

	const contentWrapperStyle = {
		flexBasis: `${ contentWidth }%`,
		backgroundColor: contentBackgroundColor,
		display: 'flex',
		alignItems: 'center',
		justifyContent:
			contentAlignment === 'center'
				? 'center'
				: contentAlignment === 'right'
				? 'flex-end'
				: 'flex-start',
		position: 'relative',
		zIndex: 10,
		padding: `${ contentPadding }px 0`,
		width: '100%',
		minHeight: `${ imageMinHeight }px`,
		visibility: 'visible',
		opacity: 1,
		'--content-width': `${ contentWidth }%`,
		'--content-width-tablet': `${ contentWidthTablet }%`,
		'--content-width-mobile': `${ contentWidthMobile }%`,
		'--content-padding-tablet': `${ contentPaddingTablet }px`,
		'--content-padding-mobile': `${ contentPaddingMobile }px`,
		'--content-alignment': contentAlignment,
		'--content-alignment-tablet': contentAlignmentTablet,
		'--content-alignment-mobile': contentAlignmentMobile,
	};

	const contentStyle = {
		maxWidth: `${ contentMaxWidth }px`,
		width: '100%',
		marginRight:
			contentAlignment === 'left' ? `${ contentMarginRight }%` : '0',
		marginLeft:
			contentAlignment === 'right' ? `${ contentMarginRight }%` : '0',
		textAlign: contentAlignment,
		position: 'relative',
		zIndex: 11,
		padding: '0 20px',
		boxSizing: 'border-box',
		visibility: 'visible',
		opacity: 1,
		display: 'block',
		'--content-margin-right-tablet': `${ contentMarginRightTablet }%`,
		'--content-margin-right-mobile': `${ contentMarginRightMobile }%`,
	};

	// Calculate background size based on selection
	const getBackgroundSize = ( size, customSize ) => {
		if ( size === 'custom' && customSize ) {
			return customSize;
		}
		return size;
	};

	// Helper function to get responsive background image
	const getResponsiveBackgroundImage = ( device ) => {
		if ( ! useResponsiveImages ) {
			return backgroundImage ? `url(${ backgroundImage })` : 'none';
		}

		if ( device === 'tablet' ) {
			if ( backgroundImageTablet ) {
				return `url(${ backgroundImageTablet })`;
			}
			return backgroundImage ? `url(${ backgroundImage })` : 'none';
		}

		if ( device === 'mobile' ) {
			if ( backgroundImageMobile ) {
				return `url(${ backgroundImageMobile })`;
			}
			if ( backgroundImageTablet ) {
				return `url(${ backgroundImageTablet })`;
			}
			return backgroundImage ? `url(${ backgroundImage })` : 'none';
		}

		return backgroundImage ? `url(${ backgroundImage })` : 'none';
	};

	// Get the current background image based on viewport (for editor preview)
	const getCurrentBackgroundImage = () => {
		// In editor, always use desktop image for preview
		// Responsive switching happens via CSS in frontend
		return backgroundImage ? `url(${ backgroundImage })` : 'none';
	};

	const imageBgStyle = {
		flexBasis: `${ imageWidth }%`,
		backgroundImage: getCurrentBackgroundImage(),
		backgroundSize: getBackgroundSize(
			backgroundImageSize,
			backgroundImageCustomSize
		),
		backgroundPosition: backgroundImagePosition,
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'scroll',
		minHeight: `${ imageMinHeight }px`,
		height: `${ imageMinHeight }px`,
		position: 'relative',
		width: '100%',
		overflow: imageOverflow || 'hidden',
		maxWidth: imageMaxWidth > 0 ? `${ imageMaxWidth }px` : 'none',
		maxHeight: imageMaxHeight > 0 ? `${ imageMaxHeight }px` : 'none',
		aspectRatio: imageAspectRatio || 'auto',
		'--image-width': `${ imageWidth }%`,
		'--image-width-tablet': `${ imageWidthTablet }%`,
		'--image-width-mobile': `${ imageWidthMobile }%`,
		'--image-min-height-tablet': `${ imageMinHeightTablet }px`,
		'--image-min-height-mobile': `${ imageMinHeightMobile }px`,
		'--image-max-width':
			imageMaxWidth > 0 ? `${ imageMaxWidth }px` : 'none',
		'--image-max-width-tablet':
			imageMaxWidthTablet > 0 ? `${ imageMaxWidthTablet }px` : 'none',
		'--image-max-width-mobile':
			imageMaxWidthMobile > 0 ? `${ imageMaxWidthMobile }px` : 'none',
		'--image-max-height':
			imageMaxHeight > 0 ? `${ imageMaxHeight }px` : 'none',
		'--image-max-height-tablet':
			imageMaxHeightTablet > 0 ? `${ imageMaxHeightTablet }px` : 'none',
		'--image-max-height-mobile':
			imageMaxHeightMobile > 0 ? `${ imageMaxHeightMobile }px` : 'none',
		'--image-aspect-ratio': imageAspectRatio || 'auto',
		'--image-overflow': imageOverflow || 'hidden',
		'--background-image': backgroundImage
			? `url(${ backgroundImage })`
			: 'none',
		'--background-image-tablet': getResponsiveBackgroundImage( 'tablet' ),
		'--background-image-mobile': getResponsiveBackgroundImage( 'mobile' ),
		'--background-size': getBackgroundSize(
			backgroundImageSize,
			backgroundImageCustomSize
		),
		'--background-size-tablet':
			getBackgroundSize(
				backgroundImageSizeTablet,
				backgroundImageCustomSizeTablet
			) ||
			getBackgroundSize( backgroundImageSize, backgroundImageCustomSize ),
		'--background-size-mobile':
			getBackgroundSize(
				backgroundImageSizeMobile,
				backgroundImageCustomSizeMobile
			) ||
			getBackgroundSize(
				backgroundImageSizeTablet,
				backgroundImageCustomSizeTablet
			) ||
			getBackgroundSize( backgroundImageSize, backgroundImageCustomSize ),
		'--background-position': backgroundImagePosition,
		'--background-position-tablet':
			backgroundImagePositionTablet || backgroundImagePosition,
		'--background-position-mobile':
			backgroundImagePositionMobile ||
			backgroundImagePositionTablet ||
			backgroundImagePosition,
		// Margin CSS custom properties
		'--image-margin-top': `${ imageMarginTop }px`,
		'--image-margin-top-tablet': `${ imageMarginTopTablet }px`,
		'--image-margin-top-mobile': `${ imageMarginTopMobile }px`,
		'--image-margin-right': `${ imageMarginRight }px`,
		'--image-margin-right-tablet': `${ imageMarginRightTablet }px`,
		'--image-margin-right-mobile': `${ imageMarginRightMobile }px`,
		'--image-margin-bottom': `${ imageMarginBottom }px`,
		'--image-margin-bottom-tablet': `${ imageMarginBottomTablet }px`,
		'--image-margin-bottom-mobile': `${ imageMarginBottomMobile }px`,
		'--image-margin-left': `${ imageMarginLeft }px`,
		'--image-margin-left-tablet': `${ imageMarginLeftTablet }px`,
		'--image-margin-left-mobile': `${ imageMarginLeftMobile }px`,
		// Padding CSS custom properties
		'--image-padding-top': `${ imagePaddingTop }px`,
		'--image-padding-top-tablet': `${ imagePaddingTopTablet }px`,
		'--image-padding-top-mobile': `${ imagePaddingTopMobile }px`,
		'--image-padding-right': `${ imagePaddingRight }px`,
		'--image-padding-right-tablet': `${ imagePaddingRightTablet }px`,
		'--image-padding-right-mobile': `${ imagePaddingRightMobile }px`,
		'--image-padding-bottom': `${ imagePaddingBottom }px`,
		'--image-padding-bottom-tablet': `${ imagePaddingBottomTablet }px`,
		'--image-padding-bottom-mobile': `${ imagePaddingBottomMobile }px`,
		'--image-padding-left': `${ imagePaddingLeft }px`,
		'--image-padding-left-tablet': `${ imagePaddingLeftTablet }px`,
		'--image-padding-left-mobile': `${ imagePaddingLeftMobile }px`,
		// Apply margin and padding directly
		marginTop: `${ imageMarginTop }px`,
		marginRight: `${ imageMarginRight }px`,
		marginBottom: `${ imageMarginBottom }px`,
		marginLeft: `${ imageMarginLeft }px`,
		paddingTop: `${ imagePaddingTop }px`,
		paddingRight: `${ imagePaddingRight }px`,
		paddingBottom: `${ imagePaddingBottom }px`,
		paddingLeft: `${ imagePaddingLeft }px`,
	};

	// Calculate form-group margin based on alignment
	const getFormGroupMargin = ( alignment ) => {
		const align = alignment || contentAlignment || 'left';
		if ( align === 'center' ) {
			return { marginLeft: 'auto', marginRight: 'auto' };
		} else if ( align === 'right' ) {
			return { marginLeft: 'auto', marginRight: '0' };
		} else {
			return { marginLeft: '0', marginRight: 'auto' };
		}
	};

	const formGroupMargin = getFormGroupMargin( formAlignment );
	const formGroupMarginTablet = getFormGroupMargin(
		formAlignmentTablet ||
			formAlignment ||
			contentAlignmentTablet ||
			contentAlignment
	);
	const formGroupMarginMobile = getFormGroupMargin(
		formAlignmentMobile ||
			formAlignment ||
			contentAlignmentMobile ||
			contentAlignment
	);

	const formGroupStyle = {
		display: 'flex',
		borderRadius: `${ formBorderRadius }px`,
		overflow: 'hidden',
		maxWidth: `${ formMaxWidth }px`,
		width: '100%',
		boxShadow: formBoxShadow
			? `${ formBoxShadowOffsetX }px ${ formBoxShadowOffsetY }px ${ formBoxShadowBlur }px ${ formBoxShadowSpread }px ${ formBoxShadowColor }`
			: 'none',
		transition: 'box-shadow 0.3s ease',
		backgroundColor: '#ffffff',
		...formGroupMargin,
		'--form-focus-shadow': formBoxShadow
			? `0 0 ${ formFocusShadowBlur }px ${ formFocusShadowColor }`
			: 'none',
		'--form-max-width-tablet': `${ formMaxWidthTablet }px`,
		'--form-max-width-mobile': `${ formMaxWidthMobile }px`,
		'--form-border-radius-tablet': `${ formBorderRadiusTablet }px`,
		'--form-border-radius-mobile': `${ formBorderRadiusMobile }px`,
		'--form-group-margin-left': formGroupMarginTablet.marginLeft,
		'--form-group-margin-right': formGroupMarginTablet.marginRight,
		'--form-group-margin-left-mobile': formGroupMarginMobile.marginLeft,
		'--form-group-margin-right-mobile': formGroupMarginMobile.marginRight,
	};

	const emailInputStyle = {
		flexGrow: 1,
		border: `2px solid ${ emailBorderColor }`,
		padding: `${ emailPaddingVertical }px ${ emailPaddingHorizontal }px`,
		fontSize: `${ emailFontSize }rem`,
		backgroundColor: emailBgColor,
		color: emailTextColor,
		borderRadius: `${ formBorderRadius }px 0 0 ${ formBorderRadius }px`,
		fontFamily: 'inherit',
		minWidth: 0,
		boxSizing: 'border-box',
		width: '100%',
		'--email-font-size-tablet': `${ emailFontSizeTablet }rem`,
		'--email-font-size-mobile': `${ emailFontSizeMobile }rem`,
		'--email-padding-vertical-tablet': `${ emailPaddingVerticalTablet }px`,
		'--email-padding-vertical-mobile': `${ emailPaddingVerticalMobile }px`,
		'--email-padding-horizontal-tablet': `${ emailPaddingHorizontalTablet }px`,
		'--email-padding-horizontal-mobile': `${ emailPaddingHorizontalMobile }px`,
		'--email-bg-color': emailBgColor,
		'--email-bg-color-tablet': emailBgColorTablet || emailBgColor,
		'--email-bg-color-mobile': emailBgColorMobile || emailBgColor,
		'--email-text-color': emailTextColor,
		'--email-text-color-tablet': emailTextColorTablet || emailTextColor,
		'--email-text-color-mobile': emailTextColorMobile || emailTextColor,
		'--email-placeholder-color': emailPlaceholderColor,
		'--email-placeholder-color-tablet':
			emailPlaceholderColorTablet || emailPlaceholderColor,
		'--email-placeholder-color-mobile':
			emailPlaceholderColorMobile || emailPlaceholderColor,
		'--email-border-color': emailBorderColor,
		'--email-border-color-tablet':
			emailBorderColorTablet || emailBorderColor,
		'--email-border-color-mobile':
			emailBorderColorMobile || emailBorderColor,
		'--email-focus-bg': emailFocusBgColor,
		'--email-focus-bg-tablet': emailFocusBgColorTablet || emailFocusBgColor,
		'--email-focus-bg-mobile': emailFocusBgColorMobile || emailFocusBgColor,
		'--email-focus-border': emailFocusBorderColor,
		'--email-focus-border-tablet':
			emailFocusBorderColorTablet || emailFocusBorderColor,
		'--email-focus-border-mobile':
			emailFocusBorderColorMobile || emailFocusBorderColor,
	};

	const buttonStyle = {
		border: 'none',
		backgroundColor: buttonBgColor,
		color: buttonTextColor,
		padding: `${ buttonPaddingVertical }px ${ buttonPaddingHorizontal }px`,
		fontWeight: buttonFontWeight,
		fontSize: `${ buttonFontSize }rem`,
		cursor: 'pointer',
		whiteSpace: 'nowrap',
		borderRadius: `0 ${ formBorderRadius }px ${ formBorderRadius }px 0`,
		textTransform: buttonTextTransform,
		letterSpacing: `${ buttonLetterSpacing }px`,
		flexShrink: 0,
		boxShadow: buttonBoxShadow
			? `${ buttonBoxShadowOffsetX }px ${ buttonBoxShadowOffsetY }px ${ buttonBoxShadowBlur }px ${ buttonBoxShadowSpread }px ${ buttonBoxShadowColor }`
			: 'none',
		transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
		'--button-font-size-tablet': `${ buttonFontSizeTablet }rem`,
		'--button-font-size-mobile': `${ buttonFontSizeMobile }rem`,
		'--button-padding-vertical-tablet': `${ buttonPaddingVerticalTablet }px`,
		'--button-padding-vertical-mobile': `${ buttonPaddingVerticalMobile }px`,
		'--button-padding-horizontal-tablet': `${ buttonPaddingHorizontalTablet }px`,
		'--button-padding-horizontal-mobile': `${ buttonPaddingHorizontalMobile }px`,
		'--button-bg-color': buttonBgColor,
		'--button-bg-color-tablet': buttonBgColorTablet || buttonBgColor,
		'--button-bg-color-mobile': buttonBgColorMobile || buttonBgColor,
		'--button-text-color': buttonTextColor,
		'--button-text-color-tablet': buttonTextColorTablet || buttonTextColor,
		'--button-text-color-mobile': buttonTextColorMobile || buttonTextColor,
		'--button-font-weight-tablet': buttonFontWeightTablet,
		'--button-font-weight-mobile': buttonFontWeightMobile,
		'--button-text-transform-tablet':
			buttonTextTransformTablet || buttonTextTransform,
		'--button-text-transform-mobile':
			buttonTextTransformMobile || buttonTextTransform,
		'--button-letter-spacing-tablet': `${ buttonLetterSpacingTablet }px`,
		'--button-letter-spacing-mobile': `${ buttonLetterSpacingMobile }px`,
		'--button-hover-bg': buttonHoverBgColor,
		'--button-hover-bg-tablet':
			buttonHoverBgColorTablet || buttonHoverBgColor,
		'--button-hover-bg-mobile':
			buttonHoverBgColorMobile || buttonHoverBgColor,
		'--button-hover-shadow-blur': `${ buttonHoverShadowBlur }px`,
		'--button-hover-shadow-offset-y': `${ buttonHoverShadowOffsetY }px`,
		'--button-hover-translate-y': `${ buttonHoverTranslateY }px`,
	};

	// Parse heading to find highlight text
	// Professional implementation with case-insensitive matching and multiple occurrences support
	const parseHeading = ( text ) => {
		if ( ! text ) return null;

		// Trim highlight text to handle whitespace issues
		const trimmedHighlight = highlightText ? highlightText.trim() : '';

		if ( ! trimmedHighlight || ! showHighlight ) {
			// If no highlight, just return text with line breaks
			const lines = text.split( '\n' );
			return lines.map( ( line, index ) => (
				<span key={ index }>
					{ line }
					{ index < lines.length - 1 && (
						<br key={ `br-${ index }` } />
					) }
				</span>
			) );
		}

		// Escape special regex characters
		const escapedHighlight = trimmedHighlight.replace(
			/[.*+?^${}()|[\]\\]/g,
			'\\$&'
		);

		// Create regex for case-insensitive matching
		const regex = new RegExp( `(${ escapedHighlight })`, 'gi' );

		const lines = text.split( '\n' );
		return lines.map( ( line, index ) => {
			if ( line && regex.test( line ) ) {
				// Reset regex lastIndex
				regex.lastIndex = 0;

				// Find all matches with original case
				const matches = [];
				let match;
				while ( ( match = regex.exec( line ) ) !== null ) {
					matches.push( {
						text: match[ 0 ],
						index: match.index,
					} );
				}

				// Build JSX with highlights
				const elements = [];
				let lastIndex = 0;

				matches.forEach( ( match, matchIndex ) => {
					// Add text before match
					if ( match.index > lastIndex ) {
						elements.push(
							line.substring( lastIndex, match.index )
						);
					}

					// Add highlighted text with responsive CSS variables
					elements.push(
						<span
							key={ `highlight-${ index }-${ matchIndex }` }
							className="highlight-red"
							style={ {
								fontWeight: highlightFontWeight,
								color: highlightColor,
								fontSize: `${ highlightFontSize }em`,
								display: 'block',
								lineHeight: 1,
								'--highlight-font-weight-tablet':
									highlightFontWeightTablet,
								'--highlight-font-weight-mobile':
									highlightFontWeightMobile,
								'--highlight-font-size-tablet': `${ highlightFontSizeTablet }em`,
								'--highlight-font-size-mobile': `${ highlightFontSizeMobile }em`,
								'--highlight-color-tablet':
									highlightColorTablet || highlightColor,
								'--highlight-color-mobile':
									highlightColorMobile || highlightColor,
							} }
						>
							{ match.text }
						</span>
					);

					lastIndex = match.index + match.text.length;
				} );

				// Add remaining text after last match
				if ( lastIndex < line.length ) {
					elements.push( line.substring( lastIndex ) );
				}

				return (
					<span key={ index }>
						{ elements }
						{ index < lines.length - 1 && (
							<br key={ `br-${ index }` } />
						) }
					</span>
				);
			}

			return (
				<span key={ index }>
					{ line }
					{ index < lines.length - 1 && (
						<br key={ `br-${ index }` } />
					) }
				</span>
			);
		} );
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section Background', 'mk-builder' ) }
						initialOpen={ true }
					>
						<PanelColorSettings
							title={ __( 'Background Color', 'mk-builder' ) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											backgroundColor: val,
										} ),
									label: __(
										'Background Color',
										'mk-builder'
									),
								},
							] }
						/>

						<Divider />

						<BaseControl
							label={ __( 'Section Padding', 'mk-builder' ) }
						>
							<RangeControl
								label={ __(
									'Padding Top - Desktop (px)',
									'mk-builder'
								) }
								value={ paddingTop }
								onChange={ ( val ) =>
									setAttributes( { paddingTop: val } )
								}
								min={ 0 }
								max={ 200 }
								step={ 5 }
							/>

							<RangeControl
								label={ __(
									'Padding Top - Tablet (px)',
									'mk-builder'
								) }
								value={ paddingTopTablet }
								onChange={ ( val ) =>
									setAttributes( { paddingTopTablet: val } )
								}
								min={ 0 }
								max={ 150 }
								step={ 5 }
							/>

							<RangeControl
								label={ __(
									'Padding Top - Mobile (px)',
									'mk-builder'
								) }
								value={ paddingTopMobile }
								onChange={ ( val ) =>
									setAttributes( { paddingTopMobile: val } )
								}
								min={ 0 }
								max={ 100 }
								step={ 5 }
							/>

							<Divider />
							<RangeControl
								label={ __(
									'Padding Bottom - Desktop (px)',
									'mk-builder'
								) }
								value={ paddingBottom }
								onChange={ ( val ) =>
									setAttributes( { paddingBottom: val } )
								}
								min={ 0 }
								max={ 200 }
								step={ 5 }
							/>

							<RangeControl
								label={ __(
									'Padding Bottom - Tablet (px)',
									'mk-builder'
								) }
								value={ paddingBottomTablet }
								onChange={ ( val ) =>
									setAttributes( {
										paddingBottomTablet: val,
									} )
								}
								min={ 0 }
								max={ 150 }
								step={ 5 }
							/>

							<RangeControl
								label={ __(
									'Padding Bottom - Mobile (px)',
									'mk-builder'
								) }
								value={ paddingBottomMobile }
								onChange={ ( val ) =>
									setAttributes( {
										paddingBottomMobile: val,
									} )
								}
								min={ 0 }
								max={ 100 }
								step={ 5 }
							/>
						</BaseControl>
					</PanelBody>

					<PanelBody
						title={ __( 'Layout Settings', 'mk-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Layout Direction', 'mk-builder' ) }
							value={ layoutDirection }
							options={ [
								{
									label: __(
										'Content Left, Image Right',
										'mk-builder'
									),
									value: 'content-left',
								},
								{
									label: __(
										'Image Left, Content Right',
										'mk-builder'
									),
									value: 'content-right',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { layoutDirection: val } )
							}
						/>

						<Divider />

						<BaseControl
							label={ __(
								'Desktop Widths (%)',
								'mk-builder'
							) }
						>
							<RangeControl
								label={ __(
									'Content Width (%)',
									'mk-builder'
								) }
								value={ contentWidth }
								onChange={ ( val ) => {
									setAttributes( { contentWidth: val } );
									setAttributes( { imageWidth: 100 - val } );
								} }
								min={ 30 }
								max={ 70 }
								step={ 5 }
							/>

							<RangeControl
								label={ __(
									'Image Width (%)',
									'mk-builder'
								) }
								value={ imageWidth }
								onChange={ ( val ) => {
									setAttributes( { imageWidth: val } );
									setAttributes( {
										contentWidth: 100 - val,
									} );
								} }
								min={ 30 }
								max={ 70 }
								step={ 5 }
							/>
						</BaseControl>

						<Divider />

						<BaseControl
							label={ __( 'Tablet Widths (%)', 'mk-builder' ) }
						>
							<RangeControl
								label={ __(
									'Content Width (%)',
									'mk-builder'
								) }
								value={ contentWidthTablet }
								onChange={ ( val ) =>
									setAttributes( { contentWidthTablet: val } )
								}
								min={ 50 }
								max={ 100 }
								step={ 5 }
							/>

							<RangeControl
								label={ __(
									'Image Width (%)',
									'mk-builder'
								) }
								value={ imageWidthTablet }
								onChange={ ( val ) =>
									setAttributes( { imageWidthTablet: val } )
								}
								min={ 50 }
								max={ 100 }
								step={ 5 }
							/>
						</BaseControl>

						<Divider />

						<BaseControl
							label={ __( 'Mobile Widths (%)', 'mk-builder' ) }
						>
							<RangeControl
								label={ __(
									'Content Width (%)',
									'mk-builder'
								) }
								value={ contentWidthMobile }
								onChange={ ( val ) =>
									setAttributes( { contentWidthMobile: val } )
								}
								min={ 50 }
								max={ 100 }
								step={ 5 }
							/>

							<RangeControl
								label={ __(
									'Image Width (%)',
									'mk-builder'
								) }
								value={ imageWidthMobile }
								onChange={ ( val ) =>
									setAttributes( { imageWidthMobile: val } )
								}
								min={ 50 }
								max={ 100 }
								step={ 5 }
							/>
						</BaseControl>
					</PanelBody>

					<PanelBody
						title={ __( 'Background Image', 'mk-builder' ) }
						initialOpen={ false }
					>
						<BaseControl
							label={ __( 'Desktop Image', 'mk-builder' ) }
						>
							{ ! backgroundImage ? (
								<MediaPlaceholder
									onSelect={ ( media ) =>
										setAttributes( {
											backgroundImage: media.url,
											backgroundImageId: media.id,
										} )
									}
									allowedTypes={ [ 'image' ] }
									multiple={ false }
									labels={ {
										title: __(
											'Desktop Background Image',
											'mk-builder'
										),
									} }
								/>
							) : (
								<div>
									<img
										src={ backgroundImage }
										alt=""
										style={ {
											width: '100%',
											height: 'auto',
											marginBottom: '10px',
											borderRadius: '4px',
										} }
									/>

									<Button
										isSecondary
										isSmall
										onClick={ () =>
											setAttributes( {
												backgroundImage: '',
												backgroundImageId: null,
											} )
										}
									>
										{ __(
											'Remove Image',
											'mk-builder'
										) }
									</Button>
								</div>
							) }
						</BaseControl>

						<Divider />

						<BaseControl>
							<ToggleControl
								label={ __(
									'Use Different Images for Responsive Views',
									'mk-builder'
								) }
								checked={ useResponsiveImages }
								onChange={ ( val ) =>
									setAttributes( {
										useResponsiveImages: val,
									} )
								}
								help={ __(
									'Enable to set separate images for tablet and mobile devices. When disabled, the desktop image will be used for all screen sizes.',
									'mk-builder'
								) }
							/>
						</BaseControl>

						{ useResponsiveImages && (
							<>
								<Divider />

								<BaseControl
									label={ __(
										'Tablet Image (992px and below)',
										'mk-builder'
									) }
									help={ __(
										'Image displayed on tablet devices (max-width: 992px). If not set, the desktop image will be used as fallback.',
										'mk-builder'
									) }
								>
									{ ! backgroundImageTablet ? (
										<MediaPlaceholder
											onSelect={ ( media ) =>
												setAttributes( {
													backgroundImageTablet:
														media.url,
													backgroundImageTabletId:
														media.id,
												} )
											}
											allowedTypes={ [ 'image' ] }
											multiple={ false }
											labels={ {
												title: __(
													'Tablet Background Image',
													'mk-builder'
												),
												instructions: __(
													'Upload an image optimized for tablet devices (992px and below).',
													'mk-builder'
												),
											} }
										/>
									) : (
										<div style={ { marginTop: '8px' } }>
											<img
												src={ backgroundImageTablet }
												alt={ __(
													'Tablet background image preview',
													'mk-builder'
												) }
												style={ {
													width: '100%',
													height: 'auto',
													marginBottom: '12px',
													borderRadius: '4px',
													border: '1px solid #ddd',
													display: 'block',
												} }
											/>

											<div
												style={ {
													display: 'flex',
													gap: '8px',
													flexWrap: 'wrap',
												} }
											>
												<MediaPlaceholder
													onSelect={ ( media ) =>
														setAttributes( {
															backgroundImageTablet:
																media.url,
															backgroundImageTabletId:
																media.id,
														} )
													}
													allowedTypes={ [ 'image' ] }
													multiple={ false }
													labels={ {
														title: __(
															'Replace Tablet Image',
															'mk-builder'
														),
													} }
												>
													<Button isSecondary isSmall>
														{ __(
															'Replace Image',
															'mk-builder'
														) }
													</Button>
												</MediaPlaceholder>
												<Button
													isDestructive
													isSmall
													onClick={ () =>
														setAttributes( {
															backgroundImageTablet:
																'',
															backgroundImageTabletId:
																null,
														} )
													}
												>
													{ __(
														'Remove',
														'mk-builder'
													) }
												</Button>
											</div>
										</div>
									) }
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Mobile Image (768px and below)',
										'mk-builder'
									) }
									help={ __(
										'Image displayed on mobile devices (max-width: 768px). Falls back to tablet image (if available) or desktop image if not set.',
										'mk-builder'
									) }
								>
									{ ! backgroundImageMobile ? (
										<MediaPlaceholder
											onSelect={ ( media ) =>
												setAttributes( {
													backgroundImageMobile:
														media.url,
													backgroundImageMobileId:
														media.id,
												} )
											}
											allowedTypes={ [ 'image' ] }
											multiple={ false }
											labels={ {
												title: __(
													'Mobile Background Image',
													'mk-builder'
												),
												instructions: __(
													'Upload an image optimized for mobile devices (768px and below).',
													'mk-builder'
												),
											} }
										/>
									) : (
										<div style={ { marginTop: '8px' } }>
											<img
												src={ backgroundImageMobile }
												alt={ __(
													'Mobile background image preview',
													'mk-builder'
												) }
												style={ {
													width: '100%',
													height: 'auto',
													marginBottom: '12px',
													borderRadius: '4px',
													border: '1px solid #ddd',
													display: 'block',
												} }
											/>

											<div
												style={ {
													display: 'flex',
													gap: '8px',
													flexWrap: 'wrap',
												} }
											>
												<MediaPlaceholder
													onSelect={ ( media ) =>
														setAttributes( {
															backgroundImageMobile:
																media.url,
															backgroundImageMobileId:
																media.id,
														} )
													}
													allowedTypes={ [ 'image' ] }
													multiple={ false }
													labels={ {
														title: __(
															'Replace Mobile Image',
															'mk-builder'
														),
													} }
												>
													<Button isSecondary isSmall>
														{ __(
															'Replace Image',
															'mk-builder'
														) }
													</Button>
												</MediaPlaceholder>
												<Button
													isDestructive
													isSmall
													onClick={ () =>
														setAttributes( {
															backgroundImageMobile:
																'',
															backgroundImageMobileId:
																null,
														} )
													}
												>
													{ __(
														'Remove',
														'mk-builder'
													) }
												</Button>
											</div>
										</div>
									) }
								</BaseControl>
							</>
						) }

						{ backgroundImage && (
							<>
								<Divider />

								<SelectControl
									label={ __(
										'Background Position',
										'mk-builder'
									) }
									value={ backgroundImagePosition }
									options={ [
										{
											label: __(
												'Center',
												'mk-builder'
											),
											value: 'center',
										},
										{
											label: __(
												'Center Right',
												'mk-builder'
											),
											value: 'center right',
										},
										{
											label: __(
												'Center Left',
												'mk-builder'
											),
											value: 'center left',
										},
										{
											label: __( 'Top', 'mk-builder' ),
											value: 'top',
										},
										{
											label: __(
												'Bottom',
												'mk-builder'
											),
											value: 'bottom',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( {
											backgroundImagePosition: val,
										} )
									}
								/>

								<BaseControl
									label={ __(
										'Background Size',
										'mk-builder'
									) }
								>
									<SelectControl
										label={ __(
											'Desktop',
											'mk-builder'
										) }
										value={ backgroundImageSize }
										options={ [
											{
												label: __(
													'Cover',
													'mk-builder'
												),
												value: 'cover',
											},
											{
												label: __(
													'Contain',
													'mk-builder'
												),
												value: 'contain',
											},
											{
												label: __(
													'Auto',
													'mk-builder'
												),
												value: 'auto',
											},
											{
												label: __(
													'100% (Full Size)',
													'mk-builder'
												),
												value: '100%',
											},
											{
												label: __(
													'Custom',
													'mk-builder'
												),
												value: 'custom',
											},
										] }
										onChange={ ( val ) =>
											setAttributes( {
												backgroundImageSize: val,
											} )
										}
									/>

									{ backgroundImageSize === 'custom' && (
										<TextControl
											label={ __(
												'Custom Size (e.g., 80% 60%, 1200px auto)',
												'mk-builder'
											) }
											value={ backgroundImageCustomSize }
											onChange={ ( val ) =>
												setAttributes( {
													backgroundImageCustomSize:
														val,
												} )
											}
											placeholder={ __(
												'e.g., 80% 60%',
												'mk-builder'
											) }
											help={ __(
												'Width and height, separated by space',
												'mk-builder'
											) }
										/>
									) }
									<SelectControl
										label={ __(
											'Tablet',
											'mk-builder'
										) }
										value={ backgroundImageSizeTablet }
										options={ [
											{
												label: __(
													'Cover',
													'mk-builder'
												),
												value: 'cover',
											},
											{
												label: __(
													'Contain',
													'mk-builder'
												),
												value: 'contain',
											},
											{
												label: __(
													'Auto',
													'mk-builder'
												),
												value: 'auto',
											},
											{
												label: __(
													'100% (Full Size)',
													'mk-builder'
												),
												value: '100%',
											},
											{
												label: __(
													'Custom',
													'mk-builder'
												),
												value: 'custom',
											},
										] }
										onChange={ ( val ) =>
											setAttributes( {
												backgroundImageSizeTablet: val,
											} )
										}
									/>

									{ backgroundImageSizeTablet ===
										'custom' && (
										<TextControl
											label={ __(
												'Custom Size - Tablet',
												'mk-builder'
											) }
											value={
												backgroundImageCustomSizeTablet
											}
											onChange={ ( val ) =>
												setAttributes( {
													backgroundImageCustomSizeTablet:
														val,
												} )
											}
											placeholder={ __(
												'e.g., 100% auto',
												'mk-builder'
											) }
										/>
									) }
									<SelectControl
										label={ __(
											'Mobile',
											'mk-builder'
										) }
										value={ backgroundImageSizeMobile }
										options={ [
											{
												label: __(
													'Cover',
													'mk-builder'
												),
												value: 'cover',
											},
											{
												label: __(
													'Contain',
													'mk-builder'
												),
												value: 'contain',
											},
											{
												label: __(
													'Auto',
													'mk-builder'
												),
												value: 'auto',
											},
											{
												label: __(
													'100% (Full Size)',
													'mk-builder'
												),
												value: '100%',
											},
											{
												label: __(
													'Custom',
													'mk-builder'
												),
												value: 'custom',
											},
										] }
										onChange={ ( val ) =>
											setAttributes( {
												backgroundImageSizeMobile: val,
											} )
										}
									/>

									{ backgroundImageSizeMobile ===
										'custom' && (
										<TextControl
											label={ __(
												'Custom Size - Mobile',
												'mk-builder'
											) }
											value={
												backgroundImageCustomSizeMobile
											}
											onChange={ ( val ) =>
												setAttributes( {
													backgroundImageCustomSizeMobile:
														val,
												} )
											}
											placeholder={ __(
												'e.g., 100% auto',
												'mk-builder'
											) }
										/>
									) }
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Background Position',
										'mk-builder'
									) }
								>
									<SelectControl
										label={ __(
											'Desktop',
											'mk-builder'
										) }
										value={ backgroundImagePosition }
										options={ [
											{
												label: __(
													'Center',
													'mk-builder'
												),
												value: 'center',
											},
											{
												label: __(
													'Center Top',
													'mk-builder'
												),
												value: 'center top',
											},
											{
												label: __(
													'Center Bottom',
													'mk-builder'
												),
												value: 'center bottom',
											},
											{
												label: __(
													'Center Left',
													'mk-builder'
												),
												value: 'center left',
											},
											{
												label: __(
													'Center Right',
													'mk-builder'
												),
												value: 'center right',
											},
											{
												label: __(
													'Top',
													'mk-builder'
												),
												value: 'top',
											},
											{
												label: __(
													'Bottom',
													'mk-builder'
												),
												value: 'bottom',
											},
											{
												label: __(
													'Left',
													'mk-builder'
												),
												value: 'left',
											},
											{
												label: __(
													'Right',
													'mk-builder'
												),
												value: 'right',
											},
											{
												label: __(
													'Top Left',
													'mk-builder'
												),
												value: 'top left',
											},
											{
												label: __(
													'Top Right',
													'mk-builder'
												),
												value: 'top right',
											},
											{
												label: __(
													'Bottom Left',
													'mk-builder'
												),
												value: 'bottom left',
											},
											{
												label: __(
													'Bottom Right',
													'mk-builder'
												),
												value: 'bottom right',
											},
										] }
										onChange={ ( val ) =>
											setAttributes( {
												backgroundImagePosition: val,
											} )
										}
									/>

									<SelectControl
										label={ __(
											'Tablet',
											'mk-builder'
										) }
										value={ backgroundImagePositionTablet }
										options={ [
											{
												label: __(
													'Center',
													'mk-builder'
												),
												value: 'center',
											},
											{
												label: __(
													'Center Top',
													'mk-builder'
												),
												value: 'center top',
											},
											{
												label: __(
													'Center Bottom',
													'mk-builder'
												),
												value: 'center bottom',
											},
											{
												label: __(
													'Center Left',
													'mk-builder'
												),
												value: 'center left',
											},
											{
												label: __(
													'Center Right',
													'mk-builder'
												),
												value: 'center right',
											},
											{
												label: __(
													'Top',
													'mk-builder'
												),
												value: 'top',
											},
											{
												label: __(
													'Bottom',
													'mk-builder'
												),
												value: 'bottom',
											},
											{
												label: __(
													'Left',
													'mk-builder'
												),
												value: 'left',
											},
											{
												label: __(
													'Right',
													'mk-builder'
												),
												value: 'right',
											},
										] }
										onChange={ ( val ) =>
											setAttributes( {
												backgroundImagePositionTablet:
													val,
											} )
										}
									/>

									<SelectControl
										label={ __(
											'Mobile',
											'mk-builder'
										) }
										value={ backgroundImagePositionMobile }
										options={ [
											{
												label: __(
													'Center',
													'mk-builder'
												),
												value: 'center',
											},
											{
												label: __(
													'Center Top',
													'mk-builder'
												),
												value: 'center top',
											},
											{
												label: __(
													'Center Bottom',
													'mk-builder'
												),
												value: 'center bottom',
											},
											{
												label: __(
													'Center Left',
													'mk-builder'
												),
												value: 'center left',
											},
											{
												label: __(
													'Center Right',
													'mk-builder'
												),
												value: 'center right',
											},
											{
												label: __(
													'Top',
													'mk-builder'
												),
												value: 'top',
											},
											{
												label: __(
													'Bottom',
													'mk-builder'
												),
												value: 'bottom',
											},
											{
												label: __(
													'Left',
													'mk-builder'
												),
												value: 'left',
											},
											{
												label: __(
													'Right',
													'mk-builder'
												),
												value: 'right',
											},
										] }
										onChange={ ( val ) =>
											setAttributes( {
												backgroundImagePositionMobile:
													val,
											} )
										}
									/>
								</BaseControl>

								<Divider />

								<ToggleControl
									label={ __(
										'Show Overlay',
										'mk-builder'
									) }
									checked={ showBackgroundOverlay }
									onChange={ ( val ) =>
										setAttributes( {
											showBackgroundOverlay: val,
										} )
									}
								/>

								{ showBackgroundOverlay && (
									<>
										<PanelColorSettings
											title={ __(
												'Overlay Color',
												'mk-builder'
											) }
											colorSettings={ [
												{
													value: backgroundOverlayColor,
													onChange: ( val ) =>
														setAttributes( {
															backgroundOverlayColor:
																val,
														} ),
													label: __(
														'Overlay Color',
														'mk-builder'
													),
												},
											] }
										/>

										<RangeControl
											label={ __(
												'Overlay Opacity',
												'mk-builder'
											) }
											value={ backgroundOverlayOpacity }
											onChange={ ( val ) =>
												setAttributes( {
													backgroundOverlayOpacity:
														val,
												} )
											}
											min={ 0 }
											max={ 1 }
											step={ 0.1 }
										/>
									</>
								) }

								<Divider />

								<BaseControl
									label={ __(
										'Image Dimensions',
										'mk-builder'
									) }
								>
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __(
											'Minimum Height',
											'mk-builder'
										) }
									</h4>
									<RangeControl
										label={ __(
											'Desktop Min Height (px)',
											'mk-builder'
										) }
										value={ imageMinHeight }
										onChange={ ( val ) =>
											setAttributes( {
												imageMinHeight: val,
											} )
										}
										min={ 200 }
										max={ 800 }
										step={ 10 }
									/>

									<RangeControl
										label={ __(
											'Tablet Min Height (px)',
											'mk-builder'
										) }
										value={ imageMinHeightTablet }
										onChange={ ( val ) =>
											setAttributes( {
												imageMinHeightTablet: val,
											} )
										}
										min={ 200 }
										max={ 600 }
										step={ 10 }
									/>

									<RangeControl
										label={ __(
											'Mobile Min Height (px)',
											'mk-builder'
										) }
										value={ imageMinHeightMobile }
										onChange={ ( val ) =>
											setAttributes( {
												imageMinHeightMobile: val,
											} )
										}
										min={ 150 }
										max={ 400 }
										step={ 10 }
									/>

									<Divider />
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __(
											'Maximum Width (0 = no limit)',
											'mk-builder'
										) }
									</h4>
									<RangeControl
										label={ __(
											'Desktop Max Width (px)',
											'mk-builder'
										) }
										value={ imageMaxWidth }
										onChange={ ( val ) =>
											setAttributes( {
												imageMaxWidth: val,
											} )
										}
										min={ 0 }
										max={ 1920 }
										step={ 10 }
										help={ __(
											'Set to 0 for no limit',
											'mk-builder'
										) }
									/>

									<RangeControl
										label={ __(
											'Tablet Max Width (px)',
											'mk-builder'
										) }
										value={ imageMaxWidthTablet }
										onChange={ ( val ) =>
											setAttributes( {
												imageMaxWidthTablet: val,
											} )
										}
										min={ 0 }
										max={ 1200 }
										step={ 10 }
									/>

									<RangeControl
										label={ __(
											'Mobile Max Width (px)',
											'mk-builder'
										) }
										value={ imageMaxWidthMobile }
										onChange={ ( val ) =>
											setAttributes( {
												imageMaxWidthMobile: val,
											} )
										}
										min={ 0 }
										max={ 768 }
										step={ 10 }
									/>

									<Divider />
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __(
											'Maximum Height (0 = no limit)',
											'mk-builder'
										) }
									</h4>
									<RangeControl
										label={ __(
											'Desktop Max Height (px)',
											'mk-builder'
										) }
										value={ imageMaxHeight }
										onChange={ ( val ) =>
											setAttributes( {
												imageMaxHeight: val,
											} )
										}
										min={ 0 }
										max={ 1200 }
										step={ 10 }
										help={ __(
											'Set to 0 for no limit',
											'mk-builder'
										) }
									/>

									<RangeControl
										label={ __(
											'Tablet Max Height (px)',
											'mk-builder'
										) }
										value={ imageMaxHeightTablet }
										onChange={ ( val ) =>
											setAttributes( {
												imageMaxHeightTablet: val,
											} )
										}
										min={ 0 }
										max={ 800 }
										step={ 10 }
									/>

									<RangeControl
										label={ __(
											'Mobile Max Height (px)',
											'mk-builder'
										) }
										value={ imageMaxHeightMobile }
										onChange={ ( val ) =>
											setAttributes( {
												imageMaxHeightMobile: val,
											} )
										}
										min={ 0 }
										max={ 600 }
										step={ 10 }
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Image Display Settings',
										'mk-builder'
									) }
								>
									<SelectControl
										label={ __(
											'Object Fit',
											'mk-builder'
										) }
										value={ imageObjectFit }
										options={ [
											{
												label: __(
													'Cover',
													'mk-builder'
												),
												value: 'cover',
											},
											{
												label: __(
													'Contain',
													'mk-builder'
												),
												value: 'contain',
											},
											{
												label: __(
													'Fill',
													'mk-builder'
												),
												value: 'fill',
											},
											{
												label: __(
													'None',
													'mk-builder'
												),
												value: 'none',
											},
											{
												label: __(
													'Scale Down',
													'mk-builder'
												),
												value: 'scale-down',
											},
										] }
										onChange={ ( val ) =>
											setAttributes( {
												imageObjectFit: val,
											} )
										}
										help={ __(
											'How the image should be resized to fit its container',
											'mk-builder'
										) }
									/>

									<SelectControl
										label={ __(
											'Object Position',
											'mk-builder'
										) }
										value={ imageObjectPosition }
										options={ [
											{
												label: __(
													'Center',
													'mk-builder'
												),
												value: 'center',
											},
											{
												label: __(
													'Center Top',
													'mk-builder'
												),
												value: 'center top',
											},
											{
												label: __(
													'Center Bottom',
													'mk-builder'
												),
												value: 'center bottom',
											},
											{
												label: __(
													'Center Left',
													'mk-builder'
												),
												value: 'center left',
											},
											{
												label: __(
													'Center Right',
													'mk-builder'
												),
												value: 'center right',
											},
											{
												label: __(
													'Top',
													'mk-builder'
												),
												value: 'top',
											},
											{
												label: __(
													'Bottom',
													'mk-builder'
												),
												value: 'bottom',
											},
											{
												label: __(
													'Left',
													'mk-builder'
												),
												value: 'left',
											},
											{
												label: __(
													'Right',
													'mk-builder'
												),
												value: 'right',
											},
										] }
										onChange={ ( val ) =>
											setAttributes( {
												imageObjectPosition: val,
											} )
										}
										help={ __(
											'Position of the image within its container',
											'mk-builder'
										) }
									/>

									<SelectControl
										label={ __(
											'Overflow',
											'mk-builder'
										) }
										value={ imageOverflow }
										options={ [
											{
												label: __(
													'Hidden',
													'mk-builder'
												),
												value: 'hidden',
											},
											{
												label: __(
													'Visible',
													'mk-builder'
												),
												value: 'visible',
											},
											{
												label: __(
													'Scroll',
													'mk-builder'
												),
												value: 'scroll',
											},
											{
												label: __(
													'Auto',
													'mk-builder'
												),
												value: 'auto',
											},
										] }
										onChange={ ( val ) =>
											setAttributes( {
												imageOverflow: val,
											} )
										}
									/>

									<TextControl
										label={ __(
											'Aspect Ratio',
											'mk-builder'
										) }
										value={ imageAspectRatio }
										onChange={ ( val ) =>
											setAttributes( {
												imageAspectRatio: val,
											} )
										}
										placeholder={ __(
											'e.g., 16/9, 4/3, 1/1',
											'mk-builder'
										) }
										help={ __(
											'Optional: Set aspect ratio (e.g., 16/9). Leave empty for auto.',
											'mk-builder'
										) }
									/>
								</BaseControl>

								<Divider />

								<PanelBody
									title={ __(
										'Image Spacing (Margin & Padding)',
										'mk-builder'
									) }
									initialOpen={ false }
								>
									<BaseControl
										label={ __(
											'Margin - Desktop',
											'mk-builder'
										) }
									>
										<RangeControl
											label={ __(
												'Top (px)',
												'mk-builder'
											) }
											value={ imageMarginTop }
											onChange={ ( val ) =>
												setAttributes( {
													imageMarginTop: val,
												} )
											}
											min={ -100 }
											max={ 100 }
											step={ 5 }
										/>

										<RangeControl
											label={ __(
												'Right (px)',
												'mk-builder'
											) }
											value={ imageMarginRight }
											onChange={ ( val ) =>
												setAttributes( {
													imageMarginRight: val,
												} )
											}
											min={ -100 }
											max={ 100 }
											step={ 5 }
										/>

										<RangeControl
											label={ __(
												'Bottom (px)',
												'mk-builder'
											) }
											value={ imageMarginBottom }
											onChange={ ( val ) =>
												setAttributes( {
													imageMarginBottom: val,
												} )
											}
											min={ -100 }
											max={ 100 }
											step={ 5 }
										/>

										<RangeControl
											label={ __(
												'Left (px)',
												'mk-builder'
											) }
											value={ imageMarginLeft }
											onChange={ ( val ) =>
												setAttributes( {
													imageMarginLeft: val,
												} )
											}
											min={ -100 }
											max={ 100 }
											step={ 5 }
										/>
									</BaseControl>

									<Divider />

									<BaseControl
										label={ __(
											'Margin - Tablet',
											'mk-builder'
										) }
									>
										<RangeControl
											label={ __(
												'Top (px)',
												'mk-builder'
											) }
											value={ imageMarginTopTablet }
											onChange={ ( val ) =>
												setAttributes( {
													imageMarginTopTablet: val,
												} )
											}
											min={ -100 }
											max={ 100 }
											step={ 5 }
										/>

										<RangeControl
											label={ __(
												'Right (px)',
												'mk-builder'
											) }
											value={ imageMarginRightTablet }
											onChange={ ( val ) =>
												setAttributes( {
													imageMarginRightTablet: val,
												} )
											}
											min={ -100 }
											max={ 100 }
											step={ 5 }
										/>

										<RangeControl
											label={ __(
												'Bottom (px)',
												'mk-builder'
											) }
											value={ imageMarginBottomTablet }
											onChange={ ( val ) =>
												setAttributes( {
													imageMarginBottomTablet:
														val,
												} )
											}
											min={ -100 }
											max={ 100 }
											step={ 5 }
										/>

										<RangeControl
											label={ __(
												'Left (px)',
												'mk-builder'
											) }
											value={ imageMarginLeftTablet }
											onChange={ ( val ) =>
												setAttributes( {
													imageMarginLeftTablet: val,
												} )
											}
											min={ -100 }
											max={ 100 }
											step={ 5 }
										/>
									</BaseControl>

									<Divider />

									<BaseControl
										label={ __(
											'Margin - Mobile',
											'mk-builder'
										) }
									>
										<RangeControl
											label={ __(
												'Top (px)',
												'mk-builder'
											) }
											value={ imageMarginTopMobile }
											onChange={ ( val ) =>
												setAttributes( {
													imageMarginTopMobile: val,
												} )
											}
											min={ -100 }
											max={ 100 }
											step={ 5 }
										/>

										<RangeControl
											label={ __(
												'Right (px)',
												'mk-builder'
											) }
											value={ imageMarginRightMobile }
											onChange={ ( val ) =>
												setAttributes( {
													imageMarginRightMobile: val,
												} )
											}
											min={ -100 }
											max={ 100 }
											step={ 5 }
										/>

										<RangeControl
											label={ __(
												'Bottom (px)',
												'mk-builder'
											) }
											value={ imageMarginBottomMobile }
											onChange={ ( val ) =>
												setAttributes( {
													imageMarginBottomMobile:
														val,
												} )
											}
											min={ -100 }
											max={ 100 }
											step={ 5 }
										/>

										<RangeControl
											label={ __(
												'Left (px)',
												'mk-builder'
											) }
											value={ imageMarginLeftMobile }
											onChange={ ( val ) =>
												setAttributes( {
													imageMarginLeftMobile: val,
												} )
											}
											min={ -100 }
											max={ 100 }
											step={ 5 }
										/>
									</BaseControl>

									<Divider />

									<BaseControl
										label={ __(
											'Padding - Desktop',
											'mk-builder'
										) }
									>
										<RangeControl
											label={ __(
												'Top (px)',
												'mk-builder'
											) }
											value={ imagePaddingTop }
											onChange={ ( val ) =>
												setAttributes( {
													imagePaddingTop: val,
												} )
											}
											min={ 0 }
											max={ 200 }
											step={ 5 }
										/>

										<RangeControl
											label={ __(
												'Right (px)',
												'mk-builder'
											) }
											value={ imagePaddingRight }
											onChange={ ( val ) =>
												setAttributes( {
													imagePaddingRight: val,
												} )
											}
											min={ 0 }
											max={ 200 }
											step={ 5 }
										/>

										<RangeControl
											label={ __(
												'Bottom (px)',
												'mk-builder'
											) }
											value={ imagePaddingBottom }
											onChange={ ( val ) =>
												setAttributes( {
													imagePaddingBottom: val,
												} )
											}
											min={ 0 }
											max={ 200 }
											step={ 5 }
										/>

										<RangeControl
											label={ __(
												'Left (px)',
												'mk-builder'
											) }
											value={ imagePaddingLeft }
											onChange={ ( val ) =>
												setAttributes( {
													imagePaddingLeft: val,
												} )
											}
											min={ 0 }
											max={ 200 }
											step={ 5 }
										/>
									</BaseControl>

									<Divider />

									<BaseControl
										label={ __(
											'Padding - Tablet',
											'mk-builder'
										) }
									>
										<RangeControl
											label={ __(
												'Top (px)',
												'mk-builder'
											) }
											value={ imagePaddingTopTablet }
											onChange={ ( val ) =>
												setAttributes( {
													imagePaddingTopTablet: val,
												} )
											}
											min={ 0 }
											max={ 150 }
											step={ 5 }
										/>

										<RangeControl
											label={ __(
												'Right (px)',
												'mk-builder'
											) }
											value={ imagePaddingRightTablet }
											onChange={ ( val ) =>
												setAttributes( {
													imagePaddingRightTablet:
														val,
												} )
											}
											min={ 0 }
											max={ 150 }
											step={ 5 }
										/>

										<RangeControl
											label={ __(
												'Bottom (px)',
												'mk-builder'
											) }
											value={ imagePaddingBottomTablet }
											onChange={ ( val ) =>
												setAttributes( {
													imagePaddingBottomTablet:
														val,
												} )
											}
											min={ 0 }
											max={ 150 }
											step={ 5 }
										/>

										<RangeControl
											label={ __(
												'Left (px)',
												'mk-builder'
											) }
											value={ imagePaddingLeftTablet }
											onChange={ ( val ) =>
												setAttributes( {
													imagePaddingLeftTablet: val,
												} )
											}
											min={ 0 }
											max={ 150 }
											step={ 5 }
										/>
									</BaseControl>

									<Divider />

									<BaseControl
										label={ __(
											'Padding - Mobile',
											'mk-builder'
										) }
									>
										<RangeControl
											label={ __(
												'Top (px)',
												'mk-builder'
											) }
											value={ imagePaddingTopMobile }
											onChange={ ( val ) =>
												setAttributes( {
													imagePaddingTopMobile: val,
												} )
											}
											min={ 0 }
											max={ 100 }
											step={ 5 }
										/>

										<RangeControl
											label={ __(
												'Right (px)',
												'mk-builder'
											) }
											value={ imagePaddingRightMobile }
											onChange={ ( val ) =>
												setAttributes( {
													imagePaddingRightMobile:
														val,
												} )
											}
											min={ 0 }
											max={ 100 }
											step={ 5 }
										/>

										<RangeControl
											label={ __(
												'Bottom (px)',
												'mk-builder'
											) }
											value={ imagePaddingBottomMobile }
											onChange={ ( val ) =>
												setAttributes( {
													imagePaddingBottomMobile:
														val,
												} )
											}
											min={ 0 }
											max={ 100 }
											step={ 5 }
										/>

										<RangeControl
											label={ __(
												'Left (px)',
												'mk-builder'
											) }
											value={ imagePaddingLeftMobile }
											onChange={ ( val ) =>
												setAttributes( {
													imagePaddingLeftMobile: val,
												} )
											}
											min={ 0 }
											max={ 100 }
											step={ 5 }
										/>
									</BaseControl>
								</PanelBody>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Content Area Settings', 'mk-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __(
								'Content Background',
								'mk-builder'
							) }
							colorSettings={ [
								{
									value: contentBackgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											contentBackgroundColor: val,
										} ),
									label: __(
										'Background Color',
										'mk-builder'
									),
								},
							] }
						/>

						<Divider />

						<BaseControl
							label={ __( 'Content Padding', 'mk-builder' ) }
						>
							<RangeControl
								label={ __( 'Desktop (px)', 'mk-builder' ) }
								value={ contentPadding }
								onChange={ ( val ) =>
									setAttributes( { contentPadding: val } )
								}
								min={ 20 }
								max={ 120 }
								step={ 5 }
							/>

							<RangeControl
								label={ __( 'Tablet (px)', 'mk-builder' ) }
								value={ contentPaddingTablet }
								onChange={ ( val ) =>
									setAttributes( {
										contentPaddingTablet: val,
									} )
								}
								min={ 20 }
								max={ 100 }
								step={ 5 }
							/>

							<RangeControl
								label={ __( 'Mobile (px)', 'mk-builder' ) }
								value={ contentPaddingMobile }
								onChange={ ( val ) =>
									setAttributes( {
										contentPaddingMobile: val,
									} )
								}
								min={ 20 }
								max={ 80 }
								step={ 5 }
							/>
						</BaseControl>

						<Divider />

						<RangeControl
							label={ __(
								'Content Max Width (px)',
								'mk-builder'
							) }
							value={ contentMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { contentMaxWidth: val } )
							}
							min={ 300 }
							max={ 800 }
							step={ 10 }
						/>

						<Divider />

						<BaseControl
							label={ __( 'Content Margin', 'mk-builder' ) }
						>
							<RangeControl
								label={ __(
									'Desktop Margin Right (%)',
									'mk-builder'
								) }
								value={ contentMarginRight }
								onChange={ ( val ) =>
									setAttributes( { contentMarginRight: val } )
								}
								min={ 0 }
								max={ 20 }
								step={ 1 }
								help={ __(
									'Only applies when alignment is left',
									'mk-builder'
								) }
							/>

							<RangeControl
								label={ __(
									'Tablet Margin Right (%)',
									'mk-builder'
								) }
								value={ contentMarginRightTablet }
								onChange={ ( val ) =>
									setAttributes( {
										contentMarginRightTablet: val,
									} )
								}
								min={ 0 }
								max={ 20 }
								step={ 1 }
							/>

							<RangeControl
								label={ __(
									'Mobile Margin Right (%)',
									'mk-builder'
								) }
								value={ contentMarginRightMobile }
								onChange={ ( val ) =>
									setAttributes( {
										contentMarginRightMobile: val,
									} )
								}
								min={ 0 }
								max={ 20 }
								step={ 1 }
							/>
						</BaseControl>

						<Divider />

						<BaseControl
							label={ __( 'Content Alignment', 'mk-builder' ) }
						>
							<SelectControl
								label={ __( 'Desktop', 'mk-builder' ) }
								value={ contentAlignment }
								options={ [
									{
										label: __( 'Left', 'mk-builder' ),
										value: 'left',
									},
									{
										label: __( 'Center', 'mk-builder' ),
										value: 'center',
									},
									{
										label: __( 'Right', 'mk-builder' ),
										value: 'right',
									},
								] }
								onChange={ ( val ) =>
									setAttributes( { contentAlignment: val } )
								}
							/>

							<SelectControl
								label={ __( 'Tablet', 'mk-builder' ) }
								value={ contentAlignmentTablet }
								options={ [
									{
										label: __( 'Left', 'mk-builder' ),
										value: 'left',
									},
									{
										label: __( 'Center', 'mk-builder' ),
										value: 'center',
									},
									{
										label: __( 'Right', 'mk-builder' ),
										value: 'right',
									},
								] }
								onChange={ ( val ) =>
									setAttributes( {
										contentAlignmentTablet: val,
									} )
								}
							/>

							<SelectControl
								label={ __( 'Mobile', 'mk-builder' ) }
								value={ contentAlignmentMobile }
								options={ [
									{
										label: __( 'Left', 'mk-builder' ),
										value: 'left',
									},
									{
										label: __( 'Center', 'mk-builder' ),
										value: 'center',
									},
									{
										label: __( 'Right', 'mk-builder' ),
										value: 'right',
									},
								] }
								onChange={ ( val ) =>
									setAttributes( {
										contentAlignmentMobile: val,
									} )
								}
							/>
						</BaseControl>
					</PanelBody>

					<PanelBody
						title={ __( 'Meta Title', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Meta Title', 'mk-builder' ) }
							checked={ showMetaTitle }
							onChange={ ( val ) =>
								setAttributes( { showMetaTitle: val } )
							}
						/>

						{ showMetaTitle && (
							<>
								<TextControl
									label={ __(
										'Meta Title Text',
										'mk-builder'
									) }
									value={ metaTitle }
									onChange={ ( val ) =>
										setAttributes( { metaTitle: val } )
									}
								/>

								<PanelColorSettings
									title={ __(
										'Meta Title Color',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: metaTitleColor,
											onChange: ( val ) =>
												setAttributes( {
													metaTitleColor: val,
												} ),
											label: __(
												'Color',
												'mk-builder'
											),
										},
									] }
								/>

								<BaseControl
									label={ __( 'Font Size', 'mk-builder' ) }
								>
									<RangeControl
										label={ __(
											'Desktop (rem)',
											'mk-builder'
										) }
										value={ metaTitleFontSize }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleFontSize: val,
											} )
										}
										min={ 0.5 }
										max={ 2 }
										step={ 0.05 }
									/>

									<RangeControl
										label={ __(
											'Tablet (rem)',
											'mk-builder'
										) }
										value={ metaTitleFontSizeTablet }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleFontSizeTablet: val,
											} )
										}
										min={ 0.5 }
										max={ 1.8 }
										step={ 0.05 }
									/>

									<RangeControl
										label={ __(
											'Mobile (rem)',
											'mk-builder'
										) }
										value={ metaTitleFontSizeMobile }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleFontSizeMobile: val,
											} )
										}
										min={ 0.5 }
										max={ 1.5 }
										step={ 0.05 }
									/>
								</BaseControl>

								<BaseControl
									label={ __(
										'Font Weight',
										'mk-builder'
									) }
								>
									<RangeControl
										label={ __(
											'Desktop',
											'mk-builder'
										) }
										value={ metaTitleFontWeight }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleFontWeight: val,
											} )
										}
										min={ 100 }
										max={ 900 }
										step={ 100 }
									/>

									<RangeControl
										label={ __(
											'Tablet',
											'mk-builder'
										) }
										value={ metaTitleFontWeightTablet }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleFontWeightTablet: val,
											} )
										}
										min={ 100 }
										max={ 900 }
										step={ 100 }
									/>

									<RangeControl
										label={ __(
											'Mobile',
											'mk-builder'
										) }
										value={ metaTitleFontWeightMobile }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleFontWeightMobile: val,
											} )
										}
										min={ 100 }
										max={ 900 }
										step={ 100 }
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Text Color',
										'mk-builder'
									) }
								>
									<PanelColorSettings
										title={ __(
											'Desktop',
											'mk-builder'
										) }
										colorSettings={ [
											{
												value: metaTitleColor,
												onChange: ( val ) =>
													setAttributes( {
														metaTitleColor: val,
													} ),
												label: __(
													'Color',
													'mk-builder'
												),
											},
										] }
									/>

									<PanelColorSettings
										title={ __(
											'Tablet',
											'mk-builder'
										) }
										colorSettings={ [
											{
												value:
													metaTitleColorTablet ||
													metaTitleColor,
												onChange: ( val ) =>
													setAttributes( {
														metaTitleColorTablet:
															val || '',
													} ),
												label: __(
													'Color (Tablet)',
													'mk-builder'
												),
											},
										] }
									/>

									<PanelColorSettings
										title={ __(
											'Mobile',
											'mk-builder'
										) }
										colorSettings={ [
											{
												value:
													metaTitleColorMobile ||
													metaTitleColor,
												onChange: ( val ) =>
													setAttributes( {
														metaTitleColorMobile:
															val || '',
													} ),
												label: __(
													'Color (Mobile)',
													'mk-builder'
												),
											},
										] }
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Text Transform',
										'mk-builder'
									) }
								>
									<SelectControl
										label={ __(
											'Desktop',
											'mk-builder'
										) }
										value={ metaTitleTextTransform }
										options={ [
											{
												label: __(
													'None',
													'mk-builder'
												),
												value: 'none',
											},
											{
												label: __(
													'Uppercase',
													'mk-builder'
												),
												value: 'uppercase',
											},
											{
												label: __(
													'Lowercase',
													'mk-builder'
												),
												value: 'lowercase',
											},
											{
												label: __(
													'Capitalize',
													'mk-builder'
												),
												value: 'capitalize',
											},
										] }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleTextTransform: val,
											} )
										}
									/>

									<SelectControl
										label={ __(
											'Tablet',
											'mk-builder'
										) }
										value={
											metaTitleTextTransformTablet ||
											metaTitleTextTransform
										}
										options={ [
											{
												label: __(
													'Use Desktop',
													'mk-builder'
												),
												value: '',
											},
											{
												label: __(
													'None',
													'mk-builder'
												),
												value: 'none',
											},
											{
												label: __(
													'Uppercase',
													'mk-builder'
												),
												value: 'uppercase',
											},
											{
												label: __(
													'Lowercase',
													'mk-builder'
												),
												value: 'lowercase',
											},
											{
												label: __(
													'Capitalize',
													'mk-builder'
												),
												value: 'capitalize',
											},
										] }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleTextTransformTablet:
													val || '',
											} )
										}
									/>

									<SelectControl
										label={ __(
											'Mobile',
											'mk-builder'
										) }
										value={
											metaTitleTextTransformMobile ||
											metaTitleTextTransform
										}
										options={ [
											{
												label: __(
													'Use Desktop',
													'mk-builder'
												),
												value: '',
											},
											{
												label: __(
													'None',
													'mk-builder'
												),
												value: 'none',
											},
											{
												label: __(
													'Uppercase',
													'mk-builder'
												),
												value: 'uppercase',
											},
											{
												label: __(
													'Lowercase',
													'mk-builder'
												),
												value: 'lowercase',
											},
											{
												label: __(
													'Capitalize',
													'mk-builder'
												),
												value: 'capitalize',
											},
										] }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleTextTransformMobile:
													val || '',
											} )
										}
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Letter Spacing (px)',
										'mk-builder'
									) }
								>
									<RangeControl
										label={ __(
											'Desktop',
											'mk-builder'
										) }
										value={ metaTitleLetterSpacing }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleLetterSpacing: val,
											} )
										}
										min={ 0 }
										max={ 5 }
										step={ 0.1 }
									/>

									<RangeControl
										label={ __(
											'Tablet',
											'mk-builder'
										) }
										value={ metaTitleLetterSpacingTablet }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleLetterSpacingTablet:
													val,
											} )
										}
										min={ 0 }
										max={ 5 }
										step={ 0.1 }
									/>

									<RangeControl
										label={ __(
											'Mobile',
											'mk-builder'
										) }
										value={ metaTitleLetterSpacingMobile }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleLetterSpacingMobile:
													val,
											} )
										}
										min={ 0 }
										max={ 5 }
										step={ 0.1 }
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Margin (px)',
										'mk-builder'
									) }
								>
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __( 'Desktop', 'mk-builder' ) }
									</h4>
									<RangeControl
										label={ __( 'Top', 'mk-builder' ) }
										value={ metaTitleMarginTop }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleMarginTop: val,
											} )
										}
										min={ 0 }
										max={ 100 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Right', 'mk-builder' ) }
										value={ metaTitleMarginRight }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleMarginRight: val,
											} )
										}
										min={ 0 }
										max={ 100 }
										step={ 5 }
									/>

									<RangeControl
										label={ __(
											'Bottom',
											'mk-builder'
										) }
										value={ metaTitleMarginBottom }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleMarginBottom: val,
											} )
										}
										min={ 0 }
										max={ 100 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Left', 'mk-builder' ) }
										value={ metaTitleMarginLeft }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleMarginLeft: val,
											} )
										}
										min={ 0 }
										max={ 100 }
										step={ 5 }
									/>

									<Divider />
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __( 'Tablet', 'mk-builder' ) }
									</h4>
									<RangeControl
										label={ __( 'Top', 'mk-builder' ) }
										value={ metaTitleMarginTopTablet }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleMarginTopTablet: val,
											} )
										}
										min={ 0 }
										max={ 80 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Right', 'mk-builder' ) }
										value={ metaTitleMarginRightTablet }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleMarginRightTablet: val,
											} )
										}
										min={ 0 }
										max={ 80 }
										step={ 5 }
									/>

									<RangeControl
										label={ __(
											'Bottom',
											'mk-builder'
										) }
										value={ metaTitleMarginBottomTablet }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleMarginBottomTablet:
													val,
											} )
										}
										min={ 0 }
										max={ 80 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Left', 'mk-builder' ) }
										value={ metaTitleMarginLeftTablet }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleMarginLeftTablet: val,
											} )
										}
										min={ 0 }
										max={ 80 }
										step={ 5 }
									/>

									<Divider />
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __( 'Mobile', 'mk-builder' ) }
									</h4>
									<RangeControl
										label={ __( 'Top', 'mk-builder' ) }
										value={ metaTitleMarginTopMobile }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleMarginTopMobile: val,
											} )
										}
										min={ 0 }
										max={ 60 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Right', 'mk-builder' ) }
										value={ metaTitleMarginRightMobile }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleMarginRightMobile: val,
											} )
										}
										min={ 0 }
										max={ 60 }
										step={ 5 }
									/>

									<RangeControl
										label={ __(
											'Bottom',
											'mk-builder'
										) }
										value={ metaTitleMarginBottomMobile }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleMarginBottomMobile:
													val,
											} )
										}
										min={ 0 }
										max={ 60 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Left', 'mk-builder' ) }
										value={ metaTitleMarginLeftMobile }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleMarginLeftMobile: val,
											} )
										}
										min={ 0 }
										max={ 60 }
										step={ 5 }
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Padding (px)',
										'mk-builder'
									) }
								>
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __( 'Desktop', 'mk-builder' ) }
									</h4>
									<RangeControl
										label={ __( 'Top', 'mk-builder' ) }
										value={ metaTitlePaddingTop }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitlePaddingTop: val,
											} )
										}
										min={ 0 }
										max={ 50 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Right', 'mk-builder' ) }
										value={ metaTitlePaddingRight }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitlePaddingRight: val,
											} )
										}
										min={ 0 }
										max={ 50 }
										step={ 5 }
									/>

									<RangeControl
										label={ __(
											'Bottom',
											'mk-builder'
										) }
										value={ metaTitlePaddingBottom }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitlePaddingBottom: val,
											} )
										}
										min={ 0 }
										max={ 50 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Left', 'mk-builder' ) }
										value={ metaTitlePaddingLeft }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitlePaddingLeft: val,
											} )
										}
										min={ 0 }
										max={ 50 }
										step={ 5 }
									/>

									<Divider />
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __( 'Tablet', 'mk-builder' ) }
									</h4>
									<RangeControl
										label={ __( 'Top', 'mk-builder' ) }
										value={ metaTitlePaddingTopTablet }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitlePaddingTopTablet: val,
											} )
										}
										min={ 0 }
										max={ 40 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Right', 'mk-builder' ) }
										value={ metaTitlePaddingRightTablet }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitlePaddingRightTablet:
													val,
											} )
										}
										min={ 0 }
										max={ 40 }
										step={ 5 }
									/>

									<RangeControl
										label={ __(
											'Bottom',
											'mk-builder'
										) }
										value={ metaTitlePaddingBottomTablet }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitlePaddingBottomTablet:
													val,
											} )
										}
										min={ 0 }
										max={ 40 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Left', 'mk-builder' ) }
										value={ metaTitlePaddingLeftTablet }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitlePaddingLeftTablet: val,
											} )
										}
										min={ 0 }
										max={ 40 }
										step={ 5 }
									/>

									<Divider />
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __( 'Mobile', 'mk-builder' ) }
									</h4>
									<RangeControl
										label={ __( 'Top', 'mk-builder' ) }
										value={ metaTitlePaddingTopMobile }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitlePaddingTopMobile: val,
											} )
										}
										min={ 0 }
										max={ 30 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Right', 'mk-builder' ) }
										value={ metaTitlePaddingRightMobile }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitlePaddingRightMobile:
													val,
											} )
										}
										min={ 0 }
										max={ 30 }
										step={ 5 }
									/>

									<RangeControl
										label={ __(
											'Bottom',
											'mk-builder'
										) }
										value={ metaTitlePaddingBottomMobile }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitlePaddingBottomMobile:
													val,
											} )
										}
										min={ 0 }
										max={ 30 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Left', 'mk-builder' ) }
										value={ metaTitlePaddingLeftMobile }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitlePaddingLeftMobile: val,
											} )
										}
										min={ 0 }
										max={ 30 }
										step={ 5 }
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Text Alignment',
										'mk-builder'
									) }
								>
									<SelectControl
										label={ __(
											'Desktop',
											'mk-builder'
										) }
										value={ metaTitleAlignment }
										options={ [
											{
												label: __(
													'Inherit from Content',
													'mk-builder'
												),
												value: '',
											},
											{
												label: __(
													'Left',
													'mk-builder'
												),
												value: 'left',
											},
											{
												label: __(
													'Center',
													'mk-builder'
												),
												value: 'center',
											},
											{
												label: __(
													'Right',
													'mk-builder'
												),
												value: 'right',
											},
										] }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleAlignment: val || '',
											} )
										}
									/>

									<SelectControl
										label={ __(
											'Tablet',
											'mk-builder'
										) }
										value={
											metaTitleAlignmentTablet ||
											metaTitleAlignment
										}
										options={ [
											{
												label: __(
													'Use Desktop',
													'mk-builder'
												),
												value: '',
											},
											{
												label: __(
													'Inherit from Content',
													'mk-builder'
												),
												value: 'inherit',
											},
											{
												label: __(
													'Left',
													'mk-builder'
												),
												value: 'left',
											},
											{
												label: __(
													'Center',
													'mk-builder'
												),
												value: 'center',
											},
											{
												label: __(
													'Right',
													'mk-builder'
												),
												value: 'right',
											},
										] }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleAlignmentTablet:
													val || '',
											} )
										}
									/>

									<SelectControl
										label={ __(
											'Mobile',
											'mk-builder'
										) }
										value={
											metaTitleAlignmentMobile ||
											metaTitleAlignment
										}
										options={ [
											{
												label: __(
													'Use Desktop',
													'mk-builder'
												),
												value: '',
											},
											{
												label: __(
													'Inherit from Content',
													'mk-builder'
												),
												value: 'inherit',
											},
											{
												label: __(
													'Left',
													'mk-builder'
												),
												value: 'left',
											},
											{
												label: __(
													'Center',
													'mk-builder'
												),
												value: 'center',
											},
											{
												label: __(
													'Right',
													'mk-builder'
												),
												value: 'right',
											},
										] }
										onChange={ ( val ) =>
											setAttributes( {
												metaTitleAlignmentMobile:
													val || '',
											} )
										}
									/>
								</BaseControl>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Heading', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Heading', 'mk-builder' ) }
							checked={ showHeading }
							onChange={ ( val ) =>
								setAttributes( { showHeading: val } )
							}
						/>

						{ showHeading && (
							<>
								<TextControl
									label={ __(
										'Heading Text',
										'mk-builder'
									) }
									value={ heading }
									onChange={ ( val ) =>
										setAttributes( { heading: val } )
									}
									help={ __(
										'Use \\n for line breaks',
										'mk-builder'
									) }
								/>

								<PanelColorSettings
									title={ __(
										'Heading Color',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: headingColor,
											onChange: ( val ) =>
												setAttributes( {
													headingColor: val,
												} ),
											label: __(
												'Color',
												'mk-builder'
											),
										},
									] }
								/>

								<BaseControl
									label={ __( 'Font Size', 'mk-builder' ) }
								>
									<RangeControl
										label={ __(
											'Desktop (rem)',
											'mk-builder'
										) }
										value={ headingFontSize }
										onChange={ ( val ) =>
											setAttributes( {
												headingFontSize: val,
											} )
										}
										min={ 1.5 }
										max={ 5 }
										step={ 0.1 }
									/>

									<RangeControl
										label={ __(
											'Tablet (rem)',
											'mk-builder'
										) }
										value={ headingFontSizeTablet }
										onChange={ ( val ) =>
											setAttributes( {
												headingFontSizeTablet: val,
											} )
										}
										min={ 1.5 }
										max={ 4.5 }
										step={ 0.1 }
									/>

									<RangeControl
										label={ __(
											'Mobile (rem)',
											'mk-builder'
										) }
										value={ headingFontSizeMobile }
										onChange={ ( val ) =>
											setAttributes( {
												headingFontSizeMobile: val,
											} )
										}
										min={ 1.5 }
										max={ 3.5 }
										step={ 0.1 }
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Text Color',
										'mk-builder'
									) }
								>
									<PanelColorSettings
										title={ __(
											'Desktop',
											'mk-builder'
										) }
										colorSettings={ [
											{
												value: headingColor,
												onChange: ( val ) =>
													setAttributes( {
														headingColor: val,
													} ),
												label: __(
													'Color',
													'mk-builder'
												),
											},
										] }
									/>

									<PanelColorSettings
										title={ __(
											'Tablet',
											'mk-builder'
										) }
										colorSettings={ [
											{
												value:
													headingColorTablet ||
													headingColor,
												onChange: ( val ) =>
													setAttributes( {
														headingColorTablet:
															val || '',
													} ),
												label: __(
													'Color (Tablet)',
													'mk-builder'
												),
											},
										] }
									/>

									<PanelColorSettings
										title={ __(
											'Mobile',
											'mk-builder'
										) }
										colorSettings={ [
											{
												value:
													headingColorMobile ||
													headingColor,
												onChange: ( val ) =>
													setAttributes( {
														headingColorMobile:
															val || '',
													} ),
												label: __(
													'Color (Mobile)',
													'mk-builder'
												),
											},
										] }
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Font Weight',
										'mk-builder'
									) }
								>
									<RangeControl
										label={ __(
											'Desktop',
											'mk-builder'
										) }
										value={ headingFontWeight }
										onChange={ ( val ) =>
											setAttributes( {
												headingFontWeight: val,
											} )
										}
										min={ 100 }
										max={ 900 }
										step={ 100 }
									/>

									<RangeControl
										label={ __(
											'Tablet',
											'mk-builder'
										) }
										value={ headingFontWeightTablet }
										onChange={ ( val ) =>
											setAttributes( {
												headingFontWeightTablet: val,
											} )
										}
										min={ 100 }
										max={ 900 }
										step={ 100 }
									/>

									<RangeControl
										label={ __(
											'Mobile',
											'mk-builder'
										) }
										value={ headingFontWeightMobile }
										onChange={ ( val ) =>
											setAttributes( {
												headingFontWeightMobile: val,
											} )
										}
										min={ 100 }
										max={ 900 }
										step={ 100 }
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Line Height',
										'mk-builder'
									) }
								>
									<RangeControl
										label={ __(
											'Desktop',
											'mk-builder'
										) }
										value={ headingLineHeight }
										onChange={ ( val ) =>
											setAttributes( {
												headingLineHeight: val,
											} )
										}
										min={ 0.8 }
										max={ 2 }
										step={ 0.1 }
									/>

									<RangeControl
										label={ __(
											'Tablet',
											'mk-builder'
										) }
										value={ headingLineHeightTablet }
										onChange={ ( val ) =>
											setAttributes( {
												headingLineHeightTablet: val,
											} )
										}
										min={ 0.8 }
										max={ 2 }
										step={ 0.1 }
									/>

									<RangeControl
										label={ __(
											'Mobile',
											'mk-builder'
										) }
										value={ headingLineHeightMobile }
										onChange={ ( val ) =>
											setAttributes( {
												headingLineHeightMobile: val,
											} )
										}
										min={ 0.8 }
										max={ 2 }
										step={ 0.1 }
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Letter Spacing (em)',
										'mk-builder'
									) }
								>
									<RangeControl
										label={ __(
											'Desktop',
											'mk-builder'
										) }
										value={ headingLetterSpacing }
										onChange={ ( val ) =>
											setAttributes( {
												headingLetterSpacing: val,
											} )
										}
										min={ -0.05 }
										max={ 0.05 }
										step={ 0.01 }
									/>

									<RangeControl
										label={ __(
											'Tablet',
											'mk-builder'
										) }
										value={ headingLetterSpacingTablet }
										onChange={ ( val ) =>
											setAttributes( {
												headingLetterSpacingTablet: val,
											} )
										}
										min={ -0.05 }
										max={ 0.05 }
										step={ 0.01 }
									/>

									<RangeControl
										label={ __(
											'Mobile',
											'mk-builder'
										) }
										value={ headingLetterSpacingMobile }
										onChange={ ( val ) =>
											setAttributes( {
												headingLetterSpacingMobile: val,
											} )
										}
										min={ -0.05 }
										max={ 0.05 }
										step={ 0.01 }
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Margin (px)',
										'mk-builder'
									) }
								>
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __( 'Desktop', 'mk-builder' ) }
									</h4>
									<RangeControl
										label={ __( 'Top', 'mk-builder' ) }
										value={ headingMarginTop }
										onChange={ ( val ) =>
											setAttributes( {
												headingMarginTop: val,
											} )
										}
										min={ 0 }
										max={ 100 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Right', 'mk-builder' ) }
										value={ headingMarginRight }
										onChange={ ( val ) =>
											setAttributes( {
												headingMarginRight: val,
											} )
										}
										min={ 0 }
										max={ 100 }
										step={ 5 }
									/>

									<RangeControl
										label={ __(
											'Bottom',
											'mk-builder'
										) }
										value={ headingMarginBottom }
										onChange={ ( val ) =>
											setAttributes( {
												headingMarginBottom: val,
											} )
										}
										min={ 0 }
										max={ 100 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Left', 'mk-builder' ) }
										value={ headingMarginLeft }
										onChange={ ( val ) =>
											setAttributes( {
												headingMarginLeft: val,
											} )
										}
										min={ 0 }
										max={ 100 }
										step={ 5 }
									/>

									<Divider />
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __( 'Tablet', 'mk-builder' ) }
									</h4>
									<RangeControl
										label={ __( 'Top', 'mk-builder' ) }
										value={ headingMarginTopTablet }
										onChange={ ( val ) =>
											setAttributes( {
												headingMarginTopTablet: val,
											} )
										}
										min={ 0 }
										max={ 80 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Right', 'mk-builder' ) }
										value={ headingMarginRightTablet }
										onChange={ ( val ) =>
											setAttributes( {
												headingMarginRightTablet: val,
											} )
										}
										min={ 0 }
										max={ 80 }
										step={ 5 }
									/>

									<RangeControl
										label={ __(
											'Bottom',
											'mk-builder'
										) }
										value={ headingMarginBottomTablet }
										onChange={ ( val ) =>
											setAttributes( {
												headingMarginBottomTablet: val,
											} )
										}
										min={ 0 }
										max={ 80 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Left', 'mk-builder' ) }
										value={ headingMarginLeftTablet }
										onChange={ ( val ) =>
											setAttributes( {
												headingMarginLeftTablet: val,
											} )
										}
										min={ 0 }
										max={ 80 }
										step={ 5 }
									/>

									<Divider />
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __( 'Mobile', 'mk-builder' ) }
									</h4>
									<RangeControl
										label={ __( 'Top', 'mk-builder' ) }
										value={ headingMarginTopMobile }
										onChange={ ( val ) =>
											setAttributes( {
												headingMarginTopMobile: val,
											} )
										}
										min={ 0 }
										max={ 60 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Right', 'mk-builder' ) }
										value={ headingMarginRightMobile }
										onChange={ ( val ) =>
											setAttributes( {
												headingMarginRightMobile: val,
											} )
										}
										min={ 0 }
										max={ 60 }
										step={ 5 }
									/>

									<RangeControl
										label={ __(
											'Bottom',
											'mk-builder'
										) }
										value={ headingMarginBottomMobile }
										onChange={ ( val ) =>
											setAttributes( {
												headingMarginBottomMobile: val,
											} )
										}
										min={ 0 }
										max={ 60 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Left', 'mk-builder' ) }
										value={ headingMarginLeftMobile }
										onChange={ ( val ) =>
											setAttributes( {
												headingMarginLeftMobile: val,
											} )
										}
										min={ 0 }
										max={ 60 }
										step={ 5 }
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Padding (px)',
										'mk-builder'
									) }
								>
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __( 'Desktop', 'mk-builder' ) }
									</h4>
									<RangeControl
										label={ __( 'Top', 'mk-builder' ) }
										value={ headingPaddingTop }
										onChange={ ( val ) =>
											setAttributes( {
												headingPaddingTop: val,
											} )
										}
										min={ 0 }
										max={ 50 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Right', 'mk-builder' ) }
										value={ headingPaddingRight }
										onChange={ ( val ) =>
											setAttributes( {
												headingPaddingRight: val,
											} )
										}
										min={ 0 }
										max={ 50 }
										step={ 5 }
									/>

									<RangeControl
										label={ __(
											'Bottom',
											'mk-builder'
										) }
										value={ headingPaddingBottom }
										onChange={ ( val ) =>
											setAttributes( {
												headingPaddingBottom: val,
											} )
										}
										min={ 0 }
										max={ 50 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Left', 'mk-builder' ) }
										value={ headingPaddingLeft }
										onChange={ ( val ) =>
											setAttributes( {
												headingPaddingLeft: val,
											} )
										}
										min={ 0 }
										max={ 50 }
										step={ 5 }
									/>

									<Divider />
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __( 'Tablet', 'mk-builder' ) }
									</h4>
									<RangeControl
										label={ __( 'Top', 'mk-builder' ) }
										value={ headingPaddingTopTablet }
										onChange={ ( val ) =>
											setAttributes( {
												headingPaddingTopTablet: val,
											} )
										}
										min={ 0 }
										max={ 40 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Right', 'mk-builder' ) }
										value={ headingPaddingRightTablet }
										onChange={ ( val ) =>
											setAttributes( {
												headingPaddingRightTablet: val,
											} )
										}
										min={ 0 }
										max={ 40 }
										step={ 5 }
									/>

									<RangeControl
										label={ __(
											'Bottom',
											'mk-builder'
										) }
										value={ headingPaddingBottomTablet }
										onChange={ ( val ) =>
											setAttributes( {
												headingPaddingBottomTablet: val,
											} )
										}
										min={ 0 }
										max={ 40 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Left', 'mk-builder' ) }
										value={ headingPaddingLeftTablet }
										onChange={ ( val ) =>
											setAttributes( {
												headingPaddingLeftTablet: val,
											} )
										}
										min={ 0 }
										max={ 40 }
										step={ 5 }
									/>

									<Divider />
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __( 'Mobile', 'mk-builder' ) }
									</h4>
									<RangeControl
										label={ __( 'Top', 'mk-builder' ) }
										value={ headingPaddingTopMobile }
										onChange={ ( val ) =>
											setAttributes( {
												headingPaddingTopMobile: val,
											} )
										}
										min={ 0 }
										max={ 30 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Right', 'mk-builder' ) }
										value={ headingPaddingRightMobile }
										onChange={ ( val ) =>
											setAttributes( {
												headingPaddingRightMobile: val,
											} )
										}
										min={ 0 }
										max={ 30 }
										step={ 5 }
									/>

									<RangeControl
										label={ __(
											'Bottom',
											'mk-builder'
										) }
										value={ headingPaddingBottomMobile }
										onChange={ ( val ) =>
											setAttributes( {
												headingPaddingBottomMobile: val,
											} )
										}
										min={ 0 }
										max={ 30 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Left', 'mk-builder' ) }
										value={ headingPaddingLeftMobile }
										onChange={ ( val ) =>
											setAttributes( {
												headingPaddingLeftMobile: val,
											} )
										}
										min={ 0 }
										max={ 30 }
										step={ 5 }
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Text Alignment',
										'mk-builder'
									) }
								>
									<SelectControl
										label={ __(
											'Desktop',
											'mk-builder'
										) }
										value={ headingAlignment }
										options={ [
											{
												label: __(
													'Inherit from Content',
													'mk-builder'
												),
												value: '',
											},
											{
												label: __(
													'Left',
													'mk-builder'
												),
												value: 'left',
											},
											{
												label: __(
													'Center',
													'mk-builder'
												),
												value: 'center',
											},
											{
												label: __(
													'Right',
													'mk-builder'
												),
												value: 'right',
											},
										] }
										onChange={ ( val ) =>
											setAttributes( {
												headingAlignment: val || '',
											} )
										}
									/>

									<SelectControl
										label={ __(
											'Tablet',
											'mk-builder'
										) }
										value={
											headingAlignmentTablet ||
											headingAlignment
										}
										options={ [
											{
												label: __(
													'Use Desktop',
													'mk-builder'
												),
												value: '',
											},
											{
												label: __(
													'Inherit from Content',
													'mk-builder'
												),
												value: 'inherit',
											},
											{
												label: __(
													'Left',
													'mk-builder'
												),
												value: 'left',
											},
											{
												label: __(
													'Center',
													'mk-builder'
												),
												value: 'center',
											},
											{
												label: __(
													'Right',
													'mk-builder'
												),
												value: 'right',
											},
										] }
										onChange={ ( val ) =>
											setAttributes( {
												headingAlignmentTablet:
													val || '',
											} )
										}
									/>

									<SelectControl
										label={ __(
											'Mobile',
											'mk-builder'
										) }
										value={
											headingAlignmentMobile ||
											headingAlignment
										}
										options={ [
											{
												label: __(
													'Use Desktop',
													'mk-builder'
												),
												value: '',
											},
											{
												label: __(
													'Inherit from Content',
													'mk-builder'
												),
												value: 'inherit',
											},
											{
												label: __(
													'Left',
													'mk-builder'
												),
												value: 'left',
											},
											{
												label: __(
													'Center',
													'mk-builder'
												),
												value: 'center',
											},
											{
												label: __(
													'Right',
													'mk-builder'
												),
												value: 'right',
											},
										] }
										onChange={ ( val ) =>
											setAttributes( {
												headingAlignmentMobile:
													val || '',
											} )
										}
									/>
								</BaseControl>

								<Divider />

								<ToggleControl
									label={ __(
										'Show Highlight',
										'mk-builder'
									) }
									checked={ showHighlight }
									onChange={ ( val ) =>
										setAttributes( { showHighlight: val } )
									}
								/>

								{ showHighlight && (
									<>
										<TextControl
											label={ __(
												'Highlight Text',
												'mk-builder'
											) }
											value={ highlightText }
											onChange={ ( val ) =>
												setAttributes( {
													highlightText: val,
												} )
											}
											help={ __(
												'Text to highlight in the heading',
												'mk-builder'
											) }
										/>

										<PanelColorSettings
											title={ __(
												'Highlight Color',
												'mk-builder'
											) }
											colorSettings={ [
												{
													value: highlightColor,
													onChange: ( val ) =>
														setAttributes( {
															highlightColor: val,
														} ),
													label: __(
														'Color',
														'mk-builder'
													),
												},
											] }
										/>

										<RangeControl
											label={ __(
												'Highlight Font Weight',
												'mk-builder'
											) }
											value={ highlightFontWeight }
											onChange={ ( val ) =>
												setAttributes( {
													highlightFontWeight: val,
												} )
											}
											min={ 100 }
											max={ 900 }
											step={ 100 }
										/>

										<RangeControl
											label={ __(
												'Highlight Font Size (em)',
												'mk-builder'
											) }
											value={ highlightFontSize }
											onChange={ ( val ) =>
												setAttributes( {
													highlightFontSize: val,
												} )
											}
											min={ 0.8 }
											max={ 2 }
											step={ 0.1 }
										/>

										<Divider />

										<BaseControl
											label={ __(
												'Responsive Settings',
												'mk-builder'
											) }
											help={ __(
												'Customize highlight text for different screen sizes',
												'mk-builder'
											) }
										>
											<h4
												style={ {
													margin: '10px 0 5px 0',
													fontSize: '13px',
													fontWeight: 600,
												} }
											>
												{ __(
													'Tablet (992px and below)',
													'mk-builder'
												) }
											</h4>
											<PanelColorSettings
												title={ __(
													'Highlight Color (Tablet)',
													'mk-builder'
												) }
												colorSettings={ [
													{
														value:
															highlightColorTablet ||
															highlightColor,
														onChange: ( val ) =>
															setAttributes( {
																highlightColorTablet:
																	val || '',
															} ),
														label: __(
															'Color',
															'mk-builder'
														),
													},
												] }
											/>

											<RangeControl
												label={ __(
													'Font Weight (Tablet)',
													'mk-builder'
												) }
												value={
													highlightFontWeightTablet
												}
												onChange={ ( val ) =>
													setAttributes( {
														highlightFontWeightTablet:
															val,
													} )
												}
												min={ 100 }
												max={ 900 }
												step={ 100 }
											/>

											<RangeControl
												label={ __(
													'Font Size (em) - Tablet',
													'mk-builder'
												) }
												value={
													highlightFontSizeTablet
												}
												onChange={ ( val ) =>
													setAttributes( {
														highlightFontSizeTablet:
															val,
													} )
												}
												min={ 0.8 }
												max={ 2 }
												step={ 0.1 }
											/>

											<Divider />

											<h4
												style={ {
													margin: '10px 0 5px 0',
													fontSize: '13px',
													fontWeight: 600,
												} }
											>
												{ __(
													'Mobile (768px and below)',
													'mk-builder'
												) }
											</h4>
											<PanelColorSettings
												title={ __(
													'Highlight Color (Mobile)',
													'mk-builder'
												) }
												colorSettings={ [
													{
														value:
															highlightColorMobile ||
															highlightColor,
														onChange: ( val ) =>
															setAttributes( {
																highlightColorMobile:
																	val || '',
															} ),
														label: __(
															'Color',
															'mk-builder'
														),
													},
												] }
											/>

											<RangeControl
												label={ __(
													'Font Weight (Mobile)',
													'mk-builder'
												) }
												value={
													highlightFontWeightMobile
												}
												onChange={ ( val ) =>
													setAttributes( {
														highlightFontWeightMobile:
															val,
													} )
												}
												min={ 100 }
												max={ 900 }
												step={ 100 }
											/>

											<RangeControl
												label={ __(
													'Font Size (em) - Mobile',
													'mk-builder'
												) }
												value={
													highlightFontSizeMobile
												}
												onChange={ ( val ) =>
													setAttributes( {
														highlightFontSizeMobile:
															val,
													} )
												}
												min={ 0.8 }
												max={ 2 }
												step={ 0.1 }
											/>
										</BaseControl>
									</>
								) }
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Description', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Description', 'mk-builder' ) }
							checked={ showDescription }
							onChange={ ( val ) =>
								setAttributes( { showDescription: val } )
							}
						/>

						{ showDescription && (
							<>
								<RichText
									tagName="p"
									value={ description }
									onChange={ ( val ) =>
										setAttributes( { description: val } )
									}
									placeholder={ __(
										'Description text...',
										'mk-builder'
									) }
								/>

								<BaseControl
									label={ __(
										'Text Color',
										'mk-builder'
									) }
								>
									<PanelColorSettings
										title={ __(
											'Desktop',
											'mk-builder'
										) }
										colorSettings={ [
											{
												value: descriptionColor,
												onChange: ( val ) =>
													setAttributes( {
														descriptionColor: val,
													} ),
												label: __(
													'Color',
													'mk-builder'
												),
											},
										] }
									/>

									<PanelColorSettings
										title={ __(
											'Tablet',
											'mk-builder'
										) }
										colorSettings={ [
											{
												value:
													descriptionColorTablet ||
													descriptionColor,
												onChange: ( val ) =>
													setAttributes( {
														descriptionColorTablet:
															val || '',
													} ),
												label: __(
													'Color (Tablet)',
													'mk-builder'
												),
											},
										] }
									/>

									<PanelColorSettings
										title={ __(
											'Mobile',
											'mk-builder'
										) }
										colorSettings={ [
											{
												value:
													descriptionColorMobile ||
													descriptionColor,
												onChange: ( val ) =>
													setAttributes( {
														descriptionColorMobile:
															val || '',
													} ),
												label: __(
													'Color (Mobile)',
													'mk-builder'
												),
											},
										] }
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __( 'Font Size', 'mk-builder' ) }
								>
									<RangeControl
										label={ __(
											'Desktop (rem)',
											'mk-builder'
										) }
										value={ descriptionFontSize }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionFontSize: val,
											} )
										}
										min={ 0.8 }
										max={ 2 }
										step={ 0.05 }
									/>

									<RangeControl
										label={ __(
											'Tablet (rem)',
											'mk-builder'
										) }
										value={ descriptionFontSizeTablet }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionFontSizeTablet: val,
											} )
										}
										min={ 0.8 }
										max={ 1.8 }
										step={ 0.05 }
									/>

									<RangeControl
										label={ __(
											'Mobile (rem)',
											'mk-builder'
										) }
										value={ descriptionFontSizeMobile }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionFontSizeMobile: val,
											} )
										}
										min={ 0.8 }
										max={ 1.5 }
										step={ 0.05 }
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Line Height',
										'mk-builder'
									) }
								>
									<RangeControl
										label={ __(
											'Desktop',
											'mk-builder'
										) }
										value={ descriptionLineHeight }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionLineHeight: val,
											} )
										}
										min={ 1 }
										max={ 2.5 }
										step={ 0.1 }
									/>

									<RangeControl
										label={ __(
											'Tablet',
											'mk-builder'
										) }
										value={ descriptionLineHeightTablet }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionLineHeightTablet:
													val,
											} )
										}
										min={ 1 }
										max={ 2.5 }
										step={ 0.1 }
									/>

									<RangeControl
										label={ __(
											'Mobile',
											'mk-builder'
										) }
										value={ descriptionLineHeightMobile }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionLineHeightMobile:
													val,
											} )
										}
										min={ 1 }
										max={ 2.5 }
										step={ 0.1 }
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Margin (px)',
										'mk-builder'
									) }
								>
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __( 'Desktop', 'mk-builder' ) }
									</h4>
									<RangeControl
										label={ __( 'Top', 'mk-builder' ) }
										value={ descriptionMarginTop }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionMarginTop: val,
											} )
										}
										min={ 0 }
										max={ 100 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Right', 'mk-builder' ) }
										value={ descriptionMarginRight }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionMarginRight: val,
											} )
										}
										min={ 0 }
										max={ 100 }
										step={ 5 }
									/>

									<RangeControl
										label={ __(
											'Bottom',
											'mk-builder'
										) }
										value={ descriptionMarginBottom }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionMarginBottom: val,
											} )
										}
										min={ 0 }
										max={ 100 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Left', 'mk-builder' ) }
										value={ descriptionMarginLeft }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionMarginLeft: val,
											} )
										}
										min={ 0 }
										max={ 100 }
										step={ 5 }
									/>

									<Divider />
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __( 'Tablet', 'mk-builder' ) }
									</h4>
									<RangeControl
										label={ __( 'Top', 'mk-builder' ) }
										value={ descriptionMarginTopTablet }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionMarginTopTablet: val,
											} )
										}
										min={ 0 }
										max={ 80 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Right', 'mk-builder' ) }
										value={ descriptionMarginRightTablet }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionMarginRightTablet:
													val,
											} )
										}
										min={ 0 }
										max={ 80 }
										step={ 5 }
									/>

									<RangeControl
										label={ __(
											'Bottom',
											'mk-builder'
										) }
										value={ descriptionMarginBottomTablet }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionMarginBottomTablet:
													val,
											} )
										}
										min={ 0 }
										max={ 80 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Left', 'mk-builder' ) }
										value={ descriptionMarginLeftTablet }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionMarginLeftTablet:
													val,
											} )
										}
										min={ 0 }
										max={ 80 }
										step={ 5 }
									/>

									<Divider />
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __( 'Mobile', 'mk-builder' ) }
									</h4>
									<RangeControl
										label={ __( 'Top', 'mk-builder' ) }
										value={ descriptionMarginTopMobile }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionMarginTopMobile: val,
											} )
										}
										min={ 0 }
										max={ 60 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Right', 'mk-builder' ) }
										value={ descriptionMarginRightMobile }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionMarginRightMobile:
													val,
											} )
										}
										min={ 0 }
										max={ 60 }
										step={ 5 }
									/>

									<RangeControl
										label={ __(
											'Bottom',
											'mk-builder'
										) }
										value={ descriptionMarginBottomMobile }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionMarginBottomMobile:
													val,
											} )
										}
										min={ 0 }
										max={ 60 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Left', 'mk-builder' ) }
										value={ descriptionMarginLeftMobile }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionMarginLeftMobile:
													val,
											} )
										}
										min={ 0 }
										max={ 60 }
										step={ 5 }
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Padding (px)',
										'mk-builder'
									) }
								>
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __( 'Desktop', 'mk-builder' ) }
									</h4>
									<RangeControl
										label={ __( 'Top', 'mk-builder' ) }
										value={ descriptionPaddingTop }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionPaddingTop: val,
											} )
										}
										min={ 0 }
										max={ 50 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Right', 'mk-builder' ) }
										value={ descriptionPaddingRight }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionPaddingRight: val,
											} )
										}
										min={ 0 }
										max={ 50 }
										step={ 5 }
									/>

									<RangeControl
										label={ __(
											'Bottom',
											'mk-builder'
										) }
										value={ descriptionPaddingBottom }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionPaddingBottom: val,
											} )
										}
										min={ 0 }
										max={ 50 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Left', 'mk-builder' ) }
										value={ descriptionPaddingLeft }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionPaddingLeft: val,
											} )
										}
										min={ 0 }
										max={ 50 }
										step={ 5 }
									/>

									<Divider />
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __( 'Tablet', 'mk-builder' ) }
									</h4>
									<RangeControl
										label={ __( 'Top', 'mk-builder' ) }
										value={ descriptionPaddingTopTablet }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionPaddingTopTablet:
													val,
											} )
										}
										min={ 0 }
										max={ 40 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Right', 'mk-builder' ) }
										value={ descriptionPaddingRightTablet }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionPaddingRightTablet:
													val,
											} )
										}
										min={ 0 }
										max={ 40 }
										step={ 5 }
									/>

									<RangeControl
										label={ __(
											'Bottom',
											'mk-builder'
										) }
										value={ descriptionPaddingBottomTablet }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionPaddingBottomTablet:
													val,
											} )
										}
										min={ 0 }
										max={ 40 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Left', 'mk-builder' ) }
										value={ descriptionPaddingLeftTablet }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionPaddingLeftTablet:
													val,
											} )
										}
										min={ 0 }
										max={ 40 }
										step={ 5 }
									/>

									<Divider />
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __( 'Mobile', 'mk-builder' ) }
									</h4>
									<RangeControl
										label={ __( 'Top', 'mk-builder' ) }
										value={ descriptionPaddingTopMobile }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionPaddingTopMobile:
													val,
											} )
										}
										min={ 0 }
										max={ 30 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Right', 'mk-builder' ) }
										value={ descriptionPaddingRightMobile }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionPaddingRightMobile:
													val,
											} )
										}
										min={ 0 }
										max={ 30 }
										step={ 5 }
									/>

									<RangeControl
										label={ __(
											'Bottom',
											'mk-builder'
										) }
										value={ descriptionPaddingBottomMobile }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionPaddingBottomMobile:
													val,
											} )
										}
										min={ 0 }
										max={ 30 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Left', 'mk-builder' ) }
										value={ descriptionPaddingLeftMobile }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionPaddingLeftMobile:
													val,
											} )
										}
										min={ 0 }
										max={ 30 }
										step={ 5 }
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Text Alignment',
										'mk-builder'
									) }
								>
									<SelectControl
										label={ __(
											'Desktop',
											'mk-builder'
										) }
										value={ descriptionAlignment }
										options={ [
											{
												label: __(
													'Inherit from Content',
													'mk-builder'
												),
												value: '',
											},
											{
												label: __(
													'Left',
													'mk-builder'
												),
												value: 'left',
											},
											{
												label: __(
													'Center',
													'mk-builder'
												),
												value: 'center',
											},
											{
												label: __(
													'Right',
													'mk-builder'
												),
												value: 'right',
											},
										] }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionAlignment: val || '',
											} )
										}
									/>

									<SelectControl
										label={ __(
											'Tablet',
											'mk-builder'
										) }
										value={
											descriptionAlignmentTablet ||
											descriptionAlignment
										}
										options={ [
											{
												label: __(
													'Use Desktop',
													'mk-builder'
												),
												value: '',
											},
											{
												label: __(
													'Inherit from Content',
													'mk-builder'
												),
												value: 'inherit',
											},
											{
												label: __(
													'Left',
													'mk-builder'
												),
												value: 'left',
											},
											{
												label: __(
													'Center',
													'mk-builder'
												),
												value: 'center',
											},
											{
												label: __(
													'Right',
													'mk-builder'
												),
												value: 'right',
											},
										] }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionAlignmentTablet:
													val || '',
											} )
										}
									/>

									<SelectControl
										label={ __(
											'Mobile',
											'mk-builder'
										) }
										value={
											descriptionAlignmentMobile ||
											descriptionAlignment
										}
										options={ [
											{
												label: __(
													'Use Desktop',
													'mk-builder'
												),
												value: '',
											},
											{
												label: __(
													'Inherit from Content',
													'mk-builder'
												),
												value: 'inherit',
											},
											{
												label: __(
													'Left',
													'mk-builder'
												),
												value: 'left',
											},
											{
												label: __(
													'Center',
													'mk-builder'
												),
												value: 'center',
											},
											{
												label: __(
													'Right',
													'mk-builder'
												),
												value: 'right',
											},
										] }
										onChange={ ( val ) =>
											setAttributes( {
												descriptionAlignmentMobile:
													val || '',
											} )
										}
									/>
								</BaseControl>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Newsletter Form', 'mk-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Show Newsletter Form',
								'mk-builder'
							) }
							checked={ showNewsletterForm }
							onChange={ ( val ) =>
								setAttributes( { showNewsletterForm: val } )
							}
						/>

						{ showNewsletterForm && (
							<>
								<BaseControl
									label={ __(
										'Margin (px)',
										'mk-builder'
									) }
								>
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __( 'Desktop', 'mk-builder' ) }
									</h4>
									<RangeControl
										label={ __( 'Top', 'mk-builder' ) }
										value={ formMarginTop }
										onChange={ ( val ) =>
											setAttributes( {
												formMarginTop: val,
											} )
										}
										min={ 0 }
										max={ 100 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Right', 'mk-builder' ) }
										value={ formMarginRight }
										onChange={ ( val ) =>
											setAttributes( {
												formMarginRight: val,
											} )
										}
										min={ 0 }
										max={ 100 }
										step={ 5 }
									/>

									<RangeControl
										label={ __(
											'Bottom',
											'mk-builder'
										) }
										value={ formMarginBottom }
										onChange={ ( val ) =>
											setAttributes( {
												formMarginBottom: val,
											} )
										}
										min={ 0 }
										max={ 100 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Left', 'mk-builder' ) }
										value={ formMarginLeft }
										onChange={ ( val ) =>
											setAttributes( {
												formMarginLeft: val,
											} )
										}
										min={ 0 }
										max={ 100 }
										step={ 5 }
									/>

									<Divider />
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __( 'Tablet', 'mk-builder' ) }
									</h4>
									<RangeControl
										label={ __( 'Top', 'mk-builder' ) }
										value={ formMarginTopTablet }
										onChange={ ( val ) =>
											setAttributes( {
												formMarginTopTablet: val,
											} )
										}
										min={ 0 }
										max={ 80 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Right', 'mk-builder' ) }
										value={ formMarginRightTablet }
										onChange={ ( val ) =>
											setAttributes( {
												formMarginRightTablet: val,
											} )
										}
										min={ 0 }
										max={ 80 }
										step={ 5 }
									/>

									<RangeControl
										label={ __(
											'Bottom',
											'mk-builder'
										) }
										value={ formMarginBottomTablet }
										onChange={ ( val ) =>
											setAttributes( {
												formMarginBottomTablet: val,
											} )
										}
										min={ 0 }
										max={ 80 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Left', 'mk-builder' ) }
										value={ formMarginLeftTablet }
										onChange={ ( val ) =>
											setAttributes( {
												formMarginLeftTablet: val,
											} )
										}
										min={ 0 }
										max={ 80 }
										step={ 5 }
									/>

									<Divider />
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __( 'Mobile', 'mk-builder' ) }
									</h4>
									<RangeControl
										label={ __( 'Top', 'mk-builder' ) }
										value={ formMarginTopMobile }
										onChange={ ( val ) =>
											setAttributes( {
												formMarginTopMobile: val,
											} )
										}
										min={ 0 }
										max={ 60 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Right', 'mk-builder' ) }
										value={ formMarginRightMobile }
										onChange={ ( val ) =>
											setAttributes( {
												formMarginRightMobile: val,
											} )
										}
										min={ 0 }
										max={ 60 }
										step={ 5 }
									/>

									<RangeControl
										label={ __(
											'Bottom',
											'mk-builder'
										) }
										value={ formMarginBottomMobile }
										onChange={ ( val ) =>
											setAttributes( {
												formMarginBottomMobile: val,
											} )
										}
										min={ 0 }
										max={ 60 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Left', 'mk-builder' ) }
										value={ formMarginLeftMobile }
										onChange={ ( val ) =>
											setAttributes( {
												formMarginLeftMobile: val,
											} )
										}
										min={ 0 }
										max={ 60 }
										step={ 5 }
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Padding (px)',
										'mk-builder'
									) }
								>
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __( 'Desktop', 'mk-builder' ) }
									</h4>
									<RangeControl
										label={ __( 'Top', 'mk-builder' ) }
										value={ formPaddingTop }
										onChange={ ( val ) =>
											setAttributes( {
												formPaddingTop: val,
											} )
										}
										min={ 0 }
										max={ 50 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Right', 'mk-builder' ) }
										value={ formPaddingRight }
										onChange={ ( val ) =>
											setAttributes( {
												formPaddingRight: val,
											} )
										}
										min={ 0 }
										max={ 50 }
										step={ 5 }
									/>

									<RangeControl
										label={ __(
											'Bottom',
											'mk-builder'
										) }
										value={ formPaddingBottom }
										onChange={ ( val ) =>
											setAttributes( {
												formPaddingBottom: val,
											} )
										}
										min={ 0 }
										max={ 50 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Left', 'mk-builder' ) }
										value={ formPaddingLeft }
										onChange={ ( val ) =>
											setAttributes( {
												formPaddingLeft: val,
											} )
										}
										min={ 0 }
										max={ 50 }
										step={ 5 }
									/>

									<Divider />
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __( 'Tablet', 'mk-builder' ) }
									</h4>
									<RangeControl
										label={ __( 'Top', 'mk-builder' ) }
										value={ formPaddingTopTablet }
										onChange={ ( val ) =>
											setAttributes( {
												formPaddingTopTablet: val,
											} )
										}
										min={ 0 }
										max={ 40 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Right', 'mk-builder' ) }
										value={ formPaddingRightTablet }
										onChange={ ( val ) =>
											setAttributes( {
												formPaddingRightTablet: val,
											} )
										}
										min={ 0 }
										max={ 40 }
										step={ 5 }
									/>

									<RangeControl
										label={ __(
											'Bottom',
											'mk-builder'
										) }
										value={ formPaddingBottomTablet }
										onChange={ ( val ) =>
											setAttributes( {
												formPaddingBottomTablet: val,
											} )
										}
										min={ 0 }
										max={ 40 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Left', 'mk-builder' ) }
										value={ formPaddingLeftTablet }
										onChange={ ( val ) =>
											setAttributes( {
												formPaddingLeftTablet: val,
											} )
										}
										min={ 0 }
										max={ 40 }
										step={ 5 }
									/>

									<Divider />
									<h4
										style={ {
											margin: '10px 0 5px 0',
											fontSize: '13px',
											fontWeight: 600,
										} }
									>
										{ __( 'Mobile', 'mk-builder' ) }
									</h4>
									<RangeControl
										label={ __( 'Top', 'mk-builder' ) }
										value={ formPaddingTopMobile }
										onChange={ ( val ) =>
											setAttributes( {
												formPaddingTopMobile: val,
											} )
										}
										min={ 0 }
										max={ 30 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Right', 'mk-builder' ) }
										value={ formPaddingRightMobile }
										onChange={ ( val ) =>
											setAttributes( {
												formPaddingRightMobile: val,
											} )
										}
										min={ 0 }
										max={ 30 }
										step={ 5 }
									/>

									<RangeControl
										label={ __(
											'Bottom',
											'mk-builder'
										) }
										value={ formPaddingBottomMobile }
										onChange={ ( val ) =>
											setAttributes( {
												formPaddingBottomMobile: val,
											} )
										}
										min={ 0 }
										max={ 30 }
										step={ 5 }
									/>

									<RangeControl
										label={ __( 'Left', 'mk-builder' ) }
										value={ formPaddingLeftMobile }
										onChange={ ( val ) =>
											setAttributes( {
												formPaddingLeftMobile: val,
											} )
										}
										min={ 0 }
										max={ 30 }
										step={ 5 }
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Form Max Width (px)',
										'mk-builder'
									) }
								>
									<RangeControl
										label={ __(
											'Desktop',
											'mk-builder'
										) }
										value={ formMaxWidth }
										onChange={ ( val ) =>
											setAttributes( {
												formMaxWidth: val,
											} )
										}
										min={ 300 }
										max={ 800 }
										step={ 10 }
									/>

									<RangeControl
										label={ __(
											'Tablet',
											'mk-builder'
										) }
										value={ formMaxWidthTablet }
										onChange={ ( val ) =>
											setAttributes( {
												formMaxWidthTablet: val,
											} )
										}
										min={ 300 }
										max={ 800 }
										step={ 10 }
									/>

									<RangeControl
										label={ __(
											'Mobile',
											'mk-builder'
										) }
										value={ formMaxWidthMobile }
										onChange={ ( val ) =>
											setAttributes( {
												formMaxWidthMobile: val,
											} )
										}
										min={ 250 }
										max={ 600 }
										step={ 10 }
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Form Border Radius (px)',
										'mk-builder'
									) }
								>
									<RangeControl
										label={ __(
											'Desktop',
											'mk-builder'
										) }
										value={ formBorderRadius }
										onChange={ ( val ) =>
											setAttributes( {
												formBorderRadius: val,
											} )
										}
										min={ 0 }
										max={ 100 }
										step={ 5 }
									/>

									<RangeControl
										label={ __(
											'Tablet',
											'mk-builder'
										) }
										value={ formBorderRadiusTablet }
										onChange={ ( val ) =>
											setAttributes( {
												formBorderRadiusTablet: val,
											} )
										}
										min={ 0 }
										max={ 100 }
										step={ 5 }
									/>

									<RangeControl
										label={ __(
											'Mobile',
											'mk-builder'
										) }
										value={ formBorderRadiusMobile }
										onChange={ ( val ) =>
											setAttributes( {
												formBorderRadiusMobile: val,
											} )
										}
										min={ 0 }
										max={ 100 }
										step={ 5 }
									/>
								</BaseControl>

								<Divider />

								<BaseControl
									label={ __(
										'Form Alignment',
										'mk-builder'
									) }
								>
									<SelectControl
										label={ __(
											'Desktop',
											'mk-builder'
										) }
										value={ formAlignment }
										options={ [
											{
												label: __(
													'Inherit from Content',
													'mk-builder'
												),
												value: '',
											},
											{
												label: __(
													'Left',
													'mk-builder'
												),
												value: 'left',
											},
											{
												label: __(
													'Center',
													'mk-builder'
												),
												value: 'center',
											},
											{
												label: __(
													'Right',
													'mk-builder'
												),
												value: 'right',
											},
										] }
										onChange={ ( val ) =>
											setAttributes( {
												formAlignment: val || '',
											} )
										}
									/>

									<SelectControl
										label={ __(
											'Tablet',
											'mk-builder'
										) }
										value={
											formAlignmentTablet || formAlignment
										}
										options={ [
											{
												label: __(
													'Use Desktop',
													'mk-builder'
												),
												value: '',
											},
											{
												label: __(
													'Inherit from Content',
													'mk-builder'
												),
												value: 'inherit',
											},
											{
												label: __(
													'Left',
													'mk-builder'
												),
												value: 'left',
											},
											{
												label: __(
													'Center',
													'mk-builder'
												),
												value: 'center',
											},
											{
												label: __(
													'Right',
													'mk-builder'
												),
												value: 'right',
											},
										] }
										onChange={ ( val ) =>
											setAttributes( {
												formAlignmentTablet: val || '',
											} )
										}
									/>

									<SelectControl
										label={ __(
											'Mobile',
											'mk-builder'
										) }
										value={
											formAlignmentMobile || formAlignment
										}
										options={ [
											{
												label: __(
													'Use Desktop',
													'mk-builder'
												),
												value: '',
											},
											{
												label: __(
													'Inherit from Content',
													'mk-builder'
												),
												value: 'inherit',
											},
											{
												label: __(
													'Left',
													'mk-builder'
												),
												value: 'left',
											},
											{
												label: __(
													'Center',
													'mk-builder'
												),
												value: 'center',
											},
											{
												label: __(
													'Right',
													'mk-builder'
												),
												value: 'right',
											},
										] }
										onChange={ ( val ) =>
											setAttributes( {
												formAlignmentMobile: val || '',
											} )
										}
									/>
								</BaseControl>

								<Divider />

								<ToggleControl
									label={ __(
										'Enable Box Shadow',
										'mk-builder'
									) }
									checked={ formBoxShadow }
									onChange={ ( val ) =>
										setAttributes( { formBoxShadow: val } )
									}
								/>

								{ formBoxShadow && (
									<>
										<PanelColorSettings
											title={ __(
												'Shadow Color',
												'mk-builder'
											) }
											colorSettings={ [
												{
													value: formBoxShadowColor,
													onChange: ( val ) =>
														setAttributes( {
															formBoxShadowColor:
																val,
														} ),
													label: __(
														'Shadow Color',
														'mk-builder'
													),
												},
											] }
										/>

										<RangeControl
											label={ __(
												'Blur (px)',
												'mk-builder'
											) }
											value={ formBoxShadowBlur }
											onChange={ ( val ) =>
												setAttributes( {
													formBoxShadowBlur: val,
												} )
											}
											min={ 0 }
											max={ 50 }
											step={ 1 }
										/>

										<RangeControl
											label={ __(
												'Spread (px)',
												'mk-builder'
											) }
											value={ formBoxShadowSpread }
											onChange={ ( val ) =>
												setAttributes( {
													formBoxShadowSpread: val,
												} )
											}
											min={ -20 }
											max={ 20 }
											step={ 1 }
										/>

										<RangeControl
											label={ __(
												'Offset X (px)',
												'mk-builder'
											) }
											value={ formBoxShadowOffsetX }
											onChange={ ( val ) =>
												setAttributes( {
													formBoxShadowOffsetX: val,
												} )
											}
											min={ -20 }
											max={ 20 }
											step={ 1 }
										/>

										<RangeControl
											label={ __(
												'Offset Y (px)',
												'mk-builder'
											) }
											value={ formBoxShadowOffsetY }
											onChange={ ( val ) =>
												setAttributes( {
													formBoxShadowOffsetY: val,
												} )
											}
											min={ -20 }
											max={ 20 }
											step={ 1 }
										/>

										<Divider />

										<PanelColorSettings
											title={ __(
												'Focus Shadow Color',
												'mk-builder'
											) }
											colorSettings={ [
												{
													value: formFocusShadowColor,
													onChange: ( val ) =>
														setAttributes( {
															formFocusShadowColor:
																val,
														} ),
													label: __(
														'Focus Shadow Color',
														'mk-builder'
													),
												},
											] }
										/>

										<RangeControl
											label={ __(
												'Focus Shadow Blur (px)',
												'mk-builder'
											) }
											value={ formFocusShadowBlur }
											onChange={ ( val ) =>
												setAttributes( {
													formFocusShadowBlur: val,
												} )
											}
											min={ 0 }
											max={ 50 }
											step={ 1 }
										/>
									</>
								) }
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Email Input', 'mk-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Placeholder Text', 'mk-builder' ) }
							value={ emailPlaceholder }
							onChange={ ( val ) =>
								setAttributes( { emailPlaceholder: val } )
							}
						/>

						<BaseControl
							label={ __(
								'Email Input Colors',
								'mk-builder'
							) }
						>
							<h4
								style={ {
									margin: '10px 0 5px 0',
									fontSize: '13px',
									fontWeight: 600,
								} }
							>
								{ __( 'Desktop', 'mk-builder' ) }
							</h4>
							<PanelColorSettings
								title={ __(
									'Desktop Colors',
									'mk-builder'
								) }
								colorSettings={ [
									{
										value: emailBgColor,
										onChange: ( val ) =>
											setAttributes( {
												emailBgColor: val,
											} ),
										label: __(
											'Background Color',
											'mk-builder'
										),
									},
									{
										value: emailTextColor,
										onChange: ( val ) =>
											setAttributes( {
												emailTextColor: val,
											} ),
										label: __(
											'Text Color',
											'mk-builder'
										),
									},
									{
										value: emailPlaceholderColor,
										onChange: ( val ) =>
											setAttributes( {
												emailPlaceholderColor: val,
											} ),
										label: __(
											'Placeholder Color',
											'mk-builder'
										),
									},
									{
										value: emailBorderColor,
										onChange: ( val ) =>
											setAttributes( {
												emailBorderColor: val,
											} ),
										label: __(
											'Border Color',
											'mk-builder'
										),
									},
									{
										value: emailFocusBgColor,
										onChange: ( val ) =>
											setAttributes( {
												emailFocusBgColor: val,
											} ),
										label: __(
											'Focus Background',
											'mk-builder'
										),
									},
									{
										value: emailFocusBorderColor,
										onChange: ( val ) =>
											setAttributes( {
												emailFocusBorderColor: val,
											} ),
										label: __(
											'Focus Border Color',
											'mk-builder'
										),
									},
								] }
							/>

							<Divider />

							<h4
								style={ {
									margin: '10px 0 5px 0',
									fontSize: '13px',
									fontWeight: 600,
								} }
							>
								{ __(
									'Tablet (992px and below)',
									'mk-builder'
								) }
							</h4>
							<PanelColorSettings
								title={ __( 'Tablet Colors', 'mk-builder' ) }
								colorSettings={ [
									{
										value:
											emailBgColorTablet || emailBgColor,
										onChange: ( val ) =>
											setAttributes( {
												emailBgColorTablet: val || '',
											} ),
										label: __(
											'Background Color',
											'mk-builder'
										),
									},
									{
										value:
											emailTextColorTablet ||
											emailTextColor,
										onChange: ( val ) =>
											setAttributes( {
												emailTextColorTablet: val || '',
											} ),
										label: __(
											'Text Color',
											'mk-builder'
										),
									},
									{
										value:
											emailPlaceholderColorTablet ||
											emailPlaceholderColor,
										onChange: ( val ) =>
											setAttributes( {
												emailPlaceholderColorTablet:
													val || '',
											} ),
										label: __(
											'Placeholder Color',
											'mk-builder'
										),
									},
									{
										value:
											emailBorderColorTablet ||
											emailBorderColor,
										onChange: ( val ) =>
											setAttributes( {
												emailBorderColorTablet:
													val || '',
											} ),
										label: __(
											'Border Color',
											'mk-builder'
										),
									},
									{
										value:
											emailFocusBgColorTablet ||
											emailFocusBgColor,
										onChange: ( val ) =>
											setAttributes( {
												emailFocusBgColorTablet:
													val || '',
											} ),
										label: __(
											'Focus Background',
											'mk-builder'
										),
									},
									{
										value:
											emailFocusBorderColorTablet ||
											emailFocusBorderColor,
										onChange: ( val ) =>
											setAttributes( {
												emailFocusBorderColorTablet:
													val || '',
											} ),
										label: __(
											'Focus Border Color',
											'mk-builder'
										),
									},
								] }
							/>

							<Divider />

							<h4
								style={ {
									margin: '10px 0 5px 0',
									fontSize: '13px',
									fontWeight: 600,
								} }
							>
								{ __(
									'Mobile (768px and below)',
									'mk-builder'
								) }
							</h4>
							<PanelColorSettings
								title={ __( 'Mobile Colors', 'mk-builder' ) }
								colorSettings={ [
									{
										value:
											emailBgColorMobile || emailBgColor,
										onChange: ( val ) =>
											setAttributes( {
												emailBgColorMobile: val || '',
											} ),
										label: __(
											'Background Color',
											'mk-builder'
										),
									},
									{
										value:
											emailTextColorMobile ||
											emailTextColor,
										onChange: ( val ) =>
											setAttributes( {
												emailTextColorMobile: val || '',
											} ),
										label: __(
											'Text Color',
											'mk-builder'
										),
									},
									{
										value:
											emailPlaceholderColorMobile ||
											emailPlaceholderColor,
										onChange: ( val ) =>
											setAttributes( {
												emailPlaceholderColorMobile:
													val || '',
											} ),
										label: __(
											'Placeholder Color',
											'mk-builder'
										),
									},
									{
										value:
											emailBorderColorMobile ||
											emailBorderColor,
										onChange: ( val ) =>
											setAttributes( {
												emailBorderColorMobile:
													val || '',
											} ),
										label: __(
											'Border Color',
											'mk-builder'
										),
									},
									{
										value:
											emailFocusBgColorMobile ||
											emailFocusBgColor,
										onChange: ( val ) =>
											setAttributes( {
												emailFocusBgColorMobile:
													val || '',
											} ),
										label: __(
											'Focus Background',
											'mk-builder'
										),
									},
									{
										value:
											emailFocusBorderColorMobile ||
											emailFocusBorderColor,
										onChange: ( val ) =>
											setAttributes( {
												emailFocusBorderColorMobile:
													val || '',
											} ),
										label: __(
											'Focus Border Color',
											'mk-builder'
										),
									},
								] }
							/>
						</BaseControl>

						<BaseControl
							label={ __( 'Font Size', 'mk-builder' ) }
						>
							<RangeControl
								label={ __( 'Desktop (rem)', 'mk-builder' ) }
								value={ emailFontSize }
								onChange={ ( val ) =>
									setAttributes( { emailFontSize: val } )
								}
								min={ 0.7 }
								max={ 1.5 }
								step={ 0.05 }
							/>

							<RangeControl
								label={ __( 'Tablet (rem)', 'mk-builder' ) }
								value={ emailFontSizeTablet }
								onChange={ ( val ) =>
									setAttributes( {
										emailFontSizeTablet: val,
									} )
								}
								min={ 0.7 }
								max={ 1.3 }
								step={ 0.05 }
							/>

							<RangeControl
								label={ __( 'Mobile (rem)', 'mk-builder' ) }
								value={ emailFontSizeMobile }
								onChange={ ( val ) =>
									setAttributes( {
										emailFontSizeMobile: val,
									} )
								}
								min={ 0.7 }
								max={ 1.2 }
								step={ 0.05 }
							/>
						</BaseControl>

						<BaseControl
							label={ __( 'Padding Vertical', 'mk-builder' ) }
						>
							<RangeControl
								label={ __( 'Desktop (px)', 'mk-builder' ) }
								value={ emailPaddingVertical }
								onChange={ ( val ) =>
									setAttributes( {
										emailPaddingVertical: val,
									} )
								}
								min={ 8 }
								max={ 30 }
								step={ 1 }
							/>

							<RangeControl
								label={ __( 'Tablet (px)', 'mk-builder' ) }
								value={ emailPaddingVerticalTablet }
								onChange={ ( val ) =>
									setAttributes( {
										emailPaddingVerticalTablet: val,
									} )
								}
								min={ 8 }
								max={ 28 }
								step={ 1 }
							/>

							<RangeControl
								label={ __( 'Mobile (px)', 'mk-builder' ) }
								value={ emailPaddingVerticalMobile }
								onChange={ ( val ) =>
									setAttributes( {
										emailPaddingVerticalMobile: val,
									} )
								}
								min={ 8 }
								max={ 25 }
								step={ 1 }
							/>
						</BaseControl>

						<BaseControl
							label={ __(
								'Padding Horizontal',
								'mk-builder'
							) }
						>
							<RangeControl
								label={ __( 'Desktop (px)', 'mk-builder' ) }
								value={ emailPaddingHorizontal }
								onChange={ ( val ) =>
									setAttributes( {
										emailPaddingHorizontal: val,
									} )
								}
								min={ 12 }
								max={ 40 }
								step={ 1 }
							/>

							<RangeControl
								label={ __( 'Tablet (px)', 'mk-builder' ) }
								value={ emailPaddingHorizontalTablet }
								onChange={ ( val ) =>
									setAttributes( {
										emailPaddingHorizontalTablet: val,
									} )
								}
								min={ 12 }
								max={ 35 }
								step={ 1 }
							/>

							<RangeControl
								label={ __( 'Mobile (px)', 'mk-builder' ) }
								value={ emailPaddingHorizontalMobile }
								onChange={ ( val ) =>
									setAttributes( {
										emailPaddingHorizontalMobile: val,
									} )
								}
								min={ 12 }
								max={ 30 }
								step={ 1 }
							/>
						</BaseControl>
					</PanelBody>

					<PanelBody
						title={ __( 'Subscribe Button', 'mk-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Button Text', 'mk-builder' ) }
							value={ buttonText }
							onChange={ ( val ) =>
								setAttributes( { buttonText: val } )
							}
						/>

						<BaseControl
							label={ __( 'Button Colors', 'mk-builder' ) }
						>
							<h4
								style={ {
									margin: '10px 0 5px 0',
									fontSize: '13px',
									fontWeight: 600,
								} }
							>
								{ __( 'Desktop', 'mk-builder' ) }
							</h4>
							<PanelColorSettings
								title={ __(
									'Desktop Colors',
									'mk-builder'
								) }
								colorSettings={ [
									{
										value: buttonBgColor,
										onChange: ( val ) =>
											setAttributes( {
												buttonBgColor: val,
											} ),
										label: __(
											'Background Color',
											'mk-builder'
										),
									},
									{
										value: buttonHoverBgColor,
										onChange: ( val ) =>
											setAttributes( {
												buttonHoverBgColor: val,
											} ),
										label: __(
											'Hover Background Color',
											'mk-builder'
										),
									},
									{
										value: buttonTextColor,
										onChange: ( val ) =>
											setAttributes( {
												buttonTextColor: val,
											} ),
										label: __(
											'Text Color',
											'mk-builder'
										),
									},
								] }
							/>

							<Divider />

							<h4
								style={ {
									margin: '10px 0 5px 0',
									fontSize: '13px',
									fontWeight: 600,
								} }
							>
								{ __(
									'Tablet (992px and below)',
									'mk-builder'
								) }
							</h4>
							<PanelColorSettings
								title={ __( 'Tablet Colors', 'mk-builder' ) }
								colorSettings={ [
									{
										value:
											buttonBgColorTablet ||
											buttonBgColor,
										onChange: ( val ) =>
											setAttributes( {
												buttonBgColorTablet: val || '',
											} ),
										label: __(
											'Background Color',
											'mk-builder'
										),
									},
									{
										value:
											buttonHoverBgColorTablet ||
											buttonHoverBgColor,
										onChange: ( val ) =>
											setAttributes( {
												buttonHoverBgColorTablet:
													val || '',
											} ),
										label: __(
											'Hover Background Color',
											'mk-builder'
										),
									},
									{
										value:
											buttonTextColorTablet ||
											buttonTextColor,
										onChange: ( val ) =>
											setAttributes( {
												buttonTextColorTablet:
													val || '',
											} ),
										label: __(
											'Text Color',
											'mk-builder'
										),
									},
								] }
							/>

							<Divider />

							<h4
								style={ {
									margin: '10px 0 5px 0',
									fontSize: '13px',
									fontWeight: 600,
								} }
							>
								{ __(
									'Mobile (768px and below)',
									'mk-builder'
								) }
							</h4>
							<PanelColorSettings
								title={ __( 'Mobile Colors', 'mk-builder' ) }
								colorSettings={ [
									{
										value:
											buttonBgColorMobile ||
											buttonBgColor,
										onChange: ( val ) =>
											setAttributes( {
												buttonBgColorMobile: val || '',
											} ),
										label: __(
											'Background Color',
											'mk-builder'
										),
									},
									{
										value:
											buttonHoverBgColorMobile ||
											buttonHoverBgColor,
										onChange: ( val ) =>
											setAttributes( {
												buttonHoverBgColorMobile:
													val || '',
											} ),
										label: __(
											'Hover Background Color',
											'mk-builder'
										),
									},
									{
										value:
											buttonTextColorMobile ||
											buttonTextColor,
										onChange: ( val ) =>
											setAttributes( {
												buttonTextColorMobile:
													val || '',
											} ),
										label: __(
											'Text Color',
											'mk-builder'
										),
									},
								] }
							/>
						</BaseControl>

						<Divider />

						<BaseControl
							label={ __( 'Font Size', 'mk-builder' ) }
						>
							<RangeControl
								label={ __( 'Desktop (rem)', 'mk-builder' ) }
								value={ buttonFontSize }
								onChange={ ( val ) =>
									setAttributes( { buttonFontSize: val } )
								}
								min={ 0.7 }
								max={ 1.5 }
								step={ 0.05 }
							/>

							<RangeControl
								label={ __( 'Tablet (rem)', 'mk-builder' ) }
								value={ buttonFontSizeTablet }
								onChange={ ( val ) =>
									setAttributes( {
										buttonFontSizeTablet: val,
									} )
								}
								min={ 0.7 }
								max={ 1.3 }
								step={ 0.05 }
							/>

							<RangeControl
								label={ __( 'Mobile (rem)', 'mk-builder' ) }
								value={ buttonFontSizeMobile }
								onChange={ ( val ) =>
									setAttributes( {
										buttonFontSizeMobile: val,
									} )
								}
								min={ 0.7 }
								max={ 1.2 }
								step={ 0.05 }
							/>
						</BaseControl>

						<BaseControl
							label={ __( 'Font Weight', 'mk-builder' ) }
						>
							<RangeControl
								label={ __( 'Desktop', 'mk-builder' ) }
								value={ buttonFontWeight }
								onChange={ ( val ) =>
									setAttributes( { buttonFontWeight: val } )
								}
								min={ 100 }
								max={ 900 }
								step={ 100 }
							/>

							<RangeControl
								label={ __( 'Tablet', 'mk-builder' ) }
								value={ buttonFontWeightTablet }
								onChange={ ( val ) =>
									setAttributes( {
										buttonFontWeightTablet: val,
									} )
								}
								min={ 100 }
								max={ 900 }
								step={ 100 }
							/>

							<RangeControl
								label={ __( 'Mobile', 'mk-builder' ) }
								value={ buttonFontWeightMobile }
								onChange={ ( val ) =>
									setAttributes( {
										buttonFontWeightMobile: val,
									} )
								}
								min={ 100 }
								max={ 900 }
								step={ 100 }
							/>
						</BaseControl>

						<Divider />

						<BaseControl
							label={ __( 'Text Transform', 'mk-builder' ) }
						>
							<SelectControl
								label={ __( 'Desktop', 'mk-builder' ) }
								value={ buttonTextTransform }
								options={ [
									{
										label: __( 'None', 'mk-builder' ),
										value: 'none',
									},
									{
										label: __(
											'Uppercase',
											'mk-builder'
										),
										value: 'uppercase',
									},
									{
										label: __(
											'Lowercase',
											'mk-builder'
										),
										value: 'lowercase',
									},
									{
										label: __(
											'Capitalize',
											'mk-builder'
										),
										value: 'capitalize',
									},
								] }
								onChange={ ( val ) =>
									setAttributes( {
										buttonTextTransform: val,
									} )
								}
							/>

							<SelectControl
								label={ __( 'Tablet', 'mk-builder' ) }
								value={
									buttonTextTransformTablet ||
									buttonTextTransform
								}
								options={ [
									{
										label: __(
											'Use Desktop',
											'mk-builder'
										),
										value: '',
									},
									{
										label: __( 'None', 'mk-builder' ),
										value: 'none',
									},
									{
										label: __(
											'Uppercase',
											'mk-builder'
										),
										value: 'uppercase',
									},
									{
										label: __(
											'Lowercase',
											'mk-builder'
										),
										value: 'lowercase',
									},
									{
										label: __(
											'Capitalize',
											'mk-builder'
										),
										value: 'capitalize',
									},
								] }
								onChange={ ( val ) =>
									setAttributes( {
										buttonTextTransformTablet: val || '',
									} )
								}
							/>

							<SelectControl
								label={ __( 'Mobile', 'mk-builder' ) }
								value={
									buttonTextTransformMobile ||
									buttonTextTransform
								}
								options={ [
									{
										label: __(
											'Use Desktop',
											'mk-builder'
										),
										value: '',
									},
									{
										label: __( 'None', 'mk-builder' ),
										value: 'none',
									},
									{
										label: __(
											'Uppercase',
											'mk-builder'
										),
										value: 'uppercase',
									},
									{
										label: __(
											'Lowercase',
											'mk-builder'
										),
										value: 'lowercase',
									},
									{
										label: __(
											'Capitalize',
											'mk-builder'
										),
										value: 'capitalize',
									},
								] }
								onChange={ ( val ) =>
									setAttributes( {
										buttonTextTransformMobile: val || '',
									} )
								}
							/>
						</BaseControl>

						<Divider />

						<BaseControl
							label={ __(
								'Letter Spacing (px)',
								'mk-builder'
							) }
						>
							<RangeControl
								label={ __( 'Desktop', 'mk-builder' ) }
								value={ buttonLetterSpacing }
								onChange={ ( val ) =>
									setAttributes( {
										buttonLetterSpacing: val,
									} )
								}
								min={ 0 }
								max={ 2 }
								step={ 0.1 }
							/>

							<RangeControl
								label={ __( 'Tablet', 'mk-builder' ) }
								value={ buttonLetterSpacingTablet }
								onChange={ ( val ) =>
									setAttributes( {
										buttonLetterSpacingTablet: val,
									} )
								}
								min={ 0 }
								max={ 2 }
								step={ 0.1 }
							/>

							<RangeControl
								label={ __( 'Mobile', 'mk-builder' ) }
								value={ buttonLetterSpacingMobile }
								onChange={ ( val ) =>
									setAttributes( {
										buttonLetterSpacingMobile: val,
									} )
								}
								min={ 0 }
								max={ 2 }
								step={ 0.1 }
							/>
						</BaseControl>

						<BaseControl
							label={ __( 'Padding Vertical', 'mk-builder' ) }
						>
							<RangeControl
								label={ __( 'Desktop (px)', 'mk-builder' ) }
								value={ buttonPaddingVertical }
								onChange={ ( val ) =>
									setAttributes( {
										buttonPaddingVertical: val,
									} )
								}
								min={ 8 }
								max={ 30 }
								step={ 1 }
							/>

							<RangeControl
								label={ __( 'Tablet (px)', 'mk-builder' ) }
								value={ buttonPaddingVerticalTablet }
								onChange={ ( val ) =>
									setAttributes( {
										buttonPaddingVerticalTablet: val,
									} )
								}
								min={ 8 }
								max={ 28 }
								step={ 1 }
							/>

							<RangeControl
								label={ __( 'Mobile (px)', 'mk-builder' ) }
								value={ buttonPaddingVerticalMobile }
								onChange={ ( val ) =>
									setAttributes( {
										buttonPaddingVerticalMobile: val,
									} )
								}
								min={ 8 }
								max={ 25 }
								step={ 1 }
							/>
						</BaseControl>

						<BaseControl
							label={ __(
								'Padding Horizontal',
								'mk-builder'
							) }
						>
							<RangeControl
								label={ __( 'Desktop (px)', 'mk-builder' ) }
								value={ buttonPaddingHorizontal }
								onChange={ ( val ) =>
									setAttributes( {
										buttonPaddingHorizontal: val,
									} )
								}
								min={ 12 }
								max={ 60 }
								step={ 2 }
							/>

							<RangeControl
								label={ __( 'Tablet (px)', 'mk-builder' ) }
								value={ buttonPaddingHorizontalTablet }
								onChange={ ( val ) =>
									setAttributes( {
										buttonPaddingHorizontalTablet: val,
									} )
								}
								min={ 12 }
								max={ 50 }
								step={ 2 }
							/>

							<RangeControl
								label={ __( 'Mobile (px)', 'mk-builder' ) }
								value={ buttonPaddingHorizontalMobile }
								onChange={ ( val ) =>
									setAttributes( {
										buttonPaddingHorizontalMobile: val,
									} )
								}
								min={ 12 }
								max={ 40 }
								step={ 2 }
							/>
						</BaseControl>

						<Divider />

						<ToggleControl
							label={ __( 'Enable Box Shadow', 'mk-builder' ) }
							checked={ buttonBoxShadow }
							onChange={ ( val ) =>
								setAttributes( { buttonBoxShadow: val } )
							}
						/>

						{ buttonBoxShadow && (
							<>
								<PanelColorSettings
									title={ __(
										'Shadow Color',
										'mk-builder'
									) }
									colorSettings={ [
										{
											value: buttonBoxShadowColor,
											onChange: ( val ) =>
												setAttributes( {
													buttonBoxShadowColor: val,
												} ),
											label: __(
												'Shadow Color',
												'mk-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __( 'Blur (px)', 'mk-builder' ) }
									value={ buttonBoxShadowBlur }
									onChange={ ( val ) =>
										setAttributes( {
											buttonBoxShadowBlur: val,
										} )
									}
									min={ 0 }
									max={ 30 }
									step={ 1 }
								/>

								<RangeControl
									label={ __(
										'Spread (px)',
										'mk-builder'
									) }
									value={ buttonBoxShadowSpread }
									onChange={ ( val ) =>
										setAttributes( {
											buttonBoxShadowSpread: val,
										} )
									}
									min={ -10 }
									max={ 10 }
									step={ 1 }
								/>

								<RangeControl
									label={ __(
										'Offset X (px)',
										'mk-builder'
									) }
									value={ buttonBoxShadowOffsetX }
									onChange={ ( val ) =>
										setAttributes( {
											buttonBoxShadowOffsetX: val,
										} )
									}
									min={ -10 }
									max={ 10 }
									step={ 1 }
								/>

								<RangeControl
									label={ __(
										'Offset Y (px)',
										'mk-builder'
									) }
									value={ buttonBoxShadowOffsetY }
									onChange={ ( val ) =>
										setAttributes( {
											buttonBoxShadowOffsetY: val,
										} )
									}
									min={ -10 }
									max={ 10 }
									step={ 1 }
								/>

								<Divider />

								<RangeControl
									label={ __(
										'Hover Shadow Blur (px)',
										'mk-builder'
									) }
									value={ buttonHoverShadowBlur }
									onChange={ ( val ) =>
										setAttributes( {
											buttonHoverShadowBlur: val,
										} )
									}
									min={ 0 }
									max={ 30 }
									step={ 1 }
								/>

								<RangeControl
									label={ __(
										'Hover Shadow Offset Y (px)',
										'mk-builder'
									) }
									value={ buttonHoverShadowOffsetY }
									onChange={ ( val ) =>
										setAttributes( {
											buttonHoverShadowOffsetY: val,
										} )
									}
									min={ -10 }
									max={ 10 }
									step={ 1 }
								/>

								<RangeControl
									label={ __(
										'Hover Translate Y (px)',
										'mk-builder'
									) }
									value={ buttonHoverTranslateY }
									onChange={ ( val ) =>
										setAttributes( {
											buttonHoverTranslateY: val,
										} )
									}
									min={ -5 }
									max={ 5 }
									step={ 1 }
									help={ __(
										'Negative = up, Positive = down',
										'mk-builder'
									) }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Animation Settings', 'mk-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Enable Scroll Animation',
								'mk-builder'
							) }
							checked={ animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
						/>

						{ animationOnScroll && (
							<>
								<SelectControl
									label={ __(
										'Animation Type',
										'mk-builder'
									) }
									value={ animationType }
									options={ [
										{
											label: __(
												'Fade In Up',
												'mk-builder'
											),
											value: 'fadeInUp',
										},
										{
											label: __(
												'Fade In',
												'mk-builder'
											),
											value: 'fadeIn',
										},
										{
											label: __(
												'Slide In Left',
												'mk-builder'
											),
											value: 'slideInLeft',
										},
										{
											label: __(
												'Slide In Right',
												'mk-builder'
											),
											value: 'slideInRight',
										},
										{
											label: __(
												'Zoom In',
												'mk-builder'
											),
											value: 'zoomIn',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( { animationType: val } )
									}
								/>

								<RangeControl
									label={ __(
										'Animation Delay (ms)',
										'mk-builder'
									) }
									value={ animationDelay }
									onChange={ ( val ) =>
										setAttributes( { animationDelay: val } )
									}
									min={ 0 }
									max={ 500 }
									step={ 50 }
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ backgroundImage && showBackgroundOverlay && (
					<div
						className="background-overlay"
						style={ {
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundColor: backgroundOverlayColor,
							opacity: backgroundOverlayOpacity,
							zIndex: 1,
							pointerEvents: 'none',
						} }
					/>
				) }
				<div className="good-news-grid" style={ gridStyle }>
					<div
						className="good-news-content-wrapper"
						style={ contentWrapperStyle }
					>
						<div
							className="good-news-content"
							style={ contentStyle }
						>
							{ showMetaTitle && (
								<p
									className="meta-title"
									style={ {
										'--meta-font-size': `${ metaTitleFontSize }rem`,
										'--meta-font-weight':
											metaTitleFontWeight,
										'--meta-color': metaTitleColor,
										'--meta-text-transform':
											metaTitleTextTransform,
										'--meta-letter-spacing': `${ metaTitleLetterSpacing }px`,
										'--meta-margin-top': `${ metaTitleMarginTop }px`,
										'--meta-margin-right': `${ metaTitleMarginRight }px`,
										'--meta-margin-bottom': `${ metaTitleMarginBottom }px`,
										'--meta-margin-left': `${ metaTitleMarginLeft }px`,
										'--meta-padding-top': `${ metaTitlePaddingTop }px`,
										'--meta-padding-right': `${ metaTitlePaddingRight }px`,
										'--meta-padding-bottom': `${ metaTitlePaddingBottom }px`,
										'--meta-padding-left': `${ metaTitlePaddingLeft }px`,
										'--meta-font-size-tablet': `${ metaTitleFontSizeTablet }rem`,
										'--meta-font-size-mobile': `${ metaTitleFontSizeMobile }rem`,
										'--meta-font-weight-tablet':
											metaTitleFontWeightTablet,
										'--meta-font-weight-mobile':
											metaTitleFontWeightMobile,
										'--meta-color-tablet':
											metaTitleColorTablet ||
											metaTitleColor,
										'--meta-color-mobile':
											metaTitleColorMobile ||
											metaTitleColor,
										'--meta-text-transform-tablet':
											metaTitleTextTransformTablet ||
											metaTitleTextTransform,
										'--meta-text-transform-mobile':
											metaTitleTextTransformMobile ||
											metaTitleTextTransform,
										'--meta-letter-spacing-tablet': `${ metaTitleLetterSpacingTablet }px`,
										'--meta-letter-spacing-mobile': `${ metaTitleLetterSpacingMobile }px`,
										'--meta-margin-top-tablet': `${ metaTitleMarginTopTablet }px`,
										'--meta-margin-right-tablet': `${ metaTitleMarginRightTablet }px`,
										'--meta-margin-bottom-tablet': `${ metaTitleMarginBottomTablet }px`,
										'--meta-margin-left-tablet': `${ metaTitleMarginLeftTablet }px`,
										'--meta-margin-top-mobile': `${ metaTitleMarginTopMobile }px`,
										'--meta-margin-right-mobile': `${ metaTitleMarginRightMobile }px`,
										'--meta-margin-bottom-mobile': `${ metaTitleMarginBottomMobile }px`,
										'--meta-margin-left-mobile': `${ metaTitleMarginLeftMobile }px`,
										'--meta-padding-top-tablet': `${ metaTitlePaddingTopTablet }px`,
										'--meta-padding-right-tablet': `${ metaTitlePaddingRightTablet }px`,
										'--meta-padding-bottom-tablet': `${ metaTitlePaddingBottomTablet }px`,
										'--meta-padding-left-tablet': `${ metaTitlePaddingLeftTablet }px`,
										'--meta-padding-top-mobile': `${ metaTitlePaddingTopMobile }px`,
										'--meta-padding-right-mobile': `${ metaTitlePaddingRightMobile }px`,
										'--meta-padding-bottom-mobile': `${ metaTitlePaddingBottomMobile }px`,
										'--meta-padding-left-mobile': `${ metaTitlePaddingLeftMobile }px`,
										'--meta-alignment':
											metaTitleAlignment ||
											contentAlignment,
										'--meta-alignment-tablet':
											metaTitleAlignmentTablet ||
											metaTitleAlignment ||
											contentAlignmentTablet ||
											contentAlignment,
										'--meta-alignment-mobile':
											metaTitleAlignmentMobile ||
											metaTitleAlignment ||
											contentAlignmentMobile ||
											contentAlignment,
									} }
								>
									{ metaTitle }
								</p>
							) }

							{ showHeading && (
								<h2
									className="good-news-heading"
									style={ {
										'--heading-font-size': `${ headingFontSize }rem`,
										'--heading-font-weight':
											headingFontWeight,
										'--heading-color': headingColor,
										'--heading-line-height':
											headingLineHeight,
										'--heading-letter-spacing': `${ headingLetterSpacing }em`,
										'--heading-margin-top': `${ headingMarginTop }px`,
										'--heading-margin-right': `${ headingMarginRight }px`,
										'--heading-margin-bottom': `${ headingMarginBottom }px`,
										'--heading-margin-left': `${ headingMarginLeft }px`,
										'--heading-padding-top': `${ headingPaddingTop }px`,
										'--heading-padding-right': `${ headingPaddingRight }px`,
										'--heading-padding-bottom': `${ headingPaddingBottom }px`,
										'--heading-padding-left': `${ headingPaddingLeft }px`,
										'--heading-alignment':
											headingAlignment ||
											contentAlignment,
										'--heading-font-size-tablet': `${ headingFontSizeTablet }rem`,
										'--heading-font-size-mobile': `${ headingFontSizeMobile }rem`,
										'--heading-font-weight-tablet':
											headingFontWeightTablet,
										'--heading-font-weight-mobile':
											headingFontWeightMobile,
										'--heading-color-tablet':
											headingColorTablet || headingColor,
										'--heading-color-mobile':
											headingColorMobile || headingColor,
										'--heading-line-height-tablet':
											headingLineHeightTablet,
										'--heading-line-height-mobile':
											headingLineHeightMobile,
										'--heading-letter-spacing-tablet': `${ headingLetterSpacingTablet }em`,
										'--heading-letter-spacing-mobile': `${ headingLetterSpacingMobile }em`,
										'--heading-margin-top-tablet': `${ headingMarginTopTablet }px`,
										'--heading-margin-right-tablet': `${ headingMarginRightTablet }px`,
										'--heading-margin-bottom-tablet': `${ headingMarginBottomTablet }px`,
										'--heading-margin-left-tablet': `${ headingMarginLeftTablet }px`,
										'--heading-margin-top-mobile': `${ headingMarginTopMobile }px`,
										'--heading-margin-right-mobile': `${ headingMarginRightMobile }px`,
										'--heading-margin-bottom-mobile': `${ headingMarginBottomMobile }px`,
										'--heading-margin-left-mobile': `${ headingMarginLeftMobile }px`,
										'--heading-padding-top-tablet': `${ headingPaddingTopTablet }px`,
										'--heading-padding-right-tablet': `${ headingPaddingRightTablet }px`,
										'--heading-padding-bottom-tablet': `${ headingPaddingBottomTablet }px`,
										'--heading-padding-left-tablet': `${ headingPaddingLeftTablet }px`,
										'--heading-padding-top-mobile': `${ headingPaddingTopMobile }px`,
										'--heading-padding-right-mobile': `${ headingPaddingRightMobile }px`,
										'--heading-padding-bottom-mobile': `${ headingPaddingBottomMobile }px`,
										'--heading-padding-left-mobile': `${ headingPaddingLeftMobile }px`,
										'--heading-alignment':
											headingAlignment ||
											contentAlignment,
										'--heading-alignment-tablet':
											headingAlignmentTablet ||
											headingAlignment ||
											contentAlignmentTablet ||
											contentAlignment,
										'--heading-alignment-mobile':
											headingAlignmentMobile ||
											headingAlignment ||
											contentAlignmentMobile ||
											contentAlignment,
										'--highlight-color': highlightColor,
										'--highlight-color-tablet':
											highlightColorTablet ||
											highlightColor,
										'--highlight-color-mobile':
											highlightColorMobile ||
											highlightColor,
										'--highlight-font-weight':
											highlightFontWeight,
										'--highlight-font-weight-tablet':
											highlightFontWeightTablet,
										'--highlight-font-weight-mobile':
											highlightFontWeightMobile,
										'--highlight-font-size': `${ highlightFontSize }em`,
										'--highlight-font-size-tablet': `${ highlightFontSizeTablet }em`,
										'--highlight-font-size-mobile': `${ highlightFontSizeMobile }em`,
									} }
								>
									{ parseHeading( heading ) }
								</h2>
							) }

							{ showDescription && (
								<RichText
									tagName="p"
									className="good-news-description"
									value={ description }
									onChange={ ( val ) =>
										setAttributes( { description: val } )
									}
									placeholder={ __(
										'Description text...',
										'mk-builder'
									) }
									style={ {
										'--description-font-size': `${ descriptionFontSize }rem`,
										'--description-line-height':
											descriptionLineHeight,
										'--description-color': descriptionColor,
										'--description-margin-top': `${ descriptionMarginTop }px`,
										'--description-margin-right': `${ descriptionMarginRight }px`,
										'--description-margin-bottom': `${ descriptionMarginBottom }px`,
										'--description-margin-left': `${ descriptionMarginLeft }px`,
										'--description-padding-top': `${ descriptionPaddingTop }px`,
										'--description-padding-right': `${ descriptionPaddingRight }px`,
										'--description-padding-bottom': `${ descriptionPaddingBottom }px`,
										'--description-padding-left': `${ descriptionPaddingLeft }px`,
										'--description-alignment':
											descriptionAlignment ||
											contentAlignment,
										'--description-font-size-tablet': `${ descriptionFontSizeTablet }rem`,
										'--description-font-size-mobile': `${ descriptionFontSizeMobile }rem`,
										'--description-color-tablet':
											descriptionColorTablet ||
											descriptionColor,
										'--description-color-mobile':
											descriptionColorMobile ||
											descriptionColor,
										'--description-line-height-tablet':
											descriptionLineHeightTablet,
										'--description-line-height-mobile':
											descriptionLineHeightMobile,
										'--description-margin-top-tablet': `${ descriptionMarginTopTablet }px`,
										'--description-margin-right-tablet': `${ descriptionMarginRightTablet }px`,
										'--description-margin-bottom-tablet': `${ descriptionMarginBottomTablet }px`,
										'--description-margin-left-tablet': `${ descriptionMarginLeftTablet }px`,
										'--description-margin-top-mobile': `${ descriptionMarginTopMobile }px`,
										'--description-margin-right-mobile': `${ descriptionMarginRightMobile }px`,
										'--description-margin-bottom-mobile': `${ descriptionMarginBottomMobile }px`,
										'--description-margin-left-mobile': `${ descriptionMarginLeftMobile }px`,
										'--description-padding-top-tablet': `${ descriptionPaddingTopTablet }px`,
										'--description-padding-right-tablet': `${ descriptionPaddingRightTablet }px`,
										'--description-padding-bottom-tablet': `${ descriptionPaddingBottomTablet }px`,
										'--description-padding-left-tablet': `${ descriptionPaddingLeftTablet }px`,
										'--description-padding-top-mobile': `${ descriptionPaddingTopMobile }px`,
										'--description-padding-right-mobile': `${ descriptionPaddingRightMobile }px`,
										'--description-padding-bottom-mobile': `${ descriptionPaddingBottomMobile }px`,
										'--description-padding-left-mobile': `${ descriptionPaddingLeftMobile }px`,
										'--description-alignment-tablet':
											descriptionAlignmentTablet ||
											descriptionAlignment ||
											contentAlignmentTablet ||
											contentAlignment,
										'--description-alignment-mobile':
											descriptionAlignmentMobile ||
											descriptionAlignment ||
											contentAlignmentMobile ||
											contentAlignment,
									} }
								/>
							) }

							{ showNewsletterForm && (
								<form
									className="newsletter-form"
									style={ {
										marginTop: `${ formMarginTop }px`,
										marginRight: `${ formMarginRight }px`,
										marginBottom: `${ formMarginBottom }px`,
										marginLeft: `${ formMarginLeft }px`,
										paddingTop: `${ formPaddingTop }px`,
										paddingRight: `${ formPaddingRight }px`,
										paddingBottom: `${ formPaddingBottom }px`,
										paddingLeft: `${ formPaddingLeft }px`,
										'--form-margin-top': `${ formMarginTop }px`,
										'--form-margin-right': `${ formMarginRight }px`,
										'--form-margin-bottom': `${ formMarginBottom }px`,
										'--form-margin-left': `${ formMarginLeft }px`,
										'--form-padding-top': `${ formPaddingTop }px`,
										'--form-padding-right': `${ formPaddingRight }px`,
										'--form-padding-bottom': `${ formPaddingBottom }px`,
										'--form-padding-left': `${ formPaddingLeft }px`,
										width: '100%',
										textAlign:
											formAlignment || contentAlignment,
										'--form-margin-top-tablet': `${ formMarginTopTablet }px`,
										'--form-margin-right-tablet': `${ formMarginRightTablet }px`,
										'--form-margin-bottom-tablet': `${ formMarginBottomTablet }px`,
										'--form-margin-left-tablet': `${ formMarginLeftTablet }px`,
										'--form-margin-top-mobile': `${ formMarginTopMobile }px`,
										'--form-margin-right-mobile': `${ formMarginRightMobile }px`,
										'--form-margin-bottom-mobile': `${ formMarginBottomMobile }px`,
										'--form-margin-left-mobile': `${ formMarginLeftMobile }px`,
										'--form-padding-top-tablet': `${ formPaddingTopTablet }px`,
										'--form-padding-right-tablet': `${ formPaddingRightTablet }px`,
										'--form-padding-bottom-tablet': `${ formPaddingBottomTablet }px`,
										'--form-padding-left-tablet': `${ formPaddingLeftTablet }px`,
										'--form-padding-top-mobile': `${ formPaddingTopMobile }px`,
										'--form-padding-right-mobile': `${ formPaddingRightMobile }px`,
										'--form-padding-bottom-mobile': `${ formPaddingBottomMobile }px`,
										'--form-padding-left-mobile': `${ formPaddingLeftMobile }px`,
										'--form-alignment':
											formAlignment || contentAlignment,
										'--form-alignment-tablet':
											formAlignmentTablet ||
											formAlignment ||
											contentAlignmentTablet ||
											contentAlignment,
										'--form-alignment-mobile':
											formAlignmentMobile ||
											formAlignment ||
											contentAlignmentMobile ||
											contentAlignment,
									} }
									onSubmit={ ( e ) => e.preventDefault() }
								>
									<div
										className="form-group"
										style={ formGroupStyle }
									>
										<label
											htmlFor="newsletter-email-editor"
											className="visually-hidden"
										>
											{ __(
												'Email Address',
												'mk-builder'
											) }
										</label>
										<input
											id="newsletter-email-editor"
											type="email"
											placeholder={ emailPlaceholder }
											style={ emailInputStyle }
											readOnly
										/>

										<button
											type="submit"
											style={ buttonStyle }
										>
											{ buttonText }
										</button>
									</div>
								</form>
							) }
						</div>
					</div>

					<div className="good-news-image-bg" style={ imageBgStyle }>
						{ ! backgroundImage && (
							<div
								style={ {
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									height: '100%',
									backgroundColor: '#f0f0f0',
									color: '#999',
									fontSize: '0.9rem',
								} }
							>
								{ __(
									'Background Image Placeholder',
									'mk-builder'
								) }
							</div>
						) }
						{ showBackgroundOverlay && backgroundImage && (
							<div
								style={ {
									position: 'absolute',
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
									backgroundColor: backgroundOverlayColor,
									opacity: backgroundOverlayOpacity,
									pointerEvents: 'none',
									zIndex: 1,
								} }
							/>
						) }
					</div>
				</div>
			</div>
		</>
	);
}
