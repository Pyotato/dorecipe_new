package com.dorecipe.main.comment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dorecipe.main.comment.dao.CommentDAO;
import com.dorecipe.main.comment.vo.CommentVO;

@Service
public class CommentServiceImpl implements CommentService{
	
	@Autowired
	private CommentDAO commentDAO;
	
//	@Override
//	public int insertEvent(CommentVO commentVO,Integer comment_num) {
//		System.out.println("comment insert service부분");
//		return commentDAO.insertComment(commentVO,comment_num);
//	}
	@Override
	public int insertComment(CommentVO commentVO) {
		System.out.println("comment insert service부분 + " + commentVO.getComment_content());
		return commentDAO.insertComment(commentVO);
	}
	
	@Override
	public int deleteComment(Integer recipe_num,Integer comment_num) {
		return commentDAO.deleteComment(recipe_num,comment_num);
	}
	
	@Override
	public List<CommentVO> selectComment(Integer recipe_num) {
		List<CommentVO> selectList = commentDAO.selectComment(recipe_num);
		System.out.println("service : recipeNum에 맞는 코멘트 찾기");
		return selectList;
	}
	
}
