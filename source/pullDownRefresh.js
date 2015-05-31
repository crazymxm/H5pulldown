
var PullDownRefresh = function (){

this.myScroll =0;


this.loadingMsg ="loading...";
this.pulldownMsg= "Pull down to refresh...";
this.pullupMsg= "Pull up to load more...";


this.pullDownAction  =function (){};
 

this.pullUpAction = function() {}
/*
	
	*/
	
this.loaded = function(pulldownid,pullupid,wrapperid) {
	var pullDownEl = document.getElementById(pulldownid);//'pullDown'
	var pullDownOffset = pullDownEl.offsetHeight;
	var pullUpEl = document.getElementById(pullupid);//'pullUp'	
	var pullUpOffset = pullUpEl.offsetHeight;
 
	var m_wrapperid = wrapperid;
	
	var minScrollY =0;
	var maxScrollY =0;
	
	var that =this;
	
	this.myScroll = new iScroll(m_wrapperid, {
		useTransition: true,
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = that.pulldownMsg;
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = that.pullupMsg;
			}
		},
		onScrollMove: function () {
			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = that.pulldownMsg;
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = that.pullupMsg;
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = that.loadingMsg;				
				that.pullDownAction();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = that.loadingMsg;				
				that.pullUpAction();	// Execute custom function (ajax call?)
			}
		}
	});
	
	setTimeout(function () { document.getElementById(m_wrapperid).style.left = '0'; }, 800);
}

}

