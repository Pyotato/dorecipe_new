package com.dorecipe.main.security.response;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class JwtResponse {

	private String token;
	private String type = "Bearer";
	private Long id;
	private String username;
	private String email;
	private List<String> roles;
	
	public JwtResponse(String token, String type, Long id, String username, String email, List<String> roles) {
		this.token = token;
		this.type = type;
		this.id = id;
		this.username = username;
		this.email = email;
		this.roles = roles;
	}
	
	
	
	
}
