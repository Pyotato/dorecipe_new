package com.dorecipe.main.recipe.fileUpload;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.dorecipe.main.recipe.service.RecipeService;
import com.dorecipe.main.recipe.vo.RecipeVO;

public class RecipeFileUpload {

	@Value("${part3.upload.path}")
	public String uploadPathThumbnail;
	
	@Value("${part4.upload.path}")
	public String uploadPathStepImages;
	
	@Value("${part5.upload.path}")
	public String uploadPathCompletedImages;

	public RecipeVO thumnailfileUpload(RecipeVO recipeVO, @RequestParam(value = "recipe_thumbnail", required = false) MultipartFile[] uploadFiles) {
		
		for(MultipartFile uploadFile:uploadFiles) {
			String originalName = uploadFile.getOriginalFilename();	//클라이언트의 이미지 퍼일명
			System.out.println("originalName:"+ originalName);
			String fileName =originalName.substring(originalName.lastIndexOf("//")+1);	//마지막 //뒤의 파일이름가져오기
			System.out.println("fileName:"+ fileName);
			
			//날짜폴더
			String folderPath = makeFolder();
			//랜덤 파일명으로 바꿔주기 (중복 방지)
			String uuid = UUID.randomUUID().toString();
			//저장할 이미지 이름들
			String saveThumbnailName = uploadPathThumbnail + File.separator +
					folderPath +File.separator + uuid +"_"+originalName;
		
//			System.out.println("전체경로" + saveThumbnailName);
			Path saveThumbnailPath = Paths.get(saveThumbnailName);		
//			System.out.println("savename: "+saveThumbnailPath);
			
			//db저장 이미지 경로
			String uploadDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
			String recipe_path = "/img/recipe/thumbnail/"+ uploadDate + "/"+uuid+"_"+originalName;

			
			System.out.println("db저장 경로: " +recipe_path);
			recipeVO.setRecipe_rpath(recipe_path);

			
			try {
				uploadFile.transferTo(saveThumbnailPath);
			} catch (IOException e) {
				e.printStackTrace();
			}
			
		}	
		return recipeVO;
	}
	
	public RecipeVO stepsfileUpload(RecipeVO recipeVO, @RequestParam(value = "recipe_imgs_steps", required = false) MultipartFile[] uploadFiles) {
	
		List <String> stepImgNames = new ArrayList<String>();
		
		for(int i= 0; i<uploadFiles.length; i++) {
		String uploadDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
		String originalName = uploadFiles[i].getOriginalFilename();	//클라이언트의 이미지 퍼일명
		System.out.println("originalName:"+ originalName);
		String fileName =originalName.substring(originalName.lastIndexOf("//")+1);	//마지막 //뒤의 파일이름가져오기
//		System.out.println("fileName:"+ fileName);
		//날짜폴더
		String folderPath = makeFolder();
		//랜덤 파일명으로 바꿔주기 (중복 방지)
		String uuid = UUID.randomUUID().toString();
		//저장할 이미지 이름들
		
		String saveStepImgName = uploadPathStepImages+File.separator+ uploadDate+ File.separator +fileName;
//		String saveStepImgName = originalName;
//		String saveStepImgName = uploadPathStepImages+ File.separator +
//				folderPath+File.separator+fileName;
//		String saveStepImgName = uploadPathStepImages + File.separator +
//				folderPath +File.separator + uuid +"_"+i +"_"+fileName;
//		Path saveStepImgsPath = Paths.get(saveStepImgName);
		
//		System.out.println("savename: "+saveStepImgsPath);

//		//db저장 이미지 경로
//		String uploadDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
//		String recipe_order_path = "/img/recipe/steps/"+ uploadDate + "/"+uuid+"_"+originalName;
//		System.out.println("recipe_order_path: "+recipe_order_path);
//		recipeVO.setOrder_path(recipe_order_path);
//		stepImgNames.add(recipe_order_path);
		
//		recipeVO.setOrder_path(saveStepImgName);
		Path saveStepImgsPath = Paths.get(saveStepImgName);
		stepImgNames.add(originalName);
		
		try {
//			System.out.println("uploadFiles[i]: "+uploadFiles[i]);
			uploadFiles[i].transferTo(saveStepImgsPath);
				
			System.out.println(recipeVO.getOrder_path()+"****************************************************");
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
		
//	recipeVO.setOrderVoList_path(stepImgNames);	
	
//	for(int i= 0; i<uploadFiles.length; i++) {
//		recipeVO.setOrder_path(recipeVO.getOrderVoList_path().get(i));
//	}


	return recipeVO;
	
	
	
}
		
	public RecipeVO completedImgfileUpload(RecipeVO recipeVO, @RequestParam(value = "recipe_imgs_completed", required = false) MultipartFile[] uploadFiles) {
		for(int i= 0; i<uploadFiles.length; i++) {
			String originalName = uploadFiles[i].getOriginalFilename();	//클라이언트의 이미지 퍼일명
			System.out.println("originalName:"+ originalName);
			
			//날짜폴더
			String folderPath = makeFolder();
			//랜덤 파일명으로 바꿔주기 (중복 방지)
			String uuid = UUID.randomUUID().toString();
			String saveCompleteImgNames = uploadPathCompletedImages + File.separator +
					folderPath +File.separator + uuid +"_"+originalName;
			Path saveCompleteImgsPath = Paths.get(saveCompleteImgNames);
			System.out.println("savename: "+saveCompleteImgsPath);
			
			//db저장 이미지 경로
			String uploadDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
			String recipe_completed_path = "/img/recipe/completed/"+ uploadDate + "/"+uuid+"_"+originalName;
			
			if(i==0) {
				recipeVO.setCompletion_path1(recipe_completed_path);
			}
			else if(i==1) {
				recipeVO.setCompletion_path2(recipe_completed_path);
			} else if(i==2) {
				recipeVO.setCompletion_path3(recipe_completed_path);
				
			}else if(i==3) {
				recipeVO.setCompletion_path4(recipe_completed_path);
				
			}
			System.out.println("db저장 경로: " +recipe_completed_path);
			
			try {
				uploadFiles[i].transferTo(saveCompleteImgsPath);
				
			} catch (IOException e) {
				e.printStackTrace();
			}
						
		}	

		return recipeVO;
	}
	
	//폴더 생성
	private String makeFolder(){
    
	  	String uploadDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
	    //LocalDate를 문자열로 포멧
	    String folderPath = uploadDate.replace("/", File.separator);

	    File uploadPathThumbnailFolder = new File(uploadPathThumbnail, folderPath);
	    File uploadPathStepImagesFolder = new File(uploadPathStepImages, folderPath);
	    File uploadPathCompletedImagesFolder = new File(uploadPathCompletedImages, folderPath);

	    if(uploadPathThumbnailFolder.exists() == false){
	    	uploadPathThumbnailFolder.mkdirs();
	       }
	    if(uploadPathStepImagesFolder.exists() == false){
	    	uploadPathStepImagesFolder.mkdirs();
	    }
	    if(uploadPathCompletedImagesFolder.exists() == false){
	    	uploadPathCompletedImagesFolder.mkdirs();
	    }
	     return folderPath;
	
	}
	
}
