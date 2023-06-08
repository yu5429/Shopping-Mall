package com.example.java;

import lombok.Data;

@Data
public class NoticeDTO {
	int w_num;         
	String w_title;    
	String w_writer; 
	String w_date;      
	String w_content;  
	int w_views;     
    int r_;
	public int getW_num() {
		return w_num;
	}
	public void setW_num(int w_num) {
		this.w_num = w_num;
	}
	public String getW_title() {
		return w_title;
	}
	public void setW_title(String w_title) {
		this.w_title = w_title;
	}
	public String getW_writer() {
		return w_writer;
	}
	public void setW_writer(String w_writer) {
		this.w_writer = w_writer;
	}
	public String getW_date() {
		return w_date;
	}
	public void setW_date(String w_date) {
		this.w_date = w_date;
	}
	public String getW_content() {
		return w_content;
	}
	public void setW_content(String w_content) {
		this.w_content = w_content;
	}
	public int getW_views() {
		return w_views;
	}
	public void setW_views(int w_views) {
		this.w_views = w_views;
	}
	public int getR_() {
		return r_;
	}
	public void setR_(int r_) {
		this.r_ = r_;
	}
}