package cn.wangdm.doc.dto;

import org.apache.commons.lang3.StringUtils;

import cn.wangdm.base.dto.Dto;
import cn.wangdm.doc.entity.Project;
import lombok.Data;

@Data
public class ProjectDto implements Dto<Project> {
	
	private long id;
	
	private long accountId;
	
	private String accountName;
	
	private String name;
	
	private int type;
	
	private String domain;

	private String password;

	private int status = -1;

	private String createTime;

	private String updateTime;

	@Override
	public Project toEntity() {
		
		return toEntity(new Project());
	}

	@Override
	public Project toEntity(Project entity) {
		if(accountId > 0) {
			entity.setAccountId(accountId);
		}
		if(!StringUtils.isBlank(name)) {
			entity.setName(name);
		}
		if(type > 0) {
			entity.setType((byte) type);
		}
		if(!StringUtils.isBlank(domain)) {
			entity.setDomain(domain);
		}
		if(!StringUtils.isBlank(password)) {
			entity.setPassword(password);
		}
		if(status >= 0) {
			entity.setStatus((byte) status);
		}
		return entity;
	}

	@Override
	public ProjectDto fromEntity(Project entity) {
		id = entity.getId();
		accountId = entity.getAccountId();
		name = entity.getName();
		type = entity.getType();
		domain = entity.getDomain();
		password = entity.getPassword();
		status = entity.getStatus();
		if(entity.getCreateTime() != null) {
			createTime = format.format(entity.getCreateTime());
		}
		if(entity.getUpdateTime() != null) {
			updateTime = format.format(entity.getUpdateTime());
		}
		return this;
	}

}
