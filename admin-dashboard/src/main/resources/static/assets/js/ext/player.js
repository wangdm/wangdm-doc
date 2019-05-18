/*******************************************************************************
 * 自定义播放器模块
 */

layui.define([ 'jquery', 'layer' ], function(exports) {

    var option = {
	"id" : "VideoPlayer",
	"source" : "",
	"width" : "800px",
	"height" : "450px",
	"autoplay" : true,
	"isLive" : true,
	"rePlay" : false,
	"playsinline" : true,
	"preload" : true,
	"controlBarVisibility" : "hover",
	"useH5Prism" : true,
	"extraInfo" : {
	    "crossOrigin" : "anonymous"
	}
    };

    var layout = [ {
	"name" : "bigPlayButton",
	"align" : "blabs",
	"x" : 30,
	"y" : 80
    }, {
	"name" : "H5Loading",
	"align" : "cc"
    }, {
	"name" : "infoDisplay"
    }, {
	"name" : "tooltip",
	"align" : "blabs",
	"x" : 0,
	"y" : 56
    }, {
	"name" : "thumbnail"
    }, {
	"name" : "controlBar",
	"align" : "blabs",
	"x" : 0,
	"y" : 0,
	"children" : [ {
	    "name" : "progress",
	    "align" : "blabs",
	    "x" : 0,
	    "y" : 44
	}, {
	    "name" : "playButton",
	    "align" : "tl",
	    "x" : 15,
	    "y" : 12
	}, {
	    "name" : "timeDisplay",
	    "align" : "tl",
	    "x" : 10,
	    "y" : 7
	}, {
	    "name" : "fullScreenButton",
	    "align" : "tr",
	    "x" : 10,
	    "y" : 12
//	}, {
//	    "name" : "subtitle",
//	    "align" : "tr",
//	    "x" : 15,
//	    "y" : 12
//	}, {
//	    "name" : "setting",
//	    "align" : "tr",
//	    "x" : 15,
//	    "y" : 12
//	}, {
//	    "name" : "volume",
//	    "align" : "tr",
//	    "x" : 5,
//	    "y" : 10
//	}, {
//	    "name" : "snapshot",
//	    "align" : "tr",
//	    "x" : 10,
//	    "y" : 12
	} ]
    } ];

    var player = {
	render : function(element, options) { // 初始化树
	    option.id = element;
	    if (options) {
		option.source = options.source;
	    }
	    option.skinLayout = layout;
	    var vplayer = new Aliplayer(option, function(vplayer) {
		vplayer.mute();
		vplayer._switchLevel = 0;
	    });
	    return vplayer;
	}
    }

    exports('player', player);
});