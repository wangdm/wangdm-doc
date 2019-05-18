
layui.use(['table','form'], function(){
	var $ = layui.jquery;
	var table = layui.table;
	var form = layui.form;
	
	var criteria = {};
	
	var mainTable;
	var mainTableData;
	var editDlgIdx;
	var baseurl = '/admin/api/nav/';
	
	mainTable = table.render({
		elem: '#MainTable',
		toolbar: '#MainTableToolBar',
		url: baseurl,
		page: true,
		height:'full-0',
		cols: [[
			{type:'checkbox', fixed: 'left'},
			{field: 'id', title: 'ID'},
			{field: 'name', title: '导航'},
			{field: 'parentId', title: '父导航'},
			{field: 'idx', title: '显示顺序'},
			{field: 'icon', title: '图标'},
			{field: 'url', title: '链接地址'},
			{field: 'display', title: '显示', templet: function(d){
				if(d.display == 1){
					return '<input type="checkbox" name="display" data-id="'+ d.id +'" lay-skin="switch" lay-text="ON|OFF" lay-filter="display" checked>';
				}else{
					return '<input type="checkbox" name="display" data-id="'+ d.id +'" lay-skin="switch" lay-text="ON|OFF" lay-filter="display">';
				}
		      }},
			{fixed: 'right', title:'操作', toolbar:'#MainTableRowToolBar', width:160}
		]],
		done: function(){
			form.val('SearchPanel', criteria);
		}
	});
	
	var dlgOption = {
			type: 1,
			title: '添加导航',
			data:{},
			maxWidth: 780,
			content: $('#EditDialog'),
			yes: function(index, layero){
				layer.msg("Save");
				layer.close(index);
			},
			cancel: function(index, layero){
				layer.confirm("确认退出编辑？",function(idx){
					layer.close(idx);
					layer.close(index);
				});
				return false;
			},
			success: function(layero, index){
				var acstype = dict["acstype"];
				$("select[name='type']").empty();
				for(var idx in acstype){
					$("select[name='type']").append("<option value='"+acstype[idx].value+"'>"+acstype[idx].name+"</option>");
				}
				form.render('select');
				if(this.data){
					form.val("EditDialog",this.data);
				}else{
					$("#EditDialog input").val("");
				}
			}
		}
	
	form.on('switch(display)', function(data){
		var id = $(data.elem).data("id");
		var obj = {};
		if(data.elem.checked){
			obj.display = 1;
		}else{
			obj.display = 0;
		}
		$.ajax({
			type: "PUT",
			url: baseurl + id,
			data: JSON.stringify(obj),
			dataType: "json",
			contentType:"application/json",
			success: function(data) {
			},
			error: function(xhr){
				var res = xhr.responseJSON;
				layer.alert(res.desc, {icon: 2, title:'错误'});
			}
		});
		});  
	
	//监听表单提交
	form.on('submit(Search)', function(data){
		criteria.search = data.field.search;
		table.reload('MainTable', {
			page: {
				curr: 1 //重新从第 1 页开始
			},
			where: criteria
		});
		return false;
	});
	  
	//监听表单提交
	form.on('submit(Save)', function(data){
		layer.close(editDlgIdx);
		var entity = data.field;
		if(entity.id > 0){
			$.ajax({
				type: "PUT",
				url: baseurl + entity.id,
				data: JSON.stringify(entity),
				dataType: "json",
				contentType:"application/json",
				success: function(data) {
					table.reload('MainTable');
				},
				error: function(xhr){
					var res = xhr.responseJSON;
					layer.alert(res.desc, {icon: 2, title:'错误'});
				}
			});
		}else{
			entity.accountId = criteria.accountId;
			$.ajax({
				type: "POST",
				url: baseurl,
				data: JSON.stringify(entity),
				dataType: "json",
				contentType:"application/json",
				success: function(data) {
					table.reload('MainTable', {
						page: {
							curr: 1 //重新从第 1 页开始
						}
					});
				},
				error: function(xhr){
					var res = xhr.responseJSON;
					layer.alert(res.desc, {icon: 2, title:'错误'});
				}
			});
		}
		return false;
	});

	//Table工具栏事件
	table.on('toolbar(MainTable)', function(obj){
		switch(obj.event){
		case 'add':
			dlgOption.title = '添加导航';
			dlgOption.data = null;
			editDlgIdx = layer.open(dlgOption);
			break;
		case 'delete':
			var status = table.checkStatus('MainTable');
			if(status.data.length<=0){
				layer.msg("未选中任何导航");
				break;
			}
			layer.confirm('确认删除所选导航？', {icon: 2, title:'删除'}, function(index){
				layer.close(index);
				var ids = [];
				status.data.forEach(function(data){
					ids.push(data.id);
				});
				if(ids.length > 0){
					$.ajax({
						type: "PUT",
						url: baseurl + "delete",
						data:JSON.stringify(ids),
						dataType: "json",
						contentType:"application/json",
						success: function(data) {
							table.reload('MainTable');
						},
						error: function(xhr){
							var res = xhr.responseJSON;
							layer.alert(res.desc, {icon: 2, title:'错误'});
						}
					});
				}
			});
			break;
		case 'chooseAccount':
			accountOption.data = null;
			accountDlgIdx = layer.open(accountOption);
			break;
		};
	});//监听行工具事件
	table.on('tool(MainTable)', function(obj){
		switch(obj.event){
		case 'modify':
			dlgOption.title = '编辑导航';
			dlgOption.data = obj.data;
			editDlgIdx = layer.open(dlgOption);
			break;
		case 'delete':
			layer.confirm('确认删除导航：'+obj.data.name, {icon: 2, title:'删除'}, function(index){
				layer.close(index);
				$.ajax({
					type: "DELETE",
					url: baseurl+obj.data.id,
					success: function(data) {
						obj.del();
					},
					error: function(xhr){
						var res = xhr.responseJSON;
						layer.alert(res.desc, {icon: 2, title:'错误'});
					}
				});
			});
			break;
		};
	});
});