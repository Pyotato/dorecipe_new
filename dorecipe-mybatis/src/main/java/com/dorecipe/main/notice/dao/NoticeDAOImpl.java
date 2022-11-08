package com.dorecipe.main.notice.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.dorecipe.main.notice.vo.Notice;

//구현클래스
@Repository	//데이터를 관리하는 클래스
public class NoticeDAOImpl implements NoticeDAO{
	
	@Autowired
	SqlSession sqlSession;
	
//	private NoticeDAO mapper;
//	
//	@Autowired
//	public NoticeDAOImpl(SqlSession sqlSession) {
//		mapper = sqlSession.getMapper(NoticeDAO.class);	//이 과정은 모든 함수마다 반복되니까 객체로 따로 만들어둠
//	}
	
	//공지사항 목록 리스트
	@Override
	public List<Notice> getList() {
		List<Notice> list = null;
		list = sqlSession.selectList("mapper.notice.getList");
		return list;
	}
	
	@Override
	public Notice getDetail(int notice_num) throws Exception {
		return sqlSession.selectOne("mapper.notice.getDetail", notice_num);
	}


	//공지사항 등록(삽입)
	@Override
	public int insertNotice(Notice notice) throws Exception{
		
		return sqlSession.insert("mapper.notice.insertNotice",notice);
		
		//return mapper.insertNotice(notice);
	}

	//공지사항 수정
	@Override
	public int updateNotice(Notice notice) throws Exception{
		//return mapper.updateNotice(notice);
		return sqlSession.update("mapper.notice.updateNotice",notice);
	}

	//공지사항 삭제
	@Override
	public int deleteNotice(int notice_num) throws Exception {
		return sqlSession.delete("mapper.notice.deleteNotice",notice_num);
	}

	
}
