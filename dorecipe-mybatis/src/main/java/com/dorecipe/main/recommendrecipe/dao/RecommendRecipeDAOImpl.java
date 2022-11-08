package com.dorecipe.main.recommendrecipe.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.dorecipe.main.recommendrecipe.vo.RecommendRecipeVO;

@Repository
public class RecommendRecipeDAOImpl implements RecommendRecipeDAO{

	private RecommendRecipeDAO mapper;
	
	@Autowired
	SqlSession sqlSession;
	
//	@Autowired
//	public RecommendRecipeDAOImpl(SqlSession sqlSession) {
//		mapper = sqlSession.getMapper(RecommendRecipeDAO.class);
//	}
	
	@Override
	public List<RecommendRecipeVO> getList() {
//		return mapper.getList();
		return sqlSession.selectList("mapper.recommendRecipe.getList");
	}
	
}
