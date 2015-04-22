define(
    ["jquery", "underscore"], 
    function(jQuery, _) {

        var staticInfo = JSON.parse($('.staticinfo').html());
        var isMobile = staticInfo.platform === 'mobile';
        var isTablet = false;
        if (!isMobile && window.Modernizr) {
            if (Modernizr.touch && window.innerHeight < 1300 && window.innerWidth < 1300) {
                isTablet = true;
            }
        }

        return _.extend(staticInfo, {
            isMobile: isMobile,
            isTablet: isTablet
        });
});