package com.example.java;


import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface InquiryDAO {
	ArrayList<InquiryDTO> inquiryList(int currentP);
	ArrayList<InquiryDTO> getResponse(int inquiry_no);
	
	InquiryDTO inquiry_getpc(String prod_code);
	InquiryDTO inquiryView(int inquiry_no);
	
	int get_count();
	int alreadyResponse(int inquiry_no);
	int checkBeforeUpdateR(int inquiry_no);
	int taggingResponse(int inquiry_no);
	
	String find_password (int inquiry_no);
	
	void updateReadcount(int inquiry_no);
	void inquiryinsert(String inquiry_title,String inquiry_content,String inquiry_writer,
						String inquiry_password,String inquiry_secure, String inquiry_product);
	void inquiryupdate(int inquiry_no,String inquiry_title,String inquiry_content);
	void inquirydelete(int inquiry_no);
	void insertResponse(int inquiry_no, String inquiry_title, String inquiry_content);
	void updateResponse(int inquiry_no, String inquiry_title, String inquiry_content);
	void deleteResponse(int inquiry_no);
}