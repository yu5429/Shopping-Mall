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
public class InquiryController {
	@Autowired
	private InquiryDAO IDAO;

	@GetMapping("/inquiry/list")
	public String inquiry_page() {
		return "inquiry_list";
	}
	
	@PostMapping("/inquiry/getList")
	@ResponseBody
	public String inquiry_getList(@RequestParam("currentP") int currentP) {
		ArrayList<InquiryDTO> IDTO = IDAO.inquiryList(currentP);
		JSONArray ja = new JSONArray();
		for (int i = 0; i < IDTO.size(); i++) {
			JSONObject jo = new JSONObject();
			
			jo.put("inquiry_no", IDTO.get(i).getInquiry_no());
			jo.put("inquiry_title", IDTO.get(i).getInquiry_title());
			jo.put("inquiry_content", IDTO.get(i).getInquiry_content());
			jo.put("inquiry_writer", IDTO.get(i).getInquiry_writer());
			jo.put("inquiry_created", IDTO.get(i).getInquiry_created());
			jo.put("inquiry_readcount", IDTO.get(i).getInquiry_readcount());
			jo.put("inquiry_password", IDTO.get(i).getInquiry_password());
			jo.put("inquiry_secure", IDTO.get(i).getInquiry_secure());
			jo.put("prod_img", IDTO.get(i).getProd_img());
			ja.put(jo);		
		}
		return ja.toString();
	}
	
	@PostMapping("/inquiry/getCount")
	@ResponseBody
	public String inquiry_getCount() {
		int get_count= IDAO.get_count();
				
		return String.valueOf(get_count);
	}
	
	@GetMapping("/inquiry/view/{inquiry_no}")
	public String showView(@PathVariable("inquiry_no") int inquiry_no,
							HttpServletRequest req, Model model) {
		HttpSession session = req.getSession();		
		String nickname = "";
		String numURL = String.valueOf(inquiry_no);
		InquiryDTO idto = IDAO.inquiryView(inquiry_no);
		
		if (session.getAttribute("nickname") == null) {
			if (session.getAttribute("inquriyPass") == null) return "redirect:/inquiry/secret/"+numURL;
			else {
				if (session.getAttribute("inquriyPass").equals(numURL)) {
					model.addAttribute("inquiry", idto);
					IDAO.updateReadcount(inquiry_no);
					return "inquiry_view";
				}
				else return "redirect:/inquiry/secret/"+numURL;
			}
		}
		else nickname = session.getAttribute("nickname").toString();
		
		String writer = idto.getInquiry_writer();
		
		if (nickname.equals("관리자") || nickname.equals(writer)	) {
			model.addAttribute("inquiry",idto);
			IDAO.updateReadcount(inquiry_no);
			return "inquiry_view";
		}						
		else return "inquiry_list";
	}
	
	@GetMapping("/inquiry/newPost/{prod_code}")
	public String inquiry_newPost(@PathVariable("prod_code") String prod_code) {
		return "inquiry_newPost";
	}
		
	@PostMapping("/inquiry/insert")
	@ResponseBody  
	public String inquiry_insert(@RequestParam("inquiry_title") String inquiry_title,
							 @RequestParam("inquiry_content") String inquiry_content,
							 @RequestParam("inquiry_writer") String inquiry_writer,
							 @RequestParam("inquiry_password") String inquiry_password,
							 @RequestParam("inquiry_secure") String inquiry_secure,
							 @RequestParam("inquiry_product") String inquiry_product) {
		
		String retval="ok";
		IDAO.inquiryinsert(inquiry_title,inquiry_content,inquiry_writer,
						   inquiry_password,inquiry_secure,inquiry_product);
		return retval;
	}
	
	@GetMapping("/inquiry/update/{inquiry_no}")
	public String inquiry_update(@PathVariable("inquiry_no") int inquiry_no,
							HttpServletRequest req,Model model) {
		InquiryDTO idto = IDAO.inquiryView(inquiry_no);
		model.addAttribute("inquiry",idto);
		
		return "inquiry_update";
	}
	
	@PostMapping("/inquiry/update")
	@ResponseBody
	public String inquiryUpdate(@RequestParam("inquiry_no") int inquiry_no,
								@RequestParam("inquiry_title") String inquiry_title,
			 					@RequestParam("inquiry_content") String inquiry_content) {
		String retval="ok";
		IDAO.inquiryupdate(inquiry_no, inquiry_title, inquiry_content);
		return retval;
	}
	
	@PostMapping("/inquiry/delete")
	@ResponseBody
	public String inquiryUpdate(@RequestParam("inquiry_no") int inquiry_no,
								HttpServletRequest req) {
		String check = "false";
		HttpSession session = req.getSession();
		
		if (session.getAttribute("nickname") != null) {
			IDAO.inquirydelete(inquiry_no);
			IDAO.deleteResponse(inquiry_no);
			check = "true";
			return check;
		}
		
		return check;
	}
	
