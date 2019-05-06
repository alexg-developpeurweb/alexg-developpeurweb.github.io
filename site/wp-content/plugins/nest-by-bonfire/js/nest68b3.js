// BEGIN SHOW/HIDE NEST
jQuery('.nest-button-wrapper, .nest-close-button-wrapper, .nest-background-overlay, .nest-custom-activator').on('click', function(e) {
'use strict';
	e.preventDefault();
		if(jQuery('.nest-slide-wrapper').hasClass('nest-slide-wrapper-active'))
		{
			/* hide nest */
			jQuery('.nest-slide-wrapper').removeClass('nest-slide-wrapper-active');
            /* hide background overlay */
            jQuery('.nest-background-overlay').removeClass('nest-background-overlay-active');
		} else {
			/* show nest */
			jQuery('.nest-slide-wrapper').addClass('nest-slide-wrapper-active');
            /* show background overlay */
            jQuery('.nest-background-overlay').addClass('nest-background-overlay-active');
		}
});
// END SHOW/HIDE NEST

// BEGIN HIDE NEST WHEN ESC BUTTON PRESSED
jQuery(document).keyup(function(e) {
'use strict';
	if (e.keyCode == 27) { 

		/* hide nest */
		jQuery('.nest-slide-wrapper').removeClass('nest-slide-wrapper-active');
        /* hide background overlay */
        jQuery('.nest-background-overlay').removeClass('nest-background-overlay-active');

		return false;

	}
});
// END HIDE NEST WHEN ESC BUTTON PRESSED

// BEGIN SCROLLBAR
jQuery(document).ready(function(){
'use strict';
	jQuery('.nest-slide-inner-inner').scrollbar();
});
// END SCROLLBAR