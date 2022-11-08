package com.dorecipe.main.knowhow.controller;

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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dorecipe.main.knowhow.service.KnowhowService;
import com.dorecipe.main.knowhow.vo.KnowhowVO;

import lombok.RequiredArgsConstructor;
@CrossOrigin(origins = "*", maxAge = 3600)
//@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/knowhow")
@RequiredArgsConstructor
@RestController
public class KnowhowController {
	
	@Autowired
	private KnowhowService knowhowService;
	
	//aplication.properties 파일업로드 경로 가져오기
	@Value("${part2.upload.path}")
	private String uploadPath;
	
	// 노하우 목록 전체 조회
	@RequestMapping("/list")
	public List<KnowhowVO> getKnowhow() throws Exception {
//		System.out.println("노하우 목록 출력 됨~~~~ - Controller");
		
		return knowhowService.listKnowhow();
	}
	
	// 노하우 상세 조회
	@RequestMapping("/detail/{know_num}")
	public KnowhowVO detail(@PathVariable("know_num") Integer know_num) throws Exception {
		System.out.println("노하우 상세페이지 출력 됨~~~~" + know_num +" - Controller");
		return knowhowService.getDetail(know_num);
	}

	
	// 노하우 게시물 삭제
	@GetMapping("/delete/{know_num}")
	public String delete(@PathVariable("know_num") int know_num) throws Exception {
		knowhowService.deleteKnowhow(know_num);
		
		System.out.println("삭제됨 - Controller");
		
		return "redirect:/knowhow/list";	
	}

	
	@PostMapping("/update") // 보내!!!!
	public void update(KnowhowVO knowhowVO, @RequestParam(value = "know_image", required = false)MultipartFile[] uploadFiles) throws Exception {
		System.out.println("수정됨 - Controller");
		
		//파일 없으면 나머지 저장
		if(uploadFiles == null) {
			knowhowService.updateKnowhow(knowhowVO);
			return;
		}
		fileUpload(knowhowVO, uploadFiles);
		
		knowhowService.updateKnowhow(knowhowVO);
	}
	
	
	// 노하우 게시물 등록
	@PostMapping("/insert")
	public void insert(KnowhowVO knowhowVO, @RequestParam(value = "know_image", required = false)MultipartFile[] uploadFiles) throws Exception {
		System.out.println("노하우 등록 성공!!! - controller");
		
		//파일 없으면 나머지 저장
		if(uploadFiles == null) {
			knowhowService.insertKnowhow(knowhowVO);
			return;
		}
		fileUpload(knowhowVO, uploadFiles);
		
		knowhowService.insertKnowhow(knowhowVO);
	}
	
	
	
	//파일 업로드
	private KnowhowVO fileUpload(KnowhowVO knowhowVO, MultipartFile[] uploadFiles) {
		
		//MultipartFile은 단건만 배열로 설정하면 다수의 파일을 받을 수있습니다.
		//배열을 활용하면 동시에 여러개의 파일 정보를 처리할 수 있으므로 화면에서 여러개의 파일을 동시에 업로드 할 수 있습니다.
		
		for(MultipartFile uploadFile : uploadFiles) {
			
			//브라우저에 따라 업로드하는 파일의 이름은 전체경로일 수도 있고(Internet Explorer),
			//단순히 파일의 이름만을 의미할 수도 있습니다.(chrome browser)
			String originalName = uploadFile.getOriginalFilename();
			String fileName = originalName.substring(originalName.lastIndexOf("//")+1);
			
			//날짜 폴더 생성
	        String folderPath = makeFolder();
	        //UUID
	        //같은이름의 파일도 uuid를 앞에 붙여 unique파일명 만들기
	        String uuid = UUID.randomUUID().toString();
	        //저장할 파일 이름 중간에 "_"를 이용하여 구분
	        String saveName = uploadPath + File.separator + folderPath +File.separator + uuid + "_" + fileName;
	        System.out.println("전체경로" + saveName);
	        Path savePath = Paths.get(saveName);
	        //Paths.get() 메서드는 특정 경로의 파일 정보를 가져옵니다.(경로 정의하기)
	        
	        
			
	        //db에 저장 할 이미지 경로
	        String ymd = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
	        //ymd = 2022/09/02 - 현재 날짜
	        
			String know_path = "/img/knowhow/" + ymd + "/" + uuid + "_" + fileName;
								// ex)/img/knowhow/2022/09/01/uuid_fileName --db에 저장
			System.out.println("저장한 경로"+ know_path);
			knowhowVO.setKnow_path(know_path);
	        
	        try{
	        	uploadFile.transferTo(savePath);
	            //uploadFile에 파일을 업로드 하는 메서드 transferTo(file)
	        } catch (IOException e) {
	             e.printStackTrace();
	             //printStackTrace()를 호출하면 로그에 Stack trace가 출력됩니다.
	        }
	        
		}//for end
		 return knowhowVO;
	}


	//폴더 생성
	private String makeFolder(){
    
	  	String str = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
	    //LocalDate를 문자열로 포멧
	    String folderPath = str.replace("/", File.separator);
	    //만약 Data 밑에 exam.jpg라는 파일을 원한다고 할때,
	    //윈도우는 "Data\\"eaxm.jpg", 리눅스는 "Data/exam.jpg"라고 씁니다.
	    //그러나 자바에서는 "Data" +File.separator + "exam.jpg" 라고 쓰면 됩니다.
	    
	    //make folder ==================
	    File uploadPathFolder = new File(uploadPath, folderPath);
	    //File newFile= new File(dir,"파일명");
	    //->부모 디렉토리를 파라미터로 인스턴스 생성
	    
	    if(uploadPathFolder.exists() == false){
	        uploadPathFolder.mkdirs();
	        //만약 uploadPathFolder가 존재하지않는다면 makeDirectory하라는 의미입니다.
	        //mkdir(): 디렉토리에 상위 디렉토리가 존재하지 않을경우에는 생성이 불가능한 함수
			//mkdirs(): 디렉토리의 상위 디렉토리가 존재하지 않을 경우에는 상위 디렉토리까지 모두 생성하는 함수
	       }
	     return folderPath;
    }
	
}
