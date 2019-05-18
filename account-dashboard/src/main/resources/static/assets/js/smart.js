var $;
var layer;
var form;
var element;
var laytpl;

layui.config({
	 base: '/assets/'
}).extend({
	dtree: 'lib/layui/ext/dtree/dtree',
	player: 'js/ext/player',
    select: 'js/ext/select'
});

layui.use(['jquery', 'element'], function(){
	$ = layui.jquery;
	element = layui.element;
});

var dtreeDefaultRequest = {
  nodeId: "parent", //节点ID
  parentId: "parentId", //父节点ID
  context: "context", //节点内容
  isLeaf: "leaf", //是否叶子节点
  level: "level", //层级
  spread: "spread", //节点展开状态
  dataType: "dataType", //节点标记
  ischecked: "ischecked", //节点复选框选中状态
  initchecked: "initchecked", //节点复选框初始状态
  basicData: "basicData" //用户自定义的记录节点数据
};

var dtreeRequest = {
}

var dtreeResponse = {
	statusName: "code", //返回标识
	statusCode: 0, //返回码
	message: "desc", //返回信息
	rootName: "data", //根节点名称
	treeId: "id", //节点ID
	parentId: "parentId", //父节点ID
	title: "name", //节点名称
	childName: "children", //子节点名称
	isLast: "leaf",
	spread: "spread", //节点展开状态（v2.4.5_finally_beta版本新增。true：展开，false：不展开，布尔值，非必填）
	checkArr: "checkArr", //复选框列表（开启复选框，默认是json数组。必填）
	isChecked: "checked", //是否选中（开启复选框，0-未选中，1-选中，2-半选。非必填）
	type: "type", //复选框标记（开启复选框，从0开始。非必填）
}

Date.prototype.format = function (fmt = "yyyy-MM-dd HH:mm:ss") { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

layui.use(['layer','jquery'], function(){
	var $ = layui.jquery;
	var layer = layui.layer;
	$(".content-wrapper").on("click", "img",function(event){
		var src = $(this).attr("src");
		if(src.length > 0){
			layer.open({
				  type: 1,
				  title: '预览',
				  content: '<div class="smart-image-layer"><img src="'+src+'"></div>'
				});
		}
	});
});

function enableSearch(){
	$("input[data-url]").each(function(){
		$(this).parent().append('<div class="smart-search-select"><ul></ul></div>');
		$(this).bind('input propertychange','input',function(data){
			var ele = this;
			var val = $(this).val();
			var sel = $(ele).parent().find(".smart-search-select");
			if(val.length > 0){
				var url = $(this).data("url");
				var field = $(this).data("field").split(",");
				var data = {search: val};
				$.get(url, data, function(result) {
					$(sel).find("ul").empty();
					if(result.code == 0 && result.data.length > 0){
						for(var idx in result.data){
							var str = "";
							for(var i in field){
								str += "<span>" + result.data[idx][field[i]] + "</span>";
							}
							$(sel).find("ul").append('<li data-id="' + result.data[idx].id + '">'+str+'</li>');
						}
						$(sel).find("ul li").click(function(){
							$(ele).val($(this).children("span:first").text());
							$(ele).parent().find("input[type='hidden']").val($(this).data("id"));
							$(sel).hide();
						});
						$(sel).show();
					}
				});
			}else{
				$(sel).hide();
			}
	    });
	});
}

function getParams(url){
	var params = new Array(); 
	var query;
	var start = url.indexOf('?');
	if(start < 0){
		return params;
	}
	if(url.indexOf('#') > 0){
		query = url.substring(start+1, url.indexOf('#'));
	}else{
		query = url.substring(start+1);
	}
	query = query.split("&");
	query.forEach(function(item, index){
		var pair = item.split("=");
		params[pair[0]] = pair[1];
	});
	return params;
}