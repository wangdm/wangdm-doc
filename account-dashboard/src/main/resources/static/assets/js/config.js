var config = {};

var Config = {
	init: function(fn){
		$.get({
			url: "/api/config",
			success: function(result){
				config = result.data;
				if(fn){
					fn(result.data);
				}
			},
			error: function(xhr, status, error){
				console.log("ajax failed, status:" + xhr.status);
			}
		});
	}
}