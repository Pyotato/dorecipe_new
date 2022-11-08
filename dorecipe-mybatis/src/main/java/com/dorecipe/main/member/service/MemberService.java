package com.dorecipe.main.member.service;

import java.util.List;

import com.dorecipe.main.member.vo.MemberVO;

public interface MemberService {
	// 회원목록 전체 조회
	public List<MemberVO> listMembers() throws Exception;

	//회원 정보 수정
	public void ModifyMember(MemberVO memberVO) throws Exception;
	
	// 회원 등록(가입)
	public int JoinMember(MemberVO memberVO) throws Exception;
	
	// 회원 삭제(탈퇴)
	public int DeleteMember(String member_id) throws Exception;

	// 회원 상세 조회
	public MemberVO listMemberDetails(String member_id) throws Exception;

	//회원 아이디 중복 조회
//	public MemberVO CheckDuplicateId(String member_id) throws Exception;
}