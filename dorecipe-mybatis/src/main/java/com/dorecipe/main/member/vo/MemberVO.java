package com.dorecipe.main.member.vo;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.ibatis.mapping.FetchType;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//public class MemberVO implements UserDetails{
	public class MemberVO {

	

	private String member_id;
	private String username;
	private String email;
	private String member_nickname;
	private String member_name;
	private String member_gender;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date member_birth;
	private String member_phone;
	private String member_imagePath;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date member_joinDate;
		
	
	public String getMember_id() {
		return member_id;
	}


	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getMember_nickname() {
		return member_nickname;
	}


	public void setMember_nickname(String member_nickname) {
		this.member_nickname = member_nickname;
	}


	public String getMember_name() {
		return member_name;
	}


	public void setMember_name(String member_name) {
		this.member_name = member_name;
	}


	public String getMember_gender() {
		return member_gender;
	}


	public void setMember_gender(String member_gender) {
		this.member_gender = member_gender;
	}


	public Date getMember_birth() {
		return member_birth;
	}


	public void setMember_birth(Date member_birth) {
		this.member_birth = member_birth;
	}


	public String getMember_phone() {
		return member_phone;
	}


	public void setMember_phone(String member_phone) {
		this.member_phone = member_phone;
	}


	public String getMember_imagePath() {
		return member_imagePath;
	}


	public void setMember_imagePath(String member_imagePath) {
		this.member_imagePath = member_imagePath;
	}


	public Date getMember_joinDate() {
		return member_joinDate;
	}


	public void setMember_joinDate(Date member_joinDate) {
		this.member_joinDate = member_joinDate;
	}


	// 데이터 출력
	@Override
	public String toString() {
		return "Member [ member_id="+member_id+ ",username=" + username 
				+", member_name=" + member_name + ", member_nickname=" + member_nickname +
				", member_gender=" + member_gender + ", member_birth=" + member_birth +
				", member_phone=" + member_phone + ", member_imagePath=" + member_imagePath 
				+ ", member_joinDate=" + member_joinDate +  "]";
	}


}