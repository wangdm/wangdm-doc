
function EntityService(baseurl){
    this.baseurl = baseurl;
    
    this.hello = function(){
        console.log("hello");
        console.log(this);
    }
}

EntityService.prototype.save = function(entity, success, fail){
    if(typeof entity === "object"){
        var option = {
                url: baseurl,
                data: JSON.stringify(entity),
                dataType: "json",
                contentType:"application/json",
                success: function(data) {
                    if(typeof success == "function"){
                        success(data);
                    }
                },
                error: function(data) {
                    if(typeof fail == "function"){
                        fail(data);
                    }
                }
            }
        if(entity["id"] > 0){
            option.type = "PUT";
            option.url = this.baseurl + entity.id;
            $.ajax(option);
        }else{
            option.type = "POST";
            $.ajax(option);
        }
    }
}

EntityService.prototype.del = function(ids, success, fail){
    if(typeof ids === "array"){
        $.ajax({
            type: "PUT",
            url: this.baseurl,
            data: JSON.stringify(ids),
            dataType: "json",
            contentType:"application/json",
            success: function(data) {
                if(typeof success == "function"){
                    success(data);
                }
            },
            error: function(data) {
                if(typeof fail == "function"){
                    fail(data);
                }
            }
        });
    }else if(typeof ids === "number" || typeof ids === "string"){
        $.ajax({
            type: "DELETE",
            url: this.baseurl + ids,
            success: function(data) {
                if(typeof success == "function"){
                    success(data);
                }
            },
            error: function(data) {
                if(typeof fail == "function"){
                    fail(data);
                }
            }
        });
    }else{
        console.error("The entity id is required");
    }
}

EntityService.prototype.find = function(id, success, fail){
    $.ajax({
        type: "GET",
        url: this.baseurl + entity.id,
        dataType: "json",
        contentType:"application/json",
        success: function(data) {
            if(typeof success == "function"){
                success(data);
            }
        },
        error: function(data) {
            if(typeof fail == "function"){
                fail(data);
            }
        }
    });
}

EntityService.prototype.get = function(id, name, success, fail){
    $.ajax({
        type: "GET",
        url: this.baseurl + entity.id + "/" + name,
        dataType: "json",
        contentType:"application/json",
        success: function(data) {
            if(typeof success == "function"){
                success(data);
            }
        },
        error: function(data) {
            if(typeof fail == "function"){
                fail(data);
            }
        }
    });
}

EntityService.prototype.set = function(id, name, value, success, fail){
    $.ajax({
        type: "PUT",
        url: this.baseurl + entity.id + "/" + name,
        data: JSON.stringify(value),
        dataType: "json",
        contentType:"application/json",
        success: function(data) {
            if(typeof success == "function"){
                success(data);
            }
        },
        error: function(data) {
            if(typeof fail == "function"){
                fail(data);
            }
        }
    });
}

EntityService.prototype.list = function(success, fail){
    
}