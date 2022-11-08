package com.dorecipe.main.comment.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dorecipe.main.comment.service.CommentService;
import com.dorecipe.main.comment.vo.CommentVO;

import lombok.RequiredArgsConstructor;

//@CrossOrigin(origins="http://localhost:3000")
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController 
@RequiredArgsConstructor
@RequestMapping("/comment")
public class CommentController {
	
	@Autowired
	CommentService commentService;
	
	//aplication.properties 파일업로드 경로 가져오기
	@Value("${part7.upload.path}")
	private String uploadPath;
	
	
	@GetMapping("/delete") // 이벤트 삭제
	public void Delete(@PathVariable("recipe_num") Integer recipe_num,@PathVariable("comment_num") Integer comment_num) throws Exception {
		commentService.deleteComment(recipe_num,comment_num);
	}
	
	@GetMapping("/list/{recipe_num}")
	public List<CommentVO> selectComment(@PathVariable Integer recipe_num) {
		System.out.println("controller : recipeNum" + recipe_num);
		return commentService.selectComment(recipe_num);
	}
	
//	@PostMapping("/insert/{comment_num}")
//	public void insertComment(CommentVO commentVO,@PathVariable Integer comment_num, @RequestParam(value="comment_image",required = false) MultipartFile[] uploadFiles) throws Exception{
////	public void insertComment(CommentVO commentVO) throws Exception{
//		if(uploadFiles == null) {//파일이 없으면 나머지 저장
//			commentService.insertEvent(commentVO,comment_num);
//			return;
//		}
//		fileUpload(commentVO, uploadFiles);
//		System.out.println("---comment insert test");
//		commentService.insertEvent(commentVO,comment_num);
//		System.out.println("comment insert test complete!! "+ commentVO.getComment_content());
//	}
	
	
	@PostMapping("/insert")
	public void insertComment(CommentVO commentVO, @RequestParam(value="comment_image",required = false) MultipartFile[] uploadFiles) throws Exception{
		if(uploadFiles == null) {
			commentService.insertComment(commentVO);
			return;
		}
		fileUpload(commentVO, uploadFiles);
		System.out.println("---comment insert test");
		commentService.insertComment(commentVO);
		System.out.println("comment insert test complete!! "+ commentVO.getComment_content());
	}
	
	//파일 업로드
	private CommentVO fileUpload(CommentVO commentVO, MultipartFile[] uploadFiles) {
		//MultipartFile은 단건만 배열로 설정하면 다수의 파일을 받을 수있습니다.
		//배열을 활용하면 동시에 여러개의 파일 정보를 처리할 수 있으므로 화면에서 여러개의 파일을 동시에 업로드 할 수 있습니다.
		for(MultipartFile uploadFile:uploadFiles) {
			String originalName = uploadFile.getOriginalFilename();
			System.out.println("originalName:"+ originalName);
			String fileName = originalName.substring(originalName.lastIndexOf("//")+1); ///마지막 //뒤의 파일이름가져오기
			System.out.println("fileName:"+ fileName);
			
			//날짜 폴더
	        String folderPath = makeFolder();
	        //UUID unique파일명 만들기
	        String uuid = UUID.randomUUID().toString();
	        //저장할 파일 이름 중간에 "_"를 이용하여 구분
	        String saveCommentName = uploadPath + File.separator 
	        		+ folderPath +File.separator + uuid + "_" + fileName;
	        System.out.println("전체경로" + saveCommentName);
	        Path saveCommentPath = Paths.get(saveCommentName);
	        //Paths.get() 메서드는 특정 경로의 파일 정보를 가져옵니다.(경로 정의하기)
	        
	        //db에 저장 할 이미지 경로
	        String date = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
			String comment_path = "/img/comment/" + date + "/" + uuid + "_" + fileName;
			System.out.println("저장한 경로"+ comment_path);
			commentVO.setComment_path(comment_path);
	        
	        try{
	        	uploadFile.transferTo(saveCommentPath);
	        } catch (IOException e) {
	             e.printStackTrace();
	        }
		}
		 return commentVO;
	}
	
	//폴더 생성
	private String makeFolder(){
	  	String str = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
	  //LocalDate를 문자열로 포멧
	    String folderPath = str.replace("/", File.separator);
	    File uploadPathFolder = new File(uploadPath, folderPath);
	    if(uploadPathFolder.exists() == false){
	    	uploadPathFolder.mkdirs();
	    }
	    return folderPath;
    }
	
}
