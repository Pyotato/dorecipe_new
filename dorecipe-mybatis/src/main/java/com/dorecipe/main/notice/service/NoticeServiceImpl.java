package com.dorecipe.main.notice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.dorecipe.main.notice.dao.NoticeDAO;
import com.dorecipe.main.notice.vo.Notice;

//구현클래스
@Service	//component,service,controller,repository,config 모두 객체화 시키는 어노테이션!
public class NoticeServiceImpl implements NoticeService{
	
	@Autowired	//참조해서 쓸게!
	private NoticeDAO noticeDao;	//DAO 객체를 주입 받는 곳
	
	//목록 보기
	@Override
	public List<Notice> getList() {

		List<Notice> list = noticeDao.getList();
		
		return list;
	}
	
	//상세페이지
	@Override
	public Notice getDetail(int notice_num) throws Exception {
		
		Notice notice = noticeDao.getDetail(notice_num);
		
		return notice;
	}

	//등록
	@Override
	public int insert(Notice notice) throws Exception{
		
		System.out.println("NoticeServiceImpl - insert함수 부분");
		
		System.out.println("!!!!!!!!!!!!!!!!notice title " + notice.getNotice_title());
		System.out.println("!!!!!!!!!!!!!!!!notice content " + notice.getNotice_content());
		return noticeDao.insertNotice(notice);
		
	}

	//수정
	@Override
	public void update(Notice notice) throws Exception{
		noticeDao.updateNotice(notice);
	}

	//삭제
	@Override
	public void delete(int notice_num) throws Exception{
		noticeDao.deleteNotice(notice_num);
	}


	
	
}