	@GetMapping("/inquiry/secret/{inquiry_no}")
	public String secret_inquiry_no() {
		return "inquiry_secret";
	}
	
	@PostMapping("/inquiry/checkPostPassword")
	@ResponseBody
	public String check_postPassword(HttpServletRequest req) {
		String check = "false";
		
		HttpSession session = req.getSession();
		int inquiry_no = Integer.parseInt(req.getParameter("url"));
		String url = req.getParameter("url");
		String inputPW = req.getParameter("password");
		String password = IDAO.find_password(inquiry_no);
		
		if (password.equals(inputPW)) {
			check = "true";
			session.setAttribute("inquriyPass", url);
		}
		
		return check;
	}
	
	
	@PostMapping("/inquiry/checkAdmin")
	@ResponseBody
	public String inquiry_checkAdmin(HttpServletRequest req) {
		String check = "false";
		
		HttpSession session = req.getSession();
		if (req.getParameter("inquiry_no") == null) return check;
		
		int inquiry_no = Integer.parseInt(req.getParameter("inquiry_no"));
				
		if (session.getAttribute("nickname") != null) {
			if (session.getAttribute("nickname").toString().equals("관리자")) {
				check = "admin new";
				int flag = IDAO.alreadyResponse(inquiry_no);	
				if (flag != 0) check = "admin already";
			}
		}

		return check;
	}
	
	@PostMapping("/inquiry/alreadyExistResponse")
	@ResponseBody
	public String inquiry_alreadyExistResponse(HttpServletRequest req) {
		int inquiry_no = Integer.parseInt(req.getParameter("inquiry_no"));
		
		ArrayList<InquiryDTO> idto = IDAO.getResponse(inquiry_no);
		JSONArray ja = new JSONArray();
		
		for (int i = 0; i < idto.size(); i++) {
			JSONObject jo = new JSONObject();
			jo.put("inquiry_no", idto.get(i).getInquiry_no());
			jo.put("response_title", idto.get(i).getResponse_title());
			jo.put("response_content", idto.get(i).getResponse_content());
			jo.put("response_created", idto.get(i).getResponse_created());
			jo.put("response_updated", idto.get(i).getResponse_updated());
				
			ja.put(jo);
		}
		
		return ja.toString();
	}
	
	@PostMapping("/inquiry/submitResponse")
	@ResponseBody
	public String inquiry_submitResponse(HttpServletRequest req) {
		String check = "true";
		
		int inquiry_no = Integer.parseInt(req.getParameter("inquiry_no"));
		String title = req.getParameter("title");
		String content = req.getParameter("content");
		
		int flag = IDAO.checkBeforeUpdateR(inquiry_no);
		
		if (flag == 0) IDAO.insertResponse(inquiry_no, title, content);
		else IDAO.updateResponse(inquiry_no, title, content);
		
		return check;		
	}
	
	@PostMapping("/inquiry/deleteResponse")
	@ResponseBody
	public String inquiry_deleteResponse(HttpServletRequest req) {
		String check = "true";
		
		int inquiry_no = Integer.parseInt(req.getParameter("inquiry_no"));
		IDAO.deleteResponse(inquiry_no);
		
		return check;
	}
	
	@PostMapping("/inquiry/taggingResponse")
	@ResponseBody
	public int inquiry_taggingResponse(HttpServletRequest req) {
		int inquiry_no = Integer.parseInt(req.getParameter("inquiry_no"));
		int flag = IDAO.taggingResponse(inquiry_no);
		
		return flag;
	}
	
	@PostMapping("/inquiry/getpc")
	@ResponseBody
	public String inquiry_getpc(HttpServletRequest req) {
		String prod_code = req.getParameter("prod_code");
		InquiryDTO IDTO = IDAO.inquiry_getpc(prod_code);
		JSONObject jo = new JSONObject();
		
		if (IDTO != null) {
			jo.put("prod_code", IDTO.getProd_code());
			jo.put("prod_name", IDTO.getProd_name());
			jo.put("prod_price", IDTO.getProd_price());
			jo.put("prod_company", IDTO.getProd_company());
			jo.put("prod_img", IDTO.getProd_img());
		}
	
		return jo.toString();
	}
	
	@PostMapping("/inquiry/nonmember")
	@ResponseBody
	public String inquiry_nonmember (HttpServletRequest req) {
		String check = "true";
		HttpSession session = req.getSession();
		
		if (session.getAttribute("nickname") == null) {
			check = "false";
		}
		
		return check;
	}
}