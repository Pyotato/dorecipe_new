package com.dorecipe.main.knowhow.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.dorecipe.main.knowhow.vo.KnowhowVO;
//import com.dorecipe.main.member2.vo.MemberVO;

@Repository
public class KnowhowDAOImpl implements KnowhowDAO {

	@Autowired
	SqlSession sqlSession;
	
	private KnowhowDAO knowhowDAO;
	
	// 노하우 목록 전체 조회
	@Override
	public List<KnowhowVO> selectAllKnowhowList() throws Exception {
		List<KnowhowVO> knowhowList = null;
		knowhowList = sqlSession.selectList("mapper.knowhow.selectAllKnowhowList");
		
		return knowhowList;
	}
	
	// 노하우 상세 보기
	@Override
	public KnowhowVO getDetail(int know_num) throws Exception{
//		return knowhowDAO.getDetail(know_num);
		return sqlSession.selectOne("mapper.knowhow.getDetail", know_num);
	}
	
	// 노하우 게시물 수정
	@Override
	public int updateKnowhow(KnowhowVO knowhowVO) throws Exception {
		System.out.println("DAO - knowhow num " + knowhowVO.getKnow_num());
		System.out.println("DAO - knowhow title " + knowhowVO.getKnow_title());
		System.out.println("DAO - knowhow content " + knowhowVO.getKnow_content());
		
		return sqlSession.update("mapper.knowhow.updateKnowhow", knowhowVO);
//		return knowhowDAO.updateKnowhow(knowhowVO);
	}
	
	// 노하우 게시물 등록
	@Override
	public int insertKnowhow(KnowhowVO knowhowVO) throws Exception {
		
		return sqlSession.insert("mapper.knowhow.insertKnowhow", knowhowVO);
	}

	// 노하우 게시물 삭제
	@Override
	public int deleteKnowhow(int know_num) throws Exception {
		return sqlSession.delete("mapper.knowhow.deleteKnowhow", know_num);
	}

}
