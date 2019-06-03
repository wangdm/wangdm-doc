package cn.wangdm.doc.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="Chapter")
public class Chapter {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@Column(name = "account_id")
	private Long accountId;

	@Column(name = "project_id")
	private Long projectId;

	@Column(name = "parent_id")
	private Long parentId;

	@Column(name="name")
	private String name;

	@Column(name="idx")
	private String idx;

	@Column(name="create_time", updatable=false)
	private Timestamp createTime;

	@Column(name="update_time")
	private Timestamp updateTime;

}
