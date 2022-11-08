package com.dorecipe.main.member.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.dorecipe.main.member.dao.MemberDAO;
import com.dorecipe.main.member.vo.MemberVO;

@Service
//@Transactional(propagation = Propagation.REQUIRED)
public class MemberServiceImpl implements MemberService {

   //@Autowired
   //private MemberMapper memberMapper;
   
   @Autowired
   MemberDAO memberDAO;
   
   // 회원목록 전체 조회
   @Override
   public List<MemberVO> listMembers() throws Exception {
      List<MemberVO> membersList = null;
      membersList = memberDAO.selectAllMemberList();
      
      System.out.println("Service - listMembers");
      
      return membersList;
   }
   
   //회원 정보 상세 조회
   @Override
   public MemberVO listMemberDetails(String member_id) throws Exception {
      MemberVO memberVO = memberDAO.selectAllMemberDetail(member_id);
      return memberVO;
   }
   
   //회원 정보 수정
   @Override
   public void ModifyMember(MemberVO memberVO) throws Exception {
      memberDAO.updateMember(memberVO);
   }
   
   // 회원 등록(가입)
   @Override
   public int JoinMember(MemberVO memberVO) throws Exception {
      System.out.println("Service - JoinMember");
      
      return memberDAO.insertMember(memberVO);
   }
   
   // 회원 삭제(탈퇴)
   @Override
   public int DeleteMember(String member_id) throws Exception {
      System.out.println("Service - DeleteMember");
      
      return memberDAO.deleteMember(member_id);
   }

//   //중복 회원 검색
//   @Override
//   public MemberVO CheckDuplicateId(String member_id) throws Exception {
//      MemberVO memberID = memberDAO.checkDuplicateId(member_id);
//      System.out.println("memberID : "+memberID);
//      return memberID;
//   }

}