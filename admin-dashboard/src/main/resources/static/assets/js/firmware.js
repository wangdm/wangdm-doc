
layui.use(['table','form'], function(){
	var $ = layui.jquery;
	var table = layui.table;
	var form = layui.form;
	
	var criteria = {};
	var accountCriteria = {};
	var productCriteria = {};
	
	var mainTable;
	var mainTableData;
	var editDlgIdx;
	var accountTable, accountDlgIdx;
	var baseurl = '/admin/api/firmware/';
	
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
			{field: 'accountId', title: '用户ID'},
			{field: 'productId', title: '产品ID'},
			{field: 'name', title: '固件名'},
			{field: 'version', title: '版本号'},
			{field: 'md5', title: 'MD5', hide: true},
			{field: 'sha', title: 'SHA', hide: true},
			{field: 'createTime', title: '创建时间'},
			{fixed: 'right', title:'操作', toolbar:'#MainTableRowToolBar', width:160}
		]],
		done: function(){
			form.val('SearchPanel', criteria);
		}
	});
	
	var dlgOption = {
			type: 1,
			title: '添加固件',
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
				dlgOption.title = '添加固件';
				dlgOption.data = null;
				editDlgIdx = layer.open(dlgOption);
			}else{
				layer.alert("请选择所属账户", {icon: 5, title:'错误'});
			}
			break;
		case 'delete':
			var status = table.checkStatus('MainTable');
			if(status.data.length<=0){
				layer.msg("未选中任何固件");
				break;
			}
			layer.confirm('确认删除所选固件？', {icon: 2, title:'删除'}, function(index){
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
			dlgOption.title = '编辑固件';
			dlgOption.data = obj.data;
			editDlgIdx = layer.open(dlgOption);
			break;
		case 'delete':
			layer.confirm('确认删除固件：'+obj.data.name, {icon: 2, title:'删除'}, function(index){
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