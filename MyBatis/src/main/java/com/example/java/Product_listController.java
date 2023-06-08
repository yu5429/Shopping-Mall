package com.example.java;

import java.util.ArrayList;
import java.util.TreeSet;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class Product_listController {
	@Autowired
	Product_listDAO pdao;

	@GetMapping("/product_list/{big_category}/{small_category}")
	public String product_list(@PathVariable("big_category") String big_category,
							   @PathVariable("small_category") String small_category) {
		return "product_list";
	}
	
	@PostMapping("/product_list/category/count")
	@ResponseBody
	public String product_category_count(HttpServletRequest req) {
		String big_category = req.getParameter("big_category");
		
		ArrayList<ProductDTO> pdto = pdao.product_category_count(big_category);
		JSONArray ja = new JSONArray();
		
		for (int i=0; i < pdto.size(); i++) {
			JSONObject jo = new JSONObject();
			
			jo.put("prod_category", pdto.get(i).getProd_category());
			jo.put("prod_category_count", pdto.get(i).getR_());
			
			ja.put(jo);
		}
		
		return ja.toString();
	}
	
	@PostMapping("/home/new")
	@ResponseBody
	public String home_new (HttpServletRequest req) {		
		ArrayList<ProductDTO> pdto = new ArrayList<ProductDTO>();
		pdto = pdao.home_new();
		return getProductJA(pdto);
	}
	
	@PostMapping("/product_list/normal_pageData")
	@ResponseBody
	public String product_list_normal_pageData(HttpServletRequest req) {
		String big_category = req.getParameter("big_category");
		int currentP = Integer.parseInt(req.getParameter("currentP"));
		
		ArrayList<ProductDTO> pdto = new ArrayList<ProductDTO>();
		pdto = pdao.product_list_normal_pageData(big_category, currentP);
		
		return getProductJA(pdto);
	}
	
	@PostMapping("/product_list/all_count")
	@ResponseBody
	public String product_list_all_count(HttpServletRequest req) {
		String big_category = req.getParameter("big_category");
		int a_count = pdao.product_list_all_count(big_category);
		
		return String.valueOf(a_count);
	}
	
	@PostMapping("/product_list/select_category_find")
	@ResponseBody
	public String product_select_category_find(HttpServletRequest req) {
		int currentP = Integer.parseInt(req.getParameter("currentP"));
		String cty = req.getParameter("cty");
		String odb = req.getParameter("odb");
		
		ArrayList<ProductDTO> pdto = new ArrayList<ProductDTO>();
		pdto = pdao.product_select_category_find(currentP,cty,odb);
		
		return getProductJA(pdto);
	}
	
	@PostMapping("/product_list/getDatabyPage")
	@ResponseBody
	public String getDatabyPage(HttpServletRequest req) {
		String big_category = req.getParameter("big_category");
		int currentP = Integer.parseInt(req.getParameter("currentP"));
		String cty = req.getParameter("cty");
		String odb = req.getParameter("odb");
		
		if(! odb.equals("review_count desc")) {
			if(cty == "") {
				ArrayList<ProductDTO> pdto = new ArrayList<ProductDTO>();
				pdto = pdao.product_list_normal_pageData_orderby(big_category, currentP,odb);
				
				return getProductJA(pdto);
			}
			else {
				ArrayList<ProductDTO> pdto = new ArrayList<ProductDTO>();
				pdto = pdao.product_select_category_find_orderby(big_category, currentP,cty,odb);			
				
				return getProductJA(pdto);
			}
		}
		else {
			if(cty == "") {
				ArrayList<ProductDTO> pdto = new ArrayList<ProductDTO>();
				pdto = pdao.product_list_normal_pageData_review_count_orderby(big_category, currentP,odb);
				
				return getProductJA(pdto);
			}
			else {
				ArrayList<ProductDTO> pdto = new ArrayList<ProductDTO>();
				pdto = pdao.product_select_category_find_review_count_orderby(big_category, currentP, cty, odb);
				
				return getProductJA(pdto);
			}
		}
	}
	
	@PostMapping("/home/best")
	@ResponseBody
	public String home_beset (HttpServletRequest req) {
		ArrayList<ProductDTO> pdto = new ArrayList<ProductDTO>();
		pdto = pdao.home_best();
		return getProductJA(pdto);
	}
	
	@PostMapping("/home/bigcategory")
	@ResponseBody
	public String home_bigcategory (HttpServletRequest req) {
		ArrayList<ProductDTO> pdto = pdao.header_bigcategory();
		JSONArray ja = new JSONArray();
		TreeSet<String> temp = new TreeSet<String>();
		
		for(int i = 0; i < pdto.size(); i++) {
			temp.add(pdto.get(i).getProd_bigcategory());
		}
		
		for (int i = 0; i < pdto.size(); i++) {
			JSONObject jo = new JSONObject();
			if (temp.size() != 0) 
				jo.put("prod_big", temp.pollFirst());
			jo.put("prod_bigcategory", pdto.get(i).getProd_bigcategory());
			jo.put("prod_category", pdto.get(i).getProd_category());
			
			ja.put(jo);
		}
		
		return ja.toString();
	}
	
	
	
	public String getProductJA(ArrayList<ProductDTO> pdto) {
		JSONArray ja = new JSONArray();
		
		for (int i=0; i<pdto.size(); i++) {
			JSONObject jo = new JSONObject();
			jo.put("prod_img", pdto.get(i).getProd_img());
			jo.put("prod_code", pdto.get(i).getProd_code());
			jo.put("prod_name", pdto.get(i).getProd_name());
			jo.put("prod_price", pdto.get(i).getProd_price());
			jo.put("prod_discount", pdto.get(i).getProd_discount());
			
			ja.put(jo);
		}
		return ja.toString();
	}
}
