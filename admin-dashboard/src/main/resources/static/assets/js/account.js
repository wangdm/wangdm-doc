layui.use(['table','form'], function(){
	var $ = layui.jquery;
	var table = layui.table;
	var form = layui.form;
	
	var criteria = {
		status: accountStatus
	};
	
	var mainTable;
	var mainTableData;
	var editDlgIdx;
	var baseurl = '/admin/api/account/';
	
	mainTable = table.render({
		elem: '#MainTable',
		toolbar: '#MainTableToolBar',
		url: baseurl,
		where: criteria,
		page: true,
		height:'full-0',
		cols: [[
			{type:'checkbox', fixed: 'left'},
			{field: 'id', title: 'ID', width:50},
			{field: 'fullname', title: '昵称'},
			{field: 'phone', title: '电话'},
			{field: 'email', title: '邮箱'},
			{field: 'createTime', title: '创建时间'},
			{field: 'updateTime', title: '修改时间'},
			{field: 'status', title: '状态', width:60, templet: function(d){
				switch(d.status){
				case 0:
					return '<i class="layui-icon element-icons el-icon-unverified" style="color:#1296db;font-size:28px"></i>';
				case 1:
					return '<i class="layui-icon element-icons el-icon-normal" style="color:#2aa515;font-size:28px"></i>';
				case 2:
					return '<i class="layui-icon element-icons el-icon-forbid" style="color:#d81e06;font-size:28px"></i>';
				case 3:
					return '<i class="layui-icon element-icons el-icon-delete" style="color:#d81e06;font-size:28px"></i>';
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
			title: '添加用户',
			data:{},
			maxWidth: 780,
			content: $('#EditDialog'),
			yes: function(index, layero){
				layer.msg("Save");
				layer.close(index);
			},
			btn2: function(index, layero){
				layer.confirm("确认退出编辑？",function(idx){
					layer.close(idx);
					layer.close(index);
				});
				return false;
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
		var product = data.field;
		if(product.id > 0){
			$.ajax({
				type: "PUT",
				url: baseurl + product.id,
				data: JSON.stringify(product),
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
			$.ajax({
				type: "POST",
				url: baseurl,
				data: JSON.stringify(product),
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
			dlgOption.title = '添加用户';
			dlgOption.data = null;
			editDlgIdx = layer.open(dlgOption);
			break;
		case 'verify':
			var status = table.checkStatus('MainTable');
			if(status.data.length<=0){
				layer.msg("未选中任何用户");
				break;
			}
			layer.confirm('确认审核所选用户？', {icon: 1, title:'审核'}, function(index){
				layer.close(index);
				var ids = [];
				status.data.forEach(function(data){
					ids.push(data.id);
				});
				if(ids.length > 0){
					$.ajax({
						type: "PUT",
						url: baseurl + "verify",
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
		case 'restore':
			var status = table.checkStatus('MainTable');
			if(status.data.length<=0){
				layer.msg("未选中任何用户");
				break;
			}
			layer.confirm('确认恢复所选用户？', {icon: 1, title:'恢复'}, function(index){
				layer.close(index);
				var ids = [];
				status.data.forEach(function(data){
					ids.push(data.id);
				});
				if(ids.length > 0){
					$.ajax({
						type: "PUT",
						url: baseurl + "restore",
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
		case 'forbid':
			var status = table.checkStatus('MainTable');
			if(status.data.length<=0){
				layer.msg("未选中任何用户");
				break;
			}
			layer.confirm('确认禁用所选用户？', {icon: 2, title:'禁用'}, function(index){
				layer.close(index);
				var ids = [];
				status.data.forEach(function(data){
					ids.push(data.id);
				});
				if(ids.length > 0){
					$.ajax({
						type: "PUT",
						url: baseurl + "forbid",
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
		case 'delete':
			var status = table.checkStatus('MainTable');
			if(status.data.length<=0){
				layer.msg("未选中任何用户");
				break;
			}
			layer.confirm('确认删除所选用户？', {icon: 2, title:'删除'}, function(index){
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
		};
	});//监听行工具事件
	table.on('tool(MainTable)', function(obj){
		switch(obj.event){
		case 'modify':
			dlgOption.title = '编辑用户';
			dlgOption.data = obj.data;
			editDlgIdx = layer.open(dlgOption);
			break;
		case 'delete':
			layer.confirm('确认删除用户：'+obj.data.fullname, {icon: 2, title:'删除'}, function(index){
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