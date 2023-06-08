package com.example.java;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BasketDAO {
	ArrayList<BasketDTO> basket_list(String nickname);
	ArrayList<BasketDTO> basket_addSelectItem(int bsk_seq);
	
	void basket_delete(int x1);
	void odl_insert(String x1,String x2,String x3,int x4,int x5);
	void basket_selectDelete(int bsk_seq);
	void basket_changeQuantity(int b_count, int bsk_seq);
	void basket_insert(String b_img, String b_title, int b_price, int b_count, int b_df, String nickname);
}