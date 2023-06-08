package com.example.java;

import java.util.ArrayList;

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
public class AdminDeliveryController {
	@Autowired
	AdminDeliveryDAO dmDAO;
	
	@GetMapping("/admin/{user_id}/delivery")
	public String admin_user_delivery (@PathVariable("user_id") String user_id) {
		return "admin_member_delivery";
	}
	
	@PostMapping("/admin/delivery/getCount")
	@ResponseBody
	public String dm_getOrderCount(HttpServletRequest req) {
		String m_id = req.getParameter("m_id");
		int s_date = Integer.parseInt(req.getParameter("s_date"));
		int e_date = Integer.parseInt(req.getParameter("e_date"));
		String o_ps = req.getParameter("o_ps");
		String count = "";
		
		if (o_ps.equals("전체")) count = dmDAO.dm_allCount(m_id, s_date, e_date);
		else count = dmDAO.dm_selectCount(m_id, o_ps, s_date, e_date);
		
		return count;
	}
	
	@PostMapping("/admin/delivery/getDatabyID")
	@ResponseBody
	public String admin_delivery_getDatabyID (HttpServletRequest req) {
		String user_id = req.getParameter("user_id");
		String s_date = req.getParameter("s_date");
		String e_date = req.getParameter("e_date");
		String order_status = req.getParameter("order_status");
		int currentP = Integer.parseInt(req.getParameter("currentP"));
		
		ArrayList<OrderDeliveryDTO> oddto = new ArrayList<OrderDeliveryDTO>();
		
		if (order_status.equals("전체")) {
			oddto = dmDAO.dm_getDataAll(user_id, s_date, e_date, currentP);
		}
		else oddto = dmDAO.dm_getDataByUserID(user_id, s_date, e_date, order_status, currentP);
		
		JSONArray ja = new JSONArray();
		for (int i = 0; i < oddto.size(); i++) {
			JSONObject jo = new JSONObject();
			
			jo.put("o_date", oddto.get(i).getO_date());
			jo.put("o_no", oddto.get(i).getO_no());
			jo.put("o_img", oddto.get(i).getO_img());
			jo.put("o_info", oddto.get(i).getO_info());
			jo.put("o_count", oddto.get(i).getO_count());
			jo.put("o_price", oddto.get(i).getO_price());
			jo.put("o_ps", oddto.get(i).getO_ps());
			
			ja.put(jo);
		}
		
		return ja.toString();
	}
	
	@PostMapping("/admin/delivery/update")
	@ResponseBody
	public String admin_delivery_update (HttpServletRequest req) {
		String check = "true";
		
		String o_no = req.getParameter("o_no");
		String o_ps = req.getParameter("o_ps");
		
		dmDAO.dm_updateUserODL(o_no, o_ps);
		
		return check;
	}
}