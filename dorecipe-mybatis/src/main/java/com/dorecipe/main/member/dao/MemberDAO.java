package com.dorecipe.main.member.dao;

import java.util.List;
import java.util.Optional;

import com.dorecipe.main.member.vo.MemberVO;

public interface MemberDAO {
	// 회원목록 전체 조회
	public List<MemberVO> selectAllMemberList() throws Exception;
	
	// 회원 아이디 조회
	//public Optional<MemberVO> findById(String member_id) throws Exception;
	
	// 회원 정보 상세
	public MemberVO selectAllMemberDetail(String id) throws Exception;
	
	// 회원 정보 수정
	public int updateMember(MemberVO memberVO) throws Exception;
	
	// 회원 등록(가입)
	public int insertMember(MemberVO memberVO) throws Exception;
	
	// 회원 삭제(탈퇴)
	public int deleteMember(String id) throws Exception;

	//public MemberVO checkDuplicateId(String member_id)  throws Exception;
	
//	public Optional<MemberVO> findByMemberId(String username);
}