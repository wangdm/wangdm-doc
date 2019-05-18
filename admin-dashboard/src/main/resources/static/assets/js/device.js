
layui.use(['table','form'], function(){
	var $ = layui.jquery;
	var table = layui.table;
	var form = layui.form;
	
	var criteria = {};
	var accountCriteria = {};
	var appCriteria = {};
	var productCriteria = {};
	
	var mainTable;
	var mainTableData;
	var editDlgIdx;
	var accountTable, accountDlgIdx;
	var appTable, appDlgIdx;
	var baseurl = '/admin/api/device/';
	
	$('input[name="productName"]').on('focus', function(){
		layer.open(productOption);
	});
	
	mainTable = table.render({
		elem: '#MainTable',
		toolbar: '#MainTableToolBar',
		url: baseurl,
		page: true,
		height:'full-0',
		cols: [[
			{type:'checkbox', fixed: 'left'},
			{field: 'id', title: 'ID'},
			{field: 'appId', title: 'AppId'},
			{field: 'name', title: '设备名'},
			{field: 'deviceKey', title: 'DeviceKey'},
			{field: 'deviceSecret', title: 'DeviceSecret', hide:true},
			{field: 'serial', title: '序列号', hide:true},
			{field: 'mac', title: 'Mac', hide:true},
			{field: 'address', title: '地址'},
			{field: 'server', title: '服务器'},
			{field: 'version', title: '版本号'},
			{field: 'loginTime', title: '登录时间'},
			{field: 'createTime', title: '创建时间'},
			{field: 'status', title: '状态', width:60, templet: function(d){
				if(d.status == 1){
					return '<i class="layui-icon element-icons el-icon-online" style="color:#009688;font-size:28px"></i>';
				}else{
					return '<i class="layui-icon element-icons el-icon-offline" style="color:#FF5722;font-size:28px"></i>';
				}
		      }},
			{fixed: 'right', title:'操作', toolbar:'#MainTableRowToolBar', width:160}
		]],
		done: function(){
			form.val('SearchPanel', criteria);
		}
	});
	
	var editOption = {
			type: 1,
			title: '添加设备',
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
				criteria.appId = 0;
				criteria.appName = "";
				appCriteria.accountId = sel.id;
				productCriteria.accountId = sel.id;
				if(sel){
					form.val('SearchPanel', criteria);
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
	
	var appOption = {
			type: 1,
			title: '选择应用',
			data:{},
			maxWidth: 780,
			content: $('#AppDialog'),
			btn: ['选择'],
			yes: function(index, layero){
				layer.close(index);
				var sel = table.checkStatus('AppTable').data[0];
				criteria.appId = sel.id;
				criteria.appName = sel.name;
				if(sel){
					form.val('SearchPanel', criteria);
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
				appCriteria.search = $('input[name="appName"]').val();
				appTable = table.render({
					elem: '#AppTable',
					toolbar: '#AppTableToolBar',
					defaultToolbar:[],
					url: '/admin/api/app/',
					where: appCriteria,
					page: true,
					cols: [[
						{type:'radio', fixed: 'left'},
						{field: 'name', title: '应用'}
					]],
					done: function(){
						form.val('AppSearchPanel', appCriteria);
					}
				});
			}
		}
	
	var productOption = {
			type: 1,
			title: '选择应用',
			data:{},
			maxWidth: 780,
			content: $('#ProductDialog'),
			btn: ['选择'],
			yes: function(index, layero){
				layer.close(index);
				var sel = table.checkStatus('ProductTable').data[0];
				if(sel){
					$('input[name="productId"]').val(sel.id);
					$('input[name="productName"]').val(sel.name);
				}
			},
			cancel: function(index, layero){
				layer.close(index);
				return false;
			},
			success: function(layero, index){
				productTable = table.render({
					elem: '#ProductTable',
					toolbar: '#ProductTableToolBar',
					defaultToolbar:[],
					url: '/admin/api/product/',
					where: productCriteria,
					page: true,
					cols: [[
						{type:'radio', fixed: 'left'},
						{field: 'name', title: '产品'}
					]],
					done: function(){
						form.val('ProductSearchPanel', productCriteria);
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
	
	//监听搜索应用表单提交
	form.on('submit(AppSearch)', function(data){
		appCriteria.search = data.field.search;
		table.reload('AppTable',{
			page: {
				curr: 1 //重新从第 1 页开始
			},
			where: appCriteria
		});
		return false;
	});
	
	//监听搜索产品表单提交
	form.on('submit(ProductSearch)', function(data){
		productCriteria.search = data.field.search;
		table.reload('ProductTable',{
			page: {
				curr: 1 //重新从第 1 页开始
			},
			where: productCriteria
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
			entity.appId = criteria.appId;
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
			if(criteria.accountId > 0 && criteria.appId > 0){
				editOption.title = '添加设备';
				editOption.data = null;
				editDlgIdx = layer.open(editOption);
			}else{
				layer.alert("请选择所属账户和应用", {icon: 5, title:'错误'});
			}
			break;
		case 'verify':
			var status = table.checkStatus('MainTable');
			if(status.data.length<=0){
				layer.msg("未选中任何设备");
				break;
			}
			layer.confirm('确认审核所选设备？', {icon: 1, title:'审核'}, function(index){
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
				layer.msg("未选中任何设备");
				break;
			}
			layer.confirm('确认恢复所选设备？', {icon: 1, title:'恢复'}, function(index){
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
				layer.msg("未选中任何设备");
				break;
			}
			layer.confirm('确认禁用所选设备？', {icon: 2, title:'禁用'}, function(index){
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
				layer.msg("未选中任何设备");
				break;
			}
			layer.confirm('确认删除所选设备？', {icon: 2, title:'删除'}, function(index){
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
		case 'chooseApp':
			appOption.data = null;
			appDlgIdx = layer.open(appOption);
			break;
		};
	});//监听行工具事件
	table.on('tool(MainTable)', function(obj){
		switch(obj.event){
		case 'control':
			break;
		case 'modify':
			editOption.title = '编辑设备';
			editOption.data = obj.data;
			editDlgIdx = layer.open(editOption);
			break;
		case 'delete':
			layer.confirm('确认删除设备：'+obj.data.name, {icon: 2, title:'删除'}, function(index){
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