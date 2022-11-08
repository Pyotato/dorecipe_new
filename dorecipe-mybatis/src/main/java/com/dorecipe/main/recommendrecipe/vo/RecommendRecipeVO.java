package com.dorecipe.main.recommendrecipe.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecommendRecipeVO {

	private String member_id;
	private int recipe_num;
	private int reco_num;
	private String reco_creDate;

	// 레시피테이블과 이너조인
	private String recipe_title;
	private String recipe_rpath;
	
}
