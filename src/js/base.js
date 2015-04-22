define([
	"jquery",
	"projectinfo",
	"config",
	"api/analytics"
	], function(jQuery, projectinfo, config, Analytics) {
		var baseURL = "http://www.gannett-cdn.com/experiments/usatoday/2015/04/campaign-slogans/images/";
		 
		var objImmerse = objImmerse || {};
		objImmerse.arrQuoteText = projectinfo;
		objImmerse.totalQuotes = 21;
		objImmerse.arrNextButtons = [];
		objImmerse.arrHTMLTag = [];
		objImmerse.arrBody = [];
		objImmerse.arrPageContainer = [];
		objImmerse.arrQuotes = [];
		objImmerse.arrQuotePanel = [];
		objImmerse.arrReferences = [];
		objImmerse.arrShare = [];
		objImmerse.currentClass = "center";
		objImmerse.currentQuote = 0;
		objImmerse.blnFirst = true;
		objImmerse.arrImages = [];

		objImmerse.reformatQuotes = function () {
			var intMinWidth = 860, intFontBase = 10, intMinHeight = 539, intFactorBase = 450, intDotAdjust = 0, intDotMinTouch = -22, intDotMinDesk = -13, i;
			if (window.innerWidth > window.innerHeight) {
				objImmerse.arrHTMLTag.removeClass("vert-display");
				intMinWidth = 860;
				intFontBase = 10;
				intMinHeight = 539;
			} else {
				objImmerse.arrHTMLTag.addClass("vert-display");
				intMinWidth = 400;
				intFontBase = 6;
				intMinHeight = 420;
			}
			if (window.innerWidth > intMinWidth) {
				var numFontSize = Math.floor((window.innerWidth / intMinWidth) * intFontBase);
				var numFactor = (window.innerWidth - intMinWidth) * (60/1600);
				var numHeight = Math.floor((window.innerWidth / intMinWidth) * (intFactorBase - numFactor));
				objImmerse.arrBody.css({"font-size": numFontSize.toString() + "px", "min-height" : numHeight.toString() + "px"});
			} else {
				objImmerse.arrBody.css({"font-size": intFontBase.toString() + "px", "min-height" : intMinHeight.toString() + "px"});
			}	
			if (objImmerse.arrHTMLTag.hasClass("vert-display")) {
				switch (objImmerse.currentClass) {
					case "left":
						objImmerse.arrPageContainer.css({"background-position" : "70% 0%"});
						break;
					case "center":
						objImmerse.arrPageContainer.css({"background-position" : "0% 45%"});
						break;
					case "right":
						objImmerse.arrPageContainer.css({"background-position" : "20% 0%"});
						break;
				}
			}
		};

		objImmerse.addEventListeners = function() {
			objImmerse.arrNextButtons.click(function(e) {
				objImmerse.nextQuote();
				Analytics.trackEvent("nextClicked" + objImmerse.currentQuote.toString());
			});
			/*
			var intImage = Math.floor(Math.random() * objImmerse.arrImages.length);
			objImmerse.arrPageContainer.css({"background-image" : "url(images/" + objImmerse.arrImages[intImage][0] + ")"});
			objImmerse.arrQuotePanel.removeClass(objImmerse.currentClass);
			objImmerse.arrQuotePanel.addClass(objImmerse.arrImages[intImage][1]);
			objImmerse.currentClass = objImmerse.arrImages[intImage][1];
			*/

		   objImmerse.arrContextButtons.click(function(e) {
		        objImmerse.arrContextWrap.toggle();
		   });

		   objImmerse.arrShareLinks.click(objImmerse.shareClick);
		};

		objImmerse.nextQuote = function() {
			objImmerse.currentQuote = objImmerse.currentQuote + 1;
			if ((objImmerse.currentQuote >= objImmerse.totalQuotes) || (objImmerse.blnFirst)) {
				objImmerse.currentQuote = 0;
			}
		    objImmerse.arrContextButtons.show();
			objImmerse.updateQuote(objImmerse.currentQuote);
		};

		objImmerse.updateQuote = function(intQuote) {
		    objImmerse.arrContextWrap.hide();
			objImmerse.blnFirst = false;
			objImmerse.arrQuotes.html(objImmerse.arrQuoteText[intQuote][0]);
			objImmerse.arrReferences.html(objImmerse.arrQuoteText[intQuote][1]);
			objImmerse.arrPageContainer.css({"background-image" : "url(" + baseURL + objImmerse.arrQuoteText[intQuote][2] + ")"});
			objImmerse.arrQuotePanel.removeClass(objImmerse.currentClass);
			objImmerse.arrQuotePanel.addClass(objImmerse.arrQuoteText[intQuote][3]);
			objImmerse.currentClass = objImmerse.arrQuoteText[intQuote][3];
		    objImmerse.arrContext.html(objImmerse.arrQuoteText[intQuote][4]);
			if (objImmerse.arrHTMLTag.hasClass("vert-display")) {
				switch (objImmerse.currentClass) {
					case "left":
						objImmerse.arrPageContainer.css({"background-position" : "70% 0%"});
						break;
					case "center":
						objImmerse.arrPageContainer.css({"background-position" : "0% 45%"});
						break;
					case "right":
						objImmerse.arrPageContainer.css({"background-position" : "20% 0%"});
						break;
				}
			}
			objImmerse.renderSocial();
		};

		objImmerse.renderSocial = function() {
			var strShareHead, strShareChatter, strShareTwitter;
			var strPageURL = document.location.href;
			if (strPageURL.indexOf("#") != -1) {
				strPageURL = strPageURL.substr(0, strPageURL.indexOf("#"));
			}
			strShareHead = "Say what? Absurd political slogans of the past";
			strShareChatter = objImmerse.arrQuoteText[objImmerse.currentQuote][0] + " As politicians begin to throw their hat in the 2016 presidential race, take a look at absurd political slogans of America past, and find out context about when and why they were used.";
			if (objImmerse.blnFirst) {
				strShareTwitter = strShareHead;
			} else {
				strShareTwitter = objImmerse.arrQuoteText[objImmerse.currentQuote][0];
			}
			strShareHead = strShareHead.replace(/'/gi, "\\'");
			strShareChatter = strShareChatter.replace(/\+/gi, "%2B");
			strShareTwitter = strShareTwitter.replace(/\+/gi, "%2B");
			objImmerse.arrShare.find(".fbshare").attr({"href" : "https://www.facebook.com/dialog/feed?display=popup&app_id=" + config.facebook.app_id + "&link=" + encodeURIComponent(strPageURL) + "&picture=http://www.gannett-cdn.com/experiments/usatoday/2015/04/campaign-slogans/images/fb-post.jpg&name=" + encodeURIComponent(strShareHead) + "&description=" + encodeURIComponent(strShareChatter) + "&redirect_uri=http://usatoday30.usatoday.com/_common/_dialogs/fb-share-done.html"});
			objImmerse.arrShare.find(".tshare").attr({"href" : "https://twitter.com/intent/tweet?url=" + encodeURIComponent(strPageURL) + "&text=" + encodeURIComponent(strShareTwitter) + "&via=usatoday"});
			objImmerse.arrShare.find(".eshare").attr({"href" : "mailto:?body=" + strShareChatter + " %0d%0d " + encodeURIComponent(strPageURL) + "&subject=" + strShareHead});
		};

		objImmerse.windowPopup = function(url, width, height) {
                // Calculate the position of the popup so
                // it’s centered on the screen.
                var left = (screen.width / 2) - (width / 2),
                top = (screen.height / 2) - (height / 2);

                window.open(
                    url,
                    "",
                    "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left
                );
            };

            objImmerse.shareClick = function(e) {
                Analytics.trackEvent('Social share button clicked');
                e.preventDefault();
                

              objImmerse.windowPopup(e.currentTarget.href, 500, 300);
            };


		objImmerse.shuffleAnswers = function (array) {
		  var currentIndex = array.length, temporaryValue, randomIndex;

		  // While there remain elements to shuffle...
		  while (0 !== currentIndex) {

		    // Pick a remaining element...
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

		    // And swap it with the current element.
		    temporaryValue = array[currentIndex];
		    array[currentIndex] = array[randomIndex];
		    array[randomIndex] = temporaryValue;
		  }

		  return array;
		};

		return {

			init : function(){
				//Created simple plugin to detect touchstart
				;(function($){
				    $.fn.extend({  touch: function(func) {  return this.each(function() { 	this.addEventListener("touchstart",func);   });  }   });
				})(jQuery);

				var i;
				//var intImageBlock = Math.floor(Math.random() * 3);
				objImmerse.arrHTMLTag = jQuery("html");
				objImmerse.arrBody = jQuery("body");
				objImmerse.arrPageContainer = jQuery(".page-container");
				objImmerse.arrQuotePanel = jQuery(".quote-panel");
				objImmerse.arrNextButtons = jQuery(".next");
			       objImmerse.arrContextButtons = jQuery(".show-context");
				objImmerse.arrQuotes = jQuery(".quote");
				objImmerse.arrReferences = jQuery(".reference");
			       objImmerse.arrContext = jQuery(".context").find('p');
			       objImmerse.arrContextWrap = jQuery(".context");
				objImmerse.arrShare = jQuery(".share");
				objImmerse.arrShareLinks = objImmerse.arrShare.find('a');
				objImmerse.totalQuotes = objImmerse.arrQuoteText.length;
				// objImmerse.shuffleAnswers(objImmerse.arrQuoteText);
				/*
				objImmerse.shuffleAnswers(objImmerse.arrImagesLeft);
				objImmerse.shuffleAnswers(objImmerse.arrImagesRight);
				objImmerse.shuffleAnswers(objImmerse.arrImagesCenter);
				switch (intImageBlock) {
					case 0: 
						objImmerse.arrImages = objImmerse.arrImages.concat(objImmerse.arrImagesLeft, objImmerse.arrImagesCenter, objImmerse.arrImagesRight);
						break;
					case 1: 
						objImmerse.arrImages = objImmerse.arrImages.concat(objImmerse.arrImagesRight, objImmerse.arrImagesCenter, objImmerse.arrImagesLeft);
						break;
					case 2: 
						objImmerse.arrImages = objImmerse.arrImages.concat(objImmerse.arrImagesCenter, objImmerse.arrImagesLeft, objImmerse.arrImagesRight);
						break;
				}
				*/
				var blnIframeEmbed = window != window.parent;
				if (config.isMobile || config.isTablet) {
					objImmerse.arrHTMLTag.addClass("touch");
				}
				if (config.isMobile) {
					objImmerse.arrHTMLTag.addClass("mobile");
				}
				if (blnIframeEmbed) {
					jQuery("#header").css({"display" : "none"});
				} 
				objImmerse.addEventListeners();
			 	window.addEventListener("orientationchange", function() {
					objImmerse.reformatQuotes();
				}, false);
				onresize=onload=function(){
					objImmerse.reformatQuotes();
				};

			    objImmerse.reformatQuotes();
			    objImmerse.renderSocial();
			}
		};


});

