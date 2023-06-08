package com.example.java;

import lombok.Data;

@Data
public class InquiryDTO {
	int inquiry_no, inquiry_readcount;
	
	String inquiry_title, inquiry_content, inquiry_writer, 
	inquiry_created, inquiry_password, inquiry_secure, inquiry_updated, inquiry_product;
	
	String response_title, response_content, response_writer, 
	response_created, response_updated, response_readcount;
	
	String prod_img, prod_code, prod_name, prod_company;
	int prod_price;
	public int getInquiry_no() {
		return inquiry_no;
	}
	public void setInquiry_no(int inquiry_no) {
		this.inquiry_no = inquiry_no;
	}
	public int getInquiry_readcount() {
		return inquiry_readcount;
	}
	public void setInquiry_readcount(int inquiry_readcount) {
		this.inquiry_readcount = inquiry_readcount;
	}
	public String getInquiry_title() {
		return inquiry_title;
	}
	public void setInquiry_title(String inquiry_title) {
		this.inquiry_title = inquiry_title;
	}
	public String getInquiry_content() {
		return inquiry_content;
	}
	public void setInquiry_content(String inquiry_content) {
		this.inquiry_content = inquiry_content;
	}
	public String getInquiry_writer() {
		return inquiry_writer;
	}
	public void setInquiry_writer(String inquiry_writer) {
		this.inquiry_writer = inquiry_writer;
	}
	public String getInquiry_created() {
		return inquiry_created;
	}
	public void setInquiry_created(String inquiry_created) {
		this.inquiry_created = inquiry_created;
	}
	public String getInquiry_password() {
		return inquiry_password;
	}
	public void setInquiry_password(String inquiry_password) {
		this.inquiry_password = inquiry_password;
	}
	public String getInquiry_secure() {
		return inquiry_secure;
	}
	public void setInquiry_secure(String inquiry_secure) {
		this.inquiry_secure = inquiry_secure;
	}
	public String getInquiry_updated() {
		return inquiry_updated;
	}
	public void setInquiry_updated(String inquiry_updated) {
		this.inquiry_updated = inquiry_updated;
	}
	public String getInquiry_product() {
		return inquiry_product;
	}
	public void setInquiry_product(String inquiry_product) {
		this.inquiry_product = inquiry_product;
	}
	public String getResponse_title() {
		return response_title;
	}
	public void setResponse_title(String response_title) {
		this.response_title = response_title;
	}
	public String getResponse_content() {
		return response_content;
	}
	public void setResponse_content(String response_content) {
		this.response_content = response_content;
	}
	public String getResponse_writer() {
		return response_writer;
	}
	public void setResponse_writer(String response_writer) {
		this.response_writer = response_writer;
	}
	public String getResponse_created() {
		return response_created;
	}
	public void setResponse_created(String response_created) {
		this.response_created = response_created;
	}
	public String getResponse_updated() {
		return response_updated;
	}
	public void setResponse_updated(String response_updated) {
		this.response_updated = response_updated;
	}
	public String getResponse_readcount() {
		return response_readcount;
	}
	public void setResponse_readcount(String response_readcount) {
		this.response_readcount = response_readcount;
	}
	public String getProd_img() {
		return prod_img;
	}
	public void setProd_img(String prod_img) {
		this.prod_img = prod_img;
	}
	public String getProd_code() {
		return prod_code;
	}
	public void setProd_code(String prod_code) {
		this.prod_code = prod_code;
	}
	public String getProd_name() {
		return prod_name;
	}
	public void setProd_name(String prod_name) {
		this.prod_name = prod_name;
	}
	public String getProd_company() {
		return prod_company;
	}
	public void setProd_company(String prod_company) {
		this.prod_company = prod_company;
	}
	public int getProd_price() {
		return prod_price;
	}
	public void setProd_price(int prod_price) {
		this.prod_price = prod_price;
	}
}