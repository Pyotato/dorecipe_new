package com.dorecipe.main.knowhow.service;

import java.util.List;

import com.dorecipe.main.knowhow.vo.KnowhowVO;

public interface KnowhowService {
	// 노하우 목록 전체 조회
	public List<KnowhowVO> listKnowhow() throws Exception;
	
	// 노하우 게시물 등록
	public int insertKnowhow(KnowhowVO knowhowVO) throws Exception;
	
	// 노하우 게시물 수정
	public int updateKnowhow(KnowhowVO knowhowVO) throws Exception;
	
	// 노하우 게시물 삭제
	public int deleteKnowhow(int know_num) throws Exception;

	public KnowhowVO getDetail(int know_num) throws Exception;

}
