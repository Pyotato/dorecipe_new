package com.dorecipe.main.comment.service;

import java.util.List;

import com.dorecipe.main.comment.vo.CommentVO;

public interface CommentService {

//	public int insertEvent(CommentVO commentVO,Integer comment_num);
	public int insertComment(CommentVO commentVO);

	public int deleteComment(Integer recipe_num,Integer comment_num);

	public List<CommentVO> selectComment(Integer recipe_num);

}
