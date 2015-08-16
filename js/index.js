//window size

var WIDTH;
var MAX_WIDTH;

$(function(){
	/** Set WIDTH */
	sizeSetting();
	initialize();
	
	/** Scroll setting */
	var dataScroll = 0;
    $(document).bind('mousewheel', function(event, delta) {
		if((new Date().getTime() - dataScroll) > 500){
			if(delta >0){
				$("html, body").animate({scrollLeft:'-='+WIDTH }, 1000, "swing");
			}else if(delta < 0){
				$("html, body").animate({scrollLeft:'+='+WIDTH }, 1000, "swing");
			}
			dataScroll = new Date().getTime();
		}
		return false;
    });
	

	/** Menu slide */
	$('#menu a').click(function(e){
		var link=$(this).attr('href');
		$("html, body").animate({scrollLeft:$(link).offset().left }, 1200, "swing");	
		return false;
	});
	
	
	//FORM focus event
	$('input[type="text"], textarea').focus(function(e) {
		$(this).val('').focusout(function(e) {
			if($(this).val() == '' ){
				$(this).val($(this).attr('name'));
			}
		});
	});
	
	$('#question .arrow').mouseover(function(e) {
		var title = $('.question-box p');
		var question = $($(this).attr('data-name'));
		title.addClass('anime-reduction');
		question.addClass('anime-showQuestion');
		
		$(this).mouseleave(function(e) {
			title.removeClass('anime-reduction');
			question.removeClass('anime-showQuestion');			
		});
	});
	
	$('#entry a.maru').mouseover(function(e) {
		$('#entry .boxParent .box .maru2').addClass('anime-marubig');
		
		$(this).mouseleave(function(e) {
			$('#entry .boxParent .box .maru2').removeClass('anime-marubig');
		});
	});
});

$(window).resize(function() {
	sizeSetting();
});


function sizeSetting(){
	WIDTH = $('body').width();
	MAX_WIDTH = WIDTH * 6;
	$('#foundation').width(MAX_WIDTH);
	$('.content').width(WIDTH);
}

function initialize() {
    var latlng = new google.maps.LatLng(35.685175, 139.7528);
    var myOptions = {
		zoom:15,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true
    };
	
	var styleOptions = [{
		featureType: 'all',
		elementType: 'labels',
		stylers: [{ visibility: 'off' }]
	}, {
		featureType: 'all',
		elementType: 'geometry',
		stylers: [{ saturation: -100 }, {lightness: 0 }, { gamma: '0.8' }]
	}];
	
    var map = new google.maps.Map(document.getElementById("map"),
        myOptions);		
	var lopanType = new google.maps.StyledMapType(styleOptions);
	map.mapTypes.set('noText', lopanType);
	map.setMapTypeId('noText');
	
	new google.maps.Marker({
		position: latlng,
		map: map,
	});
}
