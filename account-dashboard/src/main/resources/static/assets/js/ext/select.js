/*******************************************************************************
 * 自定义播放器模块
 */

layui.define([ 'jquery', 'layer', 'form', 'table' ], function(exports) {
    var $ = layui.jquery;
    var form = layui.form;
    var layer = layui.layer;
    var table = layui.table;
    
    var Selects = {};

    var defaultOption = {
    	filter : "select",
    	submit: true,
    	count: 100,
    	method : "GET",
    	url : "",
    	where : {},
    	pair:{
    	    name : "name",
    	    value: "id"
    	},
    	select: function(value){
    	    console.log(value);
    	}
    };
    
	var defaultTblOption= {
		page: true,
		cols: [[
			{type:'radio', fixed: 'left'},
			{field: 'name', title: '选项'}
		]]
	};
	
	var defaultDlgOption = {
			type: 1,
			title: '选择',
			data:{},
			maxWidth: 780,
			btn: ['选择']
		};
    
    function Select(options){
        var that = this;
        this.option = {};
        $.extend(this.option, defaultOption);
        $.extend(this.option, options);
        
        this.init = function(){
            form.on('select('+that.filter+')', function(data){
            	if(data.value == "lay_more_select"){
            		that.showMore();
            		return;
            	}
                if(that.value != data.value){
                	that.value = data.value;
                    if(that.option.submit){
                        var formParent = $(that.element).parents("form");
                        $(formParent).find("button[lay-submit]").click();
                    }else{
                        if(that.option.select){
                        	that.option.select(that.data[data.value]);
                        }
                    }
                }
            });
            if(that.data){
            	that.refreshOption(that.data);
            }else{
            	that.retriveData();
            }
        }
        
        this.showMore = function(){
        	var dialogId = "select-"+that.filter+"-dialog";
        	var tableId = "select-"+that.filter+"-table";
        	var html = '<div id="'+dialogId+'" style="display: none; min-width:300px">'+
    					'<table class="layui-hide" id="'+tableId+'" lay-filter="'+tableId+'"></table>'+
    					'</div>';
        	$("body").append(html);
        	var dlgOption = {};
            $.extend(dlgOption, defaultDlgOption);
            dlgOption.content = $("#"+dialogId);
            dlgOption.success = function(){
            	var tblOption = {};
                $.extend(tblOption, defaultTblOption);
                tblOption.elem = "#"+tableId;
                tblOption.url = that.option.url;
                table.render(tblOption);
            }
            dlgOption.yes = function(idx){
            	layer.close(idx);
            	var sel = table.checkStatus(tableId).data[0];
                if(sel && that.option.select){
                	that.option.select(sel);
                }
            }
			layer.open(dlgOption);
        }
        
        this.refreshOption = function(){
            if(that.element){
                $(that.element).empty();
                var html = '<option value=""></option>';
                var size = 0;
                $.each(that.data, function(index, item){
                    html += '<option value="' + item[that.option.pair.value] + '">' + item[that.option.pair.name] + '</option>';
                    size++;
                });
                if(that.total > size){
                	html += '<option value="lay_more_select">更多...</option>';
                }
                $(that.element).html(html);
                form.render('select');
            }
        }
        
        this.setOption = function(pairs){
            if(pairs){
                that.setData(pairs);
                that.refreshOption();
            }
        }
        
        this.setData = function(pairs){
            if(pairs){
                that.data = {};
                $.each(pairs, function(index, item){
                    that.data[item[that.option.pair.value]] = item;
                });
            }
        }
        
        this.retriveData = function(){
            if(!that.option.where){
                that.option.where = {};
            }
            that.option.where.limit = that.option.count;
            $.ajax({
                type: that.option.method,
                url: that.option.url,
                data: that.option.where,
                dataType: "json",
                contentType:"application/json",
                success: function(data) {
                    that.total = data.count;
                    that.setOption(data.data);
                }
            });
        }
    }
    
    function createSelect(filter, options){
        var node = filter;
        if(typeof node === "string"){
            node = $("select[lay-filter='"+filter+"']");
            if(!node){
                layer.msg("未找到指定的select",{icon:2});
                return;
            }
        }
        var Sel = Selects[filter];
        if(!Sel){
            Sel = new Select(options);
            Selects[filter] = Sel;
        }
        Sel.filter = filter;
        Sel.element = node;
        return Sel;
    }

    var select = {
    	render : function(filter, options) {
            if(filter && typeof filter === "string"){
                var obj = createSelect(filter, options);
                if(obj){
                	obj.init();
                }
            }else{
                $("select").not("[lay-ignore]").each(function(index, item){
                    var filter = $(item).attr("lay-filter");
                    if(!filter || filter==""){
                    	return;
                    }
                    var url = $(item).attr("lay-url");
                    if(!url || url==""){
                    	return;
                    }
                    var obj = createSelect(filter, {url:url});
                    if(obj){
                    	obj.init();
                    }
                });
            }
    	}
    }

    exports('select', select);
});