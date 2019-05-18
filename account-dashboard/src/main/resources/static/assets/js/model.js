
String.prototype.format = function () {
	var str = this;
    for (i = 0; i < arguments.length; i++) {
		str = str.replace("{}", arguments[i]);
    }
	return str;
}

var stringField = '<div class="layui-form-item"> \
<label class="layui-form-label">{}</label> \
<div class="layui-input-block"> \
<input type="text" name="{}" value="{}" class="layui-input" {}> \
</div> \
</div>';

var switchField = '<div class="layui-form-item" pane=""> \
<label class="layui-form-label">{}</label> \
<div class="layui-input-block"> \
<input type="checkbox" name="{}" lay-skin="switch" lay-filter="{}" lay-text="ON|OFF" {}> \
</div> \
</div>';

var defaultModel = [{
    "groupName": "devinfo",
    "groupTitle": "设备信息",
    "items": [{
        "title": "设备名",
        "name": "devname",
        "type": "string",
        "maxLength": 40,
        "minLength": 0,
        "readonly": false,
        "value": "测试"
    },{
        "title": "设备编号",
        "name": "devnum",
        "type": "string",
        "maxLength": 40,
        "minLength": 0,
        "readonly": false,
        "value": "SN001"
    },{
        "title": "设备地址",
        "name": "location",
        "type": "string",
        "maxLength": 40,
        "minLength": 0,
        "readonly": false,
        "value": ""
    },{
        "title": "序列号",
        "name": "serial",
        "type": "string",
        "maxLength": 40,
        "minLength": 0,
        "readonly": false,
        "value": ""
    }]
},{
    "groupName": "network",
    "groupTitle": "网络设置",
    "items": [{
        "title": "自动获取",
        "name": "enableDHCP",
        "type": "boolean",
        "readonly": false,
        "value": false
    },{
        "title": "网关地址",
        "name": "gatewary",
        "type": "string",
        "maxLength": 40,
        "minLength": 0,
        "readonly": false,
        "value": "192.168.1.1"
    },{
        "title": "子网掩码",
        "name": "netmask",
        "type": "string",
        "maxLength": 40,
        "minLength": 0,
        "readonly": false,
        "value": "255.255.255.0"
    },{
        "title": "设备地址",
        "name": "address",
        "type": "string",
        "maxLength": 40,
        "minLength": 0,
        "readonly": false,
        "value": "192.168.1.8"
    },{
        "title": "DNS1",
        "name": "dns1",
        "type": "string",
        "maxLength": 20,
        "minLength": 0,
        "readonly": false,
        "value": "192.168.1.1"
    },{
        "title": "DNS2",
        "name": "dns2",
        "type": "string",
        "maxLength": 20,
        "minLength": 0,
        "readonly": false,
        "value": "8.8.8.8"
    }]
},{
    "groupName": "time",
    "groupTitle": "时间设置",
    "items": [{
        "title": "开启NTP",
        "name": "ntpEnable",
        "type": "boolean",
        "readonly": false,
        "value": false
    },{
        "title": "NTP服务器",
        "name": "ntpServer",
        "type": "string",
        "maxLength": 40,
        "minLength": 0,
        "readonly": false,
        "value": "time.deviceonline.com"
    },{
        "title": "所在时区",
        "name": "timezone",
        "type": "string",
        "maxLength": 40,
        "minLength": 0,
        "readonly": false,
        "value": "UTC+08"
    },{
        "title": "当前时间",
        "name": "time",
        "type": "string",
        "maxLength": 20,
        "minLength": 0,
        "readonly": false,
        "value": "2019-01-01 12:00:00"
    }]
},{
    "groupName": "version",
    "groupTitle": "版本信息",
    "items": [{
        "title": "业务版本",
        "name": "appversion",
        "type": "string",
        "maxLength": 40,
        "minLength": 0,
        "readonly": true,
        "value": "V1.0"
    },{
        "title": "系统版本",
        "name": "sysversion",
        "type": "string",
        "maxLength": 40,
        "minLength": 0,
        "readonly": true,
        "value": "V1.0"
    },{
        "title": "硬件版本",
        "name": "hardversion",
        "type": "string",
        "maxLength": 40,
        "minLength": 0,
        "readonly": true,
        "value": "V1.0"
    }]
}];

function buildConfigUI(node, model, cinfigBtn){
	var html = '<div class="layui-tab layui-tab-brief" style="height: 100%;">';
	html += '<ul class="layui-tab-title">';
	model.forEach(function(group, index){
		if(index == 0){
			html += '<li class="layui-this">' + group.groupTitle + '</li>';
		}else{
			html += '<li>' + group.groupTitle + '</li>';
		}
	});
	html += '</ul>';
	html += '<div class="layui-tab-content" id="ConfigForm" style="height: 100%;">';
	model.forEach(function(group, index){
		if(index == 0){
			html += '<div class="layui-tab-item layui-show">';
		}else{
			html += '<div class="layui-tab-item">';
		}
		html += '<form name="'+group.groupName+'" class="layui-form layui-form-pane layui-form-compact" lay-filter="'+group.groupName+'" action="/">';
		group.items.forEach(function(item, idx){
			switch(item.type){
			case "int":
			case "float": 
			case "integer": 
			case "string": 
				html += stringField.format(item.title, item.name, item.value, item.readonly==true?"readonly":"");
				break;
			case "bool": 
			case "boolean": 
				html += switchField.format(item.title, item.name, item.name, item.value==true?"checked":"");
				break;
			case "enum":
				html += stringField.format(item.title, item.name, item.value, item.readonly==true?"readonly":"");
				break;
			}
		});
		if(cinfigBtn && group.readonly != true){
			html += '<div class="layui-btn-container layui-form-item">';
			html += '<button class="layui-btn layui-btn-sm layui-btn-right" lay-submit="" lay-filter="Config">保存</button>';
			html += '</div>';
		}
		html += '</form>';
		html += '</div>';
	});
	html += '</div>';
	html += '</div>';
	$(node).html(html);
}
