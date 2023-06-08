package com.example.java;

public class ProductDetailDTO {
	String product_code; //상품코드
	int star_num;// 별점
	String review_nickname;//리뷰 작성자 닉네임
	String review_content; //리뷰 내용
	String review_title; //리뷰 제목
	int r_; //
	public int getR_() {
		return r_;
	}
	public void setR_(int r_) {
		this.r_ = r_;
	}
	public String getProduct_code() {
		return product_code;
	}
	public void setProduct_code(String product_code) {
		this.product_code = product_code;
	}
	public int getStar_num() {
		return star_num;
	}
	public void setStar_num(int star_num) {
		this.star_num = star_num;
	}
	public String getReview_nickname() {
		return review_nickname;
	}
	public void setReview_nickname(String review_nickname) {
		this.review_nickname = review_nickname;
	}
	public String getReview_content() {
		return review_content;
	}
	public void setReview_content(String review_content) {
		this.review_content = review_content;
	}
	public String getReview_title() {
		return review_title;
	}
	public void setReview_title(String review_title) {
		this.review_title = review_title;
	}
}
