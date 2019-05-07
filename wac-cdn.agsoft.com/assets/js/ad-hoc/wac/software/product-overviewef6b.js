(function ($) {
  var imkt = window.imkt || (window.imkt = {});

  var $body = $('body');
  var isJiraPricing = false;
  var isJiraCorePricing = false;
  var isServiceDeskPricing = false;
  var isConfluencePricing = false;
  var purchasingUrl;

  var isMobile = function () {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  if ($body.hasClass('jira') && $body.hasClass('pricing')) {
    isJiraPricing = true;
    purchasingUrl = "https://www.atlassian.com/purchase/product/jira-software?unitCount=";
  }
  if ($body.hasClass('service-desk') && $body.hasClass('pricing')) {
    isServiceDeskPricing = true;
    isJiraPricing = false; // service-desk also has jira class
    purchasingUrl = "https://www.atlassian.com/purchase/product/jira-servicedesk?unitCount=";
  }
  if ($body.hasClass('core') && $body.hasClass('pricing')) {
    isJiraCorePricing = true;
    isJiraPricing = false; // JIRA Core also has jira class
    purchasingUrl = "https://www.atlassian.com/purchase/product/jira-core?unitCount=";
  }
  if ($body.hasClass('confluence') && $body.hasClass('pricing')) {
    isConfluencePricing = true;
    purchasingUrl = "https://www.atlassian.com/purchase/product/confluence?unitCount=";
  }


  // ==========================================================================
  // On document ready, bind events and get dependencies
  // ==========================================================================

  $(function () {

    var userTierSelect = $('[name^="usersSelectDropdown"]');
    if (userTierSelect.length && !isMobile()) {
      $.getScript(imkt.constants.libPath + "select2/select2.min.js" + imkt.constants.cdnVersionQuery).done(function () {
          userTierSelect.select2(
            {minimumResultsForSearch: -1}
          );
        }
      );
    }

    userTierSelect.on("change", function () {
      var optionValue = $(this).val().split(",");
      var userCount = optionValue[0];
      var price = optionValue[1];
      var $pricingColumn = $(this).parents('.pricing-column');

      $pricingColumn.find('.monthlyPricing').text(imkt.utils.general.numberWithCommas(price));

      if (isJiraPricing || isServiceDeskPricing || isJiraCorePricing || isConfluencePricing) {
        if ($pricingColumn.hasClass('server-with-buy-link')) {
          $pricingColumn.find('.buy-link a').attr('href', purchasingUrl + userCount);
        }
      }
    });

    // For JIRA/Confluence pricing
    if (isJiraPricing || isServiceDeskPricing || isJiraCorePricing || isConfluencePricing) {
      $('.host-on-your-server').find('a').on('click', function () {
        $('.tab-menu').find('[data-name="host-on-your-server"]').trigger('click');
        $("html, body").animate({scrollTop: 0}, 100);
        return false;
      });
      $('#showPricingTrigger').click(function () {
        $('.pricing-faq__table').toggle(0);
        return false;
      });
    }

    // Annual pricing toggle for JSD
    // TODO once this is live we will update the markup for other pricing pages to use this instead of an #id
    $('.showAnnualPricing').click(function () {
      $(this).parent('p').next('.pricing-faq__table').toggle();
      return false;
    });

    // After SVG conversation has been done, bind SVG animation scroll events
    $(document).on("imkt-svg-conversion-done", function() {

      $(".js-scrollTrigger").each(function () {
        var $el = $(this);
        $el.waypoint(function () {
          $el.addClass("active-in");

          // remove handler after waypoint fires once
          this.destroy();
        }, {
          offset: "50%"
        });
      });

    });

  }); // end document.ready


})(jQuery);
