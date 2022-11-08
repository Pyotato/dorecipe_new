package com.dorecipe.main.comment.dao;

import java.util.List;

import com.dorecipe.main.comment.vo.CommentVO;

public interface CommentDAO {

//	int insertComment(CommentVO commentVO,Integer comment_num);
	int insertComment(CommentVO commentVO);

	int deleteComment(Integer recipe_num,Integer comment_num);

	List<CommentVO> selectComment(Integer recipe_num);

}
