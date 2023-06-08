package com.example.java;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class OrderDeliveryController {
	@Autowired
	private OrderDeliveryDAO odao;
	
	@GetMapping("/odl/{order_status}")
	public String orderList_page(@PathVariable("order_status") String order_status) {
		return "odl";
	}
	
	@GetMapping("/order_detail_paid/{o_no}/{m_id}")
	public String order_detail_paid_page(@PathVariable("o_no") String o_no,
										 @PathVariable("m_id") String m_id, Model model) {
		model.addAttribute("o_no", o_no);
		model.addAttribute("m_id", m_id);
		return "order_detail_paid";
	}
			
	@PostMapping("/odl/getPageData")
	@ResponseBody
	public String odl_getPageData(HttpServletRequest req) {
		HttpSession session = req.getSession();
		
		String user_id = session.getAttribute("nickname").toString();
		String s_date = req.getParameter("s_date");
		String e_date = req.getParameter("e_date");
		String order_status = req.getParameter("order_status");
		int currentP = Integer.parseInt(req.getParameter("currentP"));
		
		ArrayList<OrderDeliveryDTO> odto = new ArrayList<OrderDeliveryDTO>();
		
		if(order_status.equals("전체")) {
			odto = odao.my_all_list(user_id, s_date, e_date, currentP);
		}
		else odto = odao.my_select_list(user_id, s_date, e_date, order_status, currentP);
		
		return getOrderJA(odto);	
	}
	
	@PostMapping("/odl/getCount")
	@ResponseBody
	public String odl_getCount(HttpServletRequest req) {
		HttpSession session = req.getSession();
		
		String user_id = "";
		if (session.getAttribute("nickname") != null) 
			user_id = session.getAttribute("nickname").toString();
			
		String s_date = req.getParameter("s_date");
		String e_date = req.getParameter("e_date");
		String order_status = req.getParameter("order_status");
		
		if(order_status.equals("전체")) {
			int a_count = odao.my_order_all_count(user_id, s_date, e_date);
			return String.valueOf(a_count);
		} 
		else {
			int s_count = odao.my_order_select_count(user_id, s_date, e_date, order_status);
			return String.valueOf(s_count);
		}
	}
	
	@PostMapping("/order_detail_paid_list")
	@ResponseBody
	public String order_detail_paid_list(@RequestParam("o_no") String o_no, Model model) {
		ArrayList<OrderDeliveryDTO> odto = odao.order_detail_paid_list(o_no);
		JSONArray ja = new JSONArray();
		for (int i = 0; i < odto.size(); i++) {
			JSONObject jo = new JSONObject();
			
			jo.put("o_no", odto.get(i).getO_no());
			jo.put("o_date", odto.get(i).getO_date());
			jo.put("o_img", odto.get(i).getO_img());
			jo.put("o_info", odto.get(i).getO_info());
			jo.put("o_count", odto.get(i).getO_count());
			jo.put("o_price", odto.get(i).getO_price());
			jo.put("o_ps", odto.get(i).getO_ps());
			jo.put("o_df", odto.get(i).getO_df());
			jo.put("o_name", odto.get(i).getO_name());
			jo.put("o_address", odto.get(i).getO_address());
			jo.put("o_phone", odto.get(i).getO_phone());
			jo.put("o_dm", odto.get(i).getO_dm());
			
			ja.put(jo);		
		}
		return ja.toString();
	}

	@PostMapping("/identification_check")
	@ResponseBody
	public String identification_check(@RequestParam("o_no") String o_no,
									   HttpServletRequest req) {
		String check = "false";
		
		HttpSession session = req.getSession();
		OrderDeliveryDTO odto = odao.identification_check(o_no);
		
		String nickname = session.getAttribute("nickname").toString();
		String writer = odto.m_id.toString();
		
		if (nickname.equals("관리자") || nickname.equals(writer)) {
			check = "true";
		}	
		
		return check;
	}
	
	@PostMapping("/odl_insert")
	@ResponseBody  
	public String odl_insert(@RequestParam("o_no") int o_no,
							 @RequestParam("o_img") String o_img,
							 @RequestParam("o_info") String o_info,
							 @RequestParam("o_count") int o_count,
							 @RequestParam("o_price") int o_price,
							 @RequestParam("o_name") String o_name,
							 @RequestParam("o_address") String o_address,
							 @RequestParam("o_phone") String o_phone,
							 @RequestParam("o_dm") String o_dm,
							 @RequestParam("o_df") int o_df,
							 HttpServletRequest req) {
		
		String check="true";
		
		HttpSession session = req.getSession();
		String m_id = session.getAttribute("nickname").toString();
		
		odao.odl_insert(m_id, o_img, o_info, o_count, o_price,
						o_name, o_address, o_phone, o_dm, o_df, o_no);
		
		return check;
	}
	
	
	
	public String getOrderJA(ArrayList<OrderDeliveryDTO> odto) {
		JSONArray ja = new JSONArray();
		
		for (int i=0; i<odto.size(); i++) {
			JSONObject jo = new JSONObject();
			jo.put("m_id", odto.get(i).getM_id());
			jo.put("o_date", odto.get(i).getO_date());
			jo.put("o_no", odto.get(i).getO_no());
			jo.put("o_img", odto.get(i).getO_img());
			jo.put("o_info", odto.get(i).getO_info());
			jo.put("o_count", odto.get(i).getO_count());
			jo.put("o_price", odto.get(i).getO_price());
			jo.put("o_ps", odto.get(i).getO_ps());
			
			ja.put(jo);
		}
		return ja.toString();
	}
}