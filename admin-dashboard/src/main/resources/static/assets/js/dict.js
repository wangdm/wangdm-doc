var dict = [];
var map = [];

var Map = {
	init: function(key, url, fn){
		if(key && url){
			$.get({
				url: url,
				success: function(result){
					map[key] = result.data;
					if(fn){
						fn(result.data);
					}
				},
				error: function(xhr, status, error){
					console.log("ajax failed, url: " + url + ", status:" + xhr.status);
				}
			});
		}
	}
}

layui.use(['jquery'], function(){
	$ = layui.jquery;
	$.get({
		url: "/api/dict",
		success: function(data){
			dict = data;
		},
		error: function(xhr, status, error){
			console.log("ajax failed, status:" + xhr.status);
		}
	});
});
