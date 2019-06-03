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
@Table(name="Project")
public class Project {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@Column(name = "account_id")
	private Long accountId;

	@Column(name="name")
	private String name;

	@Column(name="type")
	private Byte type;

	@Column(name="domain")
	private String domain;

	@Column(name="password")
	private String password;

	@Column(name="status")
	private Byte status;

	@Column(name="create_time", updatable=false)
	private Timestamp createTime;

	@Column(name="update_time")
	private Timestamp updateTime;

}
