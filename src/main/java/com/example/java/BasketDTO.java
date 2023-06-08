package com.example.java;

import lombok.Data;

@Data
public class BasketDTO {
	String b_img;
	String b_title;
	int b_price;
	int b_count;
	int b_df;
	int bsk_seq;
	public String getB_img() {
		return b_img;
	}
	public void setB_img(String b_img) {
		this.b_img = b_img;
	}
	public String getB_title() {
		return b_title;
	}
	public void setB_title(String b_title) {
		this.b_title = b_title;
	}
	public int getB_price() {
		return b_price;
	}
	public void setB_price(int b_price) {
		this.b_price = b_price;
	}
	public int getB_count() {
		return b_count;
	}
	public void setB_count(int b_count) {
		this.b_count = b_count;
	}
	public int getB_df() {
		return b_df;
	}
	public void setB_df(int b_df) {
		this.b_df = b_df;
	}
	public int getBsk_seq() {
		return bsk_seq;
	}
	public void setBsk_seq(int bsk_seq) {
		this.bsk_seq = bsk_seq;
	}
}
