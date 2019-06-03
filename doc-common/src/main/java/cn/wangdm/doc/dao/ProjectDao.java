package cn.wangdm.doc.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import cn.wangdm.doc.entity.Project;

public interface ProjectDao extends JpaRepository<Project, Long>, JpaSpecificationExecutor<Project>{

}
