package com.example.java;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OrderDeliveryDAO {
	ArrayList<OrderDeliveryDTO> my_all_list
	(String user_id, String s_date, String e_date, int currentP);
	ArrayList<OrderDeliveryDTO> my_select_list
	(String user_id, String s_date, String e_date, String order_status, int currentP);
	ArrayList<OrderDeliveryDTO> order_detail_paid_list(String o_no);
	
	OrderDeliveryDTO identification_check(String o_no);	
	
	int my_order_all_count(String user_id, String s_date, String e_date);
	int my_order_select_count(String user_id, String s_date, String e_date, String order_status);

	void odl_insert(String m_id, String o_img,
					String o_info, int o_count, int o_price,
					String o_name, String o_address, String o_phone,
					String o_dm, int o_df, int o_no);
}