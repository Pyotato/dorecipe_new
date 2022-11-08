package com.dorecipe.main.recipe.vo;

import java.io.File;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecipeVO {

	@Value("${part4.upload.path}")
	public String uploadPathStepImages;
	
	//레시피테이블
	private Integer recipe_num;
	private String recipe_title;
	private int recipe_savetype;
	private String recipe_introduce;
	private String recipe_url;
	private String recipe_rpath;
	private String category_kind;
	public Integer getRecipe_num() {
		return recipe_num;
	}
	

	public List<RecipeVO> getOrderVoList() {
		return orderVoList;
	}


	public void setOrderVoList(List<RecipeVO> orderVoList) {
		this.orderVoList = orderVoList;
	}


	

	private String category_theme;
	private String category_way;
	private String category_ing;
	private String information_person;
	private String information_time;
	private String information_level;
	private String completion_path1;
	private String completion_path2;
	private String completion_path3;
	private String completion_path4;
	private String completion_tip;
	private String recipe_creDate;
	private String member_id;
	
		
	//요리재료 테이블
	private int ing_num;
	public String getRecipe_title() {
		return recipe_title;
	}


	public void setRecipe_title(String recipe_title) {
		this.recipe_title = recipe_title;
	}


	public int getRecipe_savetype() {
		return recipe_savetype;
	}


	public void setRecipe_savetype(int recipe_savetype) {
		this.recipe_savetype = recipe_savetype;
	}


	public String getRecipe_introduce() {
		return recipe_introduce;
	}


	public void setRecipe_introduce(String recipe_introduce) {
		this.recipe_introduce = recipe_introduce;
	}


	public String getRecipe_url() {
		return recipe_url;
	}


	public void setRecipe_url(String recipe_url) {
		this.recipe_url = recipe_url;
	}


	public String getRecipe_rpath() {
		return recipe_rpath;
	}


	public void setRecipe_rpath(String recipe_rpath) {
		this.recipe_rpath = recipe_rpath;
	}


	public String getCategory_kind() {
		return category_kind;
	}


	public void setCategory_kind(String category_kind) {
		this.category_kind = category_kind;
	}


	public String getCategory_theme() {
		return category_theme;
	}


	public void setCategory_theme(String category_theme) {
		this.category_theme = category_theme;
	}


	public String getCategory_way() {
		return category_way;
	}


	public void setCategory_way(String category_way) {
		this.category_way = category_way;
	}


	public String getCategory_ing() {
		return category_ing;
	}


	public void setCategory_ing(String category_ing) {
		this.category_ing = category_ing;
	}

	
	//요리순서 테이블
	private int order_num;
	private String order_explain;
	private String order_path;
	
	public String getInformation_person() {
		return information_person;
	}


	public void setInformation_person(String information_person) {
		this.information_person = information_person;
	}


	public String getInformation_time() {
		return information_time;
	}


	public void setInformation_time(String information_time) {
		this.information_time = information_time;
	}


	public String getInformation_level() {
		return information_level;
	}


	public void setInformation_level(String information_level) {
		this.information_level = information_level;
	}


	public String getCompletion_path1() {
		return completion_path1;
	}


	public void setCompletion_path1(String completion_path1) {
		this.completion_path1 = completion_path1;
	}


	public String getCompletion_path2() {
		return completion_path2;
	}


	public void setCompletion_path2(String completion_path2) {
		this.completion_path2 = completion_path2;
	}


	public String getCompletion_path3() {
		return completion_path3;
	}


	public void setCompletion_path3(String completion_path3) {
		this.completion_path3 = completion_path3;
	}



	public void setComment_num(int comment_num) {
		this.comment_num = comment_num;
	}

	public String getCompletion_path4() {
		return completion_path4;
	}


	public void setCompletion_path4(String completion_path4) {
		this.completion_path4 = completion_path4;
	}


	public String getCompletion_tip() {
		return completion_tip;
	}


	public void setCompletion_tip(String completion_tip) {
		this.completion_tip = completion_tip;
	}


	public String getRecipe_creDate() {
		return recipe_creDate;
	}


	public void setRecipe_creDate(String recipe_creDate) {
		this.recipe_creDate = recipe_creDate;
	}


	public String getMember_id() {
		return member_id;
	}


	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}


	public int getIng_num() {
		return ing_num;
	}


	public void setIng_num(int ing_num) {
		this.ing_num = ing_num;
	}


	public String getIng_ingredient() {
		return ing_ingredient;
	}


	public void setIng_ingredient(String ing_ingredient) {
		this.ing_ingredient = ing_ingredient;
	}


	public String getIng_amount() {
		return ing_amount;
	}


	public void setIng_amount(String ing_amount) {
		this.ing_amount = ing_amount;
	}


	public int getOrder_num() {
		return order_num;
	}


	public void setOrder_num(int order_num) {
		this.order_num = order_num;
	}


	public String getOrder_explain() {
		return order_explain;
	}


	public void setOrder_explain(String order_explain) {
		this.order_explain = order_explain;
	}


	public String getOrder_path() {
		return order_path;
	}


	public void setOrder_path(String order_path) {
		String uploadDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
		if(order_path.contains("https://recipe")) {//크롤링했던 거 주소
			this.order_path=order_path;
		} else {
			//사용자 등록레시피
			this.order_path = "/img/recipe/steps/"+ uploadDate +
					"/"+order_path;
			System.out.println("setOrder_path!!!!!!!!!!!!!!: " +order_path);
		}
//		this.order_path=order_path;
	}


	public int getComment_num() {
		return comment_num;
	}


	private String ing_ingredient;
	private String ing_amount;


	public String getComment_content() {
		return comment_content;
	}


	public void setComment_content(String comment_content) {
		this.comment_content = comment_content;
	}


	public String getComment_path() {
		return comment_path;
	}


	public void setComment_path(String comment_path) {
		this.comment_path = comment_path;
	}


	public String getComment_creDate() {
		return comment_creDate;
	}


	public void setComment_creDate(String comment_creDate) {
		this.comment_creDate = comment_creDate;
	}


	public int getLikes() {
		return likes;
	}


	public void setLikes(int likes) {
		this.likes = likes;
	}


	public void setRecipe_num(Integer recipe_num) {
		this.recipe_num = recipe_num;
	}



	
	
