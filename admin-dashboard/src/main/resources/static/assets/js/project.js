
layui.use(['table','form'], function(){
	var $ = layui.jquery;
	var table = layui.table;
	var form = layui.form;
	
	var criteria = {
		status: appStatus
	};
	var accountCriteria = {};
	
	var mainTable;
	var mainTableData;
	var editDlgIdx;
	var accountTable, accountDlgIdx;
	var baseurl = '/admin/api/project/';
	
	mainTable = table.render({
		elem: '#MainTable',
		toolbar: '#MainTableToolBar',
		url: baseurl,
		where: criteria,
		page: true,
		height:'full-0',
		cols: [[
			{type:'checkbox', fixed: 'left'},
			{field: 'id', title: 'ID'},
			{field: 'name', title: '名称'},
			{field: 'accountId', title: '账户'},
			{field: 'accountName', title: '账户', hide: true},
			{field: 'type', title: '类型'},
			{field: 'domain', title: '域名'},
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
			title: '添加项目',
			data:{},
			area:['400px'],
			maxWidth: 780,
			content: $('#EditDialog'),
			yes: function(index, layero){
				layer.msg("Save");
				layer.close(index);
			},
			success: function(layero, index){
				form.render();
				if(this.data){
					form.val("EditDialog",this.data);
				}else{
					//$("#EditDialog input").val("");
				}
			}
		}
	
	var accountOption = {
			type: 1,
			title: '选择用户',
			data:{},
			maxWidth: 780,
			content: $('#AccountDialog'),
			btn: ['选择'],
			yes: function(index, layero){
				layer.close(index);
				var sel = table.checkStatus('AccountTable').data[0];
				criteria.accountId = sel.id;
				criteria.accountName = sel.fullname;
				if(sel){
					form.val('SearchPanel',criteria);
					table.reload('MainTable', {
						page: {
							curr: 1 //重新从第 1 页开始
						},
						where: criteria
					});
				}
			},
			cancel: function(index, layero){
				layer.close(index);
				return false;
			},
			success: function(layero, index){
				accountCriteria.search = $('input[name="accountName"]').val();
				accountTable = table.render({
					elem: '#AccountTable',
					toolbar: '#AccountTableToolBar',
					defaultToolbar:[],
					url: '/admin/api/account/',
					where: accountCriteria,
					page: true,
					cols: [[
						{type:'radio', fixed: 'left'},
						{field: 'fullname', title: '昵称'},
						{field: 'phone', title: '电话'},
						{field: 'email', title: '邮箱'}
					]],
					done: function(){
						form.val('AccountSearchPanel', accountCriteria);
					}
				});
			}
		}
	
	//监听搜索账户表单提交
	form.on('submit(AccountSearch)', function(data){
		accountCriteria = data.field;
		table.reload('AccountTable',{
			page: {
				curr: 1 //重新从第 1 页开始
			},
			where: accountCriteria
		});
		return false;
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
	  
	form.on('radio(type)', function(data){
		  console.log(data.elem); //得到radio原始DOM对象
		  console.log(data.value); //被点击的radio的value值
		});  
	
	//监听表单提交
	form.on('submit(Save)', function(data){
		layer.close(editDlgIdx);
		var entity = data.field;
		console.log(entity);
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
			if(criteria.accountId > 0){
				dlgOption.title = '添加项目';
				dlgOption.data = null;
				editDlgIdx = layer.open(dlgOption);
			}else{
				layer.alert("请选择所属账户", {icon: 5, title:'错误'});
			}
			break;
		case 'verify':
			var status = table.checkStatus('MainTable');
			if(status.data.length<=0){
				layer.msg("未选中任何项目");
				break;
			}
			layer.confirm('确认审核所选项目？', {icon: 1, title:'审核'}, function(index){
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
				layer.msg("未选中任何项目");
				break;
			}
			layer.confirm('确认恢复所选项目？', {icon: 1, title:'恢复'}, function(index){
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
				layer.msg("未选中任何项目");
				break;
			}
			layer.confirm('确认禁用所选项目？', {icon: 2, title:'禁用'}, function(index){
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
				layer.msg("未选中任何项目");
				break;
			}
			layer.confirm('确认删除所选项目？', {icon: 2, title:'删除'}, function(index){
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
			dlgOption.title = '编辑项目';
			dlgOption.data = obj.data;
			editDlgIdx = layer.open(dlgOption);
			break;
		case 'delete':
			layer.confirm('确认删除项目：'+obj.data.name, {icon: 2, title:'删除'}, function(index){
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