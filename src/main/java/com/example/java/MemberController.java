package com.example.java;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Date;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class MemberController {
	@Autowired
	private MemberDAO mdao;
	
	@GetMapping("/")
	@ResponseBody
	public String index_page() {
		return "INDEX";
	}
	
	@GetMapping("/login")
	public String login_page() {
		return "login";
	}
	
	@GetMapping("/signup")
	public String signup_page() {
		return "signup";
	}
	
	@GetMapping("/findID")
	public String findID_page() {
		return "findID";
	}
	
	@GetMapping("/findPW")
	public String findPW_page() {
		return "findPW";
	}
	
	@GetMapping("/home")
	public String home_page() {
		return "home";
	}
	
	@GetMapping("/my")
	public String my_page() {
		return "my";
	}
	
	@GetMapping("/sign/update")
	public String signupUpdate_page() {
		return "sign_update";
	}
	
	@GetMapping("/deleteAccount")
	public String deleteAccount_page() {
		return "deleteAccount";
	}
	
	@PostMapping("/check/loginStatus")
	@ResponseBody
	public String check_loginStatus(HttpServletRequest req) {
		String check = "false";
		
		HttpSession session = req.getSession();
		
		if (session.getAttribute("nickname") != null)
			check = "true";
		
		return check;
	}
	
	@PostMapping("/check/admin")
	@ResponseBody
	public String check_admin(HttpServletRequest req) {
		String check = "false";
		HttpSession session = req.getSession();
		
		if (session.getAttribute("nickname") != null) 
			if (session.getAttribute("nickname").equals("관리자"))
				check = "true";
			
		return check;
	}
		
	@PostMapping("/check_duplicateID")
	@ResponseBody
	public String check_duplicateID(HttpServletRequest req) {
		String check = "false";
		
		String id = req.getParameter("id");
		
		int flag = mdao.check_duplicateID(id);
		if (flag == 0) check = "true";
				
		return check;
	}
	
	@PostMapping("/check_duplicateNickname")
	@ResponseBody
	public String check_duplicateNickname(HttpServletRequest req) {
		String check = "false";
		
		String nickname = req.getParameter("nickname");
		
		int flag = mdao.check_duplicateNickname(nickname);
		if (flag == 0) check = "true";
		
		return check;
	}
	
	@PostMapping("/check_dupleNicknameByID")
	@ResponseBody
	public String check_dupleNicknameByID(HttpServletRequest req) {
		String check = "true";
		
		String id = req.getParameter("id");
		String nickname = req.getParameter("nickname");
		
		int flag = mdao.check_duplicateNickname(nickname);
		if (flag != 0) {
			if(! id.equals(mdao.check_dupleNicknameByID(nickname))) check = "false";
		}
	
		return check;
	}
	
	@PostMapping("/submit_signup")
	@ResponseBody
	public String submit_signup(HttpServletRequest req) {
		String check = "true";
		
		String id = req.getParameter("id");
		String pw = req.getParameter("pw");
		String realname = req.getParameter("realname");
		String nickname = req.getParameter("nickname");
		String gender = req.getParameter("gender");
		String birth = req.getParameter("birth");
		String address = req.getParameter("address");
		String phone = req.getParameter("phone");
		String email = req.getParameter("email");

		mdao.submit_signup(id, pw, realname, nickname, gender, birth, address, phone, email);
		
		return check;
	}
	
	@PostMapping("/search_ID")
	@ResponseBody
	public String search_ID(HttpServletRequest req) {
		String result = "";
		
		String realname = req.getParameter("realname");
		String email = req.getParameter("email");
		
		result = mdao.search_ID(realname, email);
		
		return result;
	}
	
	@PostMapping("/search_PW")
	@ResponseBody
	public String search_PW(HttpServletRequest req) {
		String result = "";
		
		String temporal_PW = getTemporalPW(10);
				
		String id = req.getParameter("id");
		String realname = req.getParameter("realname");
		String email = req.getParameter("email");
		
		int flag = mdao.search_PW(id, realname, email);
		
		if (flag != 0) {
			mdao.update_PW(id, realname, email, temporal_PW);
			result = mdao.get_temporalPW(id, realname, email);
		}
		
		return result;
	}
	
	@PostMapping("/check_email")
	@ResponseBody
	public String check_email(HttpServletRequest req) {
		String check = "false";
		
		String email = req.getParameter("email");
		
		int flag = mdao.check_email(email);
		if (flag == 0) check = "true";
		
		return check;
	}
	
	@PostMapping("/check_emailByID")
	@ResponseBody
	public String check_emailByID(HttpServletRequest req) {
		String check = "true";
		
		String id = req.getParameter("id");
		String email = req.getParameter("email");
		
		int flag = mdao.check_email(email);
		if (flag != 0) {
			if (! id.equals(mdao.check_emailByID(email))) check = "false";
		}
		
		return check;
	}
	
	@PostMapping("/submit/login")
	@ResponseBody
	public String submit_login(HttpServletRequest req) {
		String check = "false";
		
		HttpSession session = req.getSession(); 
		
		String id = req.getParameter("id");
		String pw = req.getParameter("pw");
		String get_nickname = mdao.get_nickname(id, pw);
		int flag = mdao.check_duplicateID(id);
		
		if (flag != 0) {
			if (get_nickname != null) {
				session.setAttribute("nickname", get_nickname);
				session.setMaxInactiveInterval(600);
				check = "true";
			}
			else check = "wrong";
		}
		else check = "none";
		
		return check;
	}
	
	@PostMapping("/logout")
	@ResponseBody
	public String do_logout(HttpServletRequest req) {
		String check = "true";
		
		HttpSession session =req.getSession();
		session.invalidate();
		
		return check;
	}
	
	@PostMapping("/CheckandDraw")
	@ResponseBody
	public String CheckandDraw(HttpServletRequest req) {
		String check = "";
		
		HttpSession session = req.getSession();
		
		if (session.getAttribute("nickname") != null)
		check = session.getAttribute("nickname").toString();
		
		return check;	
	}
	
	@PostMapping("/my/nickname")
	@ResponseBody
	public String get_mypageNickname(HttpServletRequest req) {
		String nickname = "";
		
		HttpSession session = req.getSession();
		
		if (session.getAttribute("nickname") != null)
		nickname = session.getAttribute("nickname").toString();
		
		return nickname; 
	}
	
	@PostMapping("/my/data")
	@ResponseBody
	public String get_mypageData(HttpServletRequest req) {
		HttpSession session = req.getSession();
		if(session.getAttribute("nickname") == null) return "";
		
		String m_id = session.getAttribute("nickname").toString();
		JSONArray ja = new JSONArray();

		ArrayList<OrderDeliveryDTO> odto = mdao.get_mypageData(m_id);
		for (int i = 0; i < odto.size(); i++) {
			JSONObject jo = new JSONObject();
			
			jo.put("o_ps", odto.get(i).getO_ps());
			jo.put("o_psnum", odto.get(i).getR_());
			
			ja.put(jo);
		}
		
		return ja.toString();
	}
	
	@PostMapping("/get_signupInfo")
	@ResponseBody
	public String get_signupInfo(HttpServletRequest req) {
		HttpSession session = req.getSession();
		JSONArray ja = new JSONArray();
				
		if (session.getAttribute("nickname") != null) {
			String nickname = session.getAttribute("nickname").toString();
			ArrayList<MemberDTO> mdto = mdao.get_signupInfo(nickname);
			
			for (int i = 0; i < mdto.size(); i++) {
				JSONObject jo = new JSONObject();
				jo.put("id", mdto.get(i).getId());
				jo.put("pw", mdto.get(i).getPw());
				jo.put("realname", mdto.get(i).getRealname());
				jo.put("nickname", mdto.get(i).getNickname());
				jo.put("gender", mdto.get(i).getGender());
				jo.put("birth", mdto.get(i).getBirth());
				jo.put("address", mdto.get(i).getAddress());
				jo.put("phone", mdto.get(i).getPhone());
				jo.put("email", mdto.get(i).getEmail());
				
				ja.put(jo);
			}
		}
		
		return ja.toString();
	}
	
	@PostMapping("/update_signup")
	@ResponseBody
	public String update_signup(HttpServletRequest req) {
		String check = "true";
		
		String id = req.getParameter("id");
		String pw = req.getParameter("pw");
		String realname = req.getParameter("realname");
		String gender = req.getParameter("gender");
		String birth = req.getParameter("birth");
		String address = req.getParameter("address");
		String phone = req.getParameter("phone");
		String email = req.getParameter("email");
		
		mdao.update_signup(id, pw, realname, gender, birth, address, phone, email);
		
		return check;
	}
	
	@PostMapping("/delete_account")
	@ResponseBody
	public String delete_account(HttpServletRequest req) {
		String check = "false";
	
		HttpSession session = req.getSession();
		String nickname = session.getAttribute("nickname").toString();
		String pw = req.getParameter("pw");
		
		int flag = mdao.check_PWforDelete(nickname, pw);
		
		if (flag != 0) {
			mdao.delete_account(nickname, pw);
			check = "true";
		}
		
		session.invalidate();
		
		return check;	
	}
	
	public String getTemporalPW(int size) {
		char[] charSet = new char[] {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
		'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'};
		
		StringBuffer sb = new StringBuffer();
		SecureRandom sr = new SecureRandom();
		sr.setSeed(new Date().getTime());
		int index = 0;
		
		for (int i = 0; i < size; i++) {
			index = sr.nextInt(charSet.length);
			sb.append(charSet[index]);
		}
		
		return sb.toString();
	}
}