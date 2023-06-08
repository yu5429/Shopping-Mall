package com.example.java;

import lombok.Data;

@Data
public class ProductDTO {
	String prod_code, prod_name, prod_category, prod_content, prod_img, prod_regdate, prod_company, prod_bigcategory;
	int prod_price, prod_discount, prod_delivery, r_;
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
	public String getProd_category() {
		return prod_category;
	}
	public void setProd_category(String prod_category) {
		this.prod_category = prod_category;
	}
	public String getProd_content() {
		return prod_content;
	}
	public void setProd_content(String prod_content) {
		this.prod_content = prod_content;
	}
	public String getProd_img() {
		return prod_img;
	}
	public void setProd_img(String prod_img) {
		this.prod_img = prod_img;
	}
	public String getProd_regdate() {
		return prod_regdate;
	}
	public void setProd_regdate(String prod_regdate) {
		this.prod_regdate = prod_regdate;
	}
	public String getProd_company() {
		return prod_company;
	}
	public void setProd_company(String prod_company) {
		this.prod_company = prod_company;
	}
	public String getProd_bigcategory() {
		return prod_bigcategory;
	}
	public void setProd_bigcategory(String prod_bigcategory) {
		this.prod_bigcategory = prod_bigcategory;
	}
	public int getProd_price() {
		return prod_price;
	}
	public void setProd_price(int prod_price) {
		this.prod_price = prod_price;
	}
	public int getProd_discount() {
		return prod_discount;
	}
	public void setProd_discount(int prod_discount) {
		this.prod_discount = prod_discount;
	}
	public int getProd_delivery() {
		return prod_delivery;
	}
	public void setProd_delivery(int prod_delivery) {
		this.prod_delivery = prod_delivery;
	}
	public int getR_() {
		return r_;
	}
	public void setR_(int r_) {
		this.r_ = r_;
	}
}