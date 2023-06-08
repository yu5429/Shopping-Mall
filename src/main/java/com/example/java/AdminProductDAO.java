package com.example.java;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminProductDAO {
	ArrayList<ProductDTO> admin_product_getList(int currentP);
	ArrayList<ProductDTO> admin_product_getCategoryList(int currentP, String bigcategory, String category);
	ArrayList<ProductDTO> admin_product_category();
	ArrayList<ProductDTO> admin_product_bigcategory();
	ArrayList<ProductDTO> admin_product_view(String prod_code);
	ArrayList<ProductDTO> admin_product_search(String keyword, int currentP);
	ArrayList<ProductDTO> admin_product_underBigCategory(String bigcategory);
	ArrayList<ProductDTO> admin_product_searchc(String keyword, int currentP, String bigcategory, String category);
	
	int get_count();
	int get_search_count(String keyword);
	int get_search_countc(String keyword, String bigcategory, String category);
	
	void admin_product_insert(String code, String name, String category,
							int price, int discount, String content,
							String img, String company, int delivery, String bigcategory);
	
	void admin_product_update(String code, String name, String category,
							int price, int discount, String content, String img,
							String company, int delivery, String bigcategory, String ccode);
							 
	void admin_product_delete(String prod_code);
}
