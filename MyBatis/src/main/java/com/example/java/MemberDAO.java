package com.example.java;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberDAO {
	void submit_signup(String id, String pw, String realname, String nickname,
	String gender, String birth, String address, String phone, String email);
	void update_PW(String id, String realname, String email, String pw);
	void update_signup(String id, String pw, String realname, String gender, 
	String birth, String address, String phone, String email);
	void delete_account(String nickname, String pw);
	
	int check_duplicateID(String id);
	int check_duplicateNickname(String nickname);
	int check_email(String email);
	int search_PW(String id, String realname, String email);
	int check_PWforDelete(String nickname, String pw);
	
	String search_ID(String realname, String email);
	String get_temporalPW(String id, String realname, String email);
	String get_nickname(String id, String pw);
	String check_dupleNicknameByID(String nickname);
	String check_emailByID(String email);
	
	ArrayList<OrderDeliveryDTO> get_mypageData(String m_id);
	ArrayList<MemberDTO> get_signupInfo(String nickname);
}