//	private String order_path1;
//	private String order_path2;
//	private String order_path3;
//	private String order_path4;
//	private String order_path5;
//	private String order_path6;
//	private String order_path7;
//	private String order_path8;
//	private String order_path9;
//	private String order_path10;
//	private String order_path11;
//	private String order_path12;
//	private String order_path13;
//	private String order_path14;
//	private String order_path15;
//	private String order_path16;
//	private String order_path17;
//	private String order_path18;
//	private String order_path19;
//	private String order_path20;
//	private String order_path21;
//	private String order_path22;
//	private String order_path23;
//	private String order_path24;
//	private String order_path25;
//	private String order_path26;
//	private String order_path27;
//	private String order_path28;
//	private String order_path29;
//	private String order_path30;
	


	private List<RecipeVO> orderVoList;
	private List<String> orderVoList_path;
//	private List<RecipeVO> orderVoList2;
	


	public void setOrderVoList_path(List<String> orderVoList_path) {
		
		this.orderVoList_path = orderVoList_path;
	}

	public List<String> getOrderVoList_path() {
		return orderVoList_path;
	}



	//코멘트 테이블
	private int comment_num;
	private String comment_content;
	private String comment_path;
	private String comment_creDate;
	
	//레시피 좋아요 테이블
	private int likes;
	
	
	// 데이터 출력
	@Override
	public String toString() {
		return "order_path [order_path=" + order_path +" , "+ orderVoList_path +"]";
	}



}
