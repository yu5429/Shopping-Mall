package com.example.java;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminMemberDAO {
	ArrayList<MemberDTO> admin_member_getAllMember(int currentP);
	ArrayList<MemberDTO> admin_member_search(int currentP, String input_search);
	
	void admin_member_update(String id,String phone,String email);
	void admin_member_delete(String id);
	
	String admin_member_getAllLength();
	String admin_member_getSpecLength(String memberInfo);
}