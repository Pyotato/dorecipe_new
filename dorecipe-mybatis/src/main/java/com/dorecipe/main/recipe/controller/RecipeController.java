package com.dorecipe.main.recipe.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import com.dorecipe.main.recipe.fileUpload.RecipeFileUpload;
import com.dorecipe.main.recipe.service.RecipeService;
import com.dorecipe.main.recipe.vo.RecipeVO;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*")
//@CrossOrigin(origins={"http://localhost:3000","http://localhost:3005"}) 
@RequestMapping(value="/recipe")
@RequiredArgsConstructor
@RestController
public class RecipeController extends RecipeFileUpload{


	@Autowired
	private RecipeService recipeService;
	
	RecipeVO recipeVO;
		
	//레시피 목록
	@RequestMapping("/list")
	public String EventList(Model model) {
		List<RecipeVO> recipeList = recipeService.getList();
		model.addAttribute("recipeList",recipeList);
		return "recipe";
	}
		
	//레시피 상세
	@RequestMapping("/detail/{recipe_num}")
	public String detail(Model model, @PathVariable Integer recipe_num) {
		
	//레시피번호확인
	System.out.println("------------------레시피 컨트롤러 조회 recipe_num : " + recipe_num);
	
	RecipeVO recipeVO = recipeService.getDetail(recipe_num);			//레시피 상세정보
	List<RecipeVO> recipeOrder = recipeService.getOrder(recipe_num);	//레시피 조리순서
	List<RecipeVO> comment = recipeService.getComment(recipe_num);		//코멘트
	
	model.addAttribute("recipeVO",recipeVO);
	model.addAttribute("recipeOrder",recipeOrder);
	model.addAttribute("comment",comment);
	
	return "recipeDetail";
	}
	
	@PostMapping("/insert")
	public String insert(RecipeVO recipeVO) {
		recipeService.insertRecipe(recipeVO);
		
		System.out.println("레시피 등록됨 - Controller");
		
		return "redirect:/recipe/list";
	}
	
	//임시저장
	@PostMapping("/save")
	public String recipeTemporarySave(RecipeVO recipeVO, @RequestParam(value = "recipe_thumbnail", required = false)MultipartFile[] uploadFiles) {
		
		if(uploadFiles == null) {
			recipeService.recipeTemporarySave(recipeVO);
			System.out.println("레시피 등록됨 근데 이미지 경로가 null임 - Controller");
			return recipeVO.toString();		
		} 
//		System.out.println("~~~~~~~~~~~~~~~~~~uploadFiles"+uploadFiles+"~~~~~~~~~~~~~~~~~~uploadFiles");
		thumnailfileUpload(recipeVO,uploadFiles);
		recipeService.recipeTemporarySave(recipeVO);
		System.out.println("레시피 등록됨 - Controller");
		return recipeVO.toString();

	}
	
	//레시피 번호 가져오기
	@PostMapping("/getRecipeNum")
	public Integer recipe_num(String member_id) throws Exception{
		System.out.println(member_id+"!!!!!!!!!!!!!!!!memberID");
		System.out.println(recipeService.getRecipeNum(member_id));
		
		return recipeService.getRecipeNum(member_id);
	}

	//레시피 좋아요 수 가져오기
	@GetMapping("/getRecipeLikes")
	public  Integer getRecipeLikes(@RequestParam Integer recipe_num) throws Exception{
		System.out.println(recipe_num+"!!!!!!!!!!!!!!!!getRecipeLikes");

			System.out.println(recipeService.getRecipeLikes(recipe_num));
			
			return recipeService.getRecipeLikes(recipe_num);
	
		
	}
	
	//요리 재료 등록
	@PostMapping("/insertRecipeIngredients")
	public String insertRecipeIngredients(RecipeVO recipeVO) {
	
		recipeService.insertRecipeIngredients(recipeVO);
		
		System.out.println("레시피 등록됨 - Controller");
		
		return "redirect:/recipe/list";
	}
	//요리 순서 등록 _크롤링
	@PostMapping("/insertRecipeOrderCheerio")
	public String insertRecipeOrderCheerio(RecipeVO recipeVO) {
		
		recipeService.insertRecipeOrderCheerio(recipeVO);
		
		System.out.println("레시피 등록됨 - Controller");
		
		return "redirect:/recipe/list";
	}
	
	//요리 재료 등록 _크롤링
	@PostMapping("/insertRecipeIngredientsCheerio")
	public String insertRecipeIngredientsCheerio(RecipeVO recipeVO) {
		
		recipeService.insertRecipeIngredientsCheerio(recipeVO);
		
		System.out.println("레시피 등록됨 - Controller");
		
		return "redirect:/recipe/list";
	}
	
