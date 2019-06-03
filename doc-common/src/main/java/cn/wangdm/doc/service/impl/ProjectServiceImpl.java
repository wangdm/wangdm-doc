package cn.wangdm.doc.service.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import cn.wangdm.account.dao.AccountDao;
import cn.wangdm.account.entity.Account;
import cn.wangdm.base.dto.Dto;
import cn.wangdm.base.dto.PageResult;
import cn.wangdm.doc.dao.ProjectDao;
import cn.wangdm.doc.dto.ProjectDto;
import cn.wangdm.doc.entity.Project;
import cn.wangdm.doc.service.ProjectService;

@Service
public class ProjectServiceImpl implements ProjectService {

	@Autowired
	private AccountDao accountDao;

	@Autowired
	private ProjectDao projectDao;

	@Override
	public ProjectDto create(Dto<?> dto) {
		if(dto instanceof ProjectDto) {
			ProjectDto d = (ProjectDto)dto;
			Project entity = d.toEntity();
			
			entity.setStatus((byte) 0);
			
			long time = System.currentTimeMillis();
			entity.setCreateTime(new Timestamp(time));	
			entity.setUpdateTime(entity.getCreateTime());
			
			entity = projectDao.saveAndFlush(entity);
			return d.fromEntity(entity);
		}
		return null;
	}

	@Override
	public void delete(Long id) {
		
		projectDao.deleteById(id);
	}

	@Override
	public void verify(long id) {
		Project entity = projectDao.getOne(id);
		if(entity != null) {
			entity.setStatus((byte) 1);
			entity.setUpdateTime(new Timestamp(System.currentTimeMillis()));
			entity = projectDao.saveAndFlush(entity);
		}
		
	}

	@Override
	public void restore(long id) {
		Project entity = projectDao.getOne(id);
		if(entity != null) {
			entity.setStatus((byte) 1);
			entity.setUpdateTime(new Timestamp(System.currentTimeMillis()));	
			entity = projectDao.saveAndFlush(entity);
		}
		
	}

	@Override
	public void forbid(long id) {
		Project entity = projectDao.getOne(id);
		if(entity != null) {
			entity.setStatus((byte) 2);
			entity.setUpdateTime(new Timestamp(System.currentTimeMillis()));	
			entity = projectDao.saveAndFlush(entity);
		}
	}
	
	@Override
	public ProjectDto update(Dto<?> dto) {
		if(dto instanceof ProjectDto) {
			ProjectDto d = (ProjectDto)dto;
			Project entity = projectDao.getOne(Long.valueOf(d.getId()));
			entity = d.toEntity(entity);
			entity.setUpdateTime(new Timestamp(System.currentTimeMillis()));	
			entity = projectDao.saveAndFlush(entity);
			return d.fromEntity(entity);
		}
		return null;
	}

	@Override
	public ProjectDto find(Long id) {
		try {
			Project entity = projectDao.getOne(id);
			ProjectDto dto = new ProjectDto();
			dto.fromEntity(entity);
			try {
				Account account = accountDao.getOne(entity.getAccountId());
				dto.setAccountName(account.getFullname());
			}catch(Exception e) {}
			return dto;
		}catch(Exception e) {
			return null;
		}
	}

	@Override
	public PageResult<ProjectDto> list() {

		return list(1, 1000);
	}

	@Override
	public PageResult<ProjectDto> list(int page, int size) {
		
		return list(new ProjectDto(), page, size);
	}
	
	@Override
	public PageResult<ProjectDto> list(ProjectDto criteria, int page, int size) {
		
		PageResult<ProjectDto> result = new PageResult<ProjectDto>();
		
		Project probe = new Project();
		criteria.toEntity(probe);
		ExampleMatcher matcher = ExampleMatcher.matching()
				.withIgnorePaths("id")
				.withIgnoreNullValues();
		Example<Project> example = Example.of(probe, matcher); 
		
		Pageable pageRequest = PageRequest.of(page - 1, size, Direction.DESC, "id");
		Page<Project> entityPage = projectDao.findAll(example, pageRequest);
		
		List<Project> entityList = entityPage.getContent();
		List<ProjectDto> dtoList = new ArrayList<ProjectDto>(entityList.size());
		for(Project entity : entityList) {
			ProjectDto dto = new ProjectDto();
			dto.fromEntity(entity);
			try {
				Account account = accountDao.getOne(entity.getAccountId());
				dto.setAccountName(account.getFullname());
			}catch(Exception e) {}
			dtoList.add(dto);
		}
		
		result.setCount(entityPage.getTotalElements());
		result.setSize(entityPage.getNumberOfElements());
		result.setData(dtoList);
		
		return result;
	}

	@Override
	public PageResult<ProjectDto> search(ProjectDto criteria, int page, int size) {
		
		PageResult<ProjectDto> result = new PageResult<ProjectDto>();
		
		Pageable pageRequest = PageRequest.of(page - 1, size, Direction.DESC, "id");
		
		Page<Project> entityPage = projectDao.findAll(new Specification<Project>() {
			private static final long serialVersionUID = 1L;

			@Override
			public Predicate toPredicate(Root<Project> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				Predicate condition = null;
				if(!StringUtils.isBlank(criteria.getName())) {
					condition = criteriaBuilder.like(root.get("name"), "%" + criteria.getName() + "%");
				}
				if(criteria.getAccountId() > 0) {
					Predicate cond = criteriaBuilder.equal(root.get("accountId"), criteria.getAccountId());
					condition = criteriaBuilder.and(condition, cond);
				}
				if(criteria.getStatus() >= 0) {
					Predicate cond = criteriaBuilder.equal(root.get("status"), criteria.getStatus());
					condition = criteriaBuilder.and(condition, cond);
				}
				query.where(condition);
				return null;
			}
		}, pageRequest);
		
		List<Project> entityList = entityPage.getContent();
		List<ProjectDto> dtoList = new ArrayList<ProjectDto>(entityList.size());
		for(Project entity : entityList) {
			ProjectDto dto = new ProjectDto();
			dto.fromEntity(entity);
			try {
				Account account = accountDao.getOne(entity.getAccountId());
				dto.setAccountName(account.getFullname());
			}catch(Exception e) {}
			dtoList.add(dto);
		}
		
		result.setCount(entityPage.getTotalElements());
		result.setSize(entityPage.getNumberOfElements());
		result.setData(dtoList);
		
		return result;
	}

}
