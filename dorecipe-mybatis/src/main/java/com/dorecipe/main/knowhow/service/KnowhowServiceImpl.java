package com.dorecipe.main.knowhow.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dorecipe.main.knowhow.dao.KnowhowDAO;
import com.dorecipe.main.knowhow.vo.KnowhowVO;

@Service
public class KnowhowServiceImpl implements KnowhowService {
	
	@Autowired
	KnowhowDAO knowhowDAO;

	@Override
	public List<KnowhowVO> listKnowhow() throws Exception {
		List<KnowhowVO> knowhowList = null;
		knowhowList = knowhowDAO.selectAllKnowhowList();
		
		System.out.println("DAO 주입 완 - service");
		
		return knowhowList;
	}

	//상세보기
	@Override
	public KnowhowVO getDetail(int know_num) throws Exception {
		KnowhowVO knowhowVO = knowhowDAO.getDetail(know_num);
		
		System.out.println("!!!!!!!!!knowhow title " + knowhowVO.getKnow_title());
		System.out.println("!!!!!!!!!knowhow content " + knowhowVO.getKnow_content());
		
		return knowhowVO;
	}
	
	// 수정
	@Override
	public int updateKnowhow(KnowhowVO knowhowVO) throws Exception {
		System.out.println("Service - knowhow num " + knowhowVO.getKnow_num());
		System.out.println("Service - knowhow title " + knowhowVO.getKnow_title());
		System.out.println("Service - knowhow content " + knowhowVO.getKnow_content());
		
		return knowhowDAO.updateKnowhow(knowhowVO);
	}
	
	//등록
	@Override
	public int insertKnowhow(KnowhowVO knowhowVO) throws Exception{
		
		System.out.println("!!!!!!!!!knowhow title " + knowhowVO.getKnow_title());
		System.out.println("!!!!!!!!!knowhow content " + knowhowVO.getKnow_content());
		
		return knowhowDAO.insertKnowhow(knowhowVO);
		
	}
	
	//삭제
	@Override
	public int deleteKnowhow(int know_num) throws Exception {
		return knowhowDAO.deleteKnowhow(know_num);
	}

}
