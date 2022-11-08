package com.dorecipe.main.comment.vo;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentVO {
	
	private int recipe_num;
	private int comment_num;
	private String comment_content;
	private String comment_path;
	private String member_id;
	private String comment_creDate;
	
	public int getRecipe_num() {
		return recipe_num;
	}

	public void setRecipe_num(int recipe_num) {
		this.recipe_num = recipe_num;
	}

	public int getComment_num() {
		return comment_num;
	}

	public void setComment_num(int comment_num) {
		this.comment_num = comment_num;
	}

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

	public String getMember_id() {
		return member_id;
	}

	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}

	public String getComment_creDate() {
		return comment_creDate;
	}

	public void setComment_creDate(String comment_creDate) {
		this.comment_creDate = comment_creDate;
	}
	
	private CommentVO() { }

	public CommentVO(int recipe_num, int comment_num, String comment_content, String comment_path, String member_id,
			String comment_creDate) {
		super();
		this.recipe_num = recipe_num;
		this.comment_num = comment_num;
		this.comment_content = comment_content;
		this.comment_path = comment_path;
		this.member_id = member_id;
		this.comment_creDate = comment_creDate;
	}

	@Override
	public String toString() {
		return "CommentVO [recipe_num=" + recipe_num + ", comment_num=" + comment_num + ", comment_content="
				+ comment_content + ", comment_path=" + comment_path + ", member_id=" + member_id
				+ ", comment_creDate=" + comment_creDate + "]";
	}

}
