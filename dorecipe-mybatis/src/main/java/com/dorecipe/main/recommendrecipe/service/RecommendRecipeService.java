package com.dorecipe.main.recommendrecipe.service;

import java.util.List;

import com.dorecipe.main.recommendrecipe.dao.RecommendRecipeDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dorecipe.main.recommendrecipe.vo.RecommendRecipeVO;

@Service
public class RecommendRecipeService {

	@Autowired
	private RecommendRecipeDAO recommendRecipeDAO;
	
	public List<RecommendRecipeVO> getList() {
		List<RecommendRecipeVO> recoList = recommendRecipeDAO.getList();
		return recoList;
	}

}
