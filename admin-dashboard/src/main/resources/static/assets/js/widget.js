
var Widget = {};
layui.use(['dtree','form'], function(){
	var groupTree;
	var sectionTree;
	Widget = {
		showGroupTree: function(option){
			var tree = $("#GroupTreeWidget");
			if(tree.length > 0){
				layer.open({
					type: 1,
					title: '选择组',
					data:{},
					maxWidth: 780,
					content: $('#GroupTreeWidgetWrapper'),
					btn: ['确定'],
					yes:function(index, layero){
						layer.close(index);
						if(option.fn!=null){
							var param = layui.dtree.getNowParam(groupTree);
							if("undefined" != typeof param.parent){
								option.fn(param);
							}
						}
					},
				});
			}else{
				$.get("/widget/group", function(result) {
					$(document.body).append(result);
					groupTree = layui.dtree.render({
						elem: "#GroupTreeWidget",
						url: "/api/staff/group",
						method: "GET",
						defaultRequest:dtreeDefaultRequest,
						request: dtreeRequest,
						response: dtreeResponse,
						skin: "theme",
						checkbar: false,
						dataStyle: "layuiStyle"
					});
					layer.open({
						type: 1,
						title: '选择组',
						data:{},
						maxWidth: 780,
						content: $('#GroupTreeWidgetWrapper'),
						btn: ['确定'],
						yes:function(index, layero){
							layer.close(index);
							if(option.fn!=null){
								var param = layui.dtree.getNowParam(groupTree);
								if("undefined" != typeof param.parent){
									option.fn(param);
								}
							}
						},
						success: function(){
							
						},
						end: function(){
							$("#GroupTreeWidgetWrapper").hide();
						}
					});
				});
			}
		},
		showSectionTree: function(option){
			var tree = $("#SectionTreeWidget");
			if(tree.length > 0){
				layer.open({
					type: 1,
					title: '选择区域',
					data:{},
					maxWidth: 780,
					content: $('#SectionTreeWidgetWrapper'),
					btn: ['确定'],
					yes:function(index, layero){
						layer.close(index);
						if(option.fn!=null){
							var param = layui.dtree.getNowParam(sectionTree);
							if("undefined" != typeof param.parent){
								option.fn(param);
							}
						}
					},
				});
			}else{
				$.get("/widget/section", function(result) {
					$(document.body).append(result);
					sectionTree = layui.dtree.render({
						elem: "#SectionTreeWidget",
						url: "/api/section",
						method: "GET",
						defaultRequest:dtreeDefaultRequest,
						request: dtreeRequest,
						response: dtreeResponse,
						skin: "theme",
						dataStyle: "layuiStyle"
					});
					layer.open({
						type: 1,
						title: '选择区域',
						data:{},
						maxWidth: 780,
						content: $('#SectionTreeWidgetWrapper'),
						btn: ['确定'],
						yes:function(index, layero){
							layer.close(index);
							if(option.fn!=null){
								var param = layui.dtree.getNowParam(sectionTree);
								if("undefined" != typeof param.parent){
									option.fn(param);
								}
							}
						},
						success: function(){
							
						},
						end: function(){
							$("#SectionTreeWidgetWrapper").hide();
						}
					});
				});
			}
		},
		showPermTree: function(option){
			
		},
		showRoleList: function(option){
			
		}
	};
});