package cn.wangdm.doc.service;

import cn.wangdm.base.dto.PageResult;
import cn.wangdm.base.service.IService;
import cn.wangdm.doc.dto.ProjectDto;

public interface ProjectService extends IService<ProjectDto> {

	PageResult<ProjectDto> search(ProjectDto criteria, int page, int size);

	void verify(long id);

	void restore(long id);

	void forbid(long id);
}
