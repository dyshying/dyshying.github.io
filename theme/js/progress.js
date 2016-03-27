$(function(){
	(function(){
		var progress = $("<div id='progress' style='width:10%;'><span></span></div>").prependTo("body");
		(function() {
			if (progress.hasClass("done")) {
				progress.removeClass("done");
			}
			
			function load(y, t, callback) {
			
				progress.animate({
					'width': y + '%'
				}, t, function(){
					if (y > 99) {
						progress.addClass("done");
						progress.css("width","0");
					}
					callback && callback();
				});
			}
			
			function doLoad(progress, y, times, max) {
				var step = 5;
				var t = 100;
				y = y || step;
				times = times || 1;
				max = max || 10000;
				if(!progress.hasClass("done") && y<=max) {
					if(times < 100) {
						if(y<=98 - step) {
							load(y, t, function(){
								doLoad(progress, y + step, times + 1, max);
							});
						} else {
							load(y, t, function(){
								doLoad(progress, y + (99 - y) / 10, times + 1, max);
							});
						}
					} else {
						load(100, t);
					}
				}
			}
			
			doLoad(progress, 10);

			$(window).load(function(){
				progress.stop();
				progress.animate({
					'width': '100%'
				}, 500, function(){
					progress.addClass("done");
					progress.css("width","0");
				});
			});
			
			$("a").click(function(){
				var t = $(this);
				var href = t.attr("href");
				var target = t.attr("target") || "_self";
				if(href && !/^(javascript|#).*/i.test(href) && target == "_self") {
					progress.stop();
					progress.removeClass("done");
					doLoad(progress, 0, 0, 10);
				}
			});
			
		})();
		
	})();
	
});