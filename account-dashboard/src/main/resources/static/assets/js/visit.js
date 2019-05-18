
layui.use(['jquery'], function(){
	$ = layui.jquery;
	var entity = {};
	entity.url = window.location.href;
	entity.referer = document.referrer;
	$.ajax({
		type: "POST",
		url: "/visit",
		data: JSON.stringify(entity),
		dataType: "json",
		contentType:"application/json",
		success: function(data) {
		}
	});
});
