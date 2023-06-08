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
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpServletRequest;


@Controller
public class NoticeController {
	@Autowired
	NoticeDAO ndao;
	
	@GetMapping("/notice/list") // 공지사항 페이지 보기
	public String notice_page() {
		return "notice_list"; 
	}
	
	@PostMapping("/notice/getList")  
	@ResponseBody
	public String notice_getList(HttpServletRequest req) {
		int currentP = Integer.parseInt(req.getParameter("currentP"));
		ArrayList<NoticeDTO> alOd = ndao.show_notice(currentP);
		return getNoticeJA(alOd);
	}
	
	@PostMapping("/notice/getCount")
	@ResponseBody
	public String notice_getCount(HttpServletRequest req) {
		int a_count = ndao.notice_all_count();
		return String.valueOf(a_count);
	}
		
	@GetMapping("/notice/view/{w_num}")   
	public String notice_view (@PathVariable("w_num") String w_num, Model model) {
		ndao.update_viewCount(w_num);
		NoticeDTO ndto = ndao.view_notice(w_num);
		model.addAttribute("n", ndto);
	    return "notice_view";
	}
	
	@GetMapping("/notice/write")  
	public String notice_write() {
	    return "notice_write";
	}
	
	@PostMapping("/notice/write/submit")
	@ResponseBody
	public String notice_write_submti (HttpServletRequest req) {
		String check = "";
		String w_title = req.getParameter("w_title");
		String w_content = req.getParameter("w_content");
		ndao.write_notice(w_title, w_content);
		return check;
	}
	
	@PostMapping("/notice/delete")
	@ResponseBody
	public String notice_delete (HttpServletRequest req) {
		String check = "";
		String w_num = req.getParameter("w_num");
		ndao.delete_notice(w_num);
		return check;
	}
	
	@GetMapping("/notice/update/{w_num}")
	public String notice_update(@PathVariable("w_num") String w_num, Model model) {
		NoticeDTO ndto = ndao.view_notice(w_num);
		model.addAttribute("n", ndto);
	    return "notice_update"; 
	}
		
	@PostMapping("/notice/update/proceed")
	@ResponseBody
	public String notice_update_proceed (HttpServletRequest req) {
		String check = "";
		String w_title = req.getParameter("w_title");
		String w_content = req.getParameter("w_content");
		String w_num = req.getParameter("w_num");
		
		ndao.update_notice(w_title, w_content, w_num);
		
		return check;
	}
	
	public String getNoticeJA(ArrayList<NoticeDTO> alOd) {  
		JSONArray ja = new JSONArray();
		
		for (int i = 0; i < alOd.size(); i++) {
			JSONObject jo = new JSONObject();
			jo.put("W_num", alOd.get(i).getW_num());
    		jo.put("W_title", alOd.get(i).getW_title());
    		jo.put("W_writer", alOd.get(i).getW_writer());
    		jo.put("W_content", alOd.get(i).getW_content());
    		jo.put("W_date", alOd.get(i).getW_date());
    		jo.put("W_views", alOd.get(i).getW_views());
			
			ja.put(jo);
		}
		return ja.toString();
	}
	
}