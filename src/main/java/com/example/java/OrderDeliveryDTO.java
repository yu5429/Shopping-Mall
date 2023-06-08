package com.example.java;

import lombok.Data;

@Data
public class OrderDeliveryDTO {
	String m_id, o_date, o_no, o_img, o_info, o_ps, o_name, o_address, o_phone, o_dm;
	int o_count, o_price, r_, o_df;
	public String getM_id() {
		return m_id;
	}
	public void setM_id(String m_id) {
		this.m_id = m_id;
	}
	public String getO_date() {
		return o_date;
	}
	public void setO_date(String o_date) {
		this.o_date = o_date;
	}
	public String getO_no() {
		return o_no;
	}
	public void setO_no(String o_no) {
		this.o_no = o_no;
	}
	public String getO_img() {
		return o_img;
	}
	public void setO_img(String o_img) {
		this.o_img = o_img;
	}
	public String getO_info() {
		return o_info;
	}
	public void setO_info(String o_info) {
		this.o_info = o_info;
	}
	public String getO_ps() {
		return o_ps;
	}
	public void setO_ps(String o_ps) {
		this.o_ps = o_ps;
	}
	public String getO_name() {
		return o_name;
	}
	public void setO_name(String o_name) {
		this.o_name = o_name;
	}
	public String getO_address() {
		return o_address;
	}
	public void setO_address(String o_address) {
		this.o_address = o_address;
	}
	public String getO_phone() {
		return o_phone;
	}
	public void setO_phone(String o_phone) {
		this.o_phone = o_phone;
	}
	public String getO_dm() {
		return o_dm;
	}
	public void setO_dm(String o_dm) {
		this.o_dm = o_dm;
	}
	public int getO_count() {
		return o_count;
	}
	public void setO_count(int o_count) {
		this.o_count = o_count;
	}
	public int getO_price() {
		return o_price;
	}
	public void setO_price(int o_price) {
		this.o_price = o_price;
	}
	public int getR_() {
		return r_;
	}
	public void setR_(int r_) {
		this.r_ = r_;
	}
	public int getO_df() {
		return o_df;
	}
	public void setO_df(int o_df) {
		this.o_df = o_df;
	}
}