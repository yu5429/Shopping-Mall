package com.example.java;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import jakarta.servlet.http.HttpServletRequest;

@Controller
public class AdminProductController {
	@Autowired
	private AdminProductDAO pdao;
	
	@GetMapping("/admin/product/list")
	public String adminProduct_list_page() {
		return "admin_product_list";
	}
	
	@GetMapping("/admin/product/create")
	public String adminProduct_create_page() {
		return "admin_product_create";
	}
	
	@PostMapping("/admin/product/getList")
	@ResponseBody
	public String admin_product_getList(@RequestParam("currentP") int currentP) {
		ArrayList<ProductDTO> pdto = pdao.admin_product_getList(currentP);
		return GetAllData(pdto);
	}
	
	@PostMapping("/admin/product/getCount")
	@ResponseBody
	public String admin_product_getCount() {
		int get_count= pdao.get_count();
				
		return String.valueOf(get_count);
	}
	
	@PostMapping("/admin/product/insert")
	@ResponseBody
	public String admin_product_insert(HttpServletRequest req) {
		String check = "true";
		
		String code = req.getParameter("code");
		String name = req.getParameter("name");
		String category = req.getParameter("category");
		int price = Integer.parseInt(req.getParameter("price"));
		int discount = Integer.parseInt(req.getParameter("discount"));
		String content = req.getParameter("content");
		String img = req.getParameter("img");
		String company = req.getParameter("company");
		int delivery = Integer.parseInt(req.getParameter("delivery"));
		String bigcategory = req.getParameter("bigcategory");

		pdao.admin_product_insert(code, name, category, price, discount, 
				content, img, company, delivery, bigcategory);
		
		return check;
	}
	
	@GetMapping("/admin/product/view/{prod_code}")
	public String admint_product_view(@PathVariable("prod_code") String prod_code,
									  HttpServletRequest req) {		
		return "admin_product_view";
	}

	@PostMapping("/admin/product/update")
	@ResponseBody
	public String admin_product_update (HttpServletRequest req) {
		String check = "true";
		
		String code = req.getParameter("code");
		String name = req.getParameter("name");
		String category = req.getParameter("category");
		int price = Integer.parseInt(req.getParameter("price"));
		int discount = Integer.parseInt(req.getParameter("discount"));
		String content = req.getParameter("content");
		String img = req.getParameter("img");
		String company = req.getParameter("company");
		int delivery = Integer.parseInt(req.getParameter("delivery"));
		String bigcategory = req.getParameter("bigcategory");
		String ccode = req.getParameter("ccode");
		
		pdao.admin_product_update(code, name, category, price, discount, 
				content, img, company, delivery, bigcategory, ccode);
		
		return check;		
	}
	
	@PostMapping("/admin/product/delete")
	@ResponseBody
	public String admin_product_delete (@RequestParam("prod_code") String prod_code) {
		String retval="ok";
		pdao.admin_product_delete(prod_code);
		return retval;
	}
	
	@PostMapping("/admin/product/getCategory")
	@ResponseBody
	public String admin_product_getCategory (HttpServletRequest req) {
		ArrayList<ProductDTO> pdto = pdao.admin_product_category();
		ArrayList<ProductDTO> pdto2 = pdao.admin_product_bigcategory();
		JSONArray ja = new JSONArray();
		
		if (req.getParameter("firstLoad") != null) {
			if (req.getParameter("firstLoad").equals("create")) {
				for (int i = 0; i < pdto.size(); i++) {
					JSONObject jo = new JSONObject();
					jo.put("prod_category", pdto.get(i).getProd_category());
					ja.put(jo);
				}
					
				for (int i = 0; i < pdto2.size(); i++) {
					JSONObject jo = new JSONObject();
					jo.put("prod_bigcategory", pdto2.get(i).getProd_bigcategory());
					ja.put(jo);
				}
				
				return ja.toString();
			}
			else if (req.getParameter("firstLoad").equals("0")) {
				for (int i = 0; i < pdto2.size(); i++) {
					JSONObject jo = new JSONObject();
					jo.put("prod_bigcategory", pdto2.get(i).getProd_bigcategory());
					ja.put(jo);
				}
				return ja.toString();
			}
			else {
				String bigcategory = req.getParameter("bigcategory");
				ArrayList<ProductDTO> pdto3 = pdao.admin_product_underBigCategory(bigcategory);
					for (int i = 0; i < pdto3.size(); i++) {
						JSONObject jo = new JSONObject();
						jo.put("prod_category", pdto3.get(i).getProd_category());
						ja.put(jo);
					}
				return ja.toString();
			}
		}
		
		return ja.toString();
	}
	
	@PostMapping("/admin/product/getData")
	@ResponseBody
	public String admin_product_getData (HttpServletRequest req) {
		String prod_code = req.getParameter("prod_code");
		
		ArrayList<ProductDTO> pdto = pdao.admin_product_view(prod_code);
		return GetAllData(pdto);
	}
	
	@PostMapping("/admin/product/getSearchCount")
	@ResponseBody
	public int admin_product_getSearchCount(HttpServletRequest req) {
		String bigcategory = req.getParameter("bigcategory");
		String category = req.getParameter("category");
		String keyword = req.getParameter("keyword");
		int count = 0;
		
		if (bigcategory.equals("") || category.equals(""))
			count = pdao.get_search_count(keyword);
		else count = pdao.get_search_countc(keyword, bigcategory, category);
		
		return count;
	}
	
	@PostMapping("/admin/product/search")
	@ResponseBody
	public String admin_product_search (HttpServletRequest req) {
		String bigcategory = req.getParameter("bigcategory");
		String category = req.getParameter("category");
		String keyword = req.getParameter("keyword");
		int currentP = Integer.parseInt(req.getParameter("currentP"));
		ArrayList<ProductDTO> pdto = new ArrayList<ProductDTO>();
		
		if (bigcategory.equals("") || category.equals(""))
			pdto = pdao.admin_product_search(keyword, currentP);
		else {
			if (keyword.equals("")) {
				pdto = pdao.admin_product_getCategoryList(currentP, bigcategory, category);
				return GetAllData(pdto);
			}
			pdto = pdao.admin_product_searchc(keyword, currentP, bigcategory, category);
		}
		
		return GetAllData(pdto);
	}
		
	private String GetAllData (ArrayList<ProductDTO> pdto) {
		JSONArray ja = new JSONArray();
		
		for (int i = 0; i < pdto.size(); i++) {
			JSONObject jo = new JSONObject();
			
			jo.put("prod_code", pdto.get(i).getProd_code());
			jo.put("prod_name", pdto.get(i).getProd_name());
			jo.put("prod_category", pdto.get(i).getProd_category());
			jo.put("prod_price", pdto.get(i).getProd_price());
			jo.put("prod_discount", pdto.get(i).getProd_discount());
			jo.put("prod_content", pdto.get(i).getProd_content());
			jo.put("prod_img", pdto.get(i).getProd_img());
			jo.put("prod_regdate", pdto.get(i).getProd_regdate());
			jo.put("prod_company", pdto.get(i).getProd_company());
			jo.put("prod_delivery", pdto.get(i).getProd_delivery());
			jo.put("prod_bigcategory", pdto.get(i).getProd_bigcategory());
			
			ja.put(jo);
		}
		
		return ja.toString();
	}
}