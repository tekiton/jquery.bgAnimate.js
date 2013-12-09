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
			var stopped  = false;
			var duration = null;
			
			switch(typeof option.duration){
				case 'function':
					duration = option.duration;
				break;
				case 'object':
					if(option.duration instanceof Array){
						duration = function(i){ return option.duration[i%option.frame]; };
						break;
					}
				case 'number':
				default:
					duration = function(i){ return option.duration; };
				break;
			}
			
			var animate  = {
				
				play: function(){
					if(timer) return;
					if(complete){
						i = 0;
						complete = false;
					}
					stopped = false;
					var nextFrame = function(){
						clearTimeout(timer);
						if(stopped) return;
						if(++i>=option.frame){
							i = 0;
							if(!loop){
								stopped = true;
								timer = null;
								complete = true;
								option.onStop();
								option.onComplete();
								return;
							}else if(loop>0){
								loop--;
							}
						}
						$self.css({ backgroundPosition:'0 '+String(-height*i)+'px' });
						timer = setTimeout(nextFrame, duration(i));
					};
					timer = setTimeout(nextFrame, duration(i));
					option.onPlay();
				},
				
				start: function(){
					animate.play();
				},
				
				stop: function(){
					clearTimeout(timer);
					stopped = true;
					timer = null;
					i = 0;
					option.onStop();
				},
				
				pause: function(){
					clearTimeout(timer);
					stopped = true;
					timer = null;
					option.onPause();
				},
				
				reset: function(){
					animate.stop();
					$self.css({ backgroundPosition:'0 0' });
				}
				
			};
			
			if(option.autoplay) animate.start();
			$self.data('bgAnimate', animate);
			
		});
		
	};

})(jQuery);
