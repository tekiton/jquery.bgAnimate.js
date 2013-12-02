(function($){

	jQuery.fn.bgAnimate = function(option){
	
		if(!option) option = {};
		
		option = $.extend({
			height    : null,
			duration  : 200,
			frame     : 5,
			loop      : 0,
			autoplay  : false,
			onPlay    : function(){},
			onStop    : function(){},
			onPause   : function(){},
			onComplete: function(){}
		}, option);
		
		return $(this).each(function(){
		
			var $self    = $(this);
			var height   = option.height || $self.height();
			var i        = 0;
			var loop     = option.loop;
			var timer    = null;
			var complete = false;
			
			var animate  = {
				play: function(){
					if(timer) return;
					if(complete){
						i = 0;
						complete = false;
					}
					timer = setInterval(function(){
						if(++i>=option.frame){
							i = 0;
							if(!loop){
								clearInterval(timer);
								timer = null;
								complete = true;
								option.onComplete();
								return;
							}else if(loop>0){
								loop--;
							}
						}
						$self.css({ backgroundPosition:'0 '+String(-height*i)+'px' });
					}, option.duration);
					option.onPlay();
				},
				start: function(){ animate.play(); },
				stop : function(){
					clearInterval(timer);
					timer = null;
					i = 0;
					option.onStop();
				},
				pause : function(){
					clearInterval(timer);
					timer = null;
					option.onPause();
				}
			};
			
			if(option.autoplay) animate.start();
			$self.data('animate', animate);
			
		});
		
	};

})(jQuery);