	//요리 순서 추가
	@PostMapping("/insertRecipeOrder")
	public String insertRecipeOrder(RecipeVO recipeVO, @RequestParam(value = "recipe_imgs_steps", required = false)MultipartFile[] uploadFiles) {
		
		if(uploadFiles == null) {
			recipeService.insertRecipeOrder(recipeVO);
//			System.out.println("레시피 등록됨 근데 upload파일이 null임 - Controller");
			return "redirect:/recipe/list";
		} else {
				
		stepsfileUpload(recipeVO,uploadFiles);
		recipeService.insertRecipeOrder(recipeVO);

//		System.out.println("레시피 순서 정상 등록");

		return "redirect:/recipe/list";
		}
	}
	
	//레시피 목록
	@GetMapping("/getIngredientList/{recipe_num}")
	public List<RecipeVO> getIngredientList( @PathVariable Integer recipe_num) {
		 System.out.println("recipe_num: "+recipe_num);
		return recipeService.getIngredientList(recipe_num);
	}
	
	
	//요리 완성 사진 추가 및 요라탑 저장
	@PostMapping("/insertRecipeComplete")
	public String insertCompleteRecipe(RecipeVO recipeVO, @RequestParam(value = "recipe_imgs_completed", required = false)MultipartFile[] uploadFiles) {
		
		
		if(uploadFiles == null) {
			recipeService.insertRecipeComplete(recipeVO);
			System.out.println("레시피 등록됨 근데 upload파일이 null임 - Controller");
			return "redirect:/recipe/list";
		} 
		completedImgfileUpload(recipeVO,uploadFiles);
		recipeService.insertRecipeComplete(recipeVO);
		System.out.println("레시피 완성 정상 등록");
		return recipeVO.toString()+" : insertRecipeComplete***********************";
	}
	
	
	//레시피 수정
	@GetMapping("/update/{recipe_num}")
	public String update(@PathVariable("recipe_num") int recipe_num, Model model) {
		RecipeVO recipeVO = recipeService.getDetail(recipe_num);
		
		System.out.println(recipe_num);
		System.out.println(recipeVO.getRecipe_title());
		
		model.addAttribute("recipeVO", recipeVO);
		
		return "RecipeUpdate"; //jsp
	}
	
	@PostMapping("/update")
	public String update(RecipeVO recipeVO) {
		recipeService.updateRecipe(recipeVO);
		
		System.out.println("레시피 수정 - Controller");
		
		return "redirect:/recipe/list";
	}
	
	
	//레시피 임시저장한 거 수정해서 저장할때
	@GetMapping("/updateRecipeSaveType/{recipe_num}")
	public String updateRecipeInstructions(@PathVariable("recipe_num") int recipe_num, Model model
		) {
		recipeService.updateRecipeSaveType(recipe_num);
		
		System.out.println("레시피 수정 - Controller  recipe_num:"+recipe_num);
		
		return "redirect:/recipe/list";
	}
	
	//레시피 임시저장한 거 수정해서 저장할때
	@PostMapping("/updateRecipeInstructions")
	public String updateRecipeInstructions(RecipeVO recipeVO) {
		recipeService.updateRecipeInstructions(recipeVO);
		
		System.out.println("레시피 수정 - Controller param1, param2:"+recipeVO);
		
		return "redirect:/recipe/list";
	}
	
	//레시피 삭제
	@GetMapping("/delete/{recipe_num}")
	public String delete(@PathVariable("recipe_num") Integer recipe_num) {
		recipeService.deleteRecipe(recipe_num);
		
		System.out.println("레시피 삭제 성공!! - controller ");
		
		return "redirect:/recipe/list";
	}
	
