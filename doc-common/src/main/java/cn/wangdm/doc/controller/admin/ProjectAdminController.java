package cn.wangdm.doc.controller.admin;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cn.wangdm.base.dto.PageResult;
import cn.wangdm.base.dto.ResultDto;
import cn.wangdm.base.dto.SingleResult;
import cn.wangdm.doc.dto.ProjectDto;
import cn.wangdm.doc.service.ProjectService;

@RestController
@RequestMapping("/admin/api/project")
public class ProjectAdminController {

	@Autowired
	ProjectService projectService;

	@PostMapping("")
	@PreAuthorize("hasAuthority('project:create')")
	public ResultDto create(@RequestBody()ProjectDto dto) {
		SingleResult<ProjectDto> result = new SingleResult<ProjectDto>(); 
		
		result.setData((ProjectDto) projectService.create(dto));
		
		return result;
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('project:delete')")
	public ResultDto delete(@PathVariable("id")long id) {
		SingleResult<ProjectDto> result = new SingleResult<ProjectDto>(); 
		projectService.delete(id);
		return result;
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('project:update')")
	public ResultDto update(@PathVariable("id")long id, @RequestBody()ProjectDto dto) {
		SingleResult<ProjectDto> result = new SingleResult<ProjectDto>(); 
		dto.setId(id);
		projectService.update(dto);
		result.setData(dto);
		return result;
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('project:view')")
	public ResultDto find(@PathVariable("id")long id) {
		SingleResult<ProjectDto> result = new SingleResult<ProjectDto>(); 
		ProjectDto dto = (ProjectDto) projectService.find(id);
		result.setData(dto);
		return result;
	}
	
	@GetMapping("")
	@PreAuthorize("hasAuthority('project:view')")
	public ResultDto list(ProjectDto criteria, 
			@RequestParam(name="page", defaultValue="1")Integer page,
			@RequestParam(name="limit", defaultValue="100")Integer count) {
		if(page < 1) {
			page = 1;
		}
		PageResult<ProjectDto> result = projectService.list(criteria, page, count);
		
		return result;
	}
	
	@GetMapping(name="", params= {"search"})
	@PreAuthorize("hasAuthority('project:view')")
	public ResultDto search(@RequestParam(name="search", defaultValue="")String str,
			@RequestParam(name="accountId", defaultValue="0")long account,
			@RequestParam(name="page", defaultValue="1")Integer page,
			@RequestParam(name="limit", defaultValue="100")Integer count) {
		if(page < 1) {
			page = 1;
		}
		PageResult<ProjectDto> result = null;
		ProjectDto criteria = new ProjectDto();
		if(StringUtils.isBlank(str)) {
			criteria.setAccountId(account);
			result = projectService.list(criteria, page, count);
		}else {
			criteria.setAccountId(account);
			criteria.setName(str);
			result = projectService.search(criteria, page, count);
		}
		return result;
	}

	@PutMapping("/verify")
	@PreAuthorize("hasAuthority('project:update')")
	public ResultDto verify(@RequestBody()List<Long> ids) {
		SingleResult<ProjectDto> result = new SingleResult<ProjectDto>(); 
		
		for(long id : ids) {
			projectService.verify(id);
		}
		
		return result;
	}

	@PutMapping("/restore")
	@PreAuthorize("hasAuthority('project:update')")
	public ResultDto restore(@RequestBody()List<Long> ids) {
		SingleResult<ProjectDto> result = new SingleResult<ProjectDto>(); 
		
		for(long id : ids) {
			projectService.restore(id);
		}
		
		return result;
	}

	@PutMapping("/forbid")
	@PreAuthorize("hasAuthority('project:update')")
	public ResultDto forbid(@RequestBody()List<Long> ids) {
		SingleResult<ProjectDto> result = new SingleResult<ProjectDto>(); 
		
		for(long id : ids) {
			projectService.forbid(id);
		}
		
		return result;
	}

	@PutMapping("/delete")
	@PreAuthorize("hasAuthority('project:delete')")
	public ResultDto delete(@RequestBody()List<Long> ids) {
		SingleResult<ProjectDto> result = new SingleResult<ProjectDto>(); 
		
		for(long id : ids) {
			projectService.delete(id);
		}
		
		return result;
	}
}
