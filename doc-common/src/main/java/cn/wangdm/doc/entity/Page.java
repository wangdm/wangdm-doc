package cn.wangdm.doc.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="Page")
public class Page {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@Column(name = "account_id")
	private Long accountId;

	@Column(name = "project_id")
	private Long projectId;

	@Column(name = "chapter_id")
	private Long chapterId;

	@Column(name="name")
	private String name;

	@Lob
	@Column(name="content")
	private String content;

	@Column(name="create_time", updatable=false)
	private Timestamp createTime;

	@Column(name="update_time")
	private Timestamp updateTime;

}
