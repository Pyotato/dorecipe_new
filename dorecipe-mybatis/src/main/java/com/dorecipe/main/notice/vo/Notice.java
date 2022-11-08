package com.dorecipe.main.notice.vo;

import java.util.Date;

//db의 자료를 가져올 때 담아줄 그릇
//db의 필드와 같은 필드,setter,getter메소드를 가짐
public class Notice {

	//db에 있는 필드 그대로!
	private int notice_num;
	private String member_id;
	private String notice_title;
	private String notice_content;
	private String notice_creDate;	//Date는 util을 import하기! sql date아님!
	
	public Notice() {
		// TODO Auto-generated constructor stub
	}
	
	public Notice(int notice_num, String member_id, String notice_title, String notice_content, String notice_creDate) {
		super();
		this.notice_num = notice_num;
		this.member_id = member_id;
		this.notice_title = notice_title;
		this.notice_content = notice_content;
		this.notice_creDate = notice_creDate;
	}

	//setter,getter
	public int getNotice_num() {
		return notice_num;
	}
	public void setNotice_num(int notice_num) {
		this.notice_num = notice_num;
	}
	public String getMember_id() {
		return member_id;
	}
	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}
	public String getNotice_title() {
		return notice_title;
	}
	public void setNotice_title(String notice_title) {
		this.notice_title = notice_title;
	}
	public String getNotice_content() {
		return notice_content;
	}
	public void setNotice_content(String notice_content) {
		this.notice_content = notice_content;
	}
	public String getNotice_creDate() {
		return notice_creDate;
	}
	public void setNotice_creDate(String notice_creDate) {
		this.notice_creDate = notice_creDate;
	}

	//데이터 출력
	@Override
	public String toString() {
		return "Notice [notice_num=" + notice_num + ", member_id=" + member_id + ", notice_title=" + notice_title
				+ ", notice_content=" + notice_content + ", notice_creDate=" + notice_creDate + "]";
	}
	
	
	
	
}