	//레시피 검색
	@GetMapping("/search/{recipe_title}")
	public List<RecipeVO> searchRecipe(@PathVariable("recipe_title")String recipe_title) {
		System.out.println("검색어 : " + recipe_title);
		
		return recipeService.searchRecipe(recipe_title);
	}
	
//	레시피 상세검색
//	@GetMapping("/detail/search")
//	public List<RecipeVO> detailSearchRecipe(
//			@RequestParam(value = "param1") String param1,
//			@RequestParam(value = "param2") String param2,
//			@RequestParam(value = "param3") String param3,
//			@RequestParam(value = "param4") String param4,
//			@RequestParam(value = "param5")int param5) {	
//		return recipeService.detailSearchRecipe(param1,param2,param3,param4,param5);
//	}
	@GetMapping("/detail/search")
	public List<RecipeVO> detailSearchRecipe(@RequestParam(value = "param1") String param1,
			@RequestParam(value = "param2") String param2,
			@RequestParam(value = "param3") String param3,
			@RequestParam(value = "param4") String param4,
			@RequestParam(value = "param5")int param5,RecipeVO recipeVO) {	
		System.out.println("param1 ==> " + param1);
		System.out.println("param2 ==> " + param2);
		System.out.println("param3 ==> " + param3);
		System.out.println("param4 ==> " + param4);
		System.out.println("param5 ==> " + param5);
		
		recipeVO.setCategory_kind(param1);
		recipeVO.setCategory_theme(param2);
		recipeVO.setCategory_way(param3);
		recipeVO.setCategory_ing(param4);
		recipeVO.setRecipe_savetype(param5);
		
		return recipeService.detailSearchRecipe(recipeVO);
	}
	
	//레시피 상세 검색 결과 자세히 보기
	@GetMapping("/search/details/{recipe_num}")
	public List<RecipeVO> showDetailSearchRecipe(@PathVariable("recipe_num")Integer recipe_num) {
		System.out.println("레시피번호 검색 ~~~ : " + recipe_num);		
		return recipeService.showDetailSearchRecipe(recipe_num);
	}
	
	

	//레시피 상세 검색 결과 자세히 보기
	@GetMapping("/temporary/{recipe_num}")
	public List<RecipeVO> showDetailTemporySaved(@PathVariable("recipe_num")Integer recipe_num) {
		System.out.println("레시피번호 검색 : " + recipe_num);		
		return recipeService.showDetailSearchRecipe(recipe_num);
	}

	//레시피 삭제
//	@GetMapping("/removeLikes")
//	public Integer removeLikes(@RequestParam(value = "param1") String param1,
//			@RequestParam(value = "param2")  Integer param2) {		
//		System.out.println("좋아요 취소하기"+param1);
//		return recipeService.removeLikes(param1,param2);
//	
//	}
	@GetMapping("/removeLikes")
	public Integer removeLikes(@RequestParam(value = "member_id") String member_id,
			@RequestParam(value = "recipe_num")  Integer recipe_num) {		
		System.out.println("좋아요 취소하기"+member_id);
		
		recipeVO.setMember_id(member_id);
		recipeVO.setRecipe_num(recipe_num);
				
		return recipeService.removeLikes(recipeVO);
	
	}
	
	//레시피 좋아요
//	@GetMapping("/insertLikes")
//	public Integer insertLikes(
//			@RequestParam(value = "param1") String param1,
//			@RequestParam(value = "param2")  Integer param2,
//			@RequestParam(value = "param3")  Integer param3
//			) {		
//		System.out.println("좋아요 하기"+param1);
//		return recipeService.insertLikes(param1,param2,param3);
//		
//	}
	@GetMapping("/insertLikes")
	public Integer insertLikes(
			@RequestParam(value = "member_id") String member_id,
			@RequestParam(value = "recipe_num")  Integer recipe_num,
			@RequestParam(value = "likes")  Integer likes
			) {		
		System.out.println("좋아요 하기"+member_id);
		
		recipeVO.setMember_id(member_id);
		recipeVO.setRecipe_num(recipe_num);
		recipeVO.setLikes(likes);
		
		return recipeService.insertLikes(recipeVO);
		
	}
	
	//레시피 좋아요한 회원아이디
	@GetMapping("/getLikedMember")
	public String getLikedMember(
			@RequestParam(value = "param1")  String param1,
			@RequestParam(value = "param2") Integer param2
			) {		
//		System.out.println( "좋아요한 멤버"+recipeService.getLikedMember(param1,param2));
//		return recipeService.getLikedMember(param1,param2);
		
		System.out.println( "좋아요한 멤버"+recipeService.getLikedMember(recipeVO));
		recipeVO.setMember_id(param1);
		recipeVO.setRecipe_num(param2);
		
		return recipeService.getLikedMember(recipeVO);
	}
	
	@PostMapping("/recordingType0")
	public List<RecipeVO> getMemberRecipeSt0(@RequestParam(value = "member_id") String member_id){
		System.out.println("ST0" + member_id);
		return recipeService.recordRecipe(member_id);
	}
	
	@PostMapping("/recordingType1")
	public List<RecipeVO> getMemberRecipeSt1(@RequestParam(value = "member_id") String member_id){
		System.out.println("ST1" + member_id);
		return recipeService.recordCompleteRecipe(member_id);
	}
	
}
