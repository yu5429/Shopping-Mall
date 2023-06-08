package com.example.java;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class BasketController {
	@Autowired
	private BasketDAO bdao;
	
	@GetMapping("/basket")
	public String basket(Model model) {
		return "basket";
	}
	
	@GetMapping("/order/detail")
	public String order_detail() {
		return "order_detail";
	}
	
	@PostMapping("/basket/getList")
	@ResponseBody
	public String dobasketlist(HttpServletRequest req) {
		HttpSession session = req.getSession();
		String nickname = "";
		
		if (session.getAttribute("nickname") != null) {
			nickname = (String) session.getAttribute("nickname");
		}
		ArrayList<BasketDTO> bdto=bdao.basket_list(nickname);
		JSONArray ja=new JSONArray();
		for(int i=0;i<bdto.size();i++) {
			JSONObject jo = new JSONObject();
			BasketDTO bo=new BasketDTO();
			bo=bdto.get(i);
			jo.put("b_img",bo.getB_img());
			jo.put("b_title", bo.getB_title());
			jo.put("b_price", bo.getB_price());
			jo.put("b_count", bo.getB_count());
			jo.put("b_df", bo.getB_df());
			jo.put("bsk_seq", bo.getBsk_seq());
			
			ja.put(jo);
		}
		return ja.toString();
	}
	@PostMapping("/basket/delete")
	@ResponseBody
	public String dobasketdelete(HttpServletRequest req) {
		String retval="ok";
		try {
			int bsk_seq=Integer.parseInt(req.getParameter("bsk_seq"));
			bdao.basket_delete(bsk_seq);
		}catch(Exception e) {
			retval="fail";
		}
		return retval;
	}

	@PostMapping("/basket/selectDelete")
	@ResponseBody
	public String doalldelete(HttpServletRequest req) {
		String retval="ok";
		
		String[] seqArray = req.getParameterValues("seqArray");
		
		for (int i = 0; i < seqArray.length; i++) {
			int bsk_seq = Integer.parseInt(seqArray[i]);
			bdao.basket_selectDelete(bsk_seq);
		}
		
		return retval;
	}
	
	@PostMapping("/basket/changeQuantity")
	@ResponseBody
	public String basket_changeQuantity(HttpServletRequest req) {
		String check = "true";
		
		int b_count = Integer.parseInt(req.getParameter("b_count"));
		int bsk_seq = Integer.parseInt(req.getParameter("bsk_seq"));
		bdao.basket_changeQuantity(b_count, bsk_seq);
		
		return check;
	}
	
	@PostMapping("/basket/addSelectItem")
	@ResponseBody
	public String basket_addSelectItem(HttpServletRequest req) {
		JSONArray ja = new JSONArray();
		if (req.getParameterValues("seqArray") == null) return ja.toString();
		
		String[] seqArray = req.getParameterValues("seqArray");
		
		for (int i = 0; i < seqArray.length; i++) {
			int bsk_seq = Integer.parseInt(seqArray[i]);
			ArrayList<BasketDTO> bdto = bdao.basket_addSelectItem(bsk_seq);
			
			for (int j = 0; j < bdto.size(); j++) {
				JSONObject jo = new JSONObject();
				BasketDTO bo=new BasketDTO();
				bo=bdto.get(j);
				
				jo.put("b_img",bo.getB_img());
				jo.put("b_title", bo.getB_title());
				jo.put("b_price", bo.getB_price());
				jo.put("b_count", bo.getB_count());
				jo.put("b_df", bo.getB_df());
				jo.put("bsk_seq", bo.getBsk_seq());
				
				ja.put(jo);
			}
		}
		
		return ja.toString();
	}
	
	@PostMapping("/basket/insert")
	@ResponseBody
	public String basket_insert(HttpServletRequest req) {
		String check = "";
		HttpSession session = req.getSession();
		
		String b_img = req.getParameter("b_img");
		String b_title = req.getParameter("b_title");
		int b_price = Integer.parseInt(req.getParameter("b_price"));
		int b_count = Integer.parseInt(req.getParameter("b_count"));
		int b_df = Integer.parseInt(req.getParameter("b_df"));
		String nickname = session.getAttribute("nickname").toString();
		
		bdao.basket_insert(b_img, b_title, b_price, b_count, b_df, nickname);
		
		return check;
	}
}