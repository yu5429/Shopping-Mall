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

@Controller
public class AdminMemberController {
	@Autowired
	private AdminMemberDAO mdao;
	
	@GetMapping("/admin/member/list")
	public String management(HttpServletRequest req,Model model) {
		return "admin_member_list";
	}
	
	
	@PostMapping("/admin/member/getAllMember")
	@ResponseBody
	public String admin_member_getAllMember (HttpServletRequest req) {
		int currentP = Integer.parseInt(req.getParameter("currentP"));
		ArrayList<MemberDTO> mdto = mdao.admin_member_getAllMember(currentP);
		return getData(mdto);	
	}
	
	@PostMapping("/admin/member/update")
	@ResponseBody
	public String admin_member_update (HttpServletRequest req) {
		String check = "true";
		
		String id=req.getParameter("id");
		String phone=req.getParameter("phone");
		String email=req.getParameter("email");
		
		mdao.admin_member_update(id,phone,email);
		
		return check;
	}
	
	@PostMapping("/admin/member/delete")
	@ResponseBody
	public String admin_member_delete (HttpServletRequest req) {
		String check = "true";
		
		String id=req.getParameter("id");
		mdao.admin_member_delete(id);
		
		return check;
	}
	
	@PostMapping("/admin/member/search")
	@ResponseBody
	public String admin_member_search (HttpServletRequest req) {
		int currentP = Integer.parseInt(req.getParameter("currentP"));
		String input_search = req.getParameter("input_search");
		ArrayList<MemberDTO> mdto = new ArrayList<MemberDTO>();
		
		if(! input_search.equals("")) 
			mdto = mdao.admin_member_search(currentP, input_search);
		else mdto = mdao.admin_member_getAllMember(1);

		return getData(mdto);
	}
	
	@PostMapping("/admin/member/getAllLength")
	@ResponseBody
	public String admin_member_getAllLength (HttpServletRequest req) {
		String dataLength = mdao.admin_member_getAllLength();
		return dataLength;
	}
	
	@PostMapping("/admin/member/getSpecLength")
	@ResponseBody
	public String admin_member_getSpecLength(HttpServletRequest req) {
		 String memberInfo = req.getParameter("memberInfo");
		 String dataLength = mdao.admin_member_getSpecLength(memberInfo);
		 return dataLength;
	}
	
	
	
	private String getData(ArrayList<MemberDTO> mdto) {
		JSONArray ja=new JSONArray();
		
		for(int i=0; i < mdto.size(); i++) {
			JSONObject jo = new JSONObject();
			MemberDTO mo = new MemberDTO();
			mo = mdto.get(i);
	
			jo.put("id", mo.getId());
			jo.put("realname", mo.getRealname());
			jo.put("nickname", mo.getNickname());
			jo.put("gender", mo.getGender());
			jo.put("address", mo.getAddress());
			jo.put("phone", mo.getPhone());
			jo.put("email", mo.getEmail());
			
			ja.put(jo);
		}
		return ja.toString();
	}
}