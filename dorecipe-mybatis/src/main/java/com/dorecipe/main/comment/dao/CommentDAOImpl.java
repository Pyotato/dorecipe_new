package com.dorecipe.main.comment.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.dorecipe.main.comment.vo.CommentVO;

@Repository
public class CommentDAOImpl implements CommentDAO{
	
	@Autowired
	SqlSession sqlSession;
	
//	@Override
//	public int insertComment(CommentVO commentVO,Integer comment_num) {
//		System.out.println("comment insert DAO 부분");
//		return sqlSession.insert("mapper.comment.insertComment",commentVO);
//	}
	@Override
	public int insertComment(CommentVO commentVO) {
		System.out.println("comment insert DAO부분 + " + commentVO.getComment_content());
		return sqlSession.insert("mapper.comment.insertComment",commentVO);
	}
	
	@Override
	public int deleteComment(Integer recipe_num, Integer comment_num) {
		return sqlSession.delete("mapper.comment.deleteComment");
	};
	
	@Override
	public List<CommentVO> selectComment(Integer recipe_num){
		System.out.println("DAO : recipeNum에 맞는 코멘트 찾기");
		return sqlSession.selectList("mapper.comment.selectComment",recipe_num);
	}
	
	
}
