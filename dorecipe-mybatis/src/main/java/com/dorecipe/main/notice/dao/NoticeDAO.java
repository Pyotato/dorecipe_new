package com.dorecipe.main.notice.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.dao.DataAccessException;

import com.dorecipe.main.notice.vo.Notice;

//@Mapper	//mybatis에서 제공하는 것. 객체화 시킴, mybatis가 구현체를 만들어서 IoC컨테이너에 담음
public interface NoticeDAO {
	
	//만약에 db 컬럼명과 코드의 컬럼명이 다르게 지정됐으면 (귀찮으니까 반드시 같은 명으로 쓰자...!)
	//@Result(property="코드의 컬럼명", column="db의 컬럼명")
	//result 어노테이션으로 매핑해줌
	//2개 이상을 매핑해야되면 @Results({})안에 @Result()를 나열함
	
	//어노테이션 쿼리문의 문제점
	//1. 어노테이션으로 쿼리를 작성하면 규모가 작을 때, 쿼리문이 단순할 때는 좋지만 복잡도가 높은 경우 불편함
	//2. 인터페이스는 보통 정의만 하는 목적인데 쿼리문을 작성하여 작동에 밀접한 연관?이 있게 하는 것은 좋지 못함(인터페이스가 구현객체 느낌이 됨)
	//3. 쿼리문이 복잡해지면 그래서 인터페이스에서 정의하는 게 뭔데? 처럼 가독성 떨어짐
	// 그래서!! 어노테이션으로 쿼리문을 쓰는 것보다는 xml파일로 쿼리를 몰아!!
	
	//@Select("select * from Notice order by notice_num desc")
	//목록 리스트
	public List<Notice> getList();
	
	//상세페이지
	public Notice getDetail(int notice_num) throws Exception;
	
	
	//삽입(등록)
	public int insertNotice(Notice notice) throws Exception;
	//수정
	public int updateNotice(Notice notice) throws Exception;
	//삭제
	public int deleteNotice(int notice_num) throws Exception;


}
