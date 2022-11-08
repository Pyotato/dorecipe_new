package com.dorecipe.main.recipe.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dorecipe.main.recipe.dao.RecipeDAO;
import com.dorecipe.main.recipe.vo.RecipeVO;

@Service
public class RecipeService {

	@Autowired
	private RecipeDAO recipeDAO;
	
	//레시피 목록
	public List<RecipeVO> getList(){
		List<RecipeVO> recipeList = recipeDAO.getList();
		return recipeList;
	}
	
	//레시피 상세
	public RecipeVO getDetail(Integer recipe_num) {
		RecipeVO recipeVO = recipeDAO.getDetail(recipe_num);
		return recipeVO;
	}
		
	//레시피 조리순서
	public List<RecipeVO> getOrder(Integer recipe_num) {
		List<RecipeVO> recipeOrder = recipeDAO.getOrder(recipe_num);
		return recipeOrder;
	}
	
	public List<RecipeVO> getComment(Integer recipe_num) {
		List<RecipeVO> comment = recipeDAO.getComment(recipe_num);
		return comment;
	}

	//(해당 멤버의)레시피 번호 가져오기
	public int getRecipeNum(String member_id) {
		int recipe_num = recipeDAO.getRecipeNum(member_id);
		return recipe_num;
	}
	

	//레시피 등록
	public int insertRecipe(RecipeVO recipeVO) {
		return recipeDAO.insertRecipe(recipeVO);
	}
	
	//레시피 임시저장 등록
	public int recipeTemporarySave(RecipeVO recipeVO) {
		return recipeDAO.recipeTemporarySave(recipeVO);
	}
	

	//레시피 수정
	public int updateRecipe(RecipeVO recipeVO) {
		return recipeDAO.updateRecipe(recipeVO);
	}
	
	//레시피 삭제
	public int deleteRecipe(int recipe_num) {
		return recipeDAO.deleteRecipe(recipe_num);
	}


	//레시피 순서 추가
	public int insertRecipeOrder(RecipeVO recipeVO) {
		return recipeDAO.insertRecipeOrder(recipeVO);

		
	}

	//레시피 재료 등록
	public int insertRecipeIngredients(RecipeVO recipeVO) {
		return recipeDAO.insertRecipeIngredients(recipeVO);
		
	}
	
	//레시피 완성 등록
	public int insertRecipeComplete(RecipeVO recipeVO) {
		return recipeDAO.insertRecipeComplete(recipeVO);
		
	}

	public List<RecipeVO> searchRecipe(String recipe_title) {
		List<RecipeVO> serachList = recipeDAO.searchRecipe(recipe_title);
		return serachList;
	}

	//레시피 상세 검색페이지
//	public List<RecipeVO> detailSearchRecipe(String category_kind,String category_theme,String category_way,String category_ing, int recipe_savetype) {
//		List<RecipeVO> searchResult = recipeDAO.detailSearchRecipe(category_kind,category_theme,category_way,category_ing,recipe_savetype);
//		return searchResult;
//	}
	public List<RecipeVO> detailSearchRecipe(RecipeVO recipeVO) {
		List<RecipeVO> searchResult = recipeDAO.detailSearchRecipe(recipeVO);
		System.out.println("Service ==> " + recipeVO);
		return searchResult;
	}

	//상세 검색에 해당 되는 레시피 상세 페이지
	public List<RecipeVO> showDetailSearchRecipe(Integer recipe_num) {
		List<RecipeVO> searchResultDetails = recipeDAO.showDetailSearchRecipe(recipe_num);
		return searchResultDetails;
	}
	//임시저장한 거 수정하기 위해 불러오는 정보
	public List<RecipeVO> showDetailTemporySaved(Integer recipe_num) {
		List<RecipeVO> showDetailTemporySaved = recipeDAO.showDetailTemporySaved(recipe_num);
		System.out.println(showDetailTemporySaved.toString());
		return showDetailTemporySaved;
	}

	//레시피 순서 크롤링한 거 넣기
	public int insertRecipeOrderCheerio(RecipeVO recipeVO) {
		return recipeDAO.insertRecipeOrderCheerio(recipeVO);
		
	}

	//레시피 재료 크롤링한 거 넣기
	public int insertRecipeIngredientsCheerio(RecipeVO recipeVO) {
		return recipeDAO.insertRecipeIngredientsCheerio(recipeVO);
		
	}

	//레시피 재료 리스트 (상세 페이지)
	public List<RecipeVO> getIngredientList(Integer recipe_num) {
		return recipeDAO.getIngredientList(recipe_num);
	}

	//좋아요 수 가져오기
	public Integer getRecipeLikes(Integer recipe_num) {
		return recipeDAO.getRecipeLikes(recipe_num);
	}

	//좋아요 취소하기
//	public Integer removeLikes(String param1, Integer param2) {
//		return recipeDAO.removeLikes(param1,param2);
//	}
	public Integer removeLikes(RecipeVO recipeVO) {
		return recipeDAO.removeLikes(recipeVO);
	}

	//좋아요 추가하기
//	public Integer insertLikes(String param1, Integer param2, Integer param3) {
//		return recipeDAO.insertLikes(param1,param2,param3);
//	}
	public Integer insertLikes(RecipeVO recipeVO) {
		return recipeDAO.insertLikes(recipeVO);
	}

	//좋아요한 멤버
//	public String getLikedMember(String param1, Integer param2) {
//		return recipeDAO.getLikedMember(param1,param2);
//	}
	public String getLikedMember(RecipeVO recipeVO) {
		return recipeDAO.getLikedMember(recipeVO);
	}
	
	// 작성한 레시피 조회
	public List<RecipeVO> recordCompleteRecipe(String member_id) {
	     List<RecipeVO> recordCompleteList = recipeDAO.recordCompleteRecipe(member_id);
	     return recordCompleteList;
	}
	   
	// 작성중인 레시피 조회
	public List<RecipeVO> recordRecipe(String member_id) {
	     List<RecipeVO> recordList = recipeDAO.recordRecipe(member_id);
	     return recordList;
	}

	//레시피 순서 수정
	public int updateRecipeInstructions(RecipeVO recipeVO) {
		return recipeDAO.updateRecipeInstructions(recipeVO);
		
	}

	public int updateRecipeSaveType(int recipe_num) {
		return recipeDAO.updateRecipeSaveType(recipe_num);		
	}

//	//레시피 순서 수정
//	public int updateRecipeInstructions(Integer param1, Integer param2) {
//		return recipeDAO.updateRecipeInstructions(param1,param2);
//		
//	}
	//레시피 저장 0으로 수정
		


}
