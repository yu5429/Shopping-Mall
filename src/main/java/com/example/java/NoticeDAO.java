package com.example.java;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface NoticeDAO {
	ArrayList<NoticeDTO> show_notice(int currentP);
	
	NoticeDTO view_notice(String w_num); 
	
	int notice_all_count(); 
	
	void write_notice(String title, String content); 
	void delete_notice(String w_num); 
	void update_viewCount(String w_num);
	void update_notice(String title, String content, String w_num); 
}