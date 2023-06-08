package com.example.java;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class ProductDetailController {
	@Autowired
	ProductDetailDAO dDAO;
	
	
	@GetMapping("/product/detail/{product_code}")
	public String detail(@PathVariable("product_code") String product_code) {
		return "product_detail";
	}
	
	@PostMapping("/review/ready")
	@ResponseBody
	public String notice_getCount(HttpServletRequest req) {
		String product_code = req.getParameter("product_code");
		String review_count = dDAO.review_all_count(product_code);
		
		ArrayList<ProductDTO> pdto = dDAO.get_productData(product_code);
		JSONArray ja = new JSONArray();
		
		for (int i = 0; i < pdto.size(); i++) {
			JSONObject jo = new JSONObject();
			
			jo.put("prod_code", pdto.get(i).getProd_code());
			jo.put("prod_name", pdto.get(i).getProd_name());
			jo.put("prod_category", pdto.get(i).getProd_category());
			jo.put("prod_price", pdto.get(i).getProd_price());
			jo.put("prod_discount", pdto.get(i).getProd_discount());
			jo.put("prod_content", pdto.get(i).getProd_content());
			jo.put("prod_img", pdto.get(i).getProd_img());
			jo.put("prod_regdate", pdto.get(i).getProd_regdate());
			jo.put("prod_company", pdto.get(i).getProd_company());
			jo.put("review_count", review_count);
			jo.put("prod_delivery", pdto.get(i).getProd_delivery());
			
			ja.put(jo);
		}
		
		return ja.toString();
	}
	
	@PostMapping("/review/getMy")
	@ResponseBody
	public String review_getMy(HttpServletRequest req) {
		HttpSession session = req.getSession();
		
		ArrayList<ProductDetailDTO> dDTO = new ArrayList<ProductDetailDTO>();
		JSONArray ja = new JSONArray();
		String product_code = req.getParameter("product_code");
		String nickname = "";
		
		if (session.getAttribute("nickname") != null)
			nickname = session.getAttribute("nickname").toString();
			
		if (! nickname.equals("")) {	
			dDTO = dDAO.review_getMy(product_code, nickname);
			for (int i = 0; i < dDTO.size(); i++) {
				JSONObject jo = new JSONObject();
				
				jo.put("product_code", dDTO.get(i).getProduct_code());
				jo.put("star_num", dDTO.get(i).getStar_num());
				jo.put("review_title", dDTO.get(i).getReview_title());
				jo.put("review_nickname", dDTO.get(i).getReview_nickname());
				jo.put("review_content", dDTO.get(i).getReview_content());
				
				ja.put(jo);
			}
		}
		
		return ja.toString();
	}
	
	@PostMapping("/review/getList")   
	@ResponseBody
	public String review_getList(HttpServletRequest req) {
		HttpSession session = req.getSession();
		
		String review_nickname = "비회원";
		String product_code =req.getParameter("product_code");
		int currentP = Integer.parseInt(req.getParameter("currentP"));
		
		if (session.getAttribute("nickname") != null)
			review_nickname = session.getAttribute("nickname").toString();
		
		ArrayList<ProductDetailDTO> Ddto = dDAO.show_review(currentP, product_code, review_nickname);
		return getReviewJA(Ddto);
	}
	
	@PostMapping("/review/insert")  //리뷰 추가
	public String write(HttpServletRequest req) {
		dDAO.review_insert(req.getParameter("product_code"), 
				     req.getParameter("star_num"), 
				     req.getParameter("review_title"),
				     req.getParameter("review_nickname"),
				     req.getParameter("review_content"));
		return "product_detail";
	}
	
	public String getReviewJA(ArrayList<ProductDetailDTO> Ddto) {
		JSONArray ja = new JSONArray();
		
		for (int i=0; i<Ddto.size(); i++) {
			JSONObject jo = new JSONObject();
			jo.put("product_code", Ddto.get(i).getProduct_code());
			jo.put("star_num", Ddto.get(i).getStar_num());
			jo.put("review_title", Ddto.get(i).getReview_title());
			jo.put("review_nickname", Ddto.get(i).getReview_nickname());
			jo.put("review_content", Ddto.get(i).getReview_content());
			
			ja.put(jo);
		}
		return ja.toString();
	}
	
	@PostMapping("/review/delete")  
	@ResponseBody
	public String reviewDelete(@RequestParam("product_code") String productCode,
								HttpServletRequest req) {
		String response = "false";
		
		String nickname = "";
		HttpSession session = req.getSession();
		String product_code = req.getParameter("product_code");
		if (session.getAttribute("nickname") != null) {
			nickname = session.getAttribute("nickname").toString();
			dDAO.review_delete(product_code, nickname);
			response = "true";
		}
	    
	    return response;
	}
	
	@PostMapping("/review/update")
	@ResponseBody
	public String review_update(HttpServletRequest req) {
		String productCode = req.getParameter("product_code");
		int star_num = Integer.parseInt(req.getParameter("star_num"));
		String nickname = req.getParameter("nickname");
		String title = req.getParameter("review_title");
		String content = req.getParameter("review_content");
		
	    dDAO.review_update(productCode, star_num, nickname, title, content);
	    
	    return "product_detail";
	}
	
	
	@PostMapping("/review/checkAdmin") 
	@ResponseBody
	public String review_checkAdmin(HttpServletRequest req) {
		String check = "false";
		String isAdmin = "";
		HttpSession session = req.getSession();
		
		if (session.getAttribute("nickname") != null)
			isAdmin = session.getAttribute("nickname").toString();
			
		if (isAdmin.equals("관리자")) check = "true";

		return check;
	}
	
	
	@PostMapping("/review/checkNickname")
	@ResponseBody
	public String review_checkNickname(HttpServletRequest req) {
		String logininfo = "";
		HttpSession session = req.getSession();
		if (session.getAttribute("nickname") != null)
			logininfo = session.getAttribute("nickname").toString();
		return logininfo;
	}
	
	@PostMapping("/check_myReview") 
	@ResponseBody
	public String check_myReview(HttpServletRequest req) {
		String nickname = "";
		int a_count = 0;
		HttpSession session = req.getSession();
		
		if (session.getAttribute("nickname") != null) {
			nickname = session.getAttribute("nickname").toString();
			a_count = dDAO.check_myReview(nickname,req.getParameter("product_code"));
		}
		return String.valueOf(a_count);
	}
	
	@PostMapping("/check/alreadyReview")
	@ResponseBody
	public String check_alreadyReview(HttpServletRequest req) {
		String check = "false";
		HttpSession session = req.getSession();
		
		String product_code = req.getParameter("product_code");
		String product_name = req.getParameter("product_name");
		String review_nickname = "";
		int flag = -1;
		
		if (session.getAttribute("nickname") != null)
			review_nickname = session.getAttribute("nickname").toString();
		
		if (! review_nickname.equals("")) {
			int plus = dDAO.enable_review(review_nickname, product_name);
			if (plus != 0) flag++;
			flag += dDAO.check_alreadyReview(product_code, review_nickname);
		}
			
		if (flag == -1) check = "비회원";
		else if (flag == 0) check = "리뷰 없음";
		else check = "리뷰 있음";
		
		return check;
	}

}
