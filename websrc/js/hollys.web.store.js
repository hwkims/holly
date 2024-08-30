$(function() {
    
    var idx;

    var $lmap = $('#MapStore').children();
    var $lmapOver = $('#MapStore').next().children();
    var $smap = $('#MapSeoul').children();
    var $smapOver = $('#MapSeoul').next().children();
    
    var sCity = $("select[name=sido]").val();
    var gugun = $("select[name=gugun]").val();

    var getSelected = function() {
    	$("select[name=sido]").val();
        var sArea;
        
        if(sCity=="서울") {   
            $smap.parent().parent().show();
            $sArea = $smapOver;
        } else { 
            $('.store_map').children().eq(0).css({opacity:1});
            $smap.parent().parent().hide();  
            $sArea = $lmapOver; 
        };
       
        $sArea.each(function(i) {
            var curCity = $(this).attr('alt');

            $(this).hide();
            if (sCity=="서울") {
                if(curCity == gugun) $(this).show();    
            } else {
                if (curCity == sCity) $(this).show();    
            }
        });            
    }
    
    var cityOverHandler = function() {
        idx = $(this).index();
        
        if(sCity=="서울") $smapOver.hide().eq(idx).show();
        else $lmapOver.hide().eq(idx).show();       
    }
    
    var cityLevaeHandler = function() {
        getSelected();        
    }
    
    var cityClickHandler = function(e) {     
        e.preventDefault();
        sCity = $(this).attr('alt');   
        gugun = $(this).attr('alt');

        if($("select[name=sido]").val()=="서울") location.href = "/store/korea/korStore.do?page=1&sido=서울&gugun="+gugun;
        else location.href = "/store/korea/korStore.do?page=1&sido="+sCity;     
    }

    $lmap.on('mouseenter' , cityOverHandler);
    $lmap.on('click' , cityClickHandler);  
    
    $smap.on('mouseenter' , cityOverHandler);
    $smap.on('click' , cityClickHandler);  
    
    $('.store_map').on('mouseleave' , cityLevaeHandler);
    
    getSelected();
    
});