define([], function () {
    'use strict';

    var svgForComp = {
        'default': 'default',
        'wysiwyg.viewer.components.WRichText': 'text',
        'wysiwyg.viewer.components.MediaRichText': 'text',
        'wysiwyg.viewer.components.WPhoto': 'wPhoto',
        'wysiwyg.viewer.components.MatrixGallery': 'galleries',
        'wysiwyg.viewer.components.SlideShowGallery': 'galleries',
        'wysiwyg.viewer.components.SliderGallery': 'galleries',
        'wysiwyg.viewer.components.PaginatedGridGallery': 'galleries',
        'wysiwyg.viewer.components.Video': 'video',
        'wysiwyg.viewer.components.SoundCloudWidget': 'soundCloud',
        'wysiwyg.viewer.components.AudioPlayer': 'audioPlayer',
        'mobile.core.components.Container': 'container',
        'wysiwyg.viewer.components.VerticalLine': 'verticalLine',
        'wysiwyg.viewer.components.FiveGridLine': 'horizontalLine',
        'wysiwyg.viewer.components.ClipArt': 'WPhoto',
        'wysiwyg.viewer.components.SiteButton': 'button',
        'wysiwyg.common.components.imagebutton.viewer.ImageButton': 'imageButton',
        'wysiwyg.viewer.components.ItunesButton': 'itunesButton',
        'wysiwyg.viewer.components.menus.DropDownMenu': 'horizontalMenu',
        'wysiwyg.viewer.components.documentmedia.DocumentMedia': 'documentMedia',
        'wysiwyg.viewer.components.HorizontalMenu': 'horizontalMenu',
        'wysiwyg.common.components.verticalmenu.viewer.VerticalMenu': 'verticalMenu',
        'wysiwyg.viewer.components.mobile.TinyMenu': 'tinyMenu',
        'wysiwyg.viewer.components.WFacebookLike': 'facebook',
        'wysiwyg.common.components.facebooklikebox.viewer.FacebookLikeBox': 'facebook',
        'wysiwyg.viewer.components.WFacebookComment': 'facebook',
        'wysiwyg.viewer.components.WTwitterFollow': 'twitter',
        'wysiwyg.viewer.components.WTwitterTweet': 'twitter',
        'wysiwyg.viewer.components.TwitterFeed': 'twitter',
        'wysiwyg.viewer.components.WGooglePlusOne': 'googlePlus',
        'wysiwyg.viewer.components.LinkBar': 'linkBar',
        'tpa.viewer.components.TPASection': 'appMarket',
        'tpa.viewer.components.TPAWidget': 'appMarket',
        'wysiwyg.viewer.components.tpapps.TPASection': 'appMarket',
        'wysiwyg.viewer.components.tpapps.TPAMultiSection': 'appMarket',
        'wysiwyg.viewer.components.tpapps.TPAWidget': 'appMarket',
        'wysiwyg.viewer.components.tpapps.TPAGluedWidget': 'appMarket',
        'tpa.viewer.components.TPAGallery': 'galleries',
        'tpa.viewer.components.TPAComponent': 'appMarket',
        'wysiwyg.viewer.components.ContactForm': 'contactForm',
        'wysiwyg.viewer.components.GoogleMap': 'googleMaps',
        'wysiwyg.viewer.components.HtmlComponent': 'htmlComponent',
        'wysiwyg.viewer.components.FlashComponent': 'flashComponent',
        'wysiwyg.viewer.components.PayPalButton': 'paypal',
        'wysiwyg.viewer.components.FlickrBadgeWidget': 'flicker',
        'wysiwyg.viewer.components.AdminLogin': 'webMasterLogin',
        'wysiwyg.viewer.components.AdminLoginButton': 'webMasterLogin',
        'wysiwyg.viewer.components.LoginButton': 'memberLogin',
        'wixapps.integration.components.AppPart': 'blog',
        'wixapps.integration.components.AppPart2': 'listBuilder',
        'wysiwyg.viewer.components.svgshape.SvgShape': 'svgShape',
        'wysiwyg.common.components.subscribeform.viewer.SubscribeForm': 'contactForm',
        'wysiwyg.common.components.singleaudioplayer.viewer.SingleAudioPlayer': 'singleAudioPlayer',
        'wysiwyg.viewer.components.BgImageStrip': 'strip',
        'wysiwyg.common.components.youtubesubscribebutton.viewer.YouTubeSubscribeButton': 'youtubeSubscribe',
        'wysiwyg.viewer.components.HeaderContainer': 'headerContainer',
        'wysiwyg.viewer.components.FooterContainer': 'footerContainer',
        'wysiwyg.common.components.pinitpinwidget.viewer.PinItPinWidget': 'pinterset',
        'wysiwyg.common.components.pinterestpinit.viewer.PinterestPinIt': 'pinterset',
        'wysiwyg.viewer.components.PinterestFollow': 'pinterset',
        'wysiwyg.common.components.skypecallbutton.viewer.SkypeCallButton': 'skype',
        'wysiwyg.viewer.components.VKShareButton': 'vkShare',
        'wysiwyg.common.components.spotifyfollow.viewer.SpotifyFollow': 'spotifyFollow',
        'wysiwyg.common.components.spotifyplayer.viewer.SpotifyPlayer': 'spotifyFollow',
        'wysiwyg.common.components.anchor.viewer.Anchor': 'anchor',
        'wysiwyg.common.components.rssbutton.viewer.RSSButton': 'rssButton'
    };

    return {
        getSvgNameForComp: function (compType) {
            if (svgForComp[compType]) {
                return svgForComp[compType];
            }
            return svgForComp.default;
        }
    };
});
