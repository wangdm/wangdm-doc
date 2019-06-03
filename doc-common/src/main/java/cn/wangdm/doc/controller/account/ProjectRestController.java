package cn.wangdm.doc.controller.account;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cn.wangdm.account.entity.Account;
import cn.wangdm.base.dto.PageResult;
import cn.wangdm.base.dto.Result;
import cn.wangdm.base.dto.ResultDto;
import cn.wangdm.base.dto.SingleResult;
import cn.wangdm.doc.dto.ProjectDto;
import cn.wangdm.doc.service.ProjectService;

@RestController
@RequestMapping("/api/account/project")
public class ProjectRestController {

	@Autowired
	ProjectService projectService;

	@PostMapping("")
	public ResultDto create(HttpServletRequest request, @RequestBody()ProjectDto dto) {
		Account account = (Account) request.getSession().getAttribute("account");
		if(account == null) {
			return Result.unauthorized();
		}
		dto.setAccountId(account.getId());
		
		SingleResult<ProjectDto> result = new SingleResult<ProjectDto>(); 
		
		result.setData((ProjectDto) projectService.create(dto));
		
		return result;
	}

	@DeleteMapping("/{id}")
	public ResultDto delete(HttpServletRequest request, @PathVariable("id")long id) {
		Account account = (Account) request.getSession().getAttribute("account");
		if(account == null) {
			return Result.unauthorized();
		}
		
		ProjectDto dto = (ProjectDto) projectService.find(id);
		if(dto != null && dto.getAccountId() == account.getId()) {
			SingleResult<ProjectDto> result = new SingleResult<ProjectDto>(); 
			projectService.delete(id);
			return result;
		}else {
			return Result.nonexistent();
		}
	}

	@PutMapping("/{id}")
	public ResultDto update(HttpServletRequest request, @PathVariable("id")long id, @RequestBody()ProjectDto dto) {
		Account account = (Account) request.getSession().getAttribute("account");
		if(account == null) {
			return Result.unauthorized();
		}
		
		ProjectDto tmp = (ProjectDto) projectService.find(id);
		if(tmp != null && tmp.getAccountId() == account.getId()) {
			SingleResult<ProjectDto> result = new SingleResult<ProjectDto>(); 
			dto.setId(id);
			projectService.update(dto);
			result.setData(dto);
			return result;
		}else {
			return Result.nonexistent();
		}
	}

	@GetMapping("/{id}")
	public ResultDto find(HttpServletRequest request, @PathVariable("id")long id) {
		Account account = (Account) request.getSession().getAttribute("account");
		if(account == null) {
			return Result.unauthorized();
		}
		
		SingleResult<ProjectDto> result = new SingleResult<ProjectDto>(); 
		ProjectDto dto = (ProjectDto) projectService.find(id);
		if(dto != null && dto.getAccountId() == account.getId()) {
			result.setData(dto);
			return result;
		}else {
			return Result.nonexistent();
		}
	}
	
	@GetMapping("")
	public ResultDto list(HttpServletRequest request, ProjectDto criteria, 
			@RequestParam(name="page", defaultValue="1")Integer page,
			@RequestParam(name="limit", defaultValue="100")Integer count) {
		Account account = (Account) request.getSession().getAttribute("account");
		if(account == null) {
			return Result.unauthorized();
		}
		criteria.setAccountId(account.getId());
		
		if(page < 1) {
			page = 1;
		}
		PageResult<ProjectDto> result = projectService.list(criteria, page, count);
		
		return result;
	}
	
	@GetMapping(name="", params= {"search"})
	public ResultDto search(HttpServletRequest request,
			@RequestParam(name="search", defaultValue="")String str,
			@RequestParam(name="page", defaultValue="1")Integer page,
			@RequestParam(name="limit", defaultValue="100")Integer count) {
		Account account = (Account) request.getSession().getAttribute("account");
		if(account == null) {
			return Result.unauthorized();
		}
		
		if(page < 1) {
			page = 1;
		}
		PageResult<ProjectDto> result = null;
		ProjectDto criteria = new ProjectDto();
		if(StringUtils.isBlank(str)) {
			criteria.setAccountId(account.getId());
			result = projectService.list(criteria, page, count);
		}else {
			criteria.setAccountId(account.getId());
			criteria.setName(str);
			result = projectService.search(criteria, page, count);
		}
		return result;
	}

	@PutMapping("/delete")
	public ResultDto delete(HttpServletRequest request, @RequestBody()List<Long> ids) {
		Account account = (Account) request.getSession().getAttribute("account");
		if(account == null) {
			return Result.unauthorized();
		}
		
		List<Long> tmp = new ArrayList<>(ids.size());
		for(long id : ids) {
			ProjectDto dto = (ProjectDto) projectService.find(id);
			if(dto != null && dto.getAccountId() == account.getId()) {
				tmp.add(id);
			}
		}
		
		for(long id : tmp) {
			projectService.delete(id);
		}
		
		return Result.success();
	}
}
