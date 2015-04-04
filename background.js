$('head').append('<link rel="stylesheet" href="style.css" type="text/css" />');

$("body").append('Test');
 // Gets all images 
$(function(){
	var images = [];
	$('*').each(function(){ 
	    if ($(this).is('img')) {
	    	images.push($(this).attr('src'));
	    	console.log("sending this url" + $(this).attr('src'));
	    	//$(this).attr('src','http://www.smashbros.com/images/og/dedede.jpg');
	    } 
	});

	//console.log(list);

	//console.log($.get("http://vertical-backup-841.appspot.com/decode",{'urls': images}).responseText);
	//var response = $.get("http://vertical-backup-841.appspot.com/decode",{'urls': images}).responseText;

	var msgMap = new Object();
	$.post("https://imageencode.appspot.com/decode", {'urls': JSON.stringify(images)}, function(data) {
			// Constructs a list of the items	
		console.log("printing "+data);
		//console.log("printing "+JSON.parseJSON(data));
		data = $.parseJSON(data);

		$.each(data,function(url,msg){
			
			msgMap[url] = data[msg];
			console.log("printing url "+url + "," + msg);
			$("img[src$='" + url + "']").css({'border': '1px solid red', 'z-index':'100'});
			$("img[src$='" + url + "']").before("<div class=\"text hide\">" + msg + "</div> ");

			$("img[src$='" + url + "']").hover(
				function(){console.log("hello");

					$(this).stop().animate({
		            opacity: .3
		        	}, 200);
		        	$(this).prev().removeClass('hide');    
		        },
				function(){console.log("bye")
					$(this).stop().animate({
	           	 	opacity: 1
	        	 	},500);
	        	 	$(this).prev().addClass('hide');      
				}
			);
		});
	});






	console.log("done");
});


