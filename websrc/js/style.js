/**
 * @author jsm
 */

var console = window.console || { log: function() {} }; 
var wd;

wdCheck();

function wdCheck() {

    var wd = $(window).width();
    
    if (wd < 930) {
        $('html').css('overflow-x', 'auto');   
    } else {
        $('html').css('overflow-x', 'hidden');
    };
           
}


$(window).resize(function() {

    wdCheck();    
     
});

$(function(){
	// $( ".formSelect" ).wrap( "<div class='select_wrap'>" );

	$(".btn_popup_close a").on("click" , function(){
		$(this).parents(".popup_wrap").removeClass("on"),
		$(".dimm").removeClass("on");
	});

	$(".popup_wrap").each(function(){
		if($(this).hasClass("on")){
			var c_width = $(this).width() / 2 ,
				c_height = $(this).height() / 2;
			$(this).css({
				"margin-top" : - c_height ,
				"margin-left": - c_width
			})
		}
	});
	
})

