layui.use([ 'jquery' ], function() {
	$ = layui.jquery;
	var token = $("meta[name='X-CSRF-TOKEN']").attr("content");
	$.ajaxSetup({
		dataType : "json",
		contentType : "application/json",
		headers : { // 默认添加请求头
			"X-CSRF-TOKEN" : token
		}
	});
});