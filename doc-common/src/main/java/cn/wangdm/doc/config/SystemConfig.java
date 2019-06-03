package cn.wangdm.doc.config;

import cn.wangdm.base.annotation.Configer;
import cn.wangdm.base.config.BaseConfig;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Data
@EqualsAndHashCode(callSuper=false)
@Configer(prefix = "system")
public class SystemConfig extends BaseConfig{
	
	public final static String prefix = "wangdm.doccloud.system";

	private String title = "DocCloud";
	
	private String company = "DocCloud";
	
	private String website = "/";
	
	private String copyright = "Copyright © 2018-2019 DocCloud, all rights reserved.";
	
	private String beian = "粤ICP备18138543号-2";

	/*
	@Override
	public void load(ConfigService service) {
		Map<String, String> values = service.map(prefix);
		title = values.getOrDefault(prefix + ".title", title);
		company = values.getOrDefault(prefix + ".company", company);
		website = values.getOrDefault(prefix + ".website", website);
		copyright = values.getOrDefault(prefix + ".copyright", copyright);
		beian = values.getOrDefault(prefix + ".beian", beian);
	}
	//*/
	/*
	@Override
	public void save(ConfigService service) {
		service.set(prefix + ".title", title);
		service.set(prefix + ".company", company);
		service.set(prefix + ".website", website);
		service.set(prefix + ".copyright", copyright);
		service.set(prefix + ".beian", beian);
	}
	//*/

}
