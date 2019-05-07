(function($) {

	// -------------------------------------------------------------- Align CTA buttons in product rows for varying text length

	var flexibleGridWidth = 1056;
	var mobileWidth = 667;
	var productRows = $('body:not(.edit) .product-row'); // Don't run for edit mode

	function equalizeProductColumnHeights() {
		if ($(window).width() > mobileWidth) {
			$.each(productRows, function() {
				var product = $(this).find('.product');
				equalHeights(product);
				product.addClass('height-adjusted');
			});
		}
	}

	function equalHeights(elements) {
		var tallestElement = 0;
		$.each(elements, function() {
			if ($(this).outerHeight() > tallestElement) {
				tallestElement = $(this).outerHeight();
			}
		});
		elements.height(tallestElement);
	}

	// Wait until images (logos) are loaded and initialize
	$(window).load(function(){
		equalizeProductColumnHeights();
	});

	// check for window resize and adjust column heights
	var resize;
	$(window).resize(function() {
		var $windowWidth = $(this).width();
		if ($windowWidth <= flexibleGridWidth) {
			$('.height-adjusted').css({'height':'auto'}).removeClass('height-adjusted');
		}
		clearTimeout(resize);
		if ($windowWidth > mobileWidth) {
			resize = setTimeout(equalizeProductColumnHeights, 200);
		}
	});

// -------------------------------------------------------------- Update Marketplace add-on count

	var marketplaceURL = "https://marketplace.atlassian.com/rest/2/addons";
	var addOnsCount = $('#add-ons-count').find('h1').find('span');

	// helper function
	function addCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	$.ajax({
		url: marketplaceURL,
		dataType: "json",
		crossDomain: true,
		timeout: 5000,
		cache: true
	}).done(function(data) {
		var numberCounter = [];
		var countBy = 7;
        var appsCount = data.count;

		if (parseInt(appsCount)) {
			for (var i = 0; i <= appsCount; i++) {
				if (i % countBy === 0) {
					numberCounter.push(addCommas(i));
				} else if (i === appsCount && appsCount % countBy !== 0) {
					numberCounter.push(addCommas(appsCount));
				}
			}
			addOnsCount.text("0");
			var waypoint = new Waypoint({
			  element: addOnsCount,
			  handler: function(direction) {
					function printNumbers(i) {
						setTimeout(function() {
							switch (numberCounter[i].length) {
								case 3:
									addOnsCount.css({"width":"88px"});
									break;
								case 5:
									addOnsCount.css({"width":"120px"});
									break;
								default:
									addOnsCount.css({"width":"70px"});
							}
							addOnsCount.text(numberCounter[i]);
						}, i * 5);
					}
			    for (i = 0; i < numberCounter.length; i++) {
						printNumbers(i);
					}
					this.destroy();
			  },
			  offset: 'bottom-in-view'
			});
		}
	});

})(jQuery);
