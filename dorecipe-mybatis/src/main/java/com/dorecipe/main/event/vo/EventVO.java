package com.dorecipe.main.event.vo;


import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EventVO {
	
	public int getEvent_num() {
		return event_num;
	}
	public void setEvent_num(int event_num) {
		this.event_num = event_num;
	}
	public String getMember_id() {
		return member_id;
	}
	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}
	public String getEvent_title() {
		return event_title;
	}
	public void setEvent_title(String event_title) {
		this.event_title = event_title;
	}
	public String getEvent_content() {
		return event_content;
	}
	public void setEvent_content(String event_content) {
		this.event_content = event_content;
	}
	public String getEvent_path() {
		return event_path;
	}
	public void setEvent_path(String event_path) {
		this.event_path = event_path;
	}
	public String getEvent_creDate() {
		return event_creDate;
	}
	public void setEvent_creDate(String event_creDate) {
		this.event_creDate = event_creDate;
	}
	public String getEvent_finDate() {
		return event_finDate;
	}
	public void setEvent_finDate(String event_finDate) {
		this.event_finDate = event_finDate;
	}
	private int event_num;
	private String member_id;
	private String event_title;
	private String event_content;
	private String event_path;
	private String event_creDate;
	private String event_finDate;
	
//	private MultipartFile event_image;
	
}
