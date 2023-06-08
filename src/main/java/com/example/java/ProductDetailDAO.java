package com.example.java;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProductDetailDAO {	
	ArrayList<ProductDetailDTO> show_review(int currentP, String product_code, String review_nickname);
	ArrayList<ProductDetailDTO> review_getMy(String product_code, String review_nickname);
	ArrayList<ProductDTO> get_productData(String prod_code);

	int check_myReview(String string,String string2);
	int check_alreadyReview(String product_code, String review_nickname);
	int enable_review(String m_id, String o_info);
	
	String review_all_count(String parameter);
	
	void review_insert(String parameter, String parameter2, String parameter3, String parameter4, String parameter5);
	void review_delete(String x1, String x2); //리뷰 삭제
	void review_update(String productCode, int star_num, String nickname,String title, String content );//리뷰 업데이트
}