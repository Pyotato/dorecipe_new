package com.dorecipe.main.notice.service;

import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.ui.Model;

import com.dorecipe.main.notice.vo.Notice;

public interface NoticeService {
	
	//공지사항 목록 요청
	List<Notice> getList();
	
	//공지사항 상세페이지 요청
	Notice getDetail(int notice_num) throws Exception;
	
	//등록
	public int insert(Notice notice) throws Exception;
	
	//수정
	void update(Notice notice) throws Exception;
	
	//삭제
	void delete(int notice_num) throws Exception;
	
	
	
}
