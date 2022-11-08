package com.dorecipe.main;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

//@CrossOrigin(origins={"http://localhost:3000","http://localhost:3005"})
@Controller
@RequestMapping("/")
public class IndexController {

	@GetMapping
	public String index() {
		return "index.html";
	}

}