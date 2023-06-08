package com.example.java;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminDeliveryDAO {
	ArrayList<OrderDeliveryDTO> dm_getDataAll
	(String user_id, String s_date, String e_date, int currentP);
	
	ArrayList<OrderDeliveryDTO> dm_getDataByUserID
	(String user_id, String s_date, String e_date, String order_status, int currentP);
	
	String dm_allCount(String m_id, int s_date, int e_date);
	String dm_selectCount(String m_id, String o_ps, int s_date, int e_date);
	
	void dm_updateUserODL(String o_no, String o_ps);
}