package com.example.java;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface Product_listDAO {
	int product_list_all_count(String big_category);
	
	ArrayList<ProductDTO> product_category_count(String big_category);
	ArrayList<ProductDTO> product_list_normal_pageData(String big_category, int currentP);
	ArrayList<ProductDTO> product_select_category_find(int currentP, String cty, String odb);
	ArrayList<ProductDTO> product_list_normal_pageData_orderby(String big_category, int currentP, String odb);
	ArrayList<ProductDTO> product_select_category_find_orderby(String big_category,  int currentP, String cty, String odb);
	ArrayList<ProductDTO> product_list_normal_pageData_review_count_orderby(String big_category,  int currentP, String odb);
	ArrayList<ProductDTO> product_select_category_find_review_count_orderby(String big_category, int currentP, String cty, String odb);
	
	ArrayList<ProductDTO> home_new();
	ArrayList<ProductDTO> home_best();
	ArrayList<ProductDTO> header_bigcategory();
}
