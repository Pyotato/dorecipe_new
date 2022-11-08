package com.dorecipe.main.recommendrecipe.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import com.dorecipe.main.recommendrecipe.service.RecommendRecipeService;
import com.dorecipe.main.recommendrecipe.vo.RecommendRecipeVO;

import lombok.RequiredArgsConstructor;
@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@RequestMapping("/recommend")
@RequiredArgsConstructor
public class RecommendRecipeController {

	@Autowired
	private RecommendRecipeService recommendRecipeService;
	
	@RequestMapping("/list")
	public String recoRecipeList(Model model) {
		List<RecommendRecipeVO> recoList = recommendRecipeService.getList();
		model.addAttribute("recoList",recoList);
		return "recommendRecipe";
	}
	
}